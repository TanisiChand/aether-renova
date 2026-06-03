import Logo from './Logo'

/* ---------------------------------------------------------------------------
   Social posts — premium, on-brand Instagram-format (4:5) cards shown at the
   end of the homepage in a horizontal carousel. Dark/editorial mockups that
   double as ready-to-share brand graphics, consistent with the site identity.
--------------------------------------------------------------------------- */

const COMPANIES = [
  { logo: '/logos/gridnepal.svg', tag: 'Hydro + Grid', name: 'Grid Nepal', sub: 'Transmission' },
  { logo: '/logos/weststar.svg', tag: 'Wind & Hydro', name: 'West Star', sub: 'Generation' },
  { logo: '/logos/terrasol.svg', tag: 'Solar', name: 'Terra Sol', sub: 'Solar Farms' },
  { logo: '/logos/solaeris.svg', tag: 'Microgrids', name: 'Solaeris', sub: 'Distribution' },
]

/* AETHER RENOVA lockup for dark cards */
function Brand({ className = '' }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Logo className="w-6 h-6 object-contain" />
      <div className="leading-none">
        <p className="font-montserrat font-bold text-white tracking-[0.14em] text-[10px]">
          AETHER RENOVA
        </p>
        <p className="text-aether-accent/70 tracking-[0.34em] text-[6px] mt-[3px]">
          HOLDINGS
        </p>
      </div>
    </div>
  )
}

function Handle() {
  return (
    <div className="flex items-center justify-between pt-3.5 border-t border-white/10">
      <span className="text-white/45 text-[9px] tracking-wide">@aetherrenova</span>
      <span className="text-aether-accent/80 text-[9px] tracking-wide">aetherrenova.com</span>
    </div>
  )
}

const Eyebrow = ({ children }) => (
  <p className="text-aether-accent font-semibold uppercase tracking-[0.22em] text-[9px] flex items-center gap-2">
    <span className="w-4 h-px bg-aether-accent/70" />
    {children}
  </p>
)

/* 4:5 dark card frame */
function Card({ children, className = '' }) {
  return (
    <div
      className={`relative shrink-0 snap-start w-[280px] sm:w-[316px] aspect-[4/5] rounded-3xl overflow-hidden ring-1 ring-white/10 shadow-[0_28px_80px_rgba(0,0,0,0.6)] bg-gradient-to-b from-[#0a1712] to-[#050608] ${className}`}
    >
      {children}
    </div>
  )
}

export default function SocialPosts() {
  return (
    <section className="relative bg-[#020203] py-20 md:py-28 overflow-hidden border-t border-aether-border/40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-aether-accent uppercase tracking-[0.25em] text-sm font-semibold mb-4 flex items-center gap-3">
              <span className="w-10 h-[1px] bg-aether-accent" />
              From The Feed
            </p>
            <h2 className="text-white text-3xl md:text-5xl font-medium tracking-tight">
              Built in the open
            </h2>
          </div>
          <a
            href="https://instagram.com/aetherrenova"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-aether-accent text-sm font-semibold tracking-wide hover:gap-3 transition-all"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2.5" y="2.5" width="19" height="19" rx="5.5" /><circle cx="12" cy="12" r="4.2" /><circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" /></svg>
            @aetherrenova
          </a>
        </div>

        {/* carousel */}
        <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {/* ── Post 1: full-bleed image hero ── */}
          <Card>
            <img
              src="https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=900&h=1125&fit=crop"
              alt="Clean energy infrastructure"
              className="absolute inset-0 w-full h-full object-cover opacity-90"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#040605] via-[#040605]/55 to-[#040605]/20" />
            <div className="absolute inset-0 p-6 flex flex-col">
              <Brand />
              <div className="mt-auto">
                <Eyebrow>Clean Energy · Nepal</Eyebrow>
                <h3 className="font-montserrat font-semibold text-white leading-[1.08] mt-3" style={{ fontSize: 27 }}>
                  We build what tomorrow runs&nbsp;on.
                </h3>
                <p className="text-aether-accent text-[10.5px] tracking-wide mt-2.5">
                  Innovation. Sustainability. Strength.
                </p>
              </div>
            </div>
          </Card>

          {/* ── Post 2: image band + statement ── */}
          <Card>
            <div className="h-[46%] relative overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=900&h=560&fit=crop"
                alt="Engineering & collaboration"
                className="w-full h-full object-cover opacity-85"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1712] via-transparent to-transparent" />
              <div className="absolute top-5 left-5"><Brand /></div>
            </div>
            <div className="h-[54%] p-6 flex flex-col">
              <Eyebrow>Engineering &amp; Collaboration</Eyebrow>
              <h3 className="font-montserrat font-semibold text-white leading-[1.05] mt-3" style={{ fontSize: 28 }}>
                Built together.<br />Built to last.
              </h3>
              <p className="text-white/55 leading-relaxed mt-3" style={{ fontSize: 10.5 }}>
                Engineering discipline meets community partnership — we design,
                build, and operate alongside the people and places we serve.
              </p>
              <div className="mt-auto"><Handle /></div>
            </div>
          </Card>

          {/* ── Post 3: all-type promise ── */}
          <Card>
            <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-aether-accent/10 blur-3xl" />
            <div className="relative h-full p-7 flex flex-col">
              <Brand />
              <div className="mt-7"><Eyebrow>Our Promise</Eyebrow></div>
              <h3 className="font-montserrat font-bold text-white leading-[1.05] mt-6" style={{ fontSize: 32 }}>
                We build what tomorrow runs&nbsp;on.
              </h3>
              <p className="text-white/55 leading-relaxed mt-4" style={{ fontSize: 11 }}>
                Clean energy isn’t a product category for us — it’s
                infrastructure that outlasts us. Built with engineering
                discipline, community ownership, and a commitment to leaving
                every place better than we found it.
              </p>
              <div className="mt-auto">
                <p className="text-aether-accent/90 font-medium tracking-wide mb-3" style={{ fontSize: 9.5 }}>
                  #AetherRenova&nbsp;&nbsp;#CleanEnergy&nbsp;&nbsp;#Nepal&nbsp;&nbsp;#BuildingTomorrow
                </p>
                <Handle />
              </div>
            </div>
          </Card>

          {/* ── Post 4: the group ── */}
          <Card>
            <div className="h-full p-6 flex flex-col">
              <Brand />
              <div className="mt-5"><Eyebrow>The Group</Eyebrow></div>
              <h3 className="font-montserrat font-bold text-white leading-[1.02] mt-3" style={{ fontSize: 27 }}>
                Four companies.<br />One mission.
              </h3>
              <div className="grid grid-cols-2 gap-2.5 mt-5">
                {COMPANIES.map((c) => (
                  <div key={c.name} className="rounded-xl bg-white/[0.04] ring-1 ring-white/10 p-3 flex flex-col">
                    <div className="h-8 flex items-center justify-center mb-2">
                      <img src={c.logo} alt={c.name} className="max-h-7 max-w-[80%] object-contain" draggable="false" />
                    </div>
                    <p className="text-aether-accent uppercase tracking-wider font-semibold" style={{ fontSize: 6.5 }}>{c.tag}</p>
                    <p className="font-montserrat font-bold text-white leading-tight" style={{ fontSize: 13 }}>{c.name}</p>
                    <p className="text-white/40" style={{ fontSize: 8 }}>{c.sub}</p>
                  </div>
                ))}
              </div>
              <div className="mt-auto pt-4"><Handle /></div>
            </div>
          </Card>
        </div>

        <p className="text-aether-muted text-sm mt-6">
          Swipe through — ready-to-share brand graphics in Instagram format.
        </p>
      </div>
    </section>
  )
}
