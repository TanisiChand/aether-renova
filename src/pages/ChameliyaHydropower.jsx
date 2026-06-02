import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import SynergyBackground from '../components/SynergyBackground'
import Button from '../components/Button'
import SectionNav from '../components/SectionNav'

const NAV_SECTIONS = [
  { id: 'highlights', label: 'Highlights' },
  { id: 'overview', label: 'Overview' },
  { id: 'status', label: 'Status' },
  { id: 'funding', label: 'Funding' },
  { id: 'financials', label: 'Financials' },
  { id: 'sensitivity', label: 'Sensitivity' },
  { id: 'captable', label: 'Cap Table' },
  { id: 'hydrology', label: 'Hydrology' },
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
  { value: 47, suffix: '%', label: 'Equity IRR (incl. dividend)' },
  { value: 19, suffix: '%', label: 'IRR (EBITDA)' },
  { value: 1325, prefix: 'NPR ', suffix: ' Cr', label: 'Total Project Cost' },
  { value: 1400, prefix: 'NPR ', suffix: ' Cr', label: 'NPV @ 15%' },
  { value: 566, suffix: ' GWh', label: 'Annual Energy' },
  { value: 2.5, decimals: 1, suffix: '×', label: 'Avg DSCR' },
]

const specs = [
  ['Capacity', '85 MW'],
  ['Type', 'Run-of-river'],
  ['Design Flow', '25.6 m³/sec'],
  ['Net Head', '415 m'],
  ['Tunnel Length', '6,216 m'],
  ['Transmission', '22 km · 132 kV'],
  ['Evacuation', 'Balanch (NP) · Jaljibi (IN)'],
  ['PPA Rate', 'NPR 8.40 dry / 4.80 wet'],
]

const status = [
  { n: 1, title: 'Licensing', detail: 'All necessary clearances obtained', state: 'Done' },
  { n: 2, title: 'Access Road', detail: 'Under construction — only 1 km remaining to headworks', state: 'Ongoing' },
  { n: 3, title: 'Power Purchase Agreement (PPA)', detail: 'In progress with NEA', state: 'Ongoing' },
  { n: 4, title: 'Land Acquisition', detail: 'In progress', state: 'Ongoing' },
  { n: 5, title: 'Detailed Project Report (DPR)', detail: 'In progress', state: 'Ongoing' },
]

const timeline = [
  { date: 'Preliminary', title: '15% Deployed', detail: 'Equity NPR 555M — preliminary works', icon: 'flag' },
  { date: 'Sep 2025 – Mar 2026', title: '20% Deployed', detail: 'Equity NPR 740M', icon: 'cash' },
  { date: 'Apr – Dec 2026', title: '20% Deployed', detail: 'Equity NPR 740M', icon: 'build' },
  { date: 'Jan – Dec 2027', title: '15% + First Debt', detail: 'Equity NPR 555M · Loan NPR 4,474M', icon: 'bolt' },
  { date: 'Jan – Dec 2028', title: '30% — Final Drawdown', detail: 'Equity NPR 1,110M · Loan NPR 5,468M', icon: 'check', highlight: true },
]

const returns = [
  ['NPR 350–400 Cr', 'Annual Revenue'],
  ['47%', 'Equity IRR'],
  ['19%', 'IRR (EBITDA)'],
  ['NPR 1,400 Cr', 'NPV @ 15%'],
  ['NPR 17.1 Cr', 'Cost per MW (incl. IDC)'],
  ['NPR 29 Cr', 'Annual O&M & Royalty'],
  ['NPR 11.6 Arba', 'Loan · 8.5% · 10 yr'],
  ['NPR 370 Cr', 'Equity (25%)'],
]

const sensitivity = [
  { label: 'Base Case', value: '16.69%' },
  { label: '5% cash-flow reduction', value: '15.90%' },
  { label: '10% cash-flow reduction', value: '15.10%' },
  { label: '15% cash-flow reduction', value: '14.29%' },
]

const capTable = [
  { name: 'Aether Renova', pct: 51, amount: 'NPR 188.7 Cr' },
  { name: 'Sunshine Engineering & Construction', pct: 15, amount: 'NPR 55.5 Cr' },
  { name: 'Public', pct: 15, amount: 'NPR 55.5 Cr' },
  { name: '2nd Group', pct: 6, amount: 'NPR 22.2 Cr' },
  { name: '1st Group', pct: 5, amount: 'NPR 18.5 Cr' },
  { name: 'Early Bird', pct: 5, amount: 'NPR 18.5 Cr' },
  { name: 'ESOP', pct: 3, amount: 'NPR 11.1 Cr' },
]

const advantages = [
  { n: '01', title: 'Low Construction Cost', desc: 'Among the lowest cost-per-MW in the sector, ensuring efficient capital use.' },
  { n: '02', title: 'Exceptional Hydrology', desc: 'Chameliya Basin — among the highest water discharge in Nepal, with strong year-round flow.' },
  { n: '03', title: 'High Energy Yield', desc: 'Over 6.7 GWh/MW — well above the national average — from a high-head design.' },
  { n: '04', title: 'High Revenue Potential', desc: 'Secured one of the highest-value energy contracts with the NEA.' },
  { n: '05', title: 'Strong Local Support', desc: 'Excellent cooperation from local communities and stakeholders.' },
  { n: '06', title: 'Efficient Governance', desc: 'Small board and limited investors allow agile decision-making. Offsets ~509,765 tCO₂e/yr.' },
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
    {state === 'Done' ? 'Done' : 'In Progress'}
  </span>
)

const TimelineIcon = ({ type }) => {
  const paths = {
    flag: 'M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7',
    build: 'M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z',
    check: 'M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4 12 14.01l-3-3',
    bolt: 'M13 2 3 14h9l-1 8 10-12h-9l1-8z',
    cash: 'M2 7h20v10H2zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6M6 7v10M18 7v10',
  }
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d={paths[type] || paths.check} />
    </svg>
  )
}

/* ───────────────── page ───────────────── */
export default function ChameliyaHydropower() {
  const [hlRef, hlIn] = useInView()
  const [hydRef, hydIn] = useInView()
  const [hoverSlice, setHoverSlice] = useState(null)

  let acc = 0
  const palette = ['#0AF2AD', '#16d39a', '#1fb588', '#2a9c79', '#41c9a4', '#63dcbb', '#8fe9d1']

  return (
    <main className="relative bg-[#020203] font-sans">
      <SectionNav sections={NAV_SECTIONS} />

      {/* ── Hero ── */}
      <section className="relative pt-36 pb-20 overflow-hidden bg-[#020203]">
        <div className="absolute inset-0">
          <img
            src="/projects/chameliya-chettigad.jpg"
            alt="Chameliya–Chettigad Hydropower"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020203] via-[#020203]/80 to-[#020203]/60" />
        </div>
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse_at_center,_rgba(0,240,152,0.12)_0%,_transparent_65%)]" />
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
              Licensed
            </span>
            <span className="rounded-full border border-aether-border bg-aether-card/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-aether-muted">
              Run-of-River
            </span>
          </div>

          <h1 className="text-white text-5xl md:text-7xl font-bold tracking-tight uppercase mb-4">
            Chameliya–Chettigad
          </h1>
          <p className="text-aether-accent text-xl md:text-2xl font-bold mb-4">
            85 MW Hydroelectricity Project
          </p>
          <p className="text-aether-muted text-lg max-w-2xl mx-auto mb-3">
            A run-of-river scheme on the Chameliya &amp; Chumchum Gad rivers in the
            Mahakali Basin — developed by Grid Nepal Company, an Aether Renova
            Holdings group company.
          </p>
          <p className="text-aether-muted/70 text-sm flex items-center justify-center gap-2">
            <svg className="w-4 h-4 text-aether-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
            Kaphaldhar &amp; Chauki Bagar, Darchula · Mahakali Basin, Nepal
          </p>
        </div>
      </section>

      {/* ── Investment highlights ── */}
      <section id="highlights" ref={hlRef} className="relative py-16 border-t border-aether-border/40 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <Eyebrow center>Investment Highlights</Eyebrow>
            <h2 className="text-white text-3xl md:text-4xl font-bold tracking-tight uppercase">
              Why Chameliya — At a Glance
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {highlights.map((h) => (
              <div
                key={h.label}
                className="group rounded-2xl border border-aether-border bg-aether-card/40 p-6 text-center transition-all duration-500 hover:border-aether-accent/40 hover:bg-aether-card/70 hover:-translate-y-1"
              >
                <div className="text-aether-accent text-3xl md:text-4xl font-bold tracking-tight mb-2">
                  <Counter {...h} active={hlIn} />
                </div>
                <div className="text-aether-muted text-xs uppercase tracking-wider leading-snug">
                  {h.label}
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-aether-muted text-sm mt-8 max-w-2xl mx-auto">
            <span className="text-aether-accent font-semibold">Structural advantage:</span>{' '}
            equity-first funding · 75 : 25 debt-to-equity · ~4-year build, only ~2 yrs post-loan.
          </p>
        </div>
      </section>

      {/* ── Overview specs ── */}
      <section id="overview" className="relative py-16 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Eyebrow>Technical Profile</Eyebrow>
            <h2 className="text-white text-3xl md:text-4xl font-bold tracking-tight mb-5">
              Project Attributes
            </h2>
            <p className="text-aether-muted text-base leading-relaxed mb-8">
              A high-head run-of-river design on the Mahakali system, evacuating
              566 GWh per year via a 22 km, 132 kV line to the Balanch (Nepal) and
              Jaljibi (India) substations.
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
              src="/projects/chameliya-chettigad.jpg"
              alt="Chameliya river corridor"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020203]/60 to-transparent" />
          </div>
        </div>
      </section>

      {/* ── Present status ── */}
      <section id="status" className="relative py-16 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <Eyebrow center>Present Status</Eyebrow>
            <h2 className="text-white text-3xl md:text-4xl font-bold tracking-tight uppercase">
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
            Licensing complete and access road nearly finished —{' '}
            <span className="text-aether-accent font-semibold">moving through PPA, land and DPR toward financial close.</span>
          </p>
        </div>
      </section>

      {/* ── Funding timeline ── */}
      <section id="funding" className="relative py-20 bg-gradient-to-b from-[#020203] via-[#0a1510] to-[#020203] overflow-hidden scroll-mt-24">
        <SynergyBackground />
        <div className="absolute left-0 right-0 top-0 h-24 bg-gradient-to-b from-[#020203] to-transparent pointer-events-none z-[1]" />
        <div className="absolute left-0 right-0 bottom-0 h-24 bg-gradient-to-t from-[#020203] to-transparent pointer-events-none z-[1]" />
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <Eyebrow center>Funding Plan</Eyebrow>
            <h2 className="text-white text-3xl md:text-4xl font-bold tracking-tight uppercase">
              Equity-First Drawdown
            </h2>
            <p className="text-aether-muted text-base mt-4 max-w-2xl mx-auto">
              ~4-year build. 70% of equity is deployed before any debt is drawn,
              minimizing interest during construction.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-aether-accent/0 via-aether-accent/40 to-aether-accent/0 md:-translate-x-1/2" />
            <div className="space-y-8">
              {timeline.map((m, i) => (
                <div
                  key={m.date}
                  className={`relative flex items-center gap-6 md:gap-0 ${
                    i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 z-10">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                        m.highlight
                          ? 'bg-aether-accent text-black border-aether-accent shadow-[0_0_25px_rgba(0,240,152,0.6)]'
                          : 'bg-[#0c0c11] text-aether-accent border-aether-accent/40'
                      }`}
                    >
                      <TimelineIcon type={m.icon} />
                    </div>
                  </div>
                  <div className={`ml-16 md:ml-0 md:w-[calc(50%-3rem)] ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <div
                      className={`group bg-aether-card border rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 ${
                        m.highlight
                          ? 'border-aether-accent/50 shadow-[0_0_30px_rgba(0,240,152,0.12)]'
                          : 'border-aether-border hover:border-aether-accent/40'
                      }`}
                    >
                      <p className="text-aether-accent text-xs font-bold uppercase tracking-wider mb-1">
                        {m.date}
                      </p>
                      <h3 className="text-white text-lg font-bold mb-1">{m.title}</h3>
                      <p className="text-aether-muted text-sm">{m.detail}</p>
                    </div>
                  </div>
                  <div className="hidden md:block md:w-[calc(50%-3rem)]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Financials ── */}
      <section id="financials" className="relative py-16 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <Eyebrow>Financials</Eyebrow>
            <h2 className="text-white text-3xl md:text-4xl font-bold tracking-tight mb-2">
              Capital Structure
            </h2>
            <p className="text-aether-muted text-sm mb-8">
              Total project cost{' '}
              <span className="text-aether-accent font-bold">NPR 1,325 Cr</span>{' '}
              + IDC NPR 122 Cr ={' '}
              <span className="text-aether-accent font-bold">NPR 1,448 Cr</span> total.
            </p>

            <div className="rounded-2xl border border-aether-border bg-aether-card/40 p-6 mb-6">
              <div className="flex h-5 rounded-full overflow-hidden mb-4">
                <div className="bg-aether-accent h-full" style={{ width: '75%' }} title="Debt" />
                <div className="bg-aether-accent/30 h-full" style={{ width: '25%' }} title="Equity" />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-white">
                  <span className="w-3 h-3 rounded-sm bg-aether-accent" />
                  Debt · 75%
                </span>
                <span className="flex items-center gap-2 text-white">
                  <span className="w-3 h-3 rounded-sm bg-aether-accent/30" />
                  Equity · NPR 370 Cr
                </span>
              </div>
            </div>
            <p className="text-aether-muted text-xs leading-relaxed">
              Loan NPR 11.6 Arba at 8.5% over 10 years. PPA at NPR 8.40 (dry) /
              4.80 (wet) per unit with 3% annual escalation for 9 years. Planned
              15% IPO.
            </p>
          </div>

          <div>
            <Eyebrow>Key Parameters</Eyebrow>
            <h2 className="text-white text-3xl md:text-4xl font-bold tracking-tight mb-8">
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
            <p className="text-aether-muted text-xs mt-6 leading-relaxed">
              Average ISCR 8.1× · Average DSCR 2.5× — comfortably above lender
              thresholds across the loan tenor.
            </p>
          </div>
        </div>
      </section>

      {/* ── Sensitivity ── */}
      <section id="sensitivity" className="relative py-16 scroll-mt-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <Eyebrow center>Risk · Sensitivity</Eyebrow>
            <h2 className="text-white text-3xl md:text-4xl font-bold tracking-tight uppercase">
              Resilient Returns
            </h2>
            <p className="text-aether-muted text-base mt-4">
              IRR stays above 14% even under a 15% cash-flow shock.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {sensitivity.map((s, i) => (
              <div
                key={s.label}
                className={`rounded-2xl border p-6 text-center transition-all duration-500 hover:-translate-y-1 ${
                  i === 0
                    ? 'border-aether-accent/50 bg-aether-accent/5'
                    : 'border-aether-border bg-aether-card/40 hover:border-aether-accent/40'
                }`}
              >
                <div className="text-aether-accent text-3xl font-bold mb-2">{s.value}</div>
                <div className="text-aether-muted text-xs uppercase tracking-wider leading-snug">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cap table ── */}
      <section id="captable" className="relative py-16 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <Eyebrow center>Cap Table</Eyebrow>
            <h2 className="text-white text-3xl md:text-4xl font-bold tracking-tight uppercase">
              Shareholding Structure
            </h2>
            <p className="text-aether-muted text-sm mt-3">
              Grid Nepal Company Pvt. Ltd. · Total equity NPR 370 Cr
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
                    {hoverSlice === null ? 'NPR 370 Cr' : capTable[hoverSlice].amount}
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

      {/* ── Hydrology & generation ── */}
      <section id="hydrology" ref={hydRef} className="relative py-16 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <Eyebrow center>Hydrology &amp; Generation</Eyebrow>
            <h2 className="text-white text-3xl md:text-4xl font-bold tracking-tight uppercase">
              Year-Round Energy Yield
            </h2>
            <p className="text-aether-muted text-sm mt-3 max-w-2xl mx-auto">
              The Chameliya Basin offers among the highest, most consistent water
              discharge in Nepal — driving 566 GWh of annual generation.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { v: 25.6, d: 1, s: ' m³/s', l: 'Design Flow' },
              { v: 415, d: 0, s: ' m', l: 'Net Head' },
              { v: 566, d: 0, s: ' GWh', l: 'Annual Generation' },
              { v: 6.7, d: 1, s: ' GWh/MW', l: 'Specific Yield' },
            ].map((m) => (
              <div key={m.l} className="rounded-2xl border border-aether-border bg-aether-card/40 p-6 text-center">
                <div className="text-aether-accent text-3xl font-bold mb-2">
                  <Counter value={m.v} decimals={m.d} suffix={m.s} active={hydIn} />
                </div>
                <div className="text-aether-muted text-xs uppercase tracking-wider leading-snug">{m.l}</div>
              </div>
            ))}
          </div>

          {/* wet / dry split */}
          <div className="rounded-2xl border border-aether-border bg-aether-card/40 p-6 max-w-3xl mx-auto">
            <p className="text-aether-muted text-xs uppercase tracking-wider mb-3">
              Seasonal generation split
            </p>
            <div className="flex h-6 rounded-full overflow-hidden mb-4">
              <div className="bg-aether-accent h-full flex items-center justify-center text-black text-[11px] font-bold" style={{ width: '62.7%' }}>
                62.7%
              </div>
              <div className="bg-aether-accent/30 h-full flex items-center justify-center text-white text-[11px] font-bold" style={{ width: '37.3%' }}>
                37.3%
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-white">
                <span className="w-3 h-3 rounded-sm bg-aether-accent" />
                Wet season · 355.34M kWh
              </span>
              <span className="flex items-center gap-2 text-white">
                <span className="w-3 h-3 rounded-sm bg-aether-accent/30" />
                Dry season · 211.07M kWh
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Investment thesis ── */}
      <section id="thesis" className="relative py-16 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <Eyebrow center>Investment Thesis</Eyebrow>
            <h2 className="text-white text-3xl md:text-4xl font-bold tracking-tight uppercase">
              Why Chameliya–Chettigad?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advantages.map((t) => (
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
      <section className="relative py-24 border-t border-aether-border/40">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-white text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Be part of the Mahakali’s clean-energy future.
          </h2>
          <p className="text-aether-muted text-lg mb-8">
            Grid Nepal Company Pvt. Ltd. · Darchula / Kathmandu, Nepal · An Aether
            Renova Holdings group company.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/contact" variant="primary">
              Request the Deck
            </Button>
            <Button href="/companies#grid-nepal" variant="secondary" withArrow={false}>
              About Grid Nepal
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
