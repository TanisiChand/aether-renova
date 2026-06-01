const SolarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-14 h-14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="M4.93 4.93l1.41 1.41" />
    <path d="M17.66 17.66l1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="M6.34 17.66l-1.41 1.41" />
    <path d="M19.07 4.93l-1.41 1.41" />
  </svg>
)

const WindIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-14 h-14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
  </svg>
)

const InfraIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-14 h-14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <line x1="12" y1="8" x2="12" y2="16" />
    <line x1="8" y1="12" x2="16" y2="12" />
  </svg>
)

const services = [
  {
    icon: <SolarIcon />,
    title: 'SOLAR SYSTEMS',
    description:
      'Utility-scale photovoltaic installations designed for high-altitude irradiance efficiency and extreme weather resilience.',
    metric: 'Efficiency: 24.2% Peak',
  },
  {
    icon: <WindIcon />,
    title: 'WIND ENERGY',
    description:
      'Advanced turbine placement utilizing proprietary wind-mapping algorithms specifically calibrated for turbulent mountain corridors.',
    metric: 'Rated: 5.5MW / Unit',
  },
  {
    icon: <InfraIcon />,
    title: 'GREEN INFRA',
    description:
      'Smart-grid integration and localized micro-grids designed to enable sustainable, autonomous development for remote communities.',
    metric: 'Resilience: 99.9% Uptime',
  },
]

function ServiceCard({ icon, title, description, metric }) {
  return (
    <div className="group relative bg-aether-card border border-aether-border rounded-2xl p-10 lg:p-12 transition-all duration-500 hover:bg-[#0c0c11] hover:border-aether-accent/30 hover:-translate-y-1 flex flex-col min-h-[420px] overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-aether-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-aether-accent/10 rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      <div className="mb-10 text-aether-accent relative z-10">{icon}</div>

      <h3 className="text-2xl text-white font-bold mb-5 tracking-wide relative z-10">
        {title}
      </h3>

      <p className="text-aether-muted text-[1.05rem] leading-relaxed flex-grow relative z-10">
        {description}
      </p>

      <div className="mt-8 pt-6 border-t border-aether-border group-hover:border-aether-accent/20 transition-colors relative z-10">
        <p className="text-aether-accent text-[11px] font-mono uppercase tracking-[0.1em] font-semibold flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-aether-accent" />
          {metric}
        </p>
      </div>
    </div>
  )
}

export default function TechnicalServices() {
  return (
    <section className="relative py-32 bg-[#020203] font-sans z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-20 gap-10">
          <div className="max-w-2xl">
            <p className="text-aether-accent uppercase tracking-[0.15em] text-sm font-semibold mb-6 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-aether-accent" />
              Core Capabilities
            </p>
            <h2 className="text-white text-5xl md:text-6xl font-bold tracking-tight uppercase">
              Technical <br />
              Services
            </h2>
          </div>
          <div className="lg:w-[400px] lg:pb-2">
            <p className="text-aether-muted text-lg leading-relaxed border-l border-aether-border pl-6">
              Precision-engineered solutions tailored for the unique
              geographical challenges of high-altitude and remote environments.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </div>
    </section>
  )
}
