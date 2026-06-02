import { useEffect, useRef, useState } from 'react'

/* ---------------------------------------------------------------------------
   Interactive stat band (x.ai-inspired, on-brand).
   - Cursor-follow accent spotlight across the whole band (desktop).
   - Numbers count up on scroll-in, with a light beam that sweeps each baseline.
   - Hover a stat: the number lifts and glows, its baseline turns accent.
   - Faint engineering grid in the background for texture.

   stats: [{ value, label, suffix?, prefix?, decimals? }]
--------------------------------------------------------------------------- */

function useInView() {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const check = () =>
      el.getBoundingClientRect().top < window.innerHeight * 0.9 &&
      el.getBoundingClientRect().bottom > 0
    if (check()) {
      setInView(true)
      return
    }
    const id = setInterval(() => {
      if (check()) {
        setInView(true)
        clearInterval(id)
      }
    }, 150)
    return () => clearInterval(id)
  }, [])
  return [ref, inView]
}

function CountUp({ value, decimals = 0, prefix = '', suffix = '', run }) {
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!run) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setV(value)
      return
    }
    const steps = 50
    let i = 0
    const id = setInterval(() => {
      i += 1
      const t = Math.min(i / steps, 1)
      setV(value * (1 - Math.pow(1 - t, 3)))
      if (t >= 1) clearInterval(id)
    }, 1500 / steps)
    return () => clearInterval(id)
  }, [run, value])

  const shown = decimals ? v.toFixed(decimals) : Math.round(v).toLocaleString()
  return (
    <>
      {prefix && <span className="text-[0.5em] font-medium text-aether-muted align-middle mr-0.5">{prefix}</span>}
      {shown}
      {suffix && <span className="text-[0.42em] font-medium text-aether-muted align-middle tracking-normal ml-0.5">{suffix}</span>}
    </>
  )
}

function Stat({ s, idx, inView }) {
  return (
    <div className="group relative px-3 lg:px-6 py-2 text-center">
      <div
        className="font-montserrat text-white font-semibold tracking-tight leading-none transition-all duration-500 group-hover:-translate-y-1 group-hover:[text-shadow:0_0_28px_rgba(10,242,173,0.4)]"
        style={{ fontSize: 'clamp(38px,6.2vw,66px)' }}
      >
        <CountUp value={s.value} decimals={s.decimals} prefix={s.prefix} suffix={s.suffix} run={inView} />
      </div>

      {/* baseline hairline with a one-time light sweep + hover accent */}
      <div className="relative mx-auto mt-5 h-px w-full max-w-[180px] overflow-hidden bg-aether-border transition-colors duration-300 group-hover:bg-aether-accent/50">
        <span
          className="absolute inset-y-0 left-0 w-2/3 bg-gradient-to-r from-transparent via-aether-accent to-transparent"
          style={{
            transform: inView ? 'translateX(260%)' : 'translateX(-120%)',
            transition: `transform 1.7s cubic-bezier(0.22,1,0.36,1) ${0.25 + idx * 0.14}s`,
          }}
        />
      </div>

      <div className="mt-4 text-aether-muted text-xs md:text-sm tracking-wide leading-snug transition-colors duration-300 group-hover:text-white/80">
        {s.label}
      </div>
    </div>
  )
}

export default function StatBand({ stats, className = '' }) {
  const [ref, inView] = useInView()
  const colClass =
    { 2: 'lg:grid-cols-2', 3: 'lg:grid-cols-3', 4: 'lg:grid-cols-4', 5: 'lg:grid-cols-5' }[stats.length] ||
    'lg:grid-cols-4'

  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
        e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
        e.currentTarget.style.setProperty('--spot', '1')
      }}
      onMouseLeave={(e) => e.currentTarget.style.setProperty('--spot', '0')}
      className={`relative isolate overflow-hidden rounded-3xl border border-aether-border bg-aether-card/30 ${className}`}
    >
      {/* faint engineering grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(120% 120% at 50% 50%, #000 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(120% 120% at 50% 50%, #000 40%, transparent 100%)',
        }}
      />

      {/* cursor-follow accent spotlight (desktop) */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: 'var(--spot,0)',
          background:
            'radial-gradient(480px circle at var(--mx,50%) var(--my,50%), rgba(10,242,173,0.10), transparent 62%)',
        }}
      />

      <div
        className={`relative grid grid-cols-2 ${colClass} gap-y-9 lg:gap-0 lg:divide-x lg:divide-aether-border/50 py-10 md:py-12 lg:py-16`}
      >
        {stats.map((s, i) => (
          <Stat key={s.label} s={s} idx={i} inView={inView} />
        ))}
      </div>
    </div>
  )
}
