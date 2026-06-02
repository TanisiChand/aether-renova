import SynergyBackground from './SynergyBackground'

const entities = [
  { logo: '/logos/terrasol.svg', name: 'Terra Sol', tag: 'Solar Farms' },
  { logo: '/logos/solaeris.svg', name: 'Solaeris', tag: 'Microgrids' },
  { logo: '/logos/gridnepal.svg', name: 'Grid Nepal', tag: 'Transmission' },
  { logo: '/logos/weststar.svg', name: 'West Star', tag: 'Wind & Hydro' },
  {
    logo: '/logos/aether.svg',
    name: 'Aether Construction',
    display: 'Aether\nConstruction',
    tag: 'Civil & Heavy Infra',
  },
]

function EntityCard({ logo, name, display, tag }) {
  return (
    <div className="group cursor-pointer">
      <div className="relative aspect-square bg-aether-card/70 border border-aether-border rounded-3xl flex items-center justify-center transition-all duration-700 hover:border-aether-accent/40 hover:scale-105 hover:shadow-[0_0_40px_rgba(0,240,152,0.15)] hover:bg-aether-card/80">
        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-aether-accent/10 to-transparent" />

        {/* gradient ring on hover */}
        <div className="absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-aether-accent/30 via-transparent to-transparent [mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)] p-px pointer-events-none" />

        <div className="relative z-10 text-center px-4">
          <div className="w-20 h-20 mx-auto mb-4 relative flex items-center justify-center transition-transform duration-700 group-hover:scale-110 group-hover:drop-shadow-[0_0_12px_rgba(0,240,152,0.5)]">
            <img
              src={logo}
              alt={name}
              className="w-full h-full object-contain"
              draggable="false"
            />
          </div>
          <p className="font-montserrat text-white font-bold tracking-wider text-sm uppercase h-10 flex items-center justify-center leading-tight whitespace-pre-line">
            {display || name}
          </p>
          <p className="text-aether-accent/70 text-[10px] uppercase tracking-[0.2em] mt-2 h-4 whitespace-nowrap opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500">
            {tag}
          </p>
        </div>

        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-aether-accent/40 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </div>
  )
}

export default function Synergy() {
  return (
    <section
      id="companies"
      className="relative py-24 md:py-32 bg-transparent font-sans z-0 overflow-visible"
    >
      {/* Animated synergy web — bleeds well beyond the section into the
          (transparent) neighbouring sections above & below, fading softly at
          its edges. Section sits at z-0 so it stays BEHIND neighbouring
          content/buttons. */}
      <SynergyBackground bleed={340} fade />

      {/* Branded radial glows */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle,_rgba(0,240,152,0.10)_0%,_transparent_60%)]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[radial-gradient(circle,_rgba(0,240,152,0.06)_0%,_transparent_70%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-14">
          <p className="text-aether-accent uppercase tracking-[0.25em] text-sm font-semibold mb-6 flex items-center justify-center gap-4">
            <span className="w-16 h-[1px] bg-aether-accent/50" />
            The Ecosystem
            <span className="w-16 h-[1px] bg-aether-accent/50" />
          </p>
          <h2 className="text-white text-5xl md:text-6xl font-medium tracking-tight mb-6">
            Our Companies
          </h2>
          <p className="text-aether-muted text-lg max-w-xl mx-auto">
            Five specialized entities. One unified vision.
          </p>
        </div>

        <div className="relative">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12 relative z-10">
            {entities.map((entity) => (
              <EntityCard key={entity.name} {...entity} />
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <p className="text-aether-muted text-sm tracking-wide max-w-2xl text-center">
              From civil construction to smart microgrids — our subsidiaries
              form an integrated ecosystem delivering end-to-end energy
              infrastructure across Nepal.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
