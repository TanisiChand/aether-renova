import { useEffect, useRef, useState } from 'react'
import Button from './Button'

const MissionIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5 text-aether-accent"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
  </svg>
)

const VisionIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5 text-aether-accent"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
)

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

const values = [
  {
    img: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop',
    title: 'Engineering',
    np: 'इन्जिनियरिङ',
    desc: 'Build things that last',
  },
  {
    img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop',
    title: 'Collaboration',
    np: 'सहकार्य',
    desc: 'Grow stronger together',
  },
  {
    img: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&h=300&fit=crop',
    title: 'Impact',
    np: 'सकारात्मक प्रभाव',
    desc: 'Leave the world better',
  },
  {
    img: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=300&fit=crop',
    title: 'Resilience',
    np: 'दृढता',
    desc: 'Endure any challenge',
  },
  {
    img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop',
    title: 'Innovation',
    np: 'नवप्रवर्तन',
    desc: 'Always find a better way',
  },
]

function useInView(threshold = 0.3) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          obs.disconnect()
        }
      },
      { threshold },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, inView]
}

function Counter({ value, suffix, active }) {
  const [display, setDisplay] = useState(0)
  useEffect(() => {
    if (!active) return
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    if (prefersReduced) {
      setDisplay(value)
      return
    }
    let raf
    const duration = 1400
    const start = performance.now()
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplay(Math.round(value * eased))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, value])
  return (
    <span>
      {display}
      {suffix}
    </span>
  )
}

function PurposeCard({ icon, title, quote, np }) {
  return (
    <div className="group relative bg-aether-card border border-aether-border rounded-2xl p-6 lg:p-8 transition-all duration-700 hover:border-aether-accent/40 hover:bg-[#0c0c11]">
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-aether-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-aether-accent/10 border border-aether-accent/30 flex items-center justify-center">
          {icon}
        </div>
        <h3 className="text-white text-xl font-bold tracking-tight uppercase">
          {title}
        </h3>
      </div>

      <p className="text-white text-base leading-relaxed mb-4 font-light">
        {quote}
      </p>

      <p className="text-aether-muted text-sm leading-relaxed border-t border-aether-border/50 pt-4 italic">
        {np}
      </p>
    </div>
  )
}

function ValueCard({ img, title, np, desc }) {
  return (
    <div className="group cursor-pointer h-full">
      <div className="relative bg-aether-card border border-aether-border rounded-xl overflow-hidden transition-all duration-500 hover:border-aether-accent/50 hover:bg-[#0c0c11] hover:-translate-y-1 h-[200px] flex flex-col">
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-aether-accent/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="h-[90px] overflow-hidden relative">
          <img
            src={img}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-aether-card to-transparent" />
        </div>

        <div className="p-4 flex flex-col flex-grow justify-center text-center">
          <h4 className="text-white font-bold text-sm uppercase tracking-wide mb-1">
            {title}
          </h4>
          <p className="text-aether-accent/70 text-xs mb-1">{np}</p>
          <p className="text-aether-muted text-xs leading-tight">{desc}</p>
        </div>
      </div>
    </div>
  )
}

export default function WhoAreWe() {
  const [statsRef, statsInView] = useInView(0.4)

  return (
    <section
      id="about"
      className="relative py-20 bg-[linear-gradient(to_bottom,transparent_0px,#020203_200px)] font-sans z-10 overflow-hidden"
    >
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_rgba(0,240,152,0.08)_0%,_transparent_55%)]" />
        <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_rgba(0,240,152,0.06)_0%,_transparent_50%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* ── Who We Are ─────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Copy */}
          <div>
            <p className="text-aether-accent uppercase tracking-[0.25em] text-sm font-semibold mb-6 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-aether-accent" />
              Who We Are
            </p>
            <h2 className="text-white text-4xl md:text-5xl font-bold tracking-tight mb-6">
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
            <div ref={statsRef} className="grid grid-cols-3 gap-4 mt-10 mb-10">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="group rounded-xl border border-aether-border bg-aether-card/40 p-4 transition-all duration-500 hover:border-aether-accent/40 hover:bg-aether-card/70"
                >
                  <div className="text-aether-accent text-3xl font-bold font-sans tracking-tight">
                    <Counter
                      value={stat.value}
                      suffix={stat.suffix}
                      active={statsInView}
                    />
                  </div>
                  <div className="text-aether-muted text-xs mt-2 leading-snug">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <Button href="/careers" variant="primary">
              Join Our Team
            </Button>
          </div>

          {/* Photo collage */}
          <div className="grid grid-cols-2 grid-rows-2 gap-4 h-[480px]">
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

        {/* ── Mission & Vision ───────────────────────── */}
        <div id="story" className="scroll-mt-24 mt-28">
          <div className="text-center mb-12">
            <p className="text-aether-accent uppercase tracking-[0.25em] text-sm font-semibold mb-5 flex items-center justify-center gap-4">
              <span className="w-12 h-[1px] bg-aether-accent/50" />
              Our Purpose
              <span className="w-12 h-[1px] bg-aether-accent/50" />
            </p>
            <p className="text-aether-muted text-lg">मूल्य मान्यता</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <PurposeCard
              icon={<MissionIcon />}
              title="Mission"
              quote='"To harness clean energy through holistic engineering — generating jobs, empowering people, and spreading ideas that raise the standard of what infrastructure can achieve."'
              np="“उत्कृष्ट इन्जिनियरिङमार्फत नवीकरणीय ऊर्जाको विकास गर्दै रोजगारी सिर्जना, मानव सशक्तिकरण, तथा पूर्वाधार निर्माणको गुणस्तर उकास्ने विचार र अभ्यासको प्रवर्द्धन गर्नु।”"
            />
            <PurposeCard
              icon={<VisionIcon />}
              title="Vision"
              quote='"To build a world-class energy company rooted in integrity and driven by excellence."'
              np="“नैतिकता र उत्कृष्टतालाई आधार बनाएर विश्वस्तरीय ऊर्जा संस्थाको स्थापना गर्नु।”"
            />
          </div>
        </div>

        {/* ── Core Values ────────────────────────────── */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-white text-3xl md:text-4xl font-bold tracking-tight uppercase">
              Core Values
            </h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {values.map((value) => (
              <ValueCard key={value.title} {...value} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
