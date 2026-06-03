import Button from './Button'
import StatBand from './StatBand'
import EnergyLandscape from './EnergyLandscape'

const stats = [
  { value: 500, suffix: ' MW', label: 'Hydropower & solar target' },
  { value: 50, suffix: ' MW', label: 'Clean-powered data centre' },
  { value: 100, suffix: '%', label: 'Community-majority platform' },
]

export default function WhoAreWe() {

  return (
    <section
      id="about"
      className="relative pt-20 md:pt-28 pb-8 md:pb-10 bg-[#020203] font-sans z-10 overflow-hidden"
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
            <p className="text-aether-muted text-lg leading-relaxed">
              A Nepali clean energy group developing hydropower and solar
              infrastructure built to last. We treat knowledge as infrastructure
              too — strengthening the sector through R&amp;D, internships, and
              our Industry Talk program.
            </p>
            <p className="text-white/90 text-lg italic border-l-2 border-aether-accent pl-5 mt-7">
              “We always leave the place a little bit better than we found it.”
            </p>
            <div className="mt-8">
              <Button href="/about" variant="primary">
                Read Our Story
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* ── The Full Value Chain — full-bleed finale (desktop/tablet only) ── */}
      <div className="hidden md:block relative z-10 mt-6 lg:mt-8">
        <EnergyLandscape />
      </div>
    </section>
  )
}
