import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import SynergyBackground from '../components/SynergyBackground'
import Button from '../components/Button'
import { projects, portfolio } from '../data/projects'

const IR_EMAIL = 'investors@aetherrenova.com'
const DECK_MAILTO = `mailto:${IR_EMAIL}?subject=${encodeURIComponent(
  'Investor Deck Request — Aether Renova Holdings',
)}`

/* ---------- shared helpers ---------- */
const Eyebrow = ({ children, center }) => (
  <p
    className={`text-aether-accent uppercase tracking-[0.25em] text-sm font-semibold mb-6 flex items-center gap-4 ${
      center ? 'justify-center' : ''
    }`}
  >
    <span className="w-12 h-[1px] bg-aether-accent/60" />
    {children}
    {center && <span className="w-12 h-[1px] bg-aether-accent/60" />}
  </p>
)

// Polls getBoundingClientRect (scroll/IO unreliable in preview sandbox).
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

// Eased count-up via setInterval (rAF stalls in background tabs).
function useCountUp(target, run, duration = 1300) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!run) return
    const steps = 45
    let i = 0
    const id = setInterval(() => {
      i += 1
      const t = Math.min(i / steps, 1)
      setVal(target * (1 - Math.pow(1 - t, 3)))
      if (t >= 1) clearInterval(id)
    }, duration / steps)
    return () => clearInterval(id)
  }, [target, run, duration])
  return val
}

const fmt = (n) => Math.round(n).toLocaleString()

/* ---------- data ---------- */
const metrics = [
  { value: 500, suffix: ' MW', label: 'Generation pipeline target' },
  { value: 190, suffix: ' MW', label: 'Capacity in active development' },
  { value: 5, suffix: '', label: 'Specialized operating companies' },
  { value: 100, suffix: '%', label: 'Community-majority platform' },
]

const thesis = [
  {
    title: 'Surging, structural demand',
    stat: '~12% annual demand growth',
    body: 'Nepal’s electricity demand is climbing double digits a year as the economy electrifies and costly cross-border power imports become unsustainable. Domestic clean generation captures durable, policy-backed offtake.',
  },
  {
    title: 'A diversified, all-weather portfolio',
    stat: 'Hydro + solar balance',
    body: 'Hydropower and solar are seasonally complementary — hydro peaks through the monsoon, solar through the dry season. The blend smooths generation profiles and de-risks revenue across the year.',
  },
  {
    title: 'A fully integrated value chain',
    stat: '5 companies, one platform',
    body: 'Five specialized subsidiaries span development, civil/EPC, transmission, and microgrids. We capture margin and control quality end-to-end instead of outsourcing the value — and the risk.',
  },
  {
    title: 'Community-anchored & ESG-ready',
    stat: '100% community-majority',
    body: 'A community-majority ownership model and a built-in CSR engine lower social and permitting risk while delivering a genuine, auditable ESG narrative that institutional capital increasingly requires.',
  },
  {
    title: 'Proven, in-country execution',
    stat: '500 MW pipeline behind us',
    body: 'We carry projects from permitting through commissioning with an experienced engineering team. Kusaha Solar is already operational and exporting — with a 500 MW pipeline lined up behind it.',
  },
]

const trajectory = {
  capacity: {
    unit: 'MW',
    label: 'Cumulative installed capacity',
    data: [
      { year: '2023', v: 50 },
      { year: '2024', v: 70 },
      { year: '2025', v: 105 },
      { year: '2026', v: 160 },
      { year: '2027', v: 230 },
      { year: '2028', v: 330 },
      { year: '2029', v: 420 },
      { year: '2030', v: 500 },
    ],
  },
  output: {
    unit: 'GWh / yr',
    label: 'Annual clean-energy output',
    data: [
      { year: '2023', v: 82 },
      { year: '2024', v: 120 },
      { year: '2025', v: 210 },
      { year: '2026', v: 340 },
      { year: '2027', v: 560 },
      { year: '2028', v: 880 },
      { year: '2029', v: 1180 },
      { year: '2030', v: 1450 },
    ],
  },
}

const steps = [
  { n: '01', title: 'Connect with IR', desc: 'Reach out and tell us your mandate, ticket size, and timeline.' },
  { n: '02', title: 'Access the data room', desc: 'Financial models, technical due-diligence packs, and permits.' },
  { n: '03', title: 'Diligence & site visits', desc: 'Meet the engineering team and walk the live projects.' },
  { n: '04', title: 'Commit & co-build', desc: 'Structure your investment and grow the platform with us.' },
]

/* ---------- metric counter ---------- */
function Metric({ value, suffix, label, run }) {
  const n = useCountUp(value, run)
  return (
    <div className="rounded-2xl border border-aether-border bg-aether-card/50 px-5 py-6 text-center transition-colors duration-300 hover:border-aether-accent/40">
      <div className="text-aether-accent text-3xl md:text-4xl font-bold tracking-tight leading-none">
        {fmt(n)}
        {suffix && <span className="text-xl">{suffix}</span>}
      </div>
      <div className="text-aether-muted text-xs leading-snug mt-3">{label}</div>
    </div>
  )
}

/* ---------- growth chart ---------- */
function GrowthChart() {
  const [ref, inView] = useInView()
  const [mode, setMode] = useState('capacity')
  const [hover, setHover] = useState(null)
  const set = trajectory[mode]
  const max = Math.max(...set.data.map((d) => d.v))
  const activeIdx = hover ?? set.data.length - 1
  const active = set.data[activeIdx]

  return (
    <div ref={ref} className="rounded-3xl border border-aether-border bg-aether-card/50 p-6 md:p-8">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <p className="text-aether-muted text-xs uppercase tracking-wider mb-1">
            {set.label}
          </p>
          <p className="text-white text-2xl font-bold">
            <span className="text-aether-accent">{fmt(active.v)}</span>{' '}
            <span className="text-base font-medium text-aether-muted">
              {set.unit}
            </span>{' '}
            <span className="text-aether-muted text-base font-medium">
              · {active.year}
            </span>
          </p>
        </div>
        <div className="flex gap-2 rounded-full border border-aether-border p-1">
          {[
            ['capacity', 'Capacity'],
            ['output', 'Output'],
          ].map(([k, lbl]) => (
            <button
              key={k}
              onClick={() => setMode(k)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                mode === k
                  ? 'bg-aether-accent text-black'
                  : 'text-aether-muted hover:text-white'
              }`}
            >
              {lbl}
            </button>
          ))}
        </div>
      </div>

      {/* bars */}
      <div className="flex items-end justify-between gap-2 md:gap-3 h-56">
        {set.data.map((d, i) => {
          const on = i === activeIdx
          const pct = (d.v / max) * 100
          return (
            <button
              key={d.year}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              className="group relative flex-1 h-full flex flex-col justify-end items-center"
            >
              <span
                className={`mb-2 text-[10px] md:text-xs font-mono font-bold transition-opacity duration-300 ${
                  on ? 'text-aether-accent opacity-100' : 'text-aether-muted opacity-0 group-hover:opacity-100'
                }`}
              >
                {fmt(d.v)}
              </span>
              <span
                className={`w-full rounded-t-md transition-all duration-700 ease-out ${
                  on
                    ? 'bg-gradient-to-t from-aether-accent/60 to-aether-accent shadow-[0_0_18px_rgba(0,240,152,0.4)]'
                    : 'bg-gradient-to-t from-aether-accent/10 to-aether-accent/40 group-hover:to-aether-accent/70'
                }`}
                style={{
                  height: inView ? `${pct}%` : '0%',
                  transitionDelay: `${i * 60}ms`,
                }}
              />
              <span
                className={`mt-3 text-[10px] md:text-xs uppercase tracking-wider transition-colors ${
                  on ? 'text-white font-semibold' : 'text-aether-muted'
                }`}
              >
                {d.year}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

/* ---------- impact calculator ---------- */
const PER_MW_USD_M = 0.9 // blended ~USD 0.9M / MW (illustrative)
function ImpactCalculator() {
  const [amount, setAmount] = useState(10) // USD millions
  const mw = amount / PER_MW_USD_M
  const homes = mw * 850
  const co2 = mw * 750
  const jobs = mw * 4

  const out = [
    { label: 'Capacity enabled', value: `${mw.toFixed(1)} MW` },
    { label: 'Homes powered', value: `${fmt(homes)}+` },
    { label: 'CO₂ avoided', value: `${fmt(co2)} t / yr` },
    { label: 'Jobs supported', value: `${fmt(jobs)}` },
  ]

  return (
    <div className="rounded-3xl border border-aether-border bg-aether-card/50 p-6 md:p-8">
      <div className="flex items-baseline justify-between mb-2">
        <span className="text-aether-muted text-xs uppercase tracking-wider">
          Investment
        </span>
        <span className="text-aether-accent text-3xl font-bold font-mono">
          ${amount}
          <span className="text-lg">M</span>
        </span>
      </div>
      <input
        type="range"
        min={1}
        max={50}
        step={1}
        value={amount}
        onChange={(e) => setAmount(+e.target.value)}
        className="w-full accent-[#0af2ad] cursor-pointer"
        aria-label="Investment amount in USD millions"
      />
      <div className="flex justify-between text-aether-muted/60 text-[10px] mt-1 mb-7">
        <span>$1M</span>
        <span>$50M</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {out.map((o) => (
          <div
            key={o.label}
            className="rounded-xl border border-aether-border bg-[#020203]/50 px-4 py-4"
          >
            <p className="text-white text-xl font-bold leading-tight">
              {o.value}
            </p>
            <p className="text-aether-muted text-[11px] uppercase tracking-wider mt-1">
              {o.label}
            </p>
          </div>
        ))}
      </div>
      <p className="text-aether-muted/60 text-[11px] mt-5 leading-relaxed">
        Illustrative model based on a blended ~USD&nbsp;0.9M / MW project cost.
        For information only — not an offer, solicitation, or guarantee of
        returns.
      </p>
    </div>
  )
}

/* ---------- thesis accordion ---------- */
function Thesis() {
  const [open, setOpen] = useState(0)
  return (
    <div className="space-y-3 max-w-4xl mx-auto">
      {thesis.map((t, i) => {
        const isOpen = open === i
        return (
          <div
            key={t.title}
            className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
              isOpen
                ? 'border-aether-accent/50 bg-[#0c0c11]'
                : 'border-aether-border bg-aether-card/50 hover:border-aether-accent/30'
            }`}
          >
            <button
              onClick={() => setOpen(isOpen ? -1 : i)}
              className="w-full flex items-center gap-4 text-left px-5 md:px-6 py-5"
            >
              <span
                className={`font-mono text-sm font-bold shrink-0 transition-colors ${
                  isOpen ? 'text-aether-accent' : 'text-aether-muted'
                }`}
              >
                0{i + 1}
              </span>
              <span className="flex-1 min-w-0">
                <span
                  className={`block text-lg font-bold transition-colors ${
                    isOpen ? 'text-aether-accent' : 'text-white'
                  }`}
                >
                  {t.title}
                </span>
              </span>
              <span
                className={`hidden sm:inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wider shrink-0 transition-colors ${
                  isOpen
                    ? 'border-aether-accent/40 text-aether-accent'
                    : 'border-aether-border text-aether-muted'
                }`}
              >
                {t.stat}
              </span>
              <svg
                className={`w-5 h-5 shrink-0 text-aether-accent transition-transform duration-300 ${
                  isOpen ? 'rotate-45' : ''
                }`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>
            <div
              className="grid transition-all duration-300 ease-out"
              style={{
                gridTemplateRows: isOpen ? '1fr' : '0fr',
              }}
            >
              <div className="overflow-hidden">
                <p className="text-aether-muted leading-relaxed px-5 md:px-6 pb-6 pl-[3.25rem] md:pl-[3.5rem]">
                  {t.body}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function Investors() {
  const [metricsRef, metricsInView] = useInView()

  // current generation mix from live project data
  const hydroMW = projects
    .filter((p) => p.generation === 'Hydro')
    .reduce((s, p) => s + (p.capacityMW || 0), 0)
  const solarMW = portfolio.totalMW - hydroMW
  const hydroPct = Math.round((hydroMW / portfolio.totalMW) * 100)

  return (
    <main className="relative bg-[#020203] font-sans">
      {/* ── Hero ───────────────────────────────── */}
      <section className="relative pt-40 pb-24 overflow-hidden bg-[#020203]">
        <SynergyBackground />
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[820px] h-[600px] bg-[radial-gradient(ellipse_at_center,_rgba(0,240,152,0.13)_0%,_transparent_65%)]" />
        </div>
        <div className="absolute left-0 right-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[#020203] pointer-events-none z-[1]" />

        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <Eyebrow center>Investor Relations</Eyebrow>
          <h1 className="text-white text-5xl md:text-7xl font-bold tracking-tight uppercase mb-6">
            Invest in Nepal’s
            <span className="block text-aether-accent">Energy Future</span>
          </h1>
          <p className="text-aether-muted text-lg md:text-xl leading-relaxed mb-9 max-w-2xl mx-auto">
            A vertically-integrated clean-energy platform with a 500&nbsp;MW
            pipeline, an operating solar asset, and a community-anchored model
            built for durable, responsible returns.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href={DECK_MAILTO} variant="primary">
              Request Investor Deck
            </Button>
            <Button href="#thesis" variant="secondary" withArrow={false}>
              See the Thesis
            </Button>
          </div>
        </div>
      </section>

      {/* ── Key metrics ────────────────────────── */}
      <section className="relative z-20 -mt-10 pb-8">
        <div
          ref={metricsRef}
          className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {metrics.map((m) => (
            <Metric key={m.label} {...m} run={metricsInView} />
          ))}
        </div>
      </section>

      {/* ── Why invest (thesis) ────────────────── */}
      <section id="thesis" className="scroll-mt-24 relative py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <Eyebrow center>The Investment Thesis</Eyebrow>
            <h2 className="text-white text-3xl md:text-5xl font-bold tracking-tight uppercase">
              Why Invest in Us
            </h2>
            <p className="text-aether-muted text-lg mt-4">
              Five structural reasons the Aether Renova platform is built to
              compound value.
            </p>
          </div>
          <Thesis />
        </div>
      </section>

      {/* ── Growth trajectory + portfolio mix ──── */}
      <section className="relative py-20 bg-gradient-to-b from-[#020203] via-[#0a1510] to-[#020203] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12 max-w-2xl">
            <Eyebrow>Growth Trajectory</Eyebrow>
            <h2 className="text-white text-3xl md:text-4xl font-bold tracking-tight uppercase">
              A Pipeline Built to Scale
            </h2>
            <p className="text-aether-muted text-base mt-4">
              From a single operating asset today to a 500&nbsp;MW
              diversified portfolio — track the trajectory, toggle the metric,
              hover any year.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,320px)] gap-6">
            <GrowthChart />

            {/* current generation mix */}
            <div className="rounded-3xl border border-aether-border bg-aether-card/50 p-6 md:p-8 flex flex-col">
              <p className="text-aether-muted text-xs uppercase tracking-wider mb-1">
                Today’s portfolio
              </p>
              <p className="text-white text-2xl font-bold mb-6">
                {portfolio.totalMW} MW in development
              </p>

              <div className="flex h-4 rounded-full overflow-hidden mb-4">
                <div
                  className="bg-aether-accent h-full"
                  style={{ width: `${hydroPct}%` }}
                  title={`Hydro ${hydroMW} MW`}
                />
                <div
                  className="bg-aether-accent/30 h-full"
                  style={{ width: `${100 - hydroPct}%` }}
                  title={`Solar ${solarMW} MW`}
                />
              </div>

              <div className="space-y-3 mt-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-white">
                    <span className="w-3 h-3 rounded-sm bg-aether-accent" />
                    Hydropower
                  </span>
                  <span className="text-aether-muted font-mono">
                    {hydroMW} MW
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-white">
                    <span className="w-3 h-3 rounded-sm bg-aether-accent/30" />
                    Solar
                  </span>
                  <span className="text-aether-muted font-mono">
                    {solarMW} MW
                  </span>
                </div>
              </div>

              <div className="mt-auto pt-6">
                <Link
                  to="/projects"
                  className="text-aether-accent text-sm font-semibold uppercase tracking-wider hover:underline inline-flex items-center gap-2"
                >
                  View the portfolio
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Impact calculator ──────────────────── */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Eyebrow>Model Your Impact</Eyebrow>
            <h2 className="text-white text-3xl md:text-4xl font-bold tracking-tight uppercase mb-5">
              Capital That Builds More Than Returns
            </h2>
            <p className="text-aether-muted text-lg leading-relaxed">
              Every dollar deployed translates into clean megawatts, powered
              homes, avoided emissions, and local jobs. Move the slider to see
              the scale of impact your investment can unlock alongside its
              financial return.
            </p>
          </div>
          <ImpactCalculator />
        </div>
      </section>

      {/* ── How to invest ──────────────────────── */}
      <section className="relative py-20 bg-gradient-to-b from-[#020203] via-[#0a1510] to-[#020203]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <Eyebrow center>The Process</Eyebrow>
            <h2 className="text-white text-3xl md:text-5xl font-bold tracking-tight uppercase">
              How to Invest
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s) => (
              <div
                key={s.n}
                className="group relative rounded-2xl border border-aether-border bg-aether-card/50 p-7 transition-all duration-300 hover:border-aether-accent/40 hover:-translate-y-1"
              >
                <span className="text-aether-accent/30 text-5xl font-bold font-mono group-hover:text-aether-accent/60 transition-colors">
                  {s.n}
                </span>
                <h3 className="text-white text-lg font-bold mt-3 mb-2">
                  {s.title}
                </h3>
                <p className="text-aether-muted text-sm leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────── */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[radial-gradient(ellipse_at_center,_rgba(0,240,152,0.10)_0%,_transparent_70%)] pointer-events-none" />
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-white text-3xl md:text-5xl font-bold tracking-tight uppercase mb-5">
            Let’s build the platform together
          </h2>
          <p className="text-aether-muted text-lg mb-9">
            Request our investor deck and data-room access, or speak directly
            with our Investor Relations team.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href={DECK_MAILTO} variant="primary">
              Request Investor Deck
            </Button>
            <Button href="/contact" variant="secondary" withArrow={false}>
              Talk to Investor Relations
            </Button>
          </div>
          <p className="text-aether-muted/70 text-sm mt-8">
            Investor enquiries ·{' '}
            <a href={DECK_MAILTO} className="text-aether-accent hover:underline">
              {IR_EMAIL}
            </a>
          </p>
        </div>
      </section>
    </main>
  )
}
