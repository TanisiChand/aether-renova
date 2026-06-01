import { useState } from 'react'
import { Link } from 'react-router-dom'
import SynergyBackground from '../components/SynergyBackground'
import Button from '../components/Button'
import { roles } from '../data/roles'

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

/* ---- why work here ---- */
const perks = [
  {
    title: 'Meaningful Impact',
    desc: 'Your work directly powers homes, schools, and livelihoods across Nepal.',
    icon: <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />,
  },
  {
    title: 'Grow With Us',
    desc: 'Structured mentorship, R&D exposure, and our Industry Talk program.',
    icon: <path d="M22 10v6M2 10l10-5 10 5-10 5z M6 12v5c3 3 9 3 12 0v-5" />,
  },
  {
    title: 'Build the Frontier',
    desc: 'Work on first-of-their-kind clean-energy projects in challenging terrain.',
    icon: (
      <path d="M3 21h18M5 21V7l8-4 8 4v14M9 9h.01M9 13h.01M15 9h.01M15 13h.01" />
    ),
  },
  {
    title: 'Community First',
    desc: 'A culture rooted in integrity, collaboration, and leaving places better.',
    icon: (
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 7a4 4 0 1 0 0 0.01 M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75" />
    ),
  },
]


const filters = ['All', 'Engineering', 'Operations', 'Construction', 'Community']

const PinIcon = () => (
  <svg
    className="w-4 h-4 text-aether-accent shrink-0"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

const ArrowIcon = () => (
  <svg
    className="w-5 h-5 text-aether-muted group-hover:text-aether-accent transition-all duration-300 group-hover:translate-x-1"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

function RoleRow({ role }) {
  const inner = (
    <>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-2 flex-wrap">
          <span className="text-aether-accent text-[11px] font-semibold uppercase tracking-wider">
            {role.company}
          </span>
          <span className="w-1 h-1 rounded-full bg-aether-muted/50" />
          <span className="text-aether-muted text-[11px] uppercase tracking-wider">
            {role.team}
          </span>
        </div>
        <h3 className="text-white text-lg lg:text-xl font-bold leading-tight group-hover:text-aether-accent transition-colors">
          {role.title}
        </h3>
      </div>

      <div className="flex items-center gap-6 shrink-0">
        <span className="text-aether-muted text-sm flex items-center gap-2">
          <PinIcon />
          {role.location}
        </span>
        <span className="hidden sm:inline-flex items-center rounded-full border border-aether-border px-3 py-1 text-xs font-semibold uppercase tracking-wider text-aether-muted">
          {role.type}
        </span>
        <ArrowIcon />
      </div>
    </>
  )

  const className =
    'group flex flex-col md:flex-row md:items-center gap-4 md:gap-6 bg-aether-card border border-aether-border rounded-2xl p-6 transition-all duration-300 hover:border-aether-accent/40 hover:bg-[#0c0c11]'

  // Roles with a detail page link through; others link to the application CTA.
  return role.slug ? (
    <Link to={`/careers/${role.slug}`} className={className}>
      {inner}
    </Link>
  ) : (
    <a href="#contact" className={className}>
      {inner}
    </a>
  )
}

export default function Careers() {
  const [active, setActive] = useState('All')
  const visible =
    active === 'All' ? roles : roles.filter((r) => r.team === active)

  return (
    <main className="relative bg-[#020203] font-sans">
      {/* ── Hero ───────────────────────────────── */}
      <section className="relative pt-40 pb-24 overflow-hidden bg-[#020203]">
        <SynergyBackground />
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_center,_rgba(0,240,152,0.12)_0%,_transparent_65%)]" />
        </div>
        <div className="absolute left-0 right-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[#020203] pointer-events-none z-[1]" />

        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <Eyebrow center>Careers</Eyebrow>
          <h1 className="text-white text-5xl md:text-7xl font-bold tracking-tight uppercase mb-6">
            Build With Us
          </h1>
          <p className="text-aether-muted text-lg md:text-xl leading-relaxed mb-8">
            Join the team powering Nepal’s energy future. We’re looking for
            engineers, builders, and changemakers ready to do work that matters.
          </p>
          <Button href="#open-roles" variant="primary">
            View Open Roles
          </Button>
        </div>
      </section>

      {/* ── Why work here ──────────────────────── */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <Eyebrow center>Why Aether Renova</Eyebrow>
            <h2 className="text-white text-3xl md:text-5xl font-bold tracking-tight uppercase">
              More Than a Job
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {perks.map((p) => (
              <div
                key={p.title}
                className="group relative bg-aether-card border border-aether-border rounded-2xl p-8 transition-all duration-500 hover:border-aether-accent/40 hover:bg-[#0c0c11] hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-aether-accent/10 border border-aether-accent/30 flex items-center justify-center text-aether-accent mb-5">
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {p.icon}
                  </svg>
                </div>
                <h3 className="text-white text-lg font-bold mb-3">{p.title}</h3>
                <p className="text-aether-muted text-sm leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Open roles ─────────────────────────── */}
      <section id="open-roles" className="scroll-mt-28 relative py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <Eyebrow center>Open Positions</Eyebrow>
            <h2 className="text-white text-3xl md:text-5xl font-bold tracking-tight uppercase mb-4">
              Open Roles
            </h2>
            <p className="text-aether-muted text-lg">
              {roles.length} opportunities across our five companies.
            </p>
          </div>

          {/* filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {filters.map((f) => {
              const count =
                f === 'All' ? roles.length : roles.filter((r) => r.team === f).length
              return (
                <button
                  key={f}
                  onClick={() => setActive(f)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold uppercase tracking-wider border transition-all duration-300 ${
                    active === f
                      ? 'bg-aether-accent text-black border-aether-accent'
                      : 'bg-transparent text-aether-muted border-aether-border hover:border-aether-accent/50 hover:text-white'
                  }`}
                >
                  {f}
                  <span className="ml-2 opacity-60">{count}</span>
                </button>
              )
            })}
          </div>

          {/* role list */}
          <div className="space-y-4">
            {visible.map((role) => (
              <RoleRow key={role.title} role={role} />
            ))}
          </div>
        </div>
      </section>

      {/* ── No-fit CTA ─────────────────────────── */}
      <section className="relative py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-white text-3xl md:text-4xl font-bold tracking-tight mb-5">
            Don’t see your role?
          </h2>
          <p className="text-aether-muted text-lg mb-8">
            We’re always glad to meet talented people. Send us your CV and tell
            us how you’d help build Nepal’s energy future.
          </p>
          <Button href="/contact" variant="primary">
            Send an Open Application
          </Button>
        </div>
      </section>
    </main>
  )
}
