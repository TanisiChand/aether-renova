import { useEffect, useRef } from 'react'

/**
 * Animated "synergy web" — drifting nodes that link up with glowing
 * connection lines when near each other, echoing an interconnected
 * energy grid. Rendered on a canvas sized to its parent section.
 */
export default function SynergyBackground({ bleed = 160, fade = false }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const parent = canvas.parentElement

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    let width = 0
    let height = 0
    let nodes = []
    let animationId
    let dpr = Math.min(window.devicePixelRatio || 1, 2)

    // Scroll-driven state: how far the section has travelled through the
    // viewport (0 = just entering at bottom, 1 = just leaving at top).
    let scrollProgress = 0
    let smoothProgress = 0

    const ACCENT = '10, 242, 173'
    const LINK_DIST = 170

    function computeScroll() {
      const rect = parent.getBoundingClientRect()
      const vh = window.innerHeight || 1
      // 0 when the section top hits the bottom of the viewport,
      // 1 when the section bottom passes the top of the viewport.
      const raw = (vh - rect.top) / (vh + rect.height)
      scrollProgress = Math.max(0, Math.min(1, raw))
    }

    function buildNodes() {
      // Density scales with area, capped for performance.
      const count = Math.min(70, Math.round((width * height) / 22000))
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.6 + 0.8,
        pulse: Math.random() * Math.PI * 2,
      }))
    }

    function resize() {
      // Measure the canvas itself — it intentionally extends beyond the
      // section (bleeds into the neighbouring sections), so its own box is
      // the drawable area.
      const rect = canvas.getBoundingClientRect()
      // Guard against transient 0/1px measurements (e.g. during layout).
      if (rect.width < 2 || rect.height < 2) return
      width = rect.width
      height = rect.height
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      // Only set the backing-store size; CSS handles display size.
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      buildNodes()
    }

    function step() {
      ctx.clearRect(0, 0, width, height)

      // Recompute scroll position every frame — robust whether the page or a
      // container is the scroller (the scroll event alone can't be relied on).
      computeScroll()
      // Ease the smoothed progress toward the latest scroll value.
      smoothProgress += (scrollProgress - smoothProgress) * 0.08

      // Scroll drives the whole field: a subtle vertical parallax drift plus
      // a gentle rotational swirl, so the grid visibly reacts as you scroll
      // while staying elegantly framed within the section.
      const centered = smoothProgress - 0.5 // -0.5 .. 0.5
      // Pronounced-but-elegant vertical parallax: the whole field travels
      // counter to the scroll, so the grid clearly "flows" as you move.
      const driftY = centered * height * 0.45
      const angle = centered * 0.6 // radians of swirl
      const cos = Math.cos(angle)
      const sin = Math.sin(angle)
      const cx = width / 2
      const cy = height / 2
      // Connection reach grows as the section is centered (links knit together).
      const linkDist = LINK_DIST * (1 + (0.5 - Math.abs(centered)) * 0.5)
      // Ambient speed scales with scroll position for liveliness.
      const speedMul = 0.7 + Math.abs(centered) * 0.9

      // Update base positions (their slow ambient drift).
      for (const n of nodes) {
        n.x += n.vx * speedMul
        n.y += n.vy * speedMul
        if (n.x < 0 || n.x > width) n.vx *= -1
        if (n.y < 0 || n.y > height) n.vy *= -1
        n.pulse += 0.02

        // Apply scroll-driven swirl (around center) + layered parallax,
        // with bigger nodes drifting more for a sense of depth.
        const ox = n.x - cx
        const oy = n.y - cy
        const depth = 0.6 + n.r / 2.6
        n.rx = cx + (ox * cos - oy * sin)
        n.ry = cy + (ox * sin + oy * cos) + driftY * depth
      }

      // Connection lines (use scroll-rendered positions).
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]
          const b = nodes[j]
          const dx = a.rx - b.rx
          const dy = a.ry - b.ry
          const dist = Math.hypot(dx, dy)
          if (dist < linkDist) {
            const alpha = (1 - dist / linkDist) * 0.28
            ctx.strokeStyle = `rgba(${ACCENT}, ${alpha})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.rx, a.ry)
            ctx.lineTo(b.rx, b.ry)
            ctx.stroke()
          }
        }
      }

      // Nodes with soft glow.
      for (const n of nodes) {
        const glow = 0.5 + Math.sin(n.pulse) * 0.3
        ctx.beginPath()
        ctx.arc(n.rx, n.ry, n.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${ACCENT}, ${0.6 * glow + 0.2})`
        ctx.shadowBlur = 8
        ctx.shadowColor = `rgba(${ACCENT}, 0.8)`
        ctx.fill()
        ctx.shadowBlur = 0
      }

      animationId = requestAnimationFrame(step)
    }

    function drawStatic() {
      // Single frame for reduced-motion users.
      ctx.clearRect(0, 0, width, height)
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]
          const b = nodes[j]
          const dist = Math.hypot(a.x - b.x, a.y - b.y)
          if (dist < LINK_DIST) {
            ctx.strokeStyle = `rgba(${ACCENT}, ${(1 - dist / LINK_DIST) * 0.2})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }
      for (const n of nodes) {
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${ACCENT}, 0.5)`
        ctx.fill()
      }
    }

    const onChange = () => {
      resize()
      if (prefersReduced) drawStatic()
    }

    const ro = new ResizeObserver(onChange)
    ro.observe(parent)
    window.addEventListener('resize', onChange)

    resize()
    computeScroll()
    smoothProgress = scrollProgress
    if (prefersReduced) {
      drawStatic()
    } else {
      step()
    }

    return () => {
      ro.disconnect()
      window.removeEventListener('resize', onChange)
      cancelAnimationFrame(animationId)
    }
  }, [])

  // Soft-fade the top & bottom edges so the web dissolves gently where it
  // bleeds into neighbouring sections instead of cutting off hard.
  const fadeMask =
    'linear-gradient(to bottom, transparent 0, #000 8%, #000 92%, transparent 100%)'

  return (
    <canvas
      ref={canvasRef}
      // Extend above & below the section so the field bleeds into the
      // neighbouring sections rather than being clipped at the edges.
      // `bleed` controls how far (px) it reaches each side.
      className="absolute left-0 right-0 w-full pointer-events-none"
      style={{
        zIndex: 0,
        top: `-${bleed}px`,
        height: `calc(100% + ${bleed * 2}px)`,
        ...(fade
          ? { WebkitMaskImage: fadeMask, maskImage: fadeMask }
          : {}),
      }}
      aria-hidden="true"
    />
  )
}
