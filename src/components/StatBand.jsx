import { useEffect, useRef, useState } from 'react'

/* ---------------------------------------------------------------------------
   Interactive stat presentation used site-wide (x.ai-inspired, on-brand).

   - Numbers count up on scroll-in; a light beam sweeps each baseline.
   - Hover a stat: the number lifts and glows, its baseline turns accent.
   - `panel` variant adds a bordered card with a faint engineering grid and a
     cursor-follow accent spotlight. `bare` variant drops the chrome for
     sections that already have their own framing.

   stats: [{ value, label, suffix?, prefix?, decimals? }]
     • value number  → counts up
     • value string  → rendered as-is (no count-up)
   props: variant 'panel'|'bare', size 'lg'|'sm', className
--------------------------------------------------------------------------- */

const SIZES = {
  lg: { num: 'clamp(30px,5.4vw,60px)', pad: 'py-10 md:py-12 lg:py-14', gap: 'gap-y-9', label: 'text-xs md:text-sm', mt: 'mt-4', line: 'mt-5' },
  sm: { num: 'clamp(26px,3vw,40px)', pad: 'py-6 md:py-7', gap: 'gap-y-7', label: 'text-[11px] md:text-xs', mt: 'mt-3', line: 'mt-4' },
}

const LG_COLS = { 2: 'lg:grid-cols-2', 3: 'lg:grid-cols-3', 4: 'lg:grid-cols-4', 5: 'lg:grid-cols-5', 6: 'lg:grid-cols-3' }

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

function CountUp({ value, decimals = 0, run }) {
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
  return <>{decimals ? v.toFixed(decimals) : Math.round(v).toLocaleString()}</>
}

const Affix = ({ children, side }) => (
  <span className={`text-[0.45em] font-medium text-aether-muted align-middle tracking-normal ${side === 'pre' ? 'mr-0.5' : 'ml-0.5'}`}>
    {children}
  </span>
)

function Stat({ s, idx, inView, size }) {
  const sz = SIZES[size]
  const numeric = typeof s.value === 'number'
  return (
    <div className="group relative px-3 lg:px-6 text-center">
      <div
        className="font-montserrat text-white font-semibold tracking-tight leading-none whitespace-nowrap transition-all duration-500 group-hover:-translate-y-1 group-hover:[text-shadow:0_0_28px_rgba(10,242,173,0.4)]"
        style={{ fontSize: sz.num }}
      >
        {s.prefix && <Affix side="pre">{s.prefix}</Affix>}
        {numeric ? <CountUp value={s.value} decimals={s.decimals} run={inView} /> : s.value}
        {s.suffix && <Affix side="suf">{s.suffix}</Affix>}
      </div>

      {/* baseline hairline with one-time light sweep + hover accent */}
      <div className={`relative mx-auto ${sz.line} h-px w-full max-w-[180px] overflow-hidden bg-aether-border transition-colors duration-300 group-hover:bg-aether-accent/50`}>
        <span
          className="absolute inset-y-0 left-0 w-2/3 bg-gradient-to-r from-transparent via-aether-accent to-transparent"
          style={{
            transform: inView ? 'translateX(260%)' : 'translateX(-120%)',
            transition: `transform 1.7s cubic-bezier(0.22,1,0.36,1) ${0.25 + idx * 0.12}s`,
          }}
        />
      </div>

      <div className={`${sz.mt} text-aether-muted ${sz.label} tracking-wide leading-snug transition-colors duration-300 group-hover:text-white/80`}>
        {s.label}
      </div>
    </div>
  )
}

export default function StatBand({ stats, variant = 'panel', size = 'lg', className = '' }) {
  const [ref, inView] = useInView()
  const sz = SIZES[size]
  const lgCols = LG_COLS[stats.length] || 'lg:grid-cols-4'
  const mobileCols = stats.length === 3 ? 'grid-cols-3' : 'grid-cols-2'
  const singleRow = stats.length <= 5
  const isPanel = variant === 'panel'

  return (
    <div
      ref={ref}
      onMouseMove={
        isPanel
          ? (e) => {
              const r = e.currentTarget.getBoundingClientRect()
              e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
              e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
              e.currentTarget.style.setProperty('--spot', '1')
            }
          : undefined
      }
      onMouseLeave={isPanel ? (e) => e.currentTarget.style.setProperty('--spot', '0') : undefined}
      className={`relative isolate ${
        isPanel ? 'overflow-hidden rounded-3xl border border-aether-border bg-aether-card/30' : ''
      } ${className}`}
    >
      {isPanel && (
        <>
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
          {/* cursor-follow accent spotlight */}
          <div
            className="pointer-events-none absolute inset-0 transition-opacity duration-300"
            style={{
              opacity: 'var(--spot,0)',
              background:
                'radial-gradient(480px circle at var(--mx,50%) var(--my,50%), rgba(10,242,173,0.10), transparent 62%)',
            }}
          />
        </>
      )}

      <div
        className={`relative grid ${mobileCols} ${lgCols} ${
          singleRow
            ? `${sz.gap} lg:gap-0 lg:divide-x lg:divide-aether-border/50`
            : 'gap-x-2 gap-y-10 lg:gap-x-6 lg:gap-y-14'
        } ${isPanel ? sz.pad : ''}`}
      >
        {stats.map((s, i) => (
          <Stat key={s.label} s={s} idx={i} inView={inView} size={size} />
        ))}
      </div>
    </div>
  )
}
