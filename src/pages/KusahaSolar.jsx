import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import SynergyBackground from '../components/SynergyBackground'
import Button from '../components/Button'
import SectionNav from '../components/SectionNav'

const NAV_SECTIONS = [
  { id: 'highlights', label: 'Highlights' },
  { id: 'overview', label: 'Overview' },
  { id: 'site', label: 'Site' },
  { id: 'status', label: 'Status' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'financials', label: 'Financials' },
  { id: 'captable', label: 'Cap Table' },
  { id: 'resource', label: 'Solar Resource' },
  { id: 'equipment', label: 'Equipment' },
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
    // If it's already on screen at mount, trigger immediately.
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
    // Interval-based tween (runs reliably even when rAF is throttled).
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
  { value: 39, suffix: '%', label: 'Equity IRR (Net Profit)' },
  { value: 3.8, decimals: 2, suffix: '×', label: 'Avg DSCR' },
  { value: 297, prefix: 'NPR ', suffix: ' Cr', label: 'Total Project Cost' },
  { value: 5.4, decimals: 1, prefix: 'NPR ', label: 'PPA Rate / kWh' },
  { value: 100, suffix: ' GWh', label: 'Annual Energy' },
  { value: 311, prefix: 'NPR ', suffix: ' Cr', label: 'NPV @ 15%' },
]

const specs = [
  ['Capacity', '50 MW AC / 60 MW DC'],
  ['Annual Irradiation', '5.25 kWh/m²/day'],
  ['Annual Generation', '~100 GWh'],
  ['PPA Rate', 'NPR 5.40 per kWh'],
  ['Evacuation', 'NEA Kushaha 132 kV (3 km)'],
  ['Module Tech', '720 Wp Bifacial, 1500 V'],
  ['Land', 'Non-agricultural'],
  ['Target COD', 'February 2027'],
]

const siteCharacteristics = [
  {
    title: 'Non-agricultural',
    desc: 'Sandy, sparse vegetation — no productive agricultural use, strongest ESG signal.',
  },
  {
    title: 'Flat topography',
    desc: 'Minimal grading required — direct cost savings on civil works.',
  },
  {
    title: 'Good access',
    desc: 'Existing road network and grid utility poles already on site.',
  },
  {
    title: 'Low population density',
    desc: 'Limited resettlement concerns — easier EIA and community engagement.',
  },
]

const status = [
  { n: 1, title: 'Power Purchase Agreement', detail: 'Signed with NEA', state: 'Done' },
  { n: 2, title: 'Feasibility Study', detail: 'Completed', state: 'Done' },
  { n: 3, title: 'EIA Study Approval (MoFE)', detail: 'Approval received · ToR & scoping submitted', state: 'Ongoing' },
  { n: 4, title: 'Generation Licence', detail: 'Application in process', state: 'Ongoing' },
  { n: 5, title: 'Term Sheet (Nabil Bank)', detail: 'Negotiated · 75% debt, 7% interest, 13 yr', state: 'Done' },
  { n: 6, title: 'EPC & Designer', detail: 'Sunshine Engineering (EPC), Dong Fang Electronics (Designer)', state: 'Done' },
  { n: 7, title: 'OEM Selection & Negotiation', detail: 'Modules, inverters, transformers locked in with deferred-payment', state: 'Done' },
]

const costBreakdown = [
  { label: 'Equipment (modules, MMS, inverters, transformers, BoS)', value: 235.8 },
  { label: 'Land, Civil, Fencing, Installation, ESG, Debugging', value: 38.0 },
  { label: 'Transportation (170 containers)', value: 12.0 },
  { label: 'LC charges, Bank Processing, IDC', value: 8.2 },
  { label: 'Pre-development & Land Acquisition', value: 8.0 },
  { label: '132 kV Transmission Line', value: 7.0 },
  { label: 'Customs', value: 2.0 },
]
const costTotal = 297

const capTable = [
  { name: 'Aether Renova Holdings', pct: 50, amount: 'NPR 37.54 Cr' },
  { name: 'Himalayan Everest Ins.', pct: 10, amount: 'NPR 7.13 Cr' },
  { name: 'Other Institutional', pct: 10, amount: 'NPR 7.13 Cr' },
  { name: 'Individual Investor', pct: 9, amount: 'NPR 6.76 Cr' },
  { name: 'Other Individuals', pct: 9, amount: 'NPR 7.51 Cr' },
  { name: 'Azure Creek Limited', pct: 6, amount: 'NPR 4.50 Cr' },
  { name: 'Employees (ESOP)', pct: 3, amount: 'NPR 2.25 Cr' },
  { name: 'Open', pct: 3, amount: 'NPR 2.25 Cr' },
]

const timeline = [
  { date: 'Mar 2026', title: 'Mobilisation', detail: 'Camp & fencing · NPR 6.60 Cr equity', icon: 'flag' },
  { date: 'Jul 2026', title: 'Foundations', detail: 'Pile foundations & structures · NPR 5.50 Cr', icon: 'build' },
  { date: 'Aug 2026', title: 'Modules & Inverters', detail: 'Equipment LC payments · NPR 4.40 Cr', icon: 'panel' },
  { date: 'Jan 2027', title: 'Pre-COD Settlements', detail: 'Final settlements · NPR 5.50 Cr', icon: 'check' },
  { date: 'Feb 2027', title: 'Commercial Operation', detail: 'COD — grid energization', icon: 'bolt', highlight: true },
  { date: 'Aug 2027', title: 'Phase 2 Payment', detail: 'OEM final payment · NPR 53.06 Cr', icon: 'cash' },
]

const equipment = {
  Modules: {
    name: 'Astronergy ASTRO N8',
    sub: '720 Wp Bifacial n-type TOPCon',
    specs: [
      'Tier-1 BloombergNEF certified',
      '23.7% module efficiency',
      '≤ 1% first-year degradation',
      '30-yr linear warranty (84.95%)',
    ],
  },
  Inverters: {
    name: 'Huawei SUN2000-330KTL-H1',
    sub: '330 kVA Smart String Inverter',
    specs: [
      '≥ 99.0% max efficiency',
      '8 MPPT trackers / unit',
      '1500 V DC input range',
      'Smart Self-Cleaning Fan, IP66',
    ],
  },
  Transformers: {
    name: 'TBEA 6 MVA Box Transformer',
    sub: '6 MVA × 10 units, 0.8/33 kV',
    specs: [
      'Tier-1 Chinese transformer OEM',
      'Vector group Dy11, > 99% efficient',
      'ONAN cooling, off-load tap ±5%',
      'Integrated MV switchgear',
    ],
  },
  'SCADA': {
    name: 'Dong Fang Electronics',
    sub: 'SCADA, switchgear & control (Shandong)',
    specs: [
      'Plant-wide SCADA & monitoring',
      '33 kV switchgear & protection',
      'Auxiliary transformers & MV cabling',
      'Earthing & lightning protection',
    ],
  },
  Transmission: {
    name: '132 kV ACSR Wolf',
    sub: '3 km single-circuit to Kushaha SS',
    specs: [
      'ACSR Wolf conductor',
      'Lattice steel towers',
      'Single circuit, 132 kV',
      'NEA grid-interconnect ready',
    ],
  },
}

const thesis = [
  { n: '01', title: 'Industry-Leading Project Cost', desc: 'NPR 5.94 Cr/MW — driven by experienced Chinese OEMs and EPC. Local competitors have called it disruptive.' },
  { n: '02', title: 'Deferred Payment Structure', desc: '90% of equipment paid one year after COD — funded by project cash flow, not investor equity. Equity peak under NPR 22 Cr.' },
  { n: '03', title: '39% Equity IRR & High EPS', desc: 'Low cost + deferred payment → exceptional returns, with first-year EPS of NPR 54.41 per share.' },
  { n: '04', title: 'Lean Governance', desc: 'Small board and shareholder count. Decisions made quickly, execution unencumbered by political shareholding.' },
  { n: '05', title: 'Experienced Team & EPC', desc: 'Track record across 85 MW Chameliya–Chettigad, 73 MW Middle Mewa, 10 MW Makarigad. CEO with 40 years incl. Three Gorges.' },
  { n: '06', title: 'ESG-Compliant Land', desc: 'Non-agricultural site — the strongest ESG signal, easing EIA, public sentiment and lender comfort.' },
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

const TimelineIcon = ({ type }) => {
  const paths = {
    flag: 'M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7',
    build: 'M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z',
    panel: 'M3 4h18v11H3zM7 4v11M12 4v11M17 4v11M3 9h18M9 19h6M12 15v4',
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
export default function KusahaSolar() {
  const [hlRef, hlIn] = useInView()
  const [resRef, resIn] = useInView()
  const [activeEquip, setActiveEquip] = useState('Modules')
  const [hoverSlice, setHoverSlice] = useState(null)

  // donut math for cap table
  let acc = 0
  const palette = ['#0AF2AD', '#16d39a', '#1fb588', '#2a9c79', '#41c9a4', '#63dcbb', '#8fe9d1', '#b9f3e3']

  return (
    <main className="relative bg-[#020203] font-sans">
      <SectionNav sections={NAV_SECTIONS} />

      {/* ── Hero ── */}
      <section className="relative pt-36 pb-20 overflow-hidden bg-[#020203]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1600&h=900&fit=crop"
            alt="Kusaha Solar"
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
              PPA Signed
            </span>
            <span className="rounded-full border border-aether-border bg-aether-card/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-aether-muted">
              COD Feb 2027
            </span>
          </div>

          <h1 className="text-white text-5xl md:text-7xl font-bold tracking-tight uppercase mb-4">
            Kusaha Solar
          </h1>
          <p className="text-aether-accent text-xl md:text-2xl font-bold mb-4">
            50 MW Solar Power Project
          </p>
          <p className="text-aether-muted text-lg max-w-2xl mx-auto mb-3">
            A 50 MW AC / 60 MW DC ground-mount PV plant in Koshi Gaonpalika,
            Sunsari District — developed by Solaeris Energy, an Aether Renova
            Holdings group company.
          </p>
          <p className="text-aether-muted/70 text-sm flex items-center justify-center gap-2">
            <svg className="w-4 h-4 text-aether-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
            Sunsari, Koshi Province, Nepal
          </p>
        </div>
      </section>

      {/* ── Investment highlights ── */}
      <section id="highlights" ref={hlRef} className="relative py-16 border-t border-aether-border/40 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <Eyebrow center>Investment Highlights</Eyebrow>
            <h2 className="text-white text-3xl md:text-4xl font-bold tracking-tight uppercase">
              Why Kusaha — At a Glance
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
            deferred-payment option with Chinese OEMs · 75 : 25 loan-to-equity.
          </p>
        </div>
      </section>

      {/* ── Overview specs ── */}
      <section id="overview" className="relative py-16 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Eyebrow>Project Overview</Eyebrow>
            <h2 className="text-white text-3xl md:text-4xl font-bold tracking-tight mb-5">
              Kusaha Solar Power Project
            </h2>
            <p className="text-aether-muted text-base leading-relaxed mb-8">
              A 50 MW AC / 60 MW DC ground-mount PV plant on non-agricultural
              land ~3 km from the NEA Kushaha 132 kV substation. The Power
              Purchase Agreement is signed and major OEMs are locked in.
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

      {/* ── Site characteristics ── */}
      <section id="site" className="relative py-16 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <Eyebrow center>Site Walkthrough</Eyebrow>
            <h2 className="text-white text-3xl md:text-4xl font-bold tracking-tight uppercase">
              Land Characteristics
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {siteCharacteristics.map((s) => (
              <div
                key={s.title}
                className="group bg-aether-card border border-aether-border rounded-2xl p-6 transition-all duration-500 hover:border-aether-accent/40 hover:-translate-y-1"
              >
                <div className="w-10 h-10 rounded-xl bg-aether-accent/10 border border-aether-accent/30 flex items-center justify-center text-aether-accent mb-4">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                </div>
                <h3 className="text-white font-bold mb-2">{s.title}</h3>
                <p className="text-aether-muted text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Present status (interactive checklist) ── */}
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
            Project is de-risked — PPA in hand, OEMs negotiated, bank term sheet
            ready, EPC selected.{' '}
            <span className="text-aether-accent font-semibold">
              Financial closure imminent.
            </span>
          </p>
        </div>
      </section>

      {/* ── Construction timeline ── */}
      <section id="timeline" className="relative py-20 bg-gradient-to-b from-[#020203] via-[#0a1510] to-[#020203] overflow-hidden scroll-mt-24">
        <SynergyBackground />
        <div className="absolute left-0 right-0 top-0 h-24 bg-gradient-to-b from-[#020203] to-transparent pointer-events-none z-[1]" />
        <div className="absolute left-0 right-0 bottom-0 h-24 bg-gradient-to-t from-[#020203] to-transparent pointer-events-none z-[1]" />
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <Eyebrow center>Project Timeline</Eyebrow>
            <h2 className="text-white text-3xl md:text-4xl font-bold tracking-tight uppercase">
              Construction Schedule
            </h2>
            <p className="text-aether-muted text-base mt-4">
              Commercial operation targeted for February 2027.
            </p>
          </div>

          <div className="relative">
            {/* vertical line */}
            <div className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-aether-accent/0 via-aether-accent/40 to-aether-accent/0 md:-translate-x-1/2" />
            <div className="space-y-8">
              {timeline.map((m, i) => (
                <div
                  key={m.date}
                  className={`relative flex items-center gap-6 md:gap-0 ${
                    i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* node */}
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
                  {/* card */}
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

      {/* ── Financials: interactive cost breakdown ── */}
      <section id="financials" className="relative py-16 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <Eyebrow>Financials</Eyebrow>
            <h2 className="text-white text-3xl md:text-4xl font-bold tracking-tight mb-2">
              Project Cost Breakdown
            </h2>
            <p className="text-aether-muted text-sm mb-8">
              Total project cost{' '}
              <span className="text-aether-accent font-bold">NPR {costTotal} Cr</span>{' '}
              · NPR 5.94 Cr per MW.
            </p>
            <div className="space-y-4">
              {costBreakdown.map((c) => {
                const pct = (c.value / costTotal) * 100
                return (
                  <div key={c.label} className="group">
                    <div className="flex justify-between items-baseline mb-1.5 gap-4">
                      <span className="text-white/80 text-sm">{c.label}</span>
                      <span className="text-aether-accent text-sm font-bold whitespace-nowrap">
                        NPR {c.value} Cr
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-aether-border overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-aether-accent/70 to-aether-accent transition-all duration-700"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* key parameters */}
          <div>
            <Eyebrow>Key Parameters</Eyebrow>
            <h2 className="text-white text-3xl md:text-4xl font-bold tracking-tight mb-8">
              Returns &amp; Coverage
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                ['NPR 54.37 Cr', 'Annual Revenue (Yr 1)'],
                ['15.58%', 'IRR (EBITDA)'],
                ['3.98 NPR', 'LCOE per kWh'],
                ['7.90×', 'Avg ISCR'],
                ['NPR 54.41', 'EPS Year 1'],
                ['10 yrs', 'Loan Payback'],
                ['NPR 222 Cr', 'Loan (Nabil, 7%, 13 yr)'],
                ['NPR 75 Cr', 'Equity (phased)'],
              ].map(([v, l]) => (
                <div key={l} className="rounded-2xl border border-aether-border bg-aether-card/40 p-5">
                  <div className="text-aether-accent text-xl font-bold mb-1">{v}</div>
                  <div className="text-aether-muted text-xs leading-snug">{l}</div>
                </div>
              ))}
            </div>
            <p className="text-aether-muted text-xs mt-6 leading-relaxed">
              DSCR stays above 1.86× in Year 13 even before sensitivity; holds
              1.58× under −15% revenue stress. Grounded in conservative
              Rajbiraj Airport irradiation data and 25-year financial modelling.
            </p>
          </div>
        </div>
      </section>

      {/* ── Cap table (interactive donut) ── */}
      <section id="captable" className="relative py-16 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <Eyebrow center>Cap Table</Eyebrow>
            <h2 className="text-white text-3xl md:text-4xl font-bold tracking-tight uppercase">
              Shareholding Structure
            </h2>
            <p className="text-aether-muted text-sm mt-3">
              Total equity NPR 75.07 Cr — Solaeris Energy Pvt. Ltd.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* donut */}
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
                    {hoverSlice === null ? 'NPR 75.07 Cr' : capTable[hoverSlice].amount}
                  </text>
                </g>
              </svg>
            </div>
            {/* legend */}
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
      <section id="resource" ref={resRef} className="relative py-16 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <Eyebrow center>Solar Resource</Eyebrow>
            <h2 className="text-white text-3xl md:text-4xl font-bold tracking-tight uppercase">
              Energy Yield
            </h2>
            <p className="text-aether-muted text-sm mt-3 max-w-2xl mx-auto">
              Designed against Rajbiraj Airport ground-station data — the closest
              validated source. PVsyst simulation: 100 GWh/yr at PR 85.7%.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { v: 5.25, d: 2, s: '', l: 'Avg Daily Irradiation (kWh/m²)' },
              { v: 100, d: 0, s: ' GWh', l: 'Annual Generation' },
              { v: 85.7, d: 1, s: '%', l: 'Performance Ratio' },
              { v: 1841, d: 0, s: '', l: 'Specific Yield (kWh/kWp)' },
            ].map((m) => (
              <div key={m.l} className="rounded-2xl border border-aether-border bg-aether-card/40 p-6 text-center">
                <div className="text-aether-accent text-3xl font-bold mb-2">
                  <Counter value={m.v} decimals={m.d} suffix={m.s} active={resIn} />
                </div>
                <div className="text-aether-muted text-xs uppercase tracking-wider leading-snug">{m.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Equipment tabs ── */}
      <section id="equipment" className="relative py-16 scroll-mt-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <Eyebrow center>Salient Features</Eyebrow>
            <h2 className="text-white text-3xl md:text-4xl font-bold tracking-tight uppercase">
              Tier-1 Equipment
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {Object.keys(equipment).map((k) => (
              <button
                key={k}
                onClick={() => setActiveEquip(k)}
                className={`px-5 py-2 rounded-full text-sm font-semibold uppercase tracking-wider border transition-all duration-300 ${
                  activeEquip === k
                    ? 'bg-aether-accent text-black border-aether-accent'
                    : 'bg-transparent text-aether-muted border-aether-border hover:border-aether-accent/50 hover:text-white'
                }`}
              >
                {k}
              </button>
            ))}
          </div>
          <div className="bg-aether-card border border-aether-border rounded-3xl p-8 lg:p-10">
            <h3 className="text-white text-2xl font-bold mb-1">
              {equipment[activeEquip].name}
            </h3>
            <p className="text-aether-accent text-sm font-medium mb-6">
              {equipment[activeEquip].sub}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {equipment[activeEquip].specs.map((spec) => (
                <div key={spec} className="flex items-start gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-aether-accent shrink-0" />
                  <span className="text-aether-muted text-sm leading-relaxed">{spec}</span>
                </div>
              ))}
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
              The Closing Case
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
      <section className="relative py-24 border-t border-aether-border/40">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-white text-3xl md:text-4xl font-bold tracking-tight mb-4">
            You could own this in the near future.
          </h2>
          <p className="text-aether-muted text-lg mb-8">
            Solaeris Energy Company Pvt. Ltd. · Kathmandu-4, Nepal · An Aether
            Renova Holdings group company.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/contact" variant="primary">
              Request the Deck
            </Button>
            <Button href="/companies#solaeris" variant="secondary" withArrow={false}>
              About Solaeris
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
