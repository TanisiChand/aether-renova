import { useParams, Link } from 'react-router-dom'
import { getRole } from '../data/roles'
import Button from '../components/Button'

const PinIcon = () => (
  <svg className="w-4 h-4 text-aether-accent shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

const Check = () => (
  <svg className="w-4 h-4 text-aether-accent shrink-0 mt-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
)

const Dot = () => (
  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-aether-accent shrink-0" />
)

export default function JobDetail() {
  const { slug } = useParams()
  const role = getRole(slug)

  if (!role || !role.responsibilities) {
    return (
      <main className="relative bg-[#020203] font-sans min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-aether-accent uppercase tracking-[0.25em] text-sm font-semibold mb-4">
            404
          </p>
          <h1 className="text-white text-3xl font-bold mb-6">Role not found</h1>
          <Button href="/careers" variant="primary">
            View Open Roles
          </Button>
        </div>
      </main>
    )
  }

  const mailto = `mailto:${role.applyEmail}?subject=${encodeURIComponent(
    role.applySubject,
  )}`

  const meta = [
    ['Project', `${role.project} · ${role.capacity}`],
    ['Location', role.location],
    ['Employment Type', role.type],
    ['Expected Joining', role.joining],
    ['Salary & Benefits', role.salary],
  ]

  return (
    <main className="relative bg-[#020203] font-sans">
      {/* ── Header ── */}
      <section className="relative pt-36 pb-12 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_center,_rgba(0,240,152,0.10)_0%,_transparent_70%)]" />
        </div>
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <Link
            to="/careers"
            className="group inline-flex items-center gap-2 text-aether-muted hover:text-aether-accent text-sm font-medium mb-8 transition-colors"
          >
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 18l-6-6 6-6" /></svg>
            All Open Roles
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="rounded-full border border-aether-accent/30 bg-aether-accent/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-aether-accent">
              {role.team}
            </span>
            <span className="rounded-full border border-aether-border bg-aether-card/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-aether-muted">
              {role.type}
            </span>
          </div>

          <h1 className="text-white text-4xl md:text-5xl font-bold tracking-tight mb-2">
            {role.title}
            {role.subtitle && (
              <span className="text-aether-muted font-medium"> — {role.subtitle}</span>
            )}
          </h1>
          <p className="text-aether-accent text-lg font-semibold">
            {role.project} | {role.capacity}
          </p>
          <p className="text-aether-muted text-sm flex items-center gap-2 mt-3">
            <PinIcon />
            {role.location}
          </p>

          <div className="mt-8">
            <Button href={mailto} variant="primary">
              Apply Now
            </Button>
          </div>
        </div>
      </section>

      {/* ── Body ── */}
      <section className="relative pb-12">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* main column */}
          <div className="lg:col-span-2 space-y-10">
            <div className="space-y-5 text-aether-muted text-base leading-relaxed">
              {role.intro.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div>
              <h2 className="text-white text-2xl font-bold tracking-tight mb-5">
                Key Responsibilities
              </h2>
              <ul className="space-y-3">
                {role.responsibilities.map((r) => (
                  <li key={r} className="flex items-start gap-3">
                    <Check />
                    <span className="text-aether-muted leading-relaxed">{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-white text-2xl font-bold tracking-tight mb-5">
                Requirements
              </h2>
              <ul className="space-y-3">
                {role.requirements.map((r) => (
                  <li key={r} className="flex items-start gap-3">
                    <Dot />
                    <span className="text-aether-muted leading-relaxed">{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            {role.note && (
              <p className="text-aether-muted/70 text-sm italic">{role.note}</p>
            )}
          </div>

          {/* sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-28 bg-aether-card border border-aether-border rounded-3xl p-7">
              <h3 className="text-white font-bold uppercase tracking-wider text-sm mb-6">
                At a Glance
              </h3>
              <dl className="space-y-5">
                {meta.map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-aether-muted text-[11px] uppercase tracking-wider mb-1">
                      {k}
                    </dt>
                    <dd className="text-white text-sm font-medium leading-snug">
                      {v}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="border-t border-aether-border/50 mt-7 pt-6">
                <p className="text-aether-muted text-xs uppercase tracking-wider mb-3">
                  How to Apply
                </p>
                <p className="text-aether-muted text-sm leading-relaxed mb-4">
                  Send your CV and supporting documents to{' '}
                  <a
                    href={mailto}
                    className="text-aether-accent hover:underline break-all"
                  >
                    {role.applyEmail}
                  </a>{' '}
                  with the subject line:
                </p>
                <p className="text-white/80 text-xs bg-[#020203] border border-aether-border rounded-lg p-3 mb-5 leading-relaxed">
                  {role.applySubject}
                </p>
                <Button href={mailto} variant="primary" className="w-full">
                  Apply Now
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}
