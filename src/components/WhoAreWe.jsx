import Button from './Button'
import StatBand from './StatBand'
import EnergyLandscape from './EnergyLandscape'

const stats = [
  { value: 500, suffix: ' MW', label: 'Hydropower & solar target' },
  { value: 50, suffix: ' MW', label: 'Clean-powered data centre' },
  { value: 100, suffix: '%', label: 'Community-majority platform' },
]

const photos = [
  {
    src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&h=1200&fit=crop',
    alt: 'Aether Renova team collaborating',
    span: 'row-span-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=900&h=650&fit=crop',
    alt: 'Aether Renova team planning session',
    span: '',
  },
  {
    src: 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?q=80&w=900&h=650&fit=crop',
    alt: 'Collaborative work culture',
    span: '',
  },
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
        {/* ── Who We Are ─────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Copy (right on desktop) */}
          <div className="lg:order-2">
            <p className="text-aether-accent uppercase tracking-[0.25em] text-sm font-semibold mb-6 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-aether-accent" />
              Who We Are
            </p>
            <h2 className="text-white text-4xl md:text-5xl font-medium tracking-tight mb-6">
              Aether Renova Holdings
            </h2>

            <p className="text-aether-muted text-lg leading-relaxed mb-6">
              A Nepali clean energy group developing hydropower and solar
              infrastructure built to last. We treat knowledge as
              infrastructure too — strengthening the sector through R&amp;D,
              internships, and our Industry Talk program.
            </p>

            <p className="text-white/90 text-lg italic border-l-2 border-aether-accent pl-5">
              “We always leave the place a little bit better than we found it.”
            </p>

            {/* Animated stats */}
            <StatBand stats={stats} variant="bare" size="sm" className="mt-10 mb-10" />

            <Button href="/about" variant="primary">
              Read Our Story
            </Button>
          </div>

          {/* Photo collage (left on desktop) */}
          <div className="grid grid-cols-2 grid-rows-2 gap-4 h-[480px] lg:order-1">
            {photos.map((photo) => (
              <div
                key={photo.alt}
                className={`group relative rounded-2xl overflow-hidden border border-aether-border ${photo.span}`}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-aether-accent/0 group-hover:bg-aether-accent/10 transition-colors duration-500" />
              </div>
            ))}
          </div>
        </div>

        {/* The Full Value Chain — part of Who We Are (desktop/tablet only) */}
        <div className="hidden md:block">
          <EnergyLandscape />
        </div>
      </div>
    </section>
  )
}
