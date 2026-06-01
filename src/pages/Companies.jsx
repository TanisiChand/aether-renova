import SynergyBackground from '../components/SynergyBackground'
import Button from '../components/Button'

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

const companies = [
  {
    id: 'terra-sol',
    name: 'Terra Sol',
    logo: '/logos/terrasol.svg',
    tag: 'Solar Farms',
    description:
      'Utility-scale photovoltaic development across Nepal’s sun-rich Terai belt, engineering solar farms built for high irradiance and long-term yield.',
    projects: [
      {
        name: 'Kusaha Solar Farm',
        type: 'Solar Generation',
        location: 'Sunsari District, Nepal',
        status: 'Operational',
        image:
          'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1200&h=800&fit=crop',
        stats: [
          { value: '20 MW', label: 'Capacity' },
          { value: '85,000', label: 'Solar Panels' },
          { value: '40,000+', label: 'Households' },
        ],
        link: '#',
      },
    ],
  },
  {
    id: 'solaeris',
    name: 'Solaeris',
    logo: '/logos/solaeris.svg',
    tag: 'Microgrids',
    description:
      'Smart, localized microgrids that bring resilient, autonomous clean power to remote communities — closing the gap where the national grid cannot reach.',
    projects: [
      {
        name: 'Highland Microgrid Network',
        type: 'Distributed Microgrid',
        location: 'Karnali Province, Nepal',
        status: 'In Development',
        image:
          'https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=1200&h=800&fit=crop',
        stats: [
          { value: '5 MW', label: 'Distributed' },
          { value: '12', label: 'Village Clusters' },
          { value: '99.9%', label: 'Target Uptime' },
        ],
        link: '#',
      },
    ],
  },
  {
    id: 'grid-nepal',
    name: 'Grid Nepal',
    logo: '/logos/gridnepal.svg',
    tag: 'Transmission',
    description:
      'The connective tissue of the ecosystem — high-voltage transmission and grid infrastructure that moves clean energy from source to where it’s needed.',
    projects: [
      {
        name: 'Dhalkebar Transmission Link',
        type: 'Transmission & Grid',
        location: 'Dhanusha District, Nepal',
        status: 'In Development',
        image:
          'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1200&h=800&fit=crop',
        stats: [
          { value: '220 kV', label: 'Line Voltage' },
          { value: '78 km', label: 'Span' },
          { value: '300 MW', label: 'Capacity' },
        ],
        link: '#',
      },
    ],
  },
  {
    id: 'west-star',
    name: 'West Star',
    logo: '/logos/weststar.svg',
    tag: 'Wind & Hydro',
    description:
      'Harnessing the power of moving water and mountain wind — developing both hydropower and wind generation tuned to Nepal’s dramatic terrain.',
    projects: [
      {
        name: 'Haru Ko Hydropower',
        type: 'Run-of-River Hydro',
        location: 'Gandaki Province, Nepal',
        status: 'In Development',
        image:
          'https://images.unsplash.com/photo-1538300342682-cf57afb97285?q=80&w=900&h=700&fit=crop',
        stats: [
          { value: '42 MW', label: 'Capacity' },
          { value: '210 GWh', label: 'Annual Output' },
        ],
        link: '#',
      },
      {
        name: 'Mustang Wind Park',
        type: 'Wind Generation',
        location: 'Mustang District, Nepal',
        status: 'Planning',
        image:
          'https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=900&h=700&fit=crop',
        stats: [
          { value: '30 MW', label: 'Capacity' },
          { value: '11', label: 'Turbines' },
        ],
        link: '#',
      },
    ],
  },
  {
    id: 'aether-construction',
    name: 'Aether Construction',
    logo: '/logos/aether.svg',
    tag: 'Civil & Heavy Infrastructure',
    description:
      'The build arm of the group — civil and heavy infrastructure delivering the dams, foundations, and access works that every energy project depends on.',
    projects: [
      {
        name: 'Chameliya Civil Works',
        type: 'Civil & Heavy Infra',
        location: 'Darchula District, Nepal',
        status: 'Operational',
        image:
          'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1200&h=800&fit=crop',
        stats: [
          { value: '1.2M m³', label: 'Earthworks' },
          { value: '14 km', label: 'Access Roads' },
          { value: '500+', label: 'Workforce' },
        ],
        link: '#',
      },
    ],
  },
]

/* ---- Hero: Synergy-style ecosystem grid ---- */
function EcosystemHero() {
  return (
    <section className="relative pt-40 pb-24 overflow-hidden bg-[#020203]">
      <SynergyBackground />

      {/* branded radial glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_center,_rgba(0,240,152,0.12)_0%,_transparent_65%)]" />
      </div>
      {/* bottom fade into the detail sections */}
      <div className="absolute left-0 right-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[#020203] pointer-events-none z-[1]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <p className="text-aether-accent uppercase tracking-[0.25em] text-sm font-semibold mb-6 flex items-center justify-center gap-4">
            <span className="w-16 h-[1px] bg-aether-accent/50" />
            The Ecosystem
            <span className="w-16 h-[1px] bg-aether-accent/50" />
          </p>
          <h1 className="text-white text-5xl md:text-7xl font-bold tracking-tight uppercase mb-6">
            Our Companies
          </h1>
          <p className="text-aether-muted text-lg max-w-xl mx-auto">
            Five specialized entities. One unified vision.
          </p>
        </div>

        {/* logo cards — click to jump to that company */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8">
          {companies.map((c) => (
            <a key={c.id} href={`#${c.id}`} className="group cursor-pointer">
              <div className="relative aspect-square bg-aether-card/60 backdrop-blur-md border border-aether-border rounded-3xl flex items-center justify-center transition-all duration-500 hover:border-aether-accent/40 hover:scale-105 hover:shadow-[0_0_40px_rgba(0,240,152,0.15)] hover:bg-aether-card/80">
                <div className="relative z-10 text-center px-4">
                  <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_12px_rgba(0,240,152,0.5)]">
                    <img
                      src={c.logo}
                      alt={c.name}
                      className="w-full h-full object-contain"
                      draggable="false"
                    />
                  </div>
                  <p className="text-white font-bold tracking-wider text-sm uppercase h-10 flex items-center justify-center leading-tight">
                    {c.name}
                  </p>
                  <p className="text-aether-accent/60 text-[10px] uppercase tracking-[0.2em] mt-2 h-4 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {c.tag}
                  </p>
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-aether-accent/40 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </a>
          ))}
        </div>

        <p className="text-aether-muted text-sm tracking-wide max-w-2xl text-center mx-auto mt-14">
          From civil construction to smart microgrids — our subsidiaries form an
          integrated ecosystem delivering end-to-end energy infrastructure
          across Nepal.
        </p>
      </div>
    </section>
  )
}

/* ---- A single project tile ---- */
function ProjectTile({ project, horizontal }) {
  return (
    <div
      className={`group/tile relative bg-[#020203]/60 border border-aether-border rounded-2xl overflow-hidden transition-all duration-500 hover:border-aether-accent/40 ${
        horizontal ? 'grid grid-cols-1 sm:grid-cols-2' : 'flex flex-col'
      }`}
    >
      {/* image */}
      <div
        className={`relative overflow-hidden ${
          horizontal ? 'min-h-[220px]' : 'h-48'
        }`}
      >
        <img
          src={project.image}
          alt={project.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/tile:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020203]/80 to-transparent" />
        <div className="absolute top-4 left-4">
          <StatusBadge status={project.status} />
        </div>
      </div>

      {/* content */}
      <div className="p-6 flex flex-col">
        <p className="text-aether-accent text-xs font-semibold uppercase tracking-wider mb-1">
          {project.type}
        </p>
        <h3 className="text-white text-xl font-bold mb-2">{project.name}</h3>
        <p className="text-aether-muted text-sm flex items-center gap-2 mb-5">
          <PinIcon />
          {project.location}
        </p>

        <div className="flex flex-wrap gap-x-6 gap-y-3 mb-6">
          {project.stats.map((s) => (
            <div key={s.label}>
              <div className="text-white text-lg font-bold leading-tight">
                {s.value}
              </div>
              <div className="text-aether-muted text-[11px] leading-snug mt-0.5">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-auto">
          <Button href={project.link} variant="secondary" size="sm">
            View Project
          </Button>
        </div>
      </div>
    </div>
  )
}

/* ---- A company section ---- */
function CompanySection({ company, index }) {
  const { id, name, logo, tag, description, projects } = company
  const multi = projects.length > 1
  return (
    <article
      id={id}
      className="scroll-mt-28 bg-aether-card border border-aether-border rounded-3xl p-8 lg:p-10"
    >
      {/* header */}
      <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
        <div className="w-16 h-16 rounded-2xl bg-[#020203] border border-aether-border flex items-center justify-center p-3 shrink-0">
          <img
            src={logo}
            alt={name}
            className="w-full h-full object-contain"
            draggable="false"
          />
        </div>
        <div className="flex-1">
          <p className="text-aether-accent/70 text-[11px] uppercase tracking-[0.2em] mb-1">
            {String(index + 1).padStart(2, '0')} · {tag}
          </p>
          <h2 className="text-white text-2xl lg:text-3xl font-bold tracking-tight">
            {name}
          </h2>
        </div>
        <p className="text-aether-muted text-base leading-relaxed md:max-w-md">
          {description}
        </p>
      </div>

      {/* projects */}
      <div
        className={`grid gap-6 ${multi ? 'md:grid-cols-2' : 'grid-cols-1'}`}
      >
        {projects.map((p) => (
          <ProjectTile key={p.name} project={p} horizontal={!multi} />
        ))}
      </div>
    </article>
  )
}

export default function Companies() {
  return (
    <main className="relative bg-[#020203] font-sans">
      <EcosystemHero />

      <section className="pb-32">
        <div className="max-w-7xl mx-auto px-6 space-y-10">
          {companies.map((company, i) => (
            <CompanySection key={company.id} company={company} index={i} />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-6 mt-20 text-center">
          <p className="text-aether-muted text-lg mb-8">
            Want to learn more about a specific entity or partnership?
          </p>
          <Button href="/contact" variant="primary">
            Get In Touch
          </Button>
        </div>
      </section>
    </main>
  )
}
