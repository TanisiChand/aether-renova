import { Link } from 'react-router-dom'

const IR_EMAIL = 'investors@aetherrenova.com'
const DECK_MAILTO = `mailto:${IR_EMAIL}?subject=${encodeURIComponent(
  'Investor Deck Request — Aether Renova Holdings',
)}`

const highlights = [
  { value: '500', suffix: ' MW', label: 'Generation pipeline' },
  { value: '5', suffix: '', label: 'Operating companies' },
  { value: '100', suffix: '%', label: 'Community-majority' },
]

export default function InvestCTA() {
  return (
    <section className="relative py-24 font-sans z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative rounded-3xl border border-aether-accent/20 bg-gradient-to-br from-[#08140f] via-[#06100c] to-[#020203] overflow-hidden">
          {/* glow accents */}
          <div className="absolute -top-24 -right-16 w-72 h-72 bg-aether-accent/10 rounded-full blur-[90px] pointer-events-none" />
          <div className="absolute -bottom-24 -left-16 w-72 h-72 bg-aether-accent/5 rounded-full blur-[90px] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(0,240,152,0.10)_0%,_transparent_55%)] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center p-9 md:p-14">
            {/* copy */}
            <div>
              <p className="text-aether-accent uppercase tracking-[0.25em] text-sm font-semibold mb-5 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-aether-accent" />
                Investor Relations
              </p>
              <h2 className="text-white text-4xl md:text-5xl font-bold tracking-tight uppercase leading-tight mb-5">
                Invest in Nepal’s
                <span className="block text-aether-accent">Energy Future</span>
              </h2>
              <p className="text-aether-muted text-lg leading-relaxed mb-8 max-w-lg">
                A vertically-integrated clean-energy platform with a 500&nbsp;MW
                pipeline, an operating solar asset, and a community-anchored
                model built for durable, responsible returns.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/investors"
                  className="group inline-flex items-center justify-center gap-2 rounded-full font-sans font-bold uppercase tracking-wider transition-all duration-300 px-8 py-4 text-sm bg-aether-accent text-black hover:shadow-[0_0_30px_rgba(0,240,152,0.4)] hover:-translate-y-0.5"
                >
                  Why Invest in Us
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
                <a
                  href={DECK_MAILTO}
                  className="inline-flex items-center justify-center gap-2 rounded-full font-sans font-bold uppercase tracking-wider transition-all duration-300 px-8 py-4 text-sm bg-transparent border border-aether-border text-white hover:border-aether-accent hover:bg-aether-accent/10 hover:text-aether-accent"
                >
                  Request Deck
                </a>
              </div>
            </div>

            {/* highlight stats */}
            <div className="grid grid-cols-3 gap-4">
              {highlights.map((h) => (
                <div
                  key={h.label}
                  className="rounded-2xl border border-aether-border bg-[#020203]/40 px-4 py-7 text-center transition-all duration-300 hover:border-aether-accent/40 hover:bg-[#0c0c11]"
                >
                  <div className="text-aether-accent text-3xl md:text-4xl font-bold tracking-tight leading-none">
                    {h.value}
                    {h.suffix && <span className="text-xl">{h.suffix}</span>}
                  </div>
                  <div className="text-aether-muted text-[11px] uppercase tracking-wider mt-3 leading-snug">
                    {h.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
