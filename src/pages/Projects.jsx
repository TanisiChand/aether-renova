import SynergyBackground from '../components/SynergyBackground'
import Button from '../components/Button'
import NepalMap from '../components/NepalMap'
import { projects } from '../data/projects'

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

const StatusBadge = ({ status }) => {
  const map = {
    Operational: 'bg-aether-accent/20 border-aether-accent/30 text-aether-accent',
    'In Development': 'bg-amber-400/15 border-amber-400/30 text-amber-300',
    Planning: 'bg-sky-400/15 border-sky-400/30 text-sky-300',
  }
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider ${
        map[status] || map.Operational
      }`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
      {status}
    </span>
  )
}

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

const BuildIcon = () => (
  <svg
    className="w-4 h-4 text-aether-accent shrink-0"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
)

function ProjectCard({ project, index }) {
  const flip = index % 2 === 1
  return (
    <article className="group relative bg-aether-card border border-aether-border rounded-3xl overflow-hidden transition-all duration-500 hover:border-aether-accent/30">
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-aether-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

      <div className={`grid grid-cols-1 lg:grid-cols-2 ${flip ? 'lg:[&>*:first-child]:order-2' : ''}`}>
        {/* image */}
        <div className="relative min-h-[280px] lg:min-h-[420px] overflow-hidden">
          <img
            src={project.image}
            alt={project.name}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-aether-card via-transparent to-transparent" />
          <div className="absolute top-5 left-5">
            <StatusBadge status={project.status} />
          </div>
          {/* big capacity badge */}
          <div className="absolute bottom-5 left-5 flex items-baseline gap-2">
            <span className="text-aether-accent text-4xl font-bold tracking-tight">
              {project.capacity}
            </span>
          </div>
        </div>

        {/* content */}
        <div className="p-8 lg:p-12 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-11 h-11 rounded-xl bg-[#020203] border border-aether-border flex items-center justify-center p-2 shrink-0">
              <img
                src={project.companyLogo}
                alt={project.company}
                className="w-full h-full object-contain"
                draggable="false"
              />
            </div>
            <div>
              <p className="text-aether-accent text-[11px] font-semibold uppercase tracking-wider">
                {project.company}
              </p>
              <p className="text-aether-muted text-[11px] uppercase tracking-wider">
                {project.type}
              </p>
            </div>
          </div>

          <h2 className="text-white text-2xl lg:text-3xl font-bold tracking-tight mb-4">
            {project.name}
          </h2>
          <p className="text-aether-muted text-base leading-relaxed mb-6">
            {project.blurb}
          </p>

          <div className="space-y-3 mb-8">
            <p className="text-aether-muted text-sm flex items-center gap-2">
              <PinIcon />
              {project.location}
            </p>
            <p className="text-aether-muted text-sm flex items-center gap-2">
              <BuildIcon />
              Construction by{' '}
              <span className="text-white font-medium">{project.builder}</span>
            </p>
          </div>

          <div>
            <Button href="/contact" variant="secondary" size="sm">
              Project Inquiry
            </Button>
          </div>
        </div>
      </div>
    </article>
  )
}

export default function Projects() {
  const totalMw = projects.reduce(
    (sum, p) => sum + parseInt(p.capacity, 10),
    0,
  )

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
          <Eyebrow center>Our Work</Eyebrow>
          <h1 className="text-white text-5xl md:text-7xl font-bold tracking-tight uppercase mb-6">
            Projects
          </h1>
          <p className="text-aether-muted text-lg md:text-xl leading-relaxed mb-10">
            Hydropower and solar projects across Nepal — engineered by our
            companies and built by Aether Construction.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <div className="rounded-2xl border border-aether-border bg-aether-card/40 px-8 py-5">
              <div className="text-aether-accent text-3xl font-bold">
                {totalMw} MW
              </div>
              <div className="text-aether-muted text-xs uppercase tracking-wider mt-1">
                Total Capacity
              </div>
            </div>
            <div className="rounded-2xl border border-aether-border bg-aether-card/40 px-8 py-5">
              <div className="text-aether-accent text-3xl font-bold">
                {projects.length}
              </div>
              <div className="text-aether-muted text-xs uppercase tracking-wider mt-1">
                Active Projects
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Map ────────────────────────────────── */}
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <Eyebrow center>Where We Build</Eyebrow>
            <h2 className="text-white text-3xl md:text-5xl font-bold tracking-tight uppercase">
              Projects Across Nepal
            </h2>
            <p className="text-aether-muted text-base mt-4">
              Hover a marker to see the project.
            </p>
          </div>
          <NepalMap />
        </div>
      </section>

      {/* ── Project list ───────────────────────── */}
      <section className="relative pb-32">
        <div className="max-w-7xl mx-auto px-6 space-y-10">
          {projects.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </div>

        {/* Aether Construction note */}
        <div className="max-w-7xl mx-auto px-6 mt-12">
          <div className="relative bg-aether-card border border-aether-border rounded-3xl p-8 lg:p-10 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <div className="w-16 h-16 rounded-2xl bg-[#020203] border border-aether-border flex items-center justify-center p-3 shrink-0">
              <img
                src="/logos/aether.svg"
                alt="Aether Construction"
                className="w-full h-full object-contain"
                draggable="false"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-white text-xl font-bold mb-2">
                Built by Aether Construction
              </h3>
              <p className="text-aether-muted text-sm leading-relaxed">
                Every project across the group — from solar farms to
                run-of-river hydropower — is delivered by Aether Construction,
                our civil and heavy-infrastructure arm handling the dams,
                foundations, and access works each site depends on.
              </p>
            </div>
            <Button href="/companies#aether-construction" variant="secondary" size="sm">
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
