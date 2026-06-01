import { useEffect, useRef } from 'react'

export default function HeroCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let width
    let height
    let particles = []
    let animationId
    const gridSize = 60
    const particleCount = 40

    function resize() {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    class Electron {
      constructor() {
        this.init()
      }

      init() {
        this.x = Math.floor(Math.random() * (width / gridSize)) * gridSize
        this.y = Math.floor(Math.random() * (height / gridSize)) * gridSize
        this.dir = Math.floor(Math.random() * 4)

        this.speed = 0.35 + Math.random() * 0.5
        this.length = 0
        this.maxLength = 100 + Math.random() * 200
        this.life = 0
        this.maxLife = 100 + Math.random() * 200
        this.opacity = Math.random() * 0.5 + 0.5
      }

      update() {
        const nextX = [this.speed, 0, -this.speed, 0]
        const nextY = [0, this.speed, 0, -this.speed]

        this.x += nextX[this.dir]
        this.y += nextY[this.dir]

        if (
          Math.abs(this.x % gridSize) < this.speed &&
          Math.abs(this.y % gridSize) < this.speed
        ) {
          if (Math.random() < 0.3) {
            this.dir = (this.dir + (Math.random() < 0.5 ? 1 : 3)) % 4
          }
        }

        this.life++
        if (
          this.life > this.maxLife ||
          this.x < 0 ||
          this.x > width ||
          this.y < 0 ||
          this.y > height
        ) {
          this.init()
        }
      }

      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, 1.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(10, 242, 173, ${
          this.opacity * (1 - this.life / this.maxLife)
        })`
        ctx.shadowBlur = 8
        ctx.shadowColor = '#0AF2AD'
        ctx.fill()
        ctx.shadowBlur = 0
      }
    }

    function drawGrid() {
      ctx.beginPath()
      ctx.strokeStyle = 'rgba(10, 242, 173, 0.04)'
      ctx.lineWidth = 1

      for (let x = 0; x <= width; x += gridSize) {
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
      }
      for (let y = 0; y <= height; y += gridSize) {
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
      }
      ctx.stroke()
    }

    function initParticles() {
      particles = []
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Electron())
      }
    }

    function animate() {
      ctx.clearRect(0, 0, width, height)
      drawGrid()
      particles.forEach((p) => {
        p.update()
        p.draw()
      })
      animationId = requestAnimationFrame(animate)
    }

    function handleResize() {
      resize()
      initParticles()
    }

    window.addEventListener('resize', handleResize)

    resize()
    initParticles()
    animate()

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return <canvas id="hero-canvas" ref={canvasRef} />
}
