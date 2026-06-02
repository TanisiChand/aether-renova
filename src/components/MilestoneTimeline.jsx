import { useEffect, useRef, useState } from 'react'

/* ---------------------------------------------------------------------------
   Detailed, filterable project-milestone timeline (used on the Dhalkebar page).
   Milestone-by-milestone status from tender award through COD, with a progress
   summary, category tags, a "today" marker and completed/upcoming states.

   milestones: [{ date, title, cat, done?, cod?, note? } | { today: true }]
   cat ∈ 'lic' | 'proc' | 'land' | 'cons'
--------------------------------------------------------------------------- */

const CATS = {
  lic: { name: 'Development & Licensing', cls: 'text-sky-300 border-sky-400/30 bg-sky-400/10' },
  proc: { name: 'Procurement & Logistics', cls: 'text-amber-300 border-amber-400/30 bg-amber-400/10' },
  land: { name: 'Land & Civil', cls: 'text-aether-accent border-aether-accent/30 bg-aether-accent/10' },
  cons: { name: 'Construction & Commissioning', cls: 'text-orange-300 border-orange-400/30 bg-orange-400/10' },
}

function useInView() {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const check = () =>
      el.getBoundingClientRect().top < window.innerHeight * 0.85 &&
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

function useCountUp(target, run, duration = 1200) {
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!run) return
    let raf
    let start
    const tick = (ts) => {
      if (start === undefined) start = ts
      const t = Math.min((ts - start) / duration, 1)
      setV(Math.round(target * (1 - Math.pow(1 - t, 3))))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, run, duration])
  return v
}

const Check = () => (
  <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
)

export default function MilestoneTimeline({ milestones }) {
  const [filter, setFilter] = useState('all')
  const [ref, inView] = useInView()

  const real = milestones.filter((m) => !m.today)
  const total = real.length
  const doneCount = real.filter((m) => m.done).length
  const pct = Math.round((doneCount / total) * 100)
  const shownPct = useCountUp(pct, inView)

  const FILTERS = [
    ['all', 'All', total],
    ['done', 'Completed', doneCount],
    ['upcoming', 'Upcoming', total - doneCount],
  ]

  return (
    <div ref={ref}>
      {/* ── Progress summary ── */}
      <div className="rounded-3xl border border-aether-border bg-aether-card/60 p-6 md:p-8 mb-8">
        <div className="flex items-end justify-between flex-wrap gap-3">
          <div className="text-aether-accent font-bold leading-none" style={{ fontSize: 'clamp(40px,8vw,56px)' }}>
            {shownPct}
            <span className="text-aether-muted text-2xl font-medium">%</span>
          </div>
          <div className="font-mono text-sm text-aether-muted">
            {doneCount} of {total} milestones complete
          </div>
        </div>
        <div className="h-3 rounded-full bg-aether-border/60 mt-5 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-aether-accent to-emerald-300 transition-[width] duration-[1400ms] ease-out"
            style={{ width: inView ? `${pct}%` : '0%' }}
          />
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 mt-5 text-[13px] text-aether-muted">
          <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-aether-accent" /> Completed</span>
          <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Upcoming</span>
          <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-orange-400" /> Today &amp; final COD</span>
        </div>
      </div>

      {/* ── Filters ── */}
      <div className="flex flex-wrap gap-2 mb-8">
        {FILTERS.map(([key, label, n]) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`font-mono text-xs tracking-wide px-4 py-2 rounded-full border transition-all duration-200 ${
              filter === key
                ? 'bg-aether-accent text-black border-aether-accent'
                : 'bg-transparent text-aether-muted border-aether-border hover:border-aether-accent/50 hover:text-white'
            }`}
          >
            {label}
            <span className="ml-2 opacity-60">{n}</span>
          </button>
        ))}
      </div>

      {/* ── Timeline ── */}
      <div className="relative pl-8">
        {/* rail: green up to progress, dim after */}
        <div
          className="absolute left-[7px] top-1 bottom-1 w-[2px]"
          style={{
            background: `linear-gradient(var(--aether-accent,#0af2ad) 0%, #0af2ad ${pct}%, #1a1a24 ${pct}%)`,
          }}
        />

        <div className="space-y-5">
          {milestones.map((m, i) => {
            if (m.today) {
              if (filter === 'done') return null
              return (
                <div key={`today-${i}`} className="relative pl-4">
                  <span className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-orange-400 border-[3px] border-[#020203] shadow-[0_0_0_4px_rgba(251,146,60,0.25)] animate-pulse" />
                  <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-orange-300 bg-orange-400/10 border border-dashed border-orange-400/40 px-3.5 py-1.5 rounded-full">
                    ● Today — 2 June 2026
                  </span>
                </div>
              )
            }
            if (filter === 'done' && !m.done) return null
            if (filter === 'upcoming' && m.done) return null

            const cat = CATS[m.cat]
            return (
              <div key={`${m.date}-${m.title}`} className="relative pl-4">
                {/* node */}
                {m.cod ? (
                  <span className="absolute -left-[33px] top-1 w-[18px] h-[18px] rounded-full bg-amber-400 border-2 border-amber-500 shadow-[0_0_0_5px_rgba(217,154,28,0.18)]" />
                ) : m.done ? (
                  <span className="absolute -left-[30px] top-1.5 w-3.5 h-3.5 rounded-full bg-aether-accent text-black flex items-center justify-center">
                    <Check />
                  </span>
                ) : (
                  <span className="absolute -left-[30px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#0c0c11] border-2 border-aether-border" />
                )}

                {/* card */}
                <div
                  className={`rounded-2xl border p-4 md:p-5 transition-all duration-300 hover:-translate-x-0 hover:translate-x-[3px] ${
                    m.cod
                      ? 'border-amber-400/40 bg-amber-400/[0.04]'
                      : m.done
                        ? 'border-aether-border bg-aether-card hover:border-aether-accent/40'
                        : 'border-aether-border bg-aether-card/40 hover:border-aether-accent/30'
                  }`}
                >
                  <div className={`font-mono text-xs mb-1 ${m.done || m.cod ? 'text-aether-accent' : 'text-aether-muted'}`}>
                    {m.date}
                  </div>
                  <h3 className="text-white text-lg font-medium tracking-tight">{m.title}</h3>
                  <div className="flex items-center flex-wrap gap-2 mt-3">
                    <span className={`font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md border ${cat.cls}`}>
                      {cat.name}
                    </span>
                    <span
                      className={`ml-auto font-mono text-[10px] uppercase tracking-wider ${
                        m.done ? 'text-aether-accent' : m.cod ? 'text-amber-300' : 'text-aether-muted'
                      }`}
                    >
                      {m.cod ? 'Target' : m.done ? 'Completed' : 'Upcoming'}
                    </span>
                  </div>
                  {m.note && (
                    <div className="mt-3 flex gap-2.5 rounded-lg border border-orange-400/25 bg-orange-400/[0.06] px-3 py-2.5 text-[13px] leading-relaxed text-orange-200/90">
                      <span aria-hidden>⚠</span>
                      <p>
                        <span className="font-semibold text-orange-300">Reason for delay:</span>{' '}
                        {m.note}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
