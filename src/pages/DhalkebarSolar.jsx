import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import SynergyBackground from '../components/SynergyBackground'
import Button from '../components/Button'
import SectionNav from '../components/SectionNav'
import MilestoneTimeline from '../components/MilestoneTimeline'
import StatBand from '../components/StatBand'

const NAV_SECTIONS = [
  { id: 'highlights', label: 'Highlights' },
  { id: 'overview', label: 'Overview' },
  { id: 'status', label: 'Status' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'financials', label: 'Financials' },
  { id: 'sensitivity', label: 'Sensitivity' },
  { id: 'captable', label: 'Cap Table' },
  { id: 'resource', label: 'Solar Resource' },
  { id: 'epc', label: 'EPC' },
  { id: 'thesis', label: 'Thesis' },
]

/* ───────────────── helpers ───────────────── */
const Eyebrow = ({ children, center }) => (
  <p
    className={`text-aether-accent uppercase tracking-[0.25em] text-sm font-semibold mb-5 flex items-center gap-4 ${
      center ? 'justify-center' : ''
    }`}
  >
    <span className="w-12 h-[1px] bg-aether-accent/60" />
    {children}
    {center && <span className="w-12 h-[1px] bg-aether-accent/60" />}
  </p>
)

function useInView() {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    if (r.top < window.innerHeight && r.bottom > 0) {
      setInView(true)
      return
    }
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true)
          obs.disconnect()
        }
      },
      { threshold: 0, rootMargin: '0px 0px -10% 0px' },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return [ref, inView]
}

function Counter({ value, decimals = 0, prefix = '', suffix = '', active }) {
  const [d, setD] = useState(0)
  useEffect(() => {
    if (!active) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setD(value)
      return
    }
    const duration = 1400
    const steps = 40
    let i = 0
    const id = setInterval(() => {
      i += 1
      const t = Math.min(i / steps, 1)
      setD(value * (1 - Math.pow(1 - t, 3)))
      if (t >= 1) clearInterval(id)
    }, duration / steps)
    return () => clearInterval(id)
  }, [active, value])
  const shown = Object.is(d, -0) ? 0 : d
  return (
    <span>
      {prefix}
      {shown.toFixed(decimals)}
      {suffix}
    </span>
  )
}

/* ───────────────── data (from the pitch deck) ───────────────── */
const highlights = [
  { value: 24, suffix: '%', label: 'Equity IRR (Net Profit)' },
  { value: 4.0, decimals: 1, suffix: '×', label: 'Avg DSCR' },
  { value: 112, prefix: 'NPR ', suffix: ' Cr', label: 'Total Project Cost' },
  { value: 5.4, decimals: 1, prefix: 'NPR ', label: 'PPA Rate / unit' },
  { value: 40.25, decimals: 2, suffix: ' GWh', label: 'Annual Energy' },
  { value: 1.38, decimals: 2, prefix: 'NPR ', suffix: ' B', label: 'NPV @ 15%' },
]

const specs = [
  ['Capacity', '24 MW DC / 20 MW AC'],
  ['Solar Irradiation', '5.28 kWh/m²/day'],
  ['Annual Generation', '40.25 GWh'],
  ['PPA Rate', 'NPR 5.40 per unit'],
  ['Evacuation', 'Dhalkebar SS · 5 km line'],
  ['Module Type', '720 Wp Bifacial · 1500 V'],
  ['Land', '35 Bigha · 120 owners'],
  ['Target COD', 'November 2026'],
]

const status = [
  { n: 1, title: 'NEA Solar Allocation', detail: 'Two allocations (20 MW + 50 MW) won among 120 bidders', state: 'Done' },
  { n: 2, title: 'Land Acquisition', detail: '35 Bigha secured from 120 individual landowners', state: 'Done' },
  { n: 3, title: 'Fixed PPA with NEA', detail: 'NPR 5.40 per unit — predictable long-term revenue', state: 'Done' },
  { n: 4, title: 'EPC Partner', detail: 'Sunshine Engineering appointed', state: 'Done' },
  { n: 5, title: 'Debt Structure', detail: '75% loan · NPR 88 Cr · 7.5% · 13 yr', state: 'Done' },
  { n: 6, title: 'Financial Close', detail: 'Targeted July 2026 — construction-ready', state: 'Ongoing' },
]

// Milestone-by-milestone development & construction timeline.
// done = milestone reached on or before the 2 June 2026 marker.
const milestones = [
  { date: '29 Nov 2024', title: 'Tender Winning LOI', cat: 'lic', done: true },
  { date: '9 Feb 2025', title: 'Survey License', cat: 'lic', done: true },
  { date: '27 Feb 2025', title: 'Feasibility Study Completed', cat: 'lic', done: true },
  { date: '13 Oct 2025', title: 'Power Purchase Agreement (PPA)', cat: 'lic', done: true },
  { date: '17 Oct 2025', title: 'Major OEM Contracts Signed', cat: 'proc', done: true },
  { date: '25 Nov 2025', title: 'Transmission Line License', cat: 'lic', done: true },
  { date: '1 Feb 2026', title: 'Construction Camp Completed', cat: 'cons', done: true },
  { date: '14 Feb 2026', title: 'Land Acquisition Completed', cat: 'land', done: true },
  { date: '22 Feb 2026', title: 'MMS Structures Delivered to Birgunj', cat: 'proc', done: true },
  { date: '28 Feb 2026', title: 'Inverter Delivery', cat: 'proc', done: true },
  {
    date: '15 Apr 2026',
    title: 'IEE Completed',
    cat: 'lic',
    done: true,
    note: 'Requirement changed from EIA to IEE. All work was halted after the TOR approval and scoping stage for the EIA, then resumed under the IEE process.',
  },
  { date: '1 May 2026', title: 'Panels Delivery', cat: 'proc', done: true },
  { today: true },
  { date: '15 Jun 2026', title: 'DPR Study', cat: 'lic' },
  { date: '15 Jun 2026', title: 'Transmission Line Feasibility Study', cat: 'lic' },
  { date: '15 Jun 2026', title: 'Land Levelling & Boundary Work Completed', cat: 'land' },
  { date: '18 Jun 2026', title: 'Generation License Issued', cat: 'lic' },
  { date: '1 Aug 2026', title: '25 MVA Transformer Delivery', cat: 'proc' },
  { date: '1 Sep 2026', title: 'Control Room & Permanent Camps', cat: 'cons' },
  { date: '1 Sep 2026', title: 'SCADA & Box Transformer Panels Delivery', cat: 'proc' },
  { date: '5 Sep 2026', title: 'Piling Completion', cat: 'cons' },
  { date: '20 Sep 2026', title: 'Panel Installation', cat: 'cons' },
  { date: '15 Oct 2026', title: 'Inverter & Transformer Installation', cat: 'cons' },
  { date: '20 Oct 2026', title: 'SCADA & Debugging', cat: 'cons' },
  { date: '1 Nov 2026', title: 'Commercial Operation Date (COD)', cat: 'cons', cod: true },
]

const returns = [
  ['NPR 21.7 Cr', 'Annual Revenue (Yr 1)'],
  ['24%', 'Equity IRR'],
  ['15%', 'EBITDA IRR'],
  ['NPR 1.38 B', 'NPV @ 15%'],
  ['4.0×', 'Avg DSCR'],
  ['4.6×', 'Avg ISCR'],
  ['NPR 88 Cr', 'Loan · 7.5% · 13 yr'],
  ['NPR 34.3 Cr', 'Equity (30%)'],
]

const sensitivity = [
  { label: 'Solar = low risk', desc: 'No fuel cost and a fixed PPA make revenue highly predictable.' },
  { label: 'Downside tested', desc: 'Four scenarios modelled against the base case.' },
  { label: '21.2% floor IRR', desc: 'Even a 15% cash-flow reduction keeps equity IRR above 21%.' },
]

const capTable = [
  { name: 'Aether Renova Holdings (Promoter)', pct: 50, amount: 'NPR 17.15 Cr' },
  { name: 'Investors', pct: 36, amount: 'NPR 12.35 Cr' },
  { name: 'Sunshine Engineering (EPC equity)', pct: 12, amount: 'NPR 4.12 Cr' },
  { name: 'Employees (ESOP)', pct: 2, amount: 'NPR 0.69 Cr' },
]

const resourceSources = [
  { name: 'NASA SSE', desc: 'Global satellite dataset' },
  { name: 'PV GIS', desc: 'EU photovoltaic database' },
  { name: 'Meteonorm', desc: 'Industry-standard model' },
  { name: 'DHM Janakpur', desc: 'Local ground station — 10 km' },
]

const thesis = [
  { n: '01', title: 'Low Project Cost', desc: 'EPC contractors’ deep knowledge of the Chinese market keeps capex lean — NPR 5.64 Cr/MW.' },
  { n: '02', title: 'Deferred Equipment Payments', desc: 'Payments scheduled ~six months after construction, easing cash flow and reducing peak equity.' },
  { n: '03', title: 'High Earnings Per Share', desc: 'Capital-efficient structure delivers higher EPS than most of the 87 NEPSE-listed energy companies.' },
  { n: '04', title: 'Fast Construction', desc: 'Complete and operational in just 10 months — financial close to COD.' },
  { n: '05', title: 'Lean Governance', desc: 'A small board and limited investor base enable agile decision-making.' },
  { n: '06', title: 'Risk Mitigation', desc: 'Insurance plus a fixed long-term PPA underpin predictable revenue. ~20,125 tCO₂e offset / yr.' },
]

/* ───────────────── small UI pieces ───────────────── */
const StatusPill = ({ state }) => (
  <span
    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ${
      state === 'Done'
        ? 'bg-aether-accent/20 border-aether-accent/30 text-aether-accent'
        : 'bg-amber-400/15 border-amber-400/30 text-amber-300'
    }`}
  >
    <span className="w-1.5 h-1.5 rounded-full bg-current" />
    {state === 'Done' ? 'Done' : 'Ongoing'}
  </span>
)

/* ───────────────── page ───────────────── */
export default function DhalkebarSolar() {
  const [hlRef, hlIn] = useInView()
  const [resRef, resIn] = useInView()
  const [hoverSlice, setHoverSlice] = useState(null)

  let acc = 0
  const palette = ['#0AF2AD', '#16d39a', '#2a9c79', '#63dcbb']

  return (
    <main className="relative bg-[#020203] font-sans">
      <SectionNav sections={NAV_SECTIONS} />

      {/* ── Hero ── */}
      <section className="relative pt-36 pb-20 overflow-hidden bg-[#020203]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?q=80&w=1600&h=900&fit=crop"
            alt="Dhalkebar Solar"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020203] via-[#020203]/80 to-[#020203]/60" />
        </div>
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse_at_center,_rgba(0,240,152,0.12)_0%,_transparent_65%)]" />
        </div>

        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-aether-muted hover:text-aether-accent text-sm font-medium mb-8 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 18l-6-6 6-6" /></svg>
            All Projects
          </Link>

          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-aether-accent/30 bg-aether-accent/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-aether-accent">
              <span className="w-1.5 h-1.5 rounded-full bg-aether-accent animate-pulse" />
              Construction-Ready
            </span>
            <span className="rounded-full border border-aether-border bg-aether-card/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-aether-muted">
              COD Nov 2026
            </span>
          </div>

          <h1 className="text-white text-5xl md:text-7xl font-medium tracking-tight mb-4">
            Dhalkebar Solar
          </h1>
          <p className="text-aether-accent text-xl md:text-2xl font-bold mb-4">
            20 MW Solar Power Project
          </p>
          <p className="text-aether-muted text-lg max-w-2xl mx-auto mb-3">
            A 24 MW DC / 20 MW AC ground-mount PV plant at Bardibas, Mahottari —
            developed by Terra Sol Energy, an Aether Renova Holdings group company.
          </p>
          <p className="text-aether-muted/70 text-sm flex items-center justify-center gap-2">
            <svg className="w-4 h-4 text-aether-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
            Bardibas Ward 6, Mahottari · Madhesh Pradesh, Nepal
          </p>
        </div>
      </section>

      {/* ── Investment highlights ── */}
      <section id="highlights" ref={hlRef} className="relative py-20 md:py-28 border-t border-aether-border/40 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <Eyebrow center>Investment Highlights</Eyebrow>
            <h2 className="text-white text-3xl md:text-4xl font-medium tracking-tight">
              Why Dhalkebar — At a Glance
            </h2>
          </div>
          <StatBand stats={highlights} />
          <p className="text-center text-aether-muted text-sm mt-8 max-w-2xl mx-auto">
            <span className="text-aether-accent font-semibold">Structural advantage:</span>{' '}
            deferred equipment payments · 70 : 30 loan-to-equity · 10-month build.
          </p>
        </div>
      </section>

      {/* ── Overview specs ── */}
      <section id="overview" className="relative py-20 md:py-28 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Eyebrow>Project Snapshot</Eyebrow>
            <h2 className="text-white text-3xl md:text-4xl font-medium tracking-tight mb-5">
              Dhalkebar Solar Power Project
            </h2>
            <p className="text-aether-muted text-base leading-relaxed mb-8">
              Terra Sol secured two NEA solar allocations — 20 MW and 50 MW —
              emerging as a standout among 120 bidders. The 20 MW plant evacuates
              via a dedicated 5 km line into the Dhalkebar substation.
            </p>
            <div className="grid grid-cols-2 gap-px bg-aether-border rounded-2xl overflow-hidden border border-aether-border">
              {specs.map(([k, v]) => (
                <div key={k} className="bg-aether-card p-5">
                  <p className="text-aether-muted text-[11px] uppercase tracking-wider mb-1">
                    {k}
                  </p>
                  <p className="text-white text-sm font-semibold leading-tight">
                    {v}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative rounded-3xl overflow-hidden border border-aether-border aspect-[4/3]">
            <img
              src="https://images.unsplash.com/photo-1545209463-e2825498edbf?q=80&w=1000&h=750&fit=crop"
              alt="Solar plant"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020203]/60 to-transparent" />
          </div>
        </div>
      </section>

      {/* ── Present status ── */}
      <section id="status" className="relative py-20 md:py-28 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <Eyebrow center>Present Status</Eyebrow>
            <h2 className="text-white text-3xl md:text-4xl font-medium tracking-tight">
              Where We Stand Today
            </h2>
          </div>
          <div className="space-y-3">
            {status.map((s) => (
              <div
                key={s.n}
                className="group flex items-center gap-4 bg-aether-card border border-aether-border rounded-2xl p-5 transition-all duration-300 hover:border-aether-accent/40 hover:bg-[#0c0c11]"
              >
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                    s.state === 'Done'
                      ? 'bg-aether-accent text-black'
                      : 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                  }`}
                >
                  {s.state === 'Done' ? (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                  ) : (
                    s.n
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold leading-tight">{s.title}</h3>
                  <p className="text-aether-muted text-sm">{s.detail}</p>
                </div>
                <StatusPill state={s.state} />
              </div>
            ))}
          </div>
          <p className="text-center text-aether-muted text-sm mt-8 max-w-2xl mx-auto">
            Allocations secured, land in hand, EPC appointed and debt structured —{' '}
            <span className="text-aether-accent font-semibold">construction-ready for a 10-month build.</span>
          </p>
        </div>
      </section>

      {/* ── Construction timeline ── */}
      <section id="timeline" className="relative py-20 md:py-28 bg-gradient-to-b from-[#020203] via-[#0a1510] to-[#020203] overflow-hidden scroll-mt-24">
        <SynergyBackground />
        <div className="absolute left-0 right-0 top-0 h-24 bg-gradient-to-b from-[#020203] to-transparent pointer-events-none z-[1]" />
        <div className="absolute left-0 right-0 bottom-0 h-24 bg-gradient-to-t from-[#020203] to-transparent pointer-events-none z-[1]" />
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <Eyebrow center>Project Timeline</Eyebrow>
            <h2 className="text-white text-3xl md:text-4xl font-medium tracking-tight">
              Development &amp; Construction Timeline
            </h2>
            <p className="text-aether-muted text-base mt-4">
              Milestone-by-milestone progress from tender award through the
              Commercial Operation Date (COD).
            </p>
          </div>

          <MilestoneTimeline milestones={milestones} />
        </div>
      </section>

      {/* ── Financials ── */}
      <section id="financials" className="relative py-20 md:py-28 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <Eyebrow>Financials</Eyebrow>
            <h2 className="text-white text-3xl md:text-4xl font-medium tracking-tight mb-2">
              Capital Structure
            </h2>
            <p className="text-aether-muted text-sm mb-8">
              Total project cost{' '}
              <span className="text-aether-accent font-bold">NPR 112 Cr</span>{' '}
              · NPR 5.64 Cr per MW · 70 : 30 loan-to-equity.
            </p>

            <div className="rounded-2xl border border-aether-border bg-aether-card/40 p-6 mb-6">
              <div className="flex h-5 rounded-full overflow-hidden mb-4">
                <div className="bg-aether-accent h-full" style={{ width: '75%' }} title="Debt" />
                <div className="bg-aether-accent/30 h-full" style={{ width: '25%' }} title="Equity" />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-white">
                  <span className="w-3 h-3 rounded-sm bg-aether-accent" />
                  Debt · NPR 88 Cr
                </span>
                <span className="flex items-center gap-2 text-white">
                  <span className="w-3 h-3 rounded-sm bg-aether-accent/30" />
                  Equity · NPR 34.3 Cr
                </span>
              </div>
            </div>
            <p className="text-aether-muted text-xs leading-relaxed">
              Loan NPR 88 Cr at ~7.5% over 13 years. Deferred equipment payments
              (scheduled six months post-construction) keep peak equity low and
              ease cash flow through the build.
            </p>
          </div>

          <div>
            <Eyebrow>Key Parameters</Eyebrow>
            <h2 className="text-white text-3xl md:text-4xl font-medium tracking-tight mb-8">
              Returns &amp; Coverage
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {returns.map(([v, l]) => (
                <div key={l} className="rounded-2xl border border-aether-border bg-aether-card/40 p-5">
                  <div className="text-aether-accent text-xl font-bold mb-1">{v}</div>
                  <div className="text-aether-muted text-xs leading-snug">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Sensitivity ── */}
      <section id="sensitivity" className="relative py-20 md:py-28 scroll-mt-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <Eyebrow center>Sensitivity Analysis</Eyebrow>
            <h2 className="text-white text-3xl md:text-4xl font-medium tracking-tight">
              Returns Hold Under Stress
            </h2>
            <p className="text-aether-muted text-base mt-4">
              Equity IRR holds up even under cash-flow stress.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sensitivity.map((s) => (
              <div
                key={s.label}
                className="bg-aether-card border border-aether-border rounded-2xl p-7 text-center transition-all duration-500 hover:border-aether-accent/40 hover:-translate-y-1"
              >
                <p className="text-aether-accent text-2xl font-bold mb-3">{s.label}</p>
                <p className="text-aether-muted text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cap table ── */}
      <section id="captable" className="relative py-20 md:py-28 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <Eyebrow center>Cap Table</Eyebrow>
            <h2 className="text-white text-3xl md:text-4xl font-medium tracking-tight">
              Shareholding Structure
            </h2>
            <p className="text-aether-muted text-sm mt-3">
              Terra Sol Energy SPV — Dhalkebar 20 MW Solar · Total equity NPR 34.3 Cr
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
              <svg viewBox="0 0 220 220" className="w-64 h-64 -rotate-90">
                {capTable.map((s, i) => {
                  const r = 80
                  const circ = 2 * Math.PI * r
                  const len = (s.pct / 100) * circ
                  const dash = `${len} ${circ - len}`
                  const offset = -(acc / 100) * circ
                  acc += s.pct
                  const on = hoverSlice === i
                  return (
                    <circle
                      key={s.name}
                      cx="110"
                      cy="110"
                      r={r}
                      fill="none"
                      stroke={palette[i]}
                      strokeWidth={on ? 30 : 22}
                      strokeDasharray={dash}
                      strokeDashoffset={offset}
                      className="transition-all duration-200 cursor-pointer"
                      style={{ opacity: hoverSlice === null || on ? 1 : 0.35 }}
                      onMouseEnter={() => setHoverSlice(i)}
                      onMouseLeave={() => setHoverSlice(null)}
                    />
                  )
                })}
                <g className="rotate-90" style={{ transformOrigin: '110px 110px' }}>
                  <text x="110" y="104" textAnchor="middle" fill="#fff" fontSize="22" fontWeight="700" fontFamily="Inter">
                    {hoverSlice === null ? '100%' : capTable[hoverSlice].pct + '%'}
                  </text>
                  <text x="110" y="124" textAnchor="middle" fill="#8ba1b5" fontSize="9" fontFamily="Inter">
                    {hoverSlice === null ? 'NPR 34.3 Cr' : capTable[hoverSlice].amount}
                  </text>
                </g>
              </svg>
            </div>
            <div className="space-y-2">
              {capTable.map((s, i) => (
                <div
                  key={s.name}
                  className={`flex items-center justify-between gap-4 rounded-xl px-4 py-3 border transition-all duration-200 cursor-pointer ${
                    hoverSlice === i
                      ? 'border-aether-accent/40 bg-aether-card'
                      : 'border-transparent hover:bg-aether-card/50'
                  }`}
                  onMouseEnter={() => setHoverSlice(i)}
                  onMouseLeave={() => setHoverSlice(null)}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-3 h-3 rounded-sm shrink-0" style={{ background: palette[i] }} />
                    <span className="text-white/85 text-sm truncate">{s.name}</span>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <span className="text-aether-muted text-xs">{s.amount}</span>
                    <span className="text-white font-bold text-sm w-10 text-right">{s.pct}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Solar resource ── */}
      <section id="resource" ref={resRef} className="relative py-20 md:py-28 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <Eyebrow center>Solar Resource</Eyebrow>
            <h2 className="text-white text-3xl md:text-4xl font-medium tracking-tight">
              Validated Solar Yield
            </h2>
            <p className="text-aether-muted text-sm mt-3 max-w-2xl mx-auto">
              Irradiation cross-checked across four independent datasets, including
              the DHM Janakpur ground station 10 km from site.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { v: 5.28, d: 2, s: '', l: 'Avg Irradiation (kWh/m²/day)' },
              { v: 40.25, d: 2, s: ' GWh', l: 'Annual Generation' },
              { v: 24, d: 0, s: ' MW', l: 'Installed Capacity (DC)' },
              { v: 4, d: 0, s: '', l: 'Independent Datasets' },
            ].map((m) => (
              <div key={m.l} className="rounded-2xl border border-aether-border bg-aether-card/40 p-6 text-center">
                <div className="text-aether-accent text-3xl font-bold mb-2">
                  <Counter value={m.v} decimals={m.d} suffix={m.s} active={resIn} />
                </div>
                <div className="text-aether-muted text-xs uppercase tracking-wider leading-snug">{m.l}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {resourceSources.map((d) => (
              <div key={d.name} className="bg-aether-card border border-aether-border rounded-2xl p-5">
                <p className="text-white font-bold text-sm mb-1">{d.name}</p>
                <p className="text-aether-muted text-xs leading-snug">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EPC partner ── */}
      <section id="epc" className="relative py-20 md:py-28 scroll-mt-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <Eyebrow center>EPC Partner</Eyebrow>
            <h2 className="text-white text-3xl md:text-4xl font-medium tracking-tight">
              Sunshine Engineering
            </h2>
          </div>
          <div className="bg-aether-card border border-aether-border rounded-3xl p-8 lg:p-10 space-y-6">
            <p className="text-aether-muted leading-relaxed">
              Founded just three years ago, Sunshine Engineering has rapidly built
              a strong reputation in Nepal’s hydropower sector — currently leading
              headworks and the peaking facility for the 73 MW Middle Mewa
              Hydropower Project, while executing major civil works for the 10 MW
              Sewa Khola and 85 MW Chameliya–Chettigad projects.
            </p>
            <div className="border-t border-aether-border/50 pt-6">
              <p className="text-aether-accent text-sm font-semibold uppercase tracking-wider mb-2">
                CEO — Mr. Jia Gua Long
              </p>
              <p className="text-aether-muted leading-relaxed">
                40+ years in renewable energy, including work on the landmark
                Three Gorges Project — leading a skilled team with deep
                engineering and construction expertise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Investment thesis ── */}
      <section id="thesis" className="relative py-20 md:py-28 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <Eyebrow center>Investment Thesis</Eyebrow>
            <h2 className="text-white text-3xl md:text-4xl font-medium tracking-tight">
              Why Dhalkebar Solar?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {thesis.map((t) => (
              <div
                key={t.n}
                className="group relative bg-aether-card border border-aether-border rounded-2xl p-7 transition-all duration-500 hover:border-aether-accent/40 hover:-translate-y-1"
              >
                <div className="text-aether-accent/30 text-4xl font-bold mb-3 group-hover:text-aether-accent/60 transition-colors">
                  {t.n}
                </div>
                <h3 className="text-white text-lg font-bold mb-2">{t.title}</h3>
                <p className="text-aether-muted text-sm leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-20 md:py-28 border-t border-aether-border/40">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-white text-3xl md:text-4xl font-medium tracking-tight mb-4">
            This is your moment — own it in the next 11 months.
          </h2>
          <p className="text-aether-muted text-lg mb-8">
            Terra Sol Energy Company — Dhalkebar Solar Project SPV · Kathmandu,
            Nepal · An Aether Renova Holdings group company.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/contact" variant="primary">
              Request the Deck
            </Button>
            <Button href="/companies#terra-sol" variant="secondary" withArrow={false}>
              About Terra Sol
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
