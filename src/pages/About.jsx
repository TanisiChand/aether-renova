import { useEffect, useRef, useState } from 'react'
import SynergyBackground from '../components/SynergyBackground'
import Button from '../components/Button'
import StatBand from '../components/StatBand'

/* ---- count-up helpers (shared pattern) ---- */
function useInView(threshold = 0.4) {
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
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(value)
      return
    }
    let raf
    const start = performance.now()
    const tick = (now) => {
      const t = Math.min((now - start) / 1400, 1)
      setDisplay(Math.round(value * (1 - Math.pow(1 - t, 3))))
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

function PurposeCard({ icon, title, quote, np }) {
  return (
    <div className="group relative bg-aether-card border border-aether-border rounded-2xl p-6 lg:p-8 transition-all duration-700 hover:border-aether-accent/40 hover:bg-[#0c0c11]">
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-aether-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-aether-accent/10 border border-aether-accent/30 flex items-center justify-center">
          {icon}
        </div>
        <h3 className="text-white text-xl font-medium tracking-tight">
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

const Eyebrow = ({ children, center }) => (
  <p
    className={`text-aether-accent uppercase tracking-[0.25em] text-sm font-semibold mb-6 flex items-center gap-4 ${
      center ? 'justify-center' : ''
    }`}
  >
    <span className="w-12 h-[1px] bg-aether-accent/60" />
    {children}
    {center && <span className="w-12 h-[1px] bg-aether-accent/60" />}
  </p>
)

const stats = [
  { value: 500, suffix: ' MW', label: 'Hydropower & solar target' },
  { value: 50, suffix: ' MW', label: 'Clean-powered data centre' },
  { value: 5, suffix: '', label: 'Specialized companies' },
  { value: 100, suffix: '%', label: 'Community-majority platform' },
]

/* ---- CSR / community pillars ---- */
const csrPillars = [
  {
    title: 'Community Ownership',
    desc: 'Our agriculture and fisheries platform is structured so the majority stake is held by the local communities it serves — value stays where the work happens.',
    icon: (
      <path d="M3 21h18M5 21V7l8-4 8 4v14M9 9h.01M9 13h.01M9 17h.01M15 9h.01M15 13h.01M15 17h.01" />
    ),
  },
  {
    title: 'Education & Internships',
    desc: 'R&D partnerships, structured internships, and our Industry Talk program build local engineering capacity and open doors for the next generation.',
    icon: <path d="M22 10v6M2 10l10-5 10 5-10 5z M6 12v5c3 3 9 3 12 0v-5" />,
  },
  {
    title: 'Local Employment',
    desc: 'Every project prioritizes local hiring and skills transfer — from civil crews to plant operators — keeping livelihoods rooted in the regions we build in.',
    icon: (
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 7a4 4 0 1 0 0 0.01 M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75" />
    ),
  },
  {
    title: 'Environmental Stewardship',
    desc: 'Climate-resilient design, watershed protection, and habitat-conscious siting ensure our infrastructure leaves the landscape healthier than we found it.',
    icon: <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z M2 21c0-3 1.85-5.36 5.08-6" />,
  },
]

/* ---- community project highlights ---- */
const communityProjects = [
  {
    title: 'Kusaha Community Solar Fund',
    location: 'Sunsari District',
    blurb:
      'A share of revenue from the Kusaha Solar Farm funds local schools, clinics, and clean-water access for surrounding villages.',
    image:
      'https://images.unsplash.com/photo-1497440001374-f26997328c1b?q=80&w=900&h=650&fit=crop',
    tag: 'Energy Access',
  },
  {
    title: 'Highland Skills Academy',
    location: 'Karnali Province',
    blurb:
      'On-site training turning residents near our microgrid sites into certified solar technicians and grid operators.',
    image:
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=900&h=650&fit=crop',
    tag: 'Education',
  },
  {
    title: 'Terai Watershed Initiative',
    location: 'Eastern Nepal',
    blurb:
      'Reforestation and watershed restoration around our hydro and transmission corridors, co-managed with local cooperatives.',
    image:
      'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=900&h=650&fit=crop',
    tag: 'Environment',
  },
]

export default function About() {
  const [statsRef, statsInView] = useInView(0.4)

  return (
    <main className="relative bg-[#020203] font-sans">
      {/* ── Hero ───────────────────────────────── */}
      <section className="relative pt-40 pb-24 overflow-hidden bg-[#020203]">
        <SynergyBackground />
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_center,_rgba(0,240,152,0.12)_0%,_transparent_65%)]" />
        </div>
        <div className="absolute left-0 right-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[#020203] pointer-events-none z-[1]" />

        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <Eyebrow center>About The Group</Eyebrow>
          <h1 className="text-white text-5xl md:text-7xl font-medium tracking-tight mb-6">
            Who Are We
          </h1>
          <p className="text-aether-muted text-lg md:text-xl leading-relaxed text-balance">
            Aether Renova Holdings is a Nepali clean-energy group building the
            infrastructure tomorrow runs on — hydropower, solar, transmission,
            and the communities that power it&nbsp;all.
          </p>
        </div>
      </section>

      {/* ── Company story ──────────────────────── */}
      <section className="relative pt-20 md:pt-28 pb-0">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <Eyebrow>Our Story</Eyebrow>
            <h2 className="text-white text-3xl md:text-4xl font-medium tracking-tight mb-6">
              Building what tomorrow runs on
            </h2>
            <div className="space-y-5 text-aether-muted text-base leading-relaxed">
              <p>
                We develop hydropower and solar infrastructure engineered for
                enduring quality. Through five specialized companies, we deliver
                everything from civil construction to smart microgrids — one
                integrated ecosystem across Nepal.
              </p>
              <p>
                Looking ahead, we’re building toward 500&nbsp;MW of clean
                generation, a 50&nbsp;MW clean-powered data centre, and an
                agriculture and fisheries platform owned in the majority by
                local communities.
              </p>
            </div>
            <p className="text-white/90 text-lg italic border-l-2 border-aether-accent pl-5 mt-8">
              “We always leave the place a little bit better than we found it.”
            </p>
          </div>

          <div className="grid grid-cols-2 grid-rows-2 gap-4 h-[480px]">
            <div className="group relative rounded-2xl overflow-hidden border border-aether-border row-span-2">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&h=1200&fit=crop"
                alt="Aether Renova team collaborating"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div className="group relative rounded-2xl overflow-hidden border border-aether-border">
              <img
                src="https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=900&h=650&fit=crop"
                alt="Solar installation"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div className="group relative rounded-2xl overflow-hidden border border-aether-border">
              <img
                src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=900&h=650&fit=crop"
                alt="Hydropower landscape"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats band (sits close under Our Story) ─ */}
      <section className="relative pt-12 md:pt-16 pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto px-6">
          <StatBand stats={stats} />
        </div>
      </section>

      {/* ── Our Purpose (Mission & Vision) ─────── */}
      <section className="relative py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <Eyebrow center>Our Purpose · मूल्य मान्यता</Eyebrow>
            <h2 className="text-white text-3xl md:text-5xl font-medium tracking-tight">
              Core Values
            </h2>
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

          <div className="mt-14 grid grid-cols-2 md:grid-cols-5 gap-4">
            {values.map((value) => (
              <ValueCard key={value.title} {...value} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CSR pillars ────────────────────────── */}
      <section className="relative py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <Eyebrow center>Corporate Social Responsibility</Eyebrow>
            <h2 className="text-white text-3xl md:text-5xl font-medium tracking-tight mb-5">
              Power With Purpose
            </h2>
            <p className="text-aether-muted text-lg">
              We measure success not just in megawatts, but in the communities,
              careers, and ecosystems that grow alongside our projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {csrPillars.map((p) => (
              <div
                key={p.title}
                className="group relative bg-aether-card border border-aether-border rounded-2xl p-8 transition-all duration-500 hover:border-aether-accent/40 hover:bg-[#0c0c11]"
              >
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-aether-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="w-12 h-12 rounded-xl bg-aether-accent/10 border border-aether-accent/30 flex items-center justify-center text-aether-accent mb-5">
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {p.icon}
                  </svg>
                </div>
                <h3 className="text-white text-xl font-bold mb-3">{p.title}</h3>
                <p className="text-aether-muted text-sm leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Community projects ─────────────────── */}
      <section className="relative py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <Eyebrow center>In The Community</Eyebrow>
            <h2 className="text-white text-3xl md:text-5xl font-medium tracking-tight">
              Community Projects
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {communityProjects.map((proj) => (
              <article
                key={proj.title}
                className="group relative bg-aether-card border border-aether-border rounded-2xl overflow-hidden transition-all duration-500 hover:border-aether-accent/40 hover:-translate-y-1"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-aether-card to-transparent" />
                  <span className="absolute top-4 left-4 px-3 py-1 bg-aether-accent/20 backdrop-blur-sm border border-aether-accent/30 rounded-full text-aether-accent text-xs font-semibold uppercase tracking-wider">
                    {proj.tag}
                  </span>
                </div>
                <div className="p-6">
                  <p className="text-aether-accent text-xs font-semibold uppercase tracking-wider mb-2">
                    {proj.location}
                  </p>
                  <h3 className="text-white text-lg font-bold mb-3 leading-tight">
                    {proj.title}
                  </h3>
                  <p className="text-aether-muted text-sm leading-relaxed">
                    {proj.blurb}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────── */}
      <section className="relative py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-white text-3xl md:text-4xl font-medium tracking-tight mb-5">
            Build the future with us
          </h2>
          <p className="text-aether-muted text-lg mb-8">
            Whether you’re a partner, an investor, or a future teammate — we’d
            love to talk.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/team" variant="primary">
              Meet Our Team
            </Button>
            <Button href="/contact" variant="secondary" withArrow={false}>
              Get In Touch
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
