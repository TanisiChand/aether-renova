import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import StatBand from './StatBand'

/* ---------------------------------------------------------------------------
   Community & Country — homepage showcase of our community activities and the
   national impact behind the megawatts. Teases the full CSR story on /about.
--------------------------------------------------------------------------- */

// Polls getBoundingClientRect (scroll/IO unreliable in preview sandbox).
function useInView() {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const check = () =>
      el.getBoundingClientRect().top < window.innerHeight * 0.85 &&
      el.getBoundingClientRect().bottom > 0
    if (check()) {
      setInView(true)
      return
    }
    const id = setInterval(() => {
      if (check()) {
        setInView(true)
        clearInterval(id)
      }
    }, 150)
    return () => clearInterval(id)
  }, [])
  return [ref, inView]
}

// Eased count-up. Uses requestAnimationFrame for a smooth ramp — it only
// starts once the band is on-screen (run === true), so rAF is never throttled.
function useCountUp(target, run, duration = 1500) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!run) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVal(target)
      return
    }
    let raf
    let start
    const tick = (ts) => {
      if (start === undefined) start = ts
      const t = Math.min((ts - start) / duration, 1)
      setVal(target * (1 - Math.pow(1 - t, 3)))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, run, duration])
  return val
}

const fmt = (n) => Math.round(n).toLocaleString()

const impact = [
  { value: 400000, label: 'Homes powered by clean energy' },
  { value: 1200, label: 'Jobs & livelihoods created' },
  { value: 14, label: 'Communities partnered with' },
  { value: 350000, suffix: ' t/yr', label: 'CO₂ emissions replaced' },
]

const activities = [
  {
    title: 'Terai Land Restoration & Fishery Project',
    location: 'Mahottari District',
    tag: 'Livelihood',
    blurb:
      'Restoring degraded Terai land and seeding community fish ponds that create steady incomes for local families.',
    image:
      'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=900&h=650&fit=crop',
  },
  {
    title: 'Greenhouse Agriculture Project',
    location: 'Mahottari District',
    tag: 'Agriculture',
    blurb:
      'Year-round greenhouse vegetable farming that lifts yields, nutrition, and household earnings near our sites.',
    image:
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=900&h=650&fit=crop',
  },
  {
    title: 'Koshi Community-led Agriculture Project',
    location: 'Koshi Province',
    tag: 'Agriculture',
    blurb:
      'Farmer-owned cooperatives growing high-value crops with shared tools, training, and reliable market access.',
    image:
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=900&h=650&fit=crop',
  },
  {
    title: 'Koshi Fishery Project',
    location: 'Koshi Province',
    tag: 'Livelihood',
    blurb:
      'Sustainable inland fisheries turning local waters into dependable food and income for riverside communities.',
    image:
      'https://images.unsplash.com/photo-1437482078695-73f5ca6c96e2?q=80&w=900&h=650&fit=crop',
  },
  {
    title: 'Aether Scholarship Program',
    location: 'Nationwide',
    tag: 'Education',
    blurb:
      'Scholarships opening doors in engineering and the trades for the next generation of Nepali talent.',
    image:
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=900&h=650&fit=crop',
  },
]

function ImpactStat({ value, plus, unit, label, run }) {
  const n = useCountUp(value, run)
  return (
    <div className="text-center">
      <div className="text-aether-accent text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-none whitespace-nowrap">
        {fmt(n)}
        {plus && '+'}
      </div>
      {unit && (
        <div className="text-aether-accent text-base sm:text-lg font-bold mt-1">
          {unit.trim()}
        </div>
      )}
      <div className="text-aether-muted text-xs md:text-sm mt-2 leading-snug max-w-[180px] mx-auto">
        {label}
      </div>
    </div>
  )
}

export default function CommunityImpact() {
  const [statsRef, statsInView] = useInView()

  return (
    <section
      id="community-impact"
      className="relative py-20 md:py-28 font-sans z-10 overflow-hidden bg-[#020203]"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-aether-accent uppercase tracking-[0.25em] text-sm font-semibold mb-5 flex items-center justify-center gap-4">
            <span className="w-12 h-[1px] bg-aether-accent/60" />
            Community &amp; Country
            <span className="w-12 h-[1px] bg-aether-accent/60" />
          </p>
          <h2 className="text-white text-4xl md:text-5xl font-medium tracking-tight leading-tight">
            Making smiles
            <span className="block text-aether-accent">brighter</span>
          </h2>
          <p className="text-aether-muted text-lg leading-relaxed mt-5">
            We measure success not just in megawatts, but in the communities,
            careers, and ecosystems that grow alongside every project. What we
            build here stays here.
          </p>
        </div>

        {/* impact stats */}
        <StatBand stats={impact} className="mb-16" />

        {/* community activity cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activities.map((a) => (
            <article
              key={a.title}
              className="group relative bg-aether-card border border-aether-border rounded-2xl overflow-hidden transition-all duration-500 hover:border-aether-accent/40 hover:-translate-y-1"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={a.image}
                  alt={a.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-aether-card to-transparent" />
                <span className="absolute top-4 left-4 px-3 py-1 bg-aether-accent/20 backdrop-blur-sm border border-aether-accent/30 rounded-full text-aether-accent text-xs font-semibold uppercase tracking-wider">
                  {a.tag}
                </span>
                <span className="absolute top-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-sm border border-white/20 rounded-full text-white/90 text-xs font-semibold uppercase tracking-wider">
                  Coming Soon
                </span>
              </div>
              <div className="p-6">
                <p className="text-aether-accent text-xs font-semibold uppercase tracking-wider mb-2">
                  {a.location}
                </p>
                <h3 className="text-white text-lg font-bold mb-3 leading-tight">
                  {a.title}
                </h3>
                <p className="text-aether-muted text-sm leading-relaxed">
                  {a.blurb}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <Link
            to="/about#story"
            className="group inline-flex items-center justify-center gap-2 rounded-full font-sans font-semibold tracking-wide transition-all duration-300 px-8 py-4 text-sm bg-white/[0.06] border border-white/30 text-white hover:border-aether-accent hover:bg-aether-accent/10 hover:text-aether-accent"
          >
            See Our Full Impact
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
