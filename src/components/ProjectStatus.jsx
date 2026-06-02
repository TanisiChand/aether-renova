import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { projects, portfolio, PROJECT_STAGES } from '../data/projects'

/* ---------------------------------------------------------------------------
   Project Status — dynamic, interactive overview of the live project portfolio.
   - Auto-rotating selector (pauses on hover, stops once you click).
   - Animated lifecycle stage tracker (Planning → Operational).
   - Count-up portfolio stats + an animated completion bar.
   Driven entirely by the shared `projects` data, so it stays in sync site-wide.
--------------------------------------------------------------------------- */

const ROTATE_MS = 5000

// Phase → colour for dots / tracker. Operational reads as accent green.
const PHASE_COLOR = {
  Planning: '#64748b',
  Permitting: '#38bdf8',
  Construction: '#f5a524',
  Commissioning: '#22d3ee',
  Operational: '#0af2ad',
}

/* Flip a flag true once the element scrolls into view. Polls getBoundingClientRect
   on an interval rather than relying on scroll events / IntersectionObserver,
   both of which are unreliable inside the preview sandbox. */
function useInView() {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const check = () => {
      const r = el.getBoundingClientRect()
      return r.top < window.innerHeight * 0.85 && r.bottom > 0
    }
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

/* Count up to `target` with an eased setInterval tween (rAF stalls in
   background tabs), kicked off once `run` is true. */
function useCountUp(target, run, duration = 1300) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!run) return
    const steps = 45
    let i = 0
    const id = setInterval(() => {
      i += 1
      const t = Math.min(i / steps, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setVal(target * eased)
      if (t >= 1) clearInterval(id)
    }, duration / steps)
    return () => clearInterval(id)
  }, [target, run, duration])
  return val
}

function Stat({ value, suffix, label, run }) {
  const n = useCountUp(value, run)
  return (
    <div className="bg-aether-card border border-aether-border rounded-2xl px-4 py-4 text-center transition-colors duration-300 hover:border-aether-accent/40">
      <div className="text-aether-accent text-2xl md:text-3xl font-bold font-mono leading-none whitespace-nowrap">
        {Math.round(n).toLocaleString()}
        {suffix && <span className="text-lg align-top ml-0.5">{suffix}</span>}
      </div>
      <div className="text-aether-muted text-[10px] uppercase tracking-[0.16em] mt-1.5">
        {label}
      </div>
    </div>
  )
}

/* Horizontal lifecycle tracker for the selected project. */
function StageTracker({ phase }) {
  const current = Math.max(0, PROJECT_STAGES.indexOf(phase))
  const fill = (current / (PROJECT_STAGES.length - 1)) * 100
  return (
    <div className="relative">
      {/* base + filled connector line */}
      <div className="absolute left-0 right-0 top-[7px] h-[2px] bg-aether-border" />
      <div
        className="absolute left-0 top-[7px] h-[2px] bg-aether-accent transition-all duration-700 ease-out"
        style={{ width: `${fill}%` }}
      />
      <div className="relative flex justify-between">
        {PROJECT_STAGES.map((s, i) => {
          const done = i < current
          const isCurrent = i === current
          return (
            <div key={s} className="flex flex-col items-center gap-2 min-w-0">
              <span
                className={`w-4 h-4 rounded-full border-2 transition-all duration-500 ${
                  isCurrent
                    ? 'border-aether-accent bg-aether-accent shadow-[0_0_12px_rgba(0,240,152,0.7)] animate-pulse'
                    : done
                      ? 'border-aether-accent bg-aether-accent'
                      : 'border-aether-border bg-[#0c0c11]'
                }`}
              />
              {/* full labels only where there's room; hidden on mobile */}
              <span
                className={`hidden md:block text-[10px] uppercase tracking-wider text-center transition-colors duration-500 ${
                  isCurrent
                    ? 'text-aether-accent font-semibold'
                    : done
                      ? 'text-white/70'
                      : 'text-aether-muted/50'
                }`}
              >
                {s}
              </span>
            </div>
          )
        })}
      </div>
      {/* mobile: single current-stage label (full row would overlap) */}
      <p className="md:hidden text-center text-aether-accent text-[11px] font-semibold uppercase tracking-wider mt-3">
        {PROJECT_STAGES[current]}
      </p>
    </div>
  )
}

export default function ProjectStatus() {
  const [sectionRef, inView] = useInView()
  const [active, setActive] = useState(0)
  const [auto, setAuto] = useState(true)
  const [hover, setHover] = useState(false)
  const detailRef = useRef(null)

  // Auto-rotate through projects while idle + in view.
  useEffect(() => {
    if (!auto || hover || !inView) return
    const id = setInterval(
      () => setActive((a) => (a + 1) % projects.length),
      ROTATE_MS,
    )
    return () => clearInterval(id)
  }, [auto, hover, inView])

  const select = (i) => {
    setActive(i)
    setAuto(false) // user took over — stop rotating
    // On mobile the detail card sits below the list — bring it into view so the
    // tapped project's stages are actually visible.
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setTimeout(() => {
        detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 60)
    }
  }

  const p = projects[active]
  const accent = PHASE_COLOR[p.phase] || '#0af2ad'

  const metrics = [
    { label: 'Capacity', value: p.capacity },
    { label: 'Annual Output', value: p.output },
    { label: 'Homes Powered', value: p.households },
    { label: 'CO₂ Avoided', value: p.co2 },
  ]

  return (
    <section
      ref={sectionRef}
      id="project-status"
      className="relative py-24 md:py-32 bg-transparent font-sans z-10 overflow-hidden"
    >
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,240,152,0.12)_0%,_transparent_70%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* header */}
        <div className="mb-10 max-w-3xl">
          <p className="text-aether-accent uppercase tracking-[0.25em] text-sm font-semibold mb-3 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-aether-accent" />
            Project Status
          </p>
          <h2 className="text-white text-3xl md:text-4xl font-medium tracking-tight leading-tight">
            The Portfolio, <span className="text-aether-accent">Live</span>
          </h2>
          <p className="text-aether-muted text-base leading-relaxed mt-3">
            From permitting to full operation — track every Aether Renova project
            as it moves through its lifecycle.
          </p>
        </div>

        {/* portfolio stat strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          <Stat value={portfolio.totalMW} suffix="MW" label="Total Capacity" run={inView} />
          <Stat value={portfolio.count} label="Active Projects" run={inView} />
          <Stat value={portfolio.operational} label="Operational" run={inView} />
          <Stat value={portfolio.inDevelopment} label="In Development" run={inView} />
        </div>

        {/* interactive selector + detail */}
        <div
          className="grid grid-cols-1 lg:grid-cols-[minmax(0,360px)_1fr] gap-6"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {/* selector list */}
          <div className="flex flex-col gap-3">
            {projects.map((proj, i) => {
              const on = i === active
              const c = PHASE_COLOR[proj.phase] || '#0af2ad'
              return (
                <button
                  key={proj.id}
                  onClick={() => select(i)}
                  className={`group relative text-left rounded-2xl border p-4 transition-all duration-300 overflow-hidden ${
                    on
                      ? 'border-aether-accent/60 bg-[#0c0c11]'
                      : 'border-aether-border bg-aether-card hover:border-aether-accent/30 hover:bg-[#0c0c11]'
                  }`}
                >
                  {/* active rotation progress sweep */}
                  {on && auto && (
                    <span
                      key={active}
                      className="absolute bottom-0 left-0 h-[2px] bg-aether-accent/70"
                      style={{ animation: `statusSweep ${ROTATE_MS}ms linear forwards` }}
                    />
                  )}
                  <div className="flex items-center gap-3">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{
                        background: c,
                        boxShadow: `0 0 8px ${c}`,
                        animation:
                          proj.status === 'Operational'
                            ? 'pulse 2s infinite'
                            : 'none',
                      }}
                    />
                    <div className="min-w-0 flex-1">
                      <p
                        className={`text-sm font-bold truncate transition-colors ${
                          on ? 'text-aether-accent' : 'text-white group-hover:text-aether-accent'
                        }`}
                      >
                        {proj.name}
                      </p>
                      <p className="text-aether-muted text-[11px] uppercase tracking-wider truncate">
                        {proj.capacity} · {proj.company}
                      </p>
                    </div>
                    <span
                      className="text-[10px] uppercase tracking-wider font-semibold shrink-0"
                      style={{ color: c }}
                    >
                      {proj.phase}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>

          {/* detail panel */}
          <div ref={detailRef} className="relative rounded-3xl border border-aether-border bg-aether-card overflow-hidden scroll-mt-24">
            {/* image header */}
            <div className="relative h-32 md:h-40 overflow-hidden">
              <img
                key={p.id}
                src={p.image}
                alt={p.name}
                className="w-full h-full object-cover"
                style={{ animation: 'statusFade 500ms ease' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-aether-card via-aether-card/40 to-transparent" />
              <div className="absolute top-4 right-4">
                <span
                  className="flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold backdrop-blur-md border"
                  style={{
                    color: accent,
                    borderColor: `${accent}55`,
                    background: `${accent}1a`,
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: accent, animation: 'pulse 2s infinite' }}
                  />
                  {p.status}
                </span>
              </div>
              <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between gap-4">
                <div>
                  <h3 className="text-white text-2xl font-bold leading-tight">
                    {p.name}
                  </h3>
                  <p className="text-aether-muted text-sm flex items-center gap-1.5 mt-1">
                    <svg className="w-3.5 h-3.5 text-aether-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                    {p.location}
                  </p>
                </div>
                <img
                  src={p.companyLogo}
                  alt={p.company}
                  className="w-10 h-10 object-contain shrink-0 opacity-90"
                  draggable="false"
                />
              </div>
            </div>

            {/* body */}
            <div className="p-5 md:p-6 space-y-5">
              {/* completion bar */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-aether-muted text-xs uppercase tracking-wider">
                    Overall Progress
                  </span>
                  <span className="text-aether-accent text-sm font-bold font-mono">
                    {p.progress}%
                  </span>
                </div>
                <div className="h-2 rounded-full bg-aether-border overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-aether-accent/70 to-aether-accent transition-all duration-700 ease-out"
                    style={{ width: inView ? `${p.progress}%` : '0%' }}
                  />
                </div>
                <p className="text-aether-muted text-xs mt-2">{p.target}</p>
              </div>

              {/* stage tracker */}
              <StageTracker phase={p.phase} />

              {/* metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {metrics.map((m) => (
                  <div
                    key={m.label}
                    className="rounded-xl border border-aether-border bg-[#020203]/40 px-3 py-3"
                  >
                    <p className="text-white text-sm font-bold leading-tight">
                      {m.value}
                    </p>
                    <p className="text-aether-muted text-[10px] uppercase tracking-wider mt-1">
                      {m.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="pt-1">
                {p.detailUrl ? (
                  <Link
                    to={p.detailUrl}
                    className="group inline-flex items-center justify-center gap-2 rounded-full font-sans font-bold uppercase tracking-wider transition-all duration-300 px-8 py-3.5 text-sm bg-aether-accent text-black hover:shadow-[0_0_30px_rgba(0,240,152,0.4)] hover:-translate-y-0.5"
                  >
                    View Project Details
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </Link>
                ) : (
                  <Link
                    to="/projects"
                    className="group inline-flex items-center justify-center gap-2 rounded-full font-sans font-bold uppercase tracking-wider transition-all duration-300 px-8 py-3.5 text-sm bg-transparent border border-aether-border text-white hover:border-aether-accent hover:bg-aether-accent/10 hover:text-aether-accent"
                  >
                    Explore All Projects
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
