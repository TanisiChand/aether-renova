import { Link } from 'react-router-dom'
import StatBand from './StatBand'

const IR_EMAIL = 'investors@aetherrenova.com'
const DECK_MAILTO = `mailto:${IR_EMAIL}?subject=${encodeURIComponent(
  'Investor Deck Request — Aether Renova Holdings',
)}`

const highlights = [
  { value: 500, suffix: ' MW', label: 'Generation pipeline' },
  { value: 5, label: 'Companies' },
  { value: 4, label: 'Active projects' },
]

export default function InvestCTA() {
  return (
    <section className="relative py-20 md:py-28 font-sans z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative rounded-3xl border border-aether-accent/20 bg-gradient-to-br from-[#08140f] via-[#06100c] to-[#020203] overflow-hidden">
          {/* glow accents */}
          <div className="absolute -top-24 -right-16 w-72 h-72 bg-aether-accent/10 rounded-full blur-[90px] pointer-events-none" />
          <div className="absolute -bottom-24 -left-16 w-72 h-72 bg-aether-accent/5 rounded-full blur-[90px] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(0,240,152,0.10)_0%,_transparent_55%)] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center p-6 sm:p-9 md:p-14">
            {/* copy */}
            <div>
              <p className="text-aether-accent uppercase tracking-[0.25em] text-sm font-semibold mb-5 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-aether-accent" />
                Investor Relations
              </p>
              <h2 className="text-white text-4xl md:text-5xl font-medium tracking-tight leading-tight mb-5">
                Partner with us
                <span className="block text-aether-accent">as we build</span>
              </h2>
              <p className="text-aether-muted text-base leading-relaxed mb-8 max-w-lg">
                Mindful of a changing climate and a planet worth protecting, we
                are building a renewable-energy company with a balanced portfolio
                of hydropower, solar, and pumped-storage projects. This
                diversification spreads risk and strengthens long-term returns,
                while giving partners access to credible, well-structured
                green-energy ventures in one of the region’s most promising
                markets.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/investors"
                  className="group inline-flex items-center justify-center gap-2 rounded-full font-sans font-semibold tracking-wide transition-all duration-300 px-8 py-4 text-sm bg-aether-accent text-black hover:shadow-[0_0_30px_rgba(0,240,152,0.4)] hover:-translate-y-0.5"
                >
                  Why With Us
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
                <a
                  href={DECK_MAILTO}
                  className="inline-flex items-center justify-center gap-2 rounded-full font-sans font-semibold tracking-wide transition-all duration-300 px-8 py-4 text-sm bg-white/[0.06] border border-white/30 text-white hover:border-aether-accent hover:bg-aether-accent/10 hover:text-aether-accent"
                >
                  Request Deck
                </a>
              </div>
            </div>

            {/* highlight stats */}
            <StatBand
              stats={highlights}
              variant="panel"
              size="sm"
              className="relative z-20 bg-[#080f0c]/70 border-aether-accent/20"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
