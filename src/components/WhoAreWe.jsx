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
      className="relative py-20 md:py-28 bg-transparent font-sans z-10 overflow-hidden"
    >
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_rgba(0,240,152,0.08)_0%,_transparent_55%)]" />
        <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_rgba(0,240,152,0.06)_0%,_transparent_50%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* ── Who We Are — centered intro ── */}
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-aether-accent uppercase tracking-[0.25em] text-sm font-semibold mb-6 flex items-center justify-center gap-4">
            <span className="w-10 h-[1px] bg-aether-accent/60" />
            Who We Are
            <span className="w-10 h-[1px] bg-aether-accent/60" />
          </p>
          <h2 className="text-white text-4xl md:text-5xl font-medium tracking-tight mb-6">
            Aether Renova Holdings
          </h2>
          <p className="text-aether-muted text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            A Nepali clean energy group developing hydropower and solar
            infrastructure built to last. We treat knowledge as infrastructure
            too — strengthening the sector through R&amp;D, internships, and our
            Industry Talk program.
          </p>
          <p className="text-white/90 text-xl md:text-2xl italic font-light tracking-tight max-w-2xl mx-auto">
            “We always leave the place a little bit better than we found it.”
          </p>
          <StatBand stats={stats} variant="bare" size="sm" className="mt-12 mb-10 max-w-3xl mx-auto" />
          <Button href="/about" variant="primary">
            Read Our Story
          </Button>
        </div>
      </div>

      {/* The Full Value Chain — full-bleed centerpiece of this section
          (desktop/tablet only) */}
      <div className="hidden md:block relative z-10 mt-20 lg:mt-28">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p className="text-white text-xl md:text-2xl font-medium tracking-tight leading-snug">
            One platform, end&#8209;to&#8209;end.
          </p>
          <p className="text-aether-muted text-base md:text-lg mt-3">
            From the river and the sun, to the civil works that build it, to the
            lines that carry it.
          </p>
          <p className="text-aether-accent text-xs font-semibold uppercase tracking-[0.2em] mt-5 inline-flex items-center gap-2">
            Hover any point to explore
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </p>
        </div>
        <EnergyLandscape />
      </div>
    </section>
  )
}
