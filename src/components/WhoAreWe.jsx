import Button from './Button'
import StatBand from './StatBand'
import EnergyLandscape from './EnergyLandscape'

const stats = [
  { value: 153, suffix: ' MW', label: 'Hydropower' },
  { value: 300, suffix: ' MW', label: 'Pump Storage' },
  { value: 70, suffix: ' MW', label: 'Solar' },
]

export default function WhoAreWe() {

  return (
    <section
      id="about"
      className="relative py-20 md:py-28 bg-transparent font-sans z-10 overflow-hidden"
    >
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_rgba(0,240,152,0.08)_0%,_transparent_55%)]" />
        <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_rgba(0,240,152,0.06)_0%,_transparent_50%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* ── Editorial header: headline + numbers | story + CTA ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* left — headline + key numbers */}
          <div className="lg:col-span-6">
            <p className="text-aether-accent uppercase tracking-[0.25em] text-sm font-semibold mb-6 flex items-center gap-3">
              <span className="w-10 h-[1px] bg-aether-accent" />
              Who We Are
            </p>
            <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.05]">
              Aether Renova
              <span className="block text-aether-accent/90">Holdings</span>
            </h2>
            <StatBand stats={stats} variant="bare" size="sm" className="mt-10 lg:mt-12 -ml-3" />
          </div>

          {/* right — story + quote + CTA */}
          <div className="lg:col-span-6 lg:pt-3">
            <p className="text-aether-muted text-base leading-relaxed">
              Aether Renova is a Nepal-based clean-energy developer group with a
              diverse portfolio spanning hydro, solar, and transmission
              infrastructure — engineered for long-term technical resilience and
              financial performance across generations. We operate through
              specialised subsidiaries with uncompromising construction
              standards.
            </p>
            <p className="text-aether-muted text-base leading-relaxed mt-5">
              Beyond infrastructure, we invest in creating spaces for the open
              exchange of ideas, lessons, and emerging practices through our talk
              program “WhatsUp Aether”, our internship, and our R&amp;D programs.
              We also work closely with local stakeholders to brighten their
              lives through carefully curated livelihood ventures like fishery
              and vegetable farming.
            </p>
            <p className="text-white/90 text-lg italic border-l-2 border-aether-accent pl-5 mt-7">
              “We believe in growing as an industry, in an ecosystem.”
            </p>
            <div className="mt-8">
              <Button href="/about" variant="primary">
                Read Our Story
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* ── The Full Value Chain — full-bleed (desktop/tablet only; too small on phones) ── */}
      <div className="hidden md:block relative z-10 mt-8 lg:mt-10">
        <EnergyLandscape />
      </div>
    </section>
  )
}
