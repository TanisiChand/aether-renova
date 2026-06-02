import { useEffect, useRef, useState } from 'react'

/* ---------------------------------------------------------------------------
   Detailed, digestible project-milestone timeline (used on the Dhalkebar page).
   Completed milestones collapse behind a single toggle by default so the page
   leads with what's next; a progress summary keeps the full picture in view.

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
    const steps = 40
    let i = 0
    const id = setInterval(() => {
      i += 1
      const t = Math.min(i / steps, 1)
      setV(Math.round(target * (1 - Math.pow(1 - t, 3))))
      if (t >= 1) clearInterval(id)
    }, duration / steps)
    return () => clearInterval(id)
  }, [target, run, duration])
  return v
}

const Check = () => (
  <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
)

/* One milestone row (node + compact card). */
function Row({ m }) {
  const cat = CATS[m.cat]
  return (
    <div className="relative pl-4">
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

      <div
        className={`rounded-xl border px-4 py-3 transition-all duration-300 hover:translate-x-[3px] ${
          m.cod
            ? 'border-amber-400/40 bg-amber-400/[0.04]'
            : m.done
              ? 'border-aether-border bg-aether-card/70 hover:border-aether-accent/40'
              : 'border-aether-border bg-aether-card/40 hover:border-aether-accent/30'
        }`}
      >
        <div className="flex items-baseline justify-between gap-3 flex-wrap">
          <span className={`font-mono text-[11px] ${m.done || m.cod ? 'text-aether-accent' : 'text-aether-muted'}`}>
            {m.date}
          </span>
          <span className={`font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded border ${cat.cls}`}>
            {cat.name}
          </span>
        </div>
        <h3 className="text-white text-[15px] font-medium tracking-tight mt-1.5">{m.title}</h3>
        {m.note && (
          <div className="mt-2.5 flex gap-2 rounded-lg border border-orange-400/25 bg-orange-400/[0.06] px-3 py-2 text-[12.5px] leading-relaxed text-orange-200/90">
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
}

export default function MilestoneTimeline({ milestones }) {
  const [showDone, setShowDone] = useState(false)
  const [ref, inView] = useInView()

  const real = milestones.filter((m) => !m.today)
  const total = real.length
  const doneCount = real.filter((m) => m.done).length
  const pct = Math.round((doneCount / total) * 100)
  const shownPct = useCountUp(pct, inView)

  const doneItems = milestones.filter((m) => m.done)
  // everything from the "today" marker onward (today + all upcoming)
  const rest = milestones.filter((m) => m.today || !m.done)

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
          <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-aether-border border border-aether-muted/40" /> Upcoming</span>
          <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Today &amp; final COD</span>
        </div>
      </div>

      {/* ── Timeline ── */}
      <div className="relative pl-8">
        {/* rail */}
        <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-aether-border" />

        {/* Completed — collapsed behind a single toggle to keep things digestible */}
        <div className="relative pl-4 mb-3">
          <span className="absolute -left-[30px] top-1.5 w-3.5 h-3.5 rounded-full bg-aether-accent text-black flex items-center justify-center">
            <Check />
          </span>
          <button
            onClick={() => setShowDone((s) => !s)}
            className="w-full flex items-center justify-between gap-3 rounded-xl border border-aether-border bg-aether-card/70 px-4 py-3 text-left transition-colors hover:border-aether-accent/40"
          >
            <span className="text-white text-[15px] font-medium">
              {doneCount} completed milestones
              <span className="text-aether-muted font-mono text-[11px] ml-2">
                Nov 2024 – {doneItems[doneItems.length - 1]?.date}
              </span>
            </span>
            <span className="flex items-center gap-2 text-aether-accent font-mono text-[11px] uppercase tracking-wider shrink-0">
              {showDone ? 'Hide' : 'Show'}
              <svg className={`w-4 h-4 transition-transform duration-300 ${showDone ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
            </span>
          </button>

          <div
            className="grid transition-all duration-500 ease-out"
            style={{ gridTemplateRows: showDone ? '1fr' : '0fr' }}
          >
            <div className="overflow-hidden">
              <div className="space-y-3 pt-3">
                {doneItems.map((m) => (
                  <Row key={`${m.date}-${m.title}`} m={m} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Today + upcoming — always expanded (the forward-looking roadmap) */}
        <div className="space-y-3">
          {rest.map((m, i) => {
            if (m.today) {
              return (
                <div key={`today-${i}`} className="relative pl-4 py-1">
                  <span className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-amber-400 border-[3px] border-[#020203] shadow-[0_0_0_4px_rgba(251,191,36,0.25)] animate-pulse" />
                  <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-amber-300 bg-amber-400/10 border border-dashed border-amber-400/40 px-3.5 py-1.5 rounded-full">
                    ● Today — 2 June 2026
                  </span>
                </div>
              )
            }
            return <Row key={`${m.date}-${m.title}`} m={m} />
          })}
        </div>
      </div>
    </div>
  )
}
