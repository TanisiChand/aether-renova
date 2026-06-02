import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

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
  { value: 40000, plus: true, label: 'Homes powered with clean energy' },
  { value: 1200, plus: true, label: 'Local jobs & livelihoods supported' },
  { value: 12, plus: false, label: 'Communities partnered with' },
  { value: 35000, plus: false, unit: ' t/yr', label: 'CO₂ emissions avoided' },
]

const activities = [
  {
    title: 'Kusaha Community Solar Fund',
    location: 'Sunsari District',
    tag: 'Energy Access',
    blurb:
      'A share of revenue from Kusaha Solar funds local schools, clinics, and clean-water access for surrounding villages.',
    image:
      'https://images.unsplash.com/photo-1497440001374-f26997328c1b?q=80&w=900&h=650&fit=crop',
  },
  {
    title: 'Highland Skills Academy',
    location: 'Karnali Province',
    tag: 'Education',
    blurb:
      'On-site training turning residents near our microgrid sites into certified solar technicians and grid operators.',
    image:
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=900&h=650&fit=crop',
  },
  {
    title: 'Terai Watershed Initiative',
    location: 'Eastern Nepal',
    tag: 'Environment',
    blurb:
      'Reforestation and watershed restoration around our hydro corridors, co-managed with local cooperatives.',
    image:
      'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=900&h=650&fit=crop',
  },
]

function ImpactStat({ value, plus, unit, label, run }) {
  const n = useCountUp(value, run)
  return (
    <div className="text-center">
      <div className="text-aether-accent text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-none whitespace-nowrap">
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
      className="relative py-16 font-sans z-10 overflow-hidden bg-[#020203]"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-aether-accent uppercase tracking-[0.25em] text-sm font-semibold mb-5 flex items-center justify-center gap-4">
            <span className="w-12 h-[1px] bg-aether-accent/60" />
            Community &amp; Country
            <span className="w-12 h-[1px] bg-aether-accent/60" />
          </p>
          <h2 className="text-white text-4xl md:text-5xl font-bold tracking-tight uppercase leading-tight">
            Good For Nepal,
            <span className="block text-aether-accent">Owned By Nepalis</span>
          </h2>
          <p className="text-aether-muted text-lg leading-relaxed mt-5">
            We measure success not just in megawatts, but in the communities,
            careers, and ecosystems that grow alongside our projects — keeping
            value where the work happens.
          </p>
        </div>

        {/* impact stats */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 lg:gap-8 mb-16 py-10 border-y border-aether-border"
        >
          {impact.map((s) => (
            <ImpactStat key={s.label} {...s} run={statsInView} />
          ))}
        </div>

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
            className="group inline-flex items-center justify-center gap-2 rounded-full font-sans font-bold uppercase tracking-wider transition-all duration-300 px-8 py-4 text-sm bg-transparent border border-aether-border text-white hover:border-aether-accent hover:bg-aether-accent/10 hover:text-aether-accent"
          >
            See Our Full Impact
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
