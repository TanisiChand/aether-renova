import Button from './Button'

const stats = [
  { value: '85,000', label: 'Solar Panels' },
  { value: '45', label: 'Hectares' },
  { value: '35,000', label: 'Tons CO₂/yr' },
]

export default function ProjectSpotlight() {
  return (
    <section
      id="spotlight"
      className="relative py-32 bg-gradient-to-b from-[#020203] via-[#0a1510] to-[#020203] font-sans z-10 overflow-hidden"
    >
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,240,152,0.15)_0%,_transparent_70%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2 space-y-8">
            <div>
              <p className="text-aether-accent uppercase tracking-[0.25em] text-sm font-semibold mb-4 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-aether-accent" />
                Project Spotlight
              </p>
              <h2 className="text-white text-5xl md:text-6xl font-bold tracking-tight uppercase leading-tight">
                KUSAHA
                <span className="block text-aether-accent mt-2">SOLAR FARM</span>
              </h2>
            </div>

            <div className="flex items-baseline gap-4">
              <span className="text-7xl md:text-8xl font-bold text-aether-accent font-mono">
                20
              </span>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-white">MW</span>
                <span className="text-sm text-aether-muted uppercase tracking-wider">
                  CAPACITY
                </span>
              </div>
            </div>

            <p className="text-aether-muted text-lg leading-relaxed max-w-lg">
              A landmark utility-scale solar installation in Nepal's Terai
              region. Kusaha Solar Farm generates clean energy for over 40,000
              households while demonstrating the viability of large-scale
              photovoltaic deployment in the region's unique climate conditions.
            </p>

            <div className="grid grid-cols-3 gap-6 pt-6">
              {stats.map((stat) => (
                <div className="group cursor-pointer" key={stat.label}>
                  <div className="bg-aether-card border border-aether-border rounded-xl p-5 text-center transition-all duration-500 hover:border-aether-accent/50 hover:bg-[#0c0c11] hover:scale-105">
                    <div className="text-aether-accent text-2xl font-bold mb-1 group-hover:scale-110 transition-transform duration-300">
                      {stat.value}
                    </div>
                    <div className="text-aether-muted text-xs uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Button variant="primary">View Project Details</Button>
            </div>
          </div>

          <div className="lg:w-1/2 relative">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-aether-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />

              <img
                src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&h=800&fit=crop"
                alt="Kusaha Solar Farm aerial view"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-aether-accent text-sm font-semibold uppercase tracking-wider mb-1">
                      Location
                    </p>
                    <p className="text-white text-xl font-bold">
                      Sunsari District, Nepal
                    </p>
                  </div>
                  <div className="bg-aether-accent/20 backdrop-blur-sm border border-aether-accent/30 rounded-full px-4 py-2">
                    <span className="flex items-center gap-2 text-aether-accent text-sm font-semibold">
                      <span className="w-2 h-2 bg-aether-accent rounded-full animate-pulse" />
                      Operational
                    </span>
                  </div>
                </div>
              </div>

              <div className="absolute top-6 right-6 flex flex-col gap-3">
                <div className="bg-black/60 backdrop-blur-md border border-aether-accent/30 rounded-lg px-4 py-2 text-center">
                  <p className="text-white text-lg font-bold">2023</p>
                  <p className="text-aether-muted text-[10px] uppercase tracking-wider">
                    Commissioned
                  </p>
                </div>
                <div className="bg-black/60 backdrop-blur-md border border-aether-accent/30 rounded-lg px-4 py-2 text-center">
                  <p className="text-white text-lg font-bold">98.5%</p>
                  <p className="text-aether-muted text-[10px] uppercase tracking-wider">
                    Performance
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-aether-accent/10 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-aether-accent/5 rounded-full blur-[60px] pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  )
}
