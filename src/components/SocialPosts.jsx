/* ---------------------------------------------------------------------------
   Social posts — minimal, professional Instagram-format (4:5) cards shown at
   the end of the homepage, in a horizontal carousel. Light/editorial mockups
   that double as ready-to-share brand graphics.
--------------------------------------------------------------------------- */

const G = '#0c9d72' // post accent green (reads well on light cards)
const PAPER = '#f4f2ec'

/* AETHER RENOVA HOLDINGS lockup in black (for light cards) */
function Brand({ small }) {
  return (
    <div className="flex items-center gap-2.5">
      <img
        src="/logos/aether.svg"
        alt="Aether Renova"
        className={small ? 'w-7 h-7' : 'w-9 h-9'}
        style={{ filter: 'brightness(0)' }}
        draggable="false"
      />
      <div className="leading-[1.05]">
        <p className="font-montserrat font-extrabold text-black tracking-[0.08em]" style={{ fontSize: small ? 11 : 13 }}>
          AETHER
        </p>
        <p className="font-montserrat font-extrabold text-black tracking-[0.08em]" style={{ fontSize: small ? 11 : 13 }}>
          RENOVA
        </p>
        <p className="text-black/70 tracking-[0.34em]" style={{ fontSize: small ? 5.5 : 6.5 }}>
          HOLDINGS
        </p>
      </div>
    </div>
  )
}

/* shared card frame — Instagram portrait 4:5 */
function Card({ children, className = '' }) {
  return (
    <div
      className={`relative shrink-0 snap-start w-[280px] sm:w-[320px] aspect-[4/5] rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.45)] ring-1 ring-black/5 ${className}`}
      style={{ background: PAPER }}
    >
      {children}
    </div>
  )
}

const Eyebrow = ({ children }) => (
  <p className="font-semibold tracking-[0.18em] uppercase" style={{ color: G, fontSize: 9.5 }}>
    {children}
  </p>
)

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
          {/* ── Post 1: image + caption ── */}
          <Card>
            <div className="h-[58%] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?q=80&w=900&h=700&fit=crop"
                alt="Hydropower & solar"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="h-[42%] px-5 py-5 flex flex-col justify-center">
              <Brand small />
              <div className="flex gap-3 mt-3.5">
                <span className="w-[3px] rounded-full shrink-0" style={{ background: G }} />
                <h3 className="font-display font-semibold text-black leading-[1.08]" style={{ fontSize: 22 }}>
                  We build what tomorrow runs on.
                </h3>
              </div>
              <p className="font-medium mt-2.5" style={{ color: G, fontSize: 11 }}>
                Innovation. Sustainability. Strength.
              </p>
            </div>
          </Card>

          {/* ── Post 2: image + headline ── */}
          <Card>
            <div className="h-[55%] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=900&h=700&fit=crop"
                alt="Engineering & collaboration"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="h-[45%] px-5 py-5 flex flex-col justify-center">
              <Eyebrow>Engineering &amp; Collaboration</Eyebrow>
              <h3 className="font-display font-semibold text-black leading-[1.05] mt-2" style={{ fontSize: 26 }}>
                Built together.<br />Built to last.
              </h3>
              <p className="text-black/55 leading-relaxed mt-3" style={{ fontSize: 10.5 }}>
                Engineering discipline meets community partnership — we design,
                build, and operate alongside the people and places we serve.
              </p>
            </div>
          </Card>

          {/* ── Post 3: all-type promise ── */}
          <Card>
            <div className="h-full px-6 py-7 flex flex-col">
              <Brand />
              <div className="mt-6">
                <Eyebrow>Our Promise</Eyebrow>
              </div>
              <h3 className="font-display font-bold text-black leading-[1.04] mt-7" style={{ fontSize: 30 }}>
                We build what tomorrow runs on.
              </h3>
              <p className="text-black/55 leading-relaxed mt-4" style={{ fontSize: 11 }}>
                Clean energy isn’t a product category for us — it’s infrastructure
                that outlasts us. Built with engineering discipline, community
                ownership, and a commitment to leaving every place better than we
                found it.
              </p>
              <div className="mt-auto pt-5 border-t border-black/10">
                <p className="text-black" style={{ fontSize: 10.5 }}>
                  <span className="font-bold">@aetherrenova</span>
                  <span className="text-black/50">&nbsp;&nbsp;·&nbsp;&nbsp;aetherrenova.com</span>
                </p>
                <p className="mt-2 font-medium" style={{ color: G, fontSize: 9.5 }}>
                  #AetherRenova #CleanEnergy #Nepal #BuildingTomorrow
                </p>
              </div>
            </div>
          </Card>

          {/* ── Post 4: the group ── */}
          <Card>
            <div className="h-full px-6 py-7 flex flex-col">
              <Brand />
              <div className="mt-5">
                <Eyebrow>The Group</Eyebrow>
                <p className="text-black/45 mt-0.5" style={{ fontSize: 9.5 }}>Subsidiaries Overview</p>
              </div>
              <h3 className="font-display font-bold text-black leading-[1.02] mt-4" style={{ fontSize: 27 }}>
                Four companies.<br />One mission.
              </h3>
              <div className="grid grid-cols-2 gap-2.5 mt-5">
                {[
                  { logo: '/logos/gridnepal.svg', tag: 'Hydro + Grid', name: 'Grid Nepal', sub: 'Hydropower' },
                  { logo: '/logos/weststar.svg', tag: 'Hydropower', name: 'West Star', sub: 'Hydropower' },
                  { logo: '/logos/terrasol.svg', tag: 'Solar', name: 'Terra Sol', sub: 'Energy' },
                  { logo: '/logos/solaeris.svg', tag: 'Solar', name: 'Solaeris', sub: 'Energy' },
                ].map((c) => (
                  <div key={c.name} className="relative rounded-lg bg-white/70 ring-1 ring-black/5 p-2.5 pl-3 overflow-hidden">
                    <span className="absolute left-0 top-2 bottom-2 w-[2.5px] rounded-full" style={{ background: G }} />
                    <div className="h-7 flex items-center justify-center mb-1.5">
                      <img src={c.logo} alt={c.name} className="max-h-6 max-w-full object-contain" style={{ filter: 'brightness(0)' }} draggable="false" />
                    </div>
                    <p className="uppercase tracking-wider font-semibold" style={{ color: G, fontSize: 6.5 }}>{c.tag}</p>
                    <p className="font-display font-bold text-black leading-tight" style={{ fontSize: 13 }}>{c.name}</p>
                    <p className="text-black/45" style={{ fontSize: 8 }}>{c.sub}</p>
                  </div>
                ))}
              </div>
              <p className="text-black/45 leading-relaxed mt-auto pt-4" style={{ fontSize: 8.5 }}>
                Each subsidiary operates independently — under unified standards,
                shared values, and one long-term vision.
              </p>
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
