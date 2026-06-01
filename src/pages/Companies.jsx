import Button from '../components/Button'

const StatusBadge = ({ status }) => {
  const map = {
    Operational: 'bg-aether-accent/20 border-aether-accent/30 text-aether-accent',
    'In Development':
      'bg-amber-400/15 border-amber-400/30 text-amber-300',
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

const companies = [
  {
    id: 'terra-sol',
    name: 'Terra Sol',
    logo: '/logos/terrasol.svg',
    tag: 'Solar Farms',
    description:
      'Utility-scale photovoltaic development across Nepal’s sun-rich Terai belt, engineering solar farms built for high irradiance and long-term yield.',
    project: {
      name: 'Kusaha Solar Farm',
      type: 'Solar Generation',
      location: 'Sunsari District, Nepal',
      status: 'Operational',
      image:
        'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1200&h=800&fit=crop',
      stats: [
        { value: '20 MW', label: 'Capacity' },
        { value: '85,000', label: 'Solar Panels' },
        { value: '40,000+', label: 'Households Powered' },
      ],
    },
  },
  {
    id: 'solaeris',
    name: 'Solaeris',
    logo: '/logos/solaeris.svg',
    tag: 'Microgrids',
    description:
      'Smart, localized microgrids that bring resilient, autonomous clean power to remote communities — closing the gap where the national grid cannot reach.',
    project: {
      name: 'Highland Microgrid Network',
      type: 'Distributed Microgrid',
      location: 'Karnali Province, Nepal',
      status: 'In Development',
      image:
        'https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=1200&h=800&fit=crop',
      stats: [
        { value: '5 MW', label: 'Distributed Capacity' },
        { value: '12', label: 'Village Clusters' },
        { value: '99.9%', label: 'Target Uptime' },
      ],
    },
  },
  {
    id: 'grid-nepal',
    name: 'Grid Nepal',
    logo: '/logos/gridnepal.svg',
    tag: 'Transmission',
    description:
      'The connective tissue of the ecosystem — high-voltage transmission and grid infrastructure that moves clean energy from source to where it’s needed.',
    project: {
      name: 'Dhalkebar Transmission Link',
      type: 'Transmission & Grid',
      location: 'Dhanusha District, Nepal',
      status: 'In Development',
      image:
        'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1200&h=800&fit=crop',
      stats: [
        { value: '220 kV', label: 'Line Voltage' },
        { value: '78 km', label: 'Transmission Span' },
        { value: '300 MW', label: 'Carrying Capacity' },
      ],
    },
  },
  {
    id: 'west-star',
    name: 'West Star',
    logo: '/logos/weststar.svg',
    tag: 'Wind & Hydro',
    description:
      'Harnessing the power of moving water and mountain wind — developing hydropower and wind generation tuned to Nepal’s dramatic terrain.',
    project: {
      name: 'Haru Ko Hydropower',
      type: 'Run-of-River Hydro',
      location: 'Gandaki Province, Nepal',
      status: 'In Development',
      image:
        'https://images.unsplash.com/photo-1538300342682-cf57afb97285?q=80&w=1200&h=800&fit=crop',
      stats: [
        { value: '42 MW', label: 'Installed Capacity' },
        { value: '210 GWh', label: 'Annual Output' },
        { value: '2027', label: 'Target COD' },
      ],
    },
  },
  {
    id: 'aether-construction',
    name: 'Aether Construction',
    logo: '/logos/aether.svg',
    tag: 'Civil & Heavy Infrastructure',
    description:
      'The build arm of the group — civil and heavy infrastructure delivering the dams, foundations, and access works that every energy project depends on.',
    project: {
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
    },
  },
]

function CompanyCard({ company, index }) {
  const { name, logo, tag, description, project } = company
  return (
    <article
      id={company.id}
      className="scroll-mt-28 group relative bg-aether-card border border-aether-border rounded-3xl overflow-hidden transition-all duration-500 hover:border-aether-accent/30"
    >
      {/* top accent line on hover */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-aether-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left: company identity */}
        <div className="p-8 lg:p-12 flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-[#020203] border border-aether-border flex items-center justify-center p-3 shrink-0">
              <img
                src={logo}
                alt={name}
                className="w-full h-full object-contain"
                draggable="false"
              />
            </div>
            <div>
              <p className="text-aether-accent/70 text-[11px] uppercase tracking-[0.2em] mb-1">
                {String(index + 1).padStart(2, '0')} · {tag}
              </p>
              <h2 className="text-white text-2xl lg:text-3xl font-bold tracking-tight">
                {name}
              </h2>
            </div>
          </div>

          <p className="text-aether-muted text-base leading-relaxed mb-8">
            {description}
          </p>

          <div className="rounded-2xl border border-aether-border bg-[#020203]/60 p-5">
            <div className="flex items-center justify-between mb-4">
              <p className="text-aether-accent text-[11px] uppercase tracking-[0.2em] font-semibold">
                Flagship Project
              </p>
              <StatusBadge status={project.status} />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {project.stats.map((s) => (
                <div key={s.label}>
                  <div className="text-white text-lg font-bold leading-tight">
                    {s.value}
                  </div>
                  <div className="text-aether-muted text-[11px] leading-snug mt-1">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: project showcase */}
        <div className="relative min-h-[320px] lg:min-h-full overflow-hidden">
          <img
            src={project.image}
            alt={project.name}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-aether-card via-aether-card/30 to-transparent lg:bg-gradient-to-l lg:from-transparent lg:via-aether-card/20 lg:to-aether-card" />
          <div className="absolute bottom-0 inset-x-0 p-8">
            <p className="text-aether-accent text-xs font-semibold uppercase tracking-wider mb-1">
              {project.type}
            </p>
            <h3 className="text-white text-2xl font-bold mb-1">
              {project.name}
            </h3>
            <p className="text-aether-muted text-sm flex items-center gap-2">
              <svg
                className="w-4 h-4 text-aether-accent"
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
              {project.location}
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}

export default function Companies() {
  return (
    <main className="relative bg-[#020203] font-sans">
      {/* Page header */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse_at_center,_rgba(0,240,152,0.12)_0%,_transparent_70%)]" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <p className="text-aether-accent uppercase tracking-[0.25em] text-sm font-semibold mb-6 flex items-center justify-center gap-4">
            <span className="w-16 h-[1px] bg-aether-accent/50" />
            The Ecosystem
            <span className="w-16 h-[1px] bg-aether-accent/50" />
          </p>
          <h1 className="text-white text-5xl md:text-6xl font-bold tracking-tight uppercase mb-6">
            Our Companies
          </h1>
          <p className="text-aether-muted text-lg max-w-2xl mx-auto">
            Five specialized entities, each driving a flagship project — together
            forming an integrated clean-energy ecosystem across Nepal.
          </p>
        </div>
      </section>

      {/* Company cards */}
      <section className="pb-32">
        <div className="max-w-7xl mx-auto px-6 space-y-10">
          {companies.map((company, i) => (
            <CompanyCard key={company.id} company={company} index={i} />
          ))}
        </div>

        {/* CTA */}
        <div className="max-w-7xl mx-auto px-6 mt-20 text-center">
          <p className="text-aether-muted text-lg mb-8">
            Want to learn more about a specific entity or partnership?
          </p>
          <Button href="/#contact" variant="primary">
            Get In Touch
          </Button>
        </div>
      </section>
    </main>
  )
}
