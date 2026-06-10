import { useState } from 'react'
import { Link } from 'react-router-dom'
import SynergyBackground from '../components/SynergyBackground'
import { articles } from '../data/articles'

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

const ArrowIcon = () => (
  <svg
    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

const categories = ['All', 'Analysis', 'Innovation', 'Community', 'Engineering', 'Grid']

function Meta({ article, className = '' }) {
  return (
    <div className={`flex items-center gap-3 text-aether-muted text-xs ${className}`}>
      <span>{article.date}</span>
      <span className="w-1 h-1 rounded-full bg-aether-accent/50" />
      <span>{article.read}</span>
    </div>
  )
}

function Author({ article }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-aether-accent/20 flex items-center justify-center">
        <span className="text-aether-accent text-xs font-bold">
          {article.initials}
        </span>
      </div>
      <span className="text-white/70 text-xs font-medium">{article.author}</span>
    </div>
  )
}

function FeaturedPost({ article }) {
  return (
    <Link to={`/blog/${article.slug}`} className="group block">
      <article className="relative grid grid-cols-1 lg:grid-cols-2 bg-aether-card border border-aether-border rounded-3xl overflow-hidden transition-all duration-500 hover:border-aether-accent/40">
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-aether-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
        <div className="relative min-h-[280px] lg:min-h-[420px] overflow-hidden">
          <img
            src={article.img}
            alt={article.alt}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-aether-card via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-aether-card" />
          <span className="absolute top-5 left-5 px-3 py-1 bg-aether-accent text-black rounded-full text-xs font-bold uppercase tracking-wider">
            Featured
          </span>
        </div>
        <div className="p-8 lg:p-12 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-aether-accent/20 border border-aether-accent/30 rounded-full text-aether-accent text-xs font-semibold uppercase tracking-wider">
              {article.tag}
            </span>
            <Meta article={article} />
          </div>
          <h2 className="text-white text-2xl lg:text-3xl font-bold leading-tight mb-4 group-hover:text-aether-accent transition-colors">
            {article.title}
          </h2>
          <p className="text-aether-muted text-base leading-relaxed mb-6">
            {article.excerpt}
          </p>
          <div className="flex items-center justify-between">
            <Author article={article} />
            <span className="flex items-center gap-2 text-aether-accent text-sm font-semibold">
              Read Article
              <ArrowIcon />
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}

function PostCard({ article }) {
  return (
    <Link to={`/blog/${article.slug}`} className="group block">
      <article className="relative h-full bg-aether-card border border-aether-border rounded-2xl overflow-hidden transition-all duration-700 hover:border-aether-accent/40 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,240,152,0.1)]">
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-aether-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative h-[200px] overflow-hidden">
          <img
            src={article.img}
            alt={article.alt}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-aether-card via-aether-card/20 to-transparent" />
          <span className="absolute top-4 left-4 px-3 py-1 bg-aether-accent/20 backdrop-blur-sm border border-aether-accent/30 rounded-full text-aether-accent text-xs font-semibold uppercase tracking-wider">
            {article.tag}
          </span>
        </div>
        <div className="p-6">
          <Meta article={article} className="mb-4" />
          <h3 className="text-white text-xl font-bold mb-3 leading-tight group-hover:text-aether-accent transition-colors duration-300">
            {article.title}
          </h3>
          <p className="text-aether-muted text-sm leading-relaxed mb-4 line-clamp-3">
            {article.excerpt}
          </p>
          <div className="flex items-center justify-between pt-4 border-t border-aether-border group-hover:border-aether-accent/20 transition-colors">
            <Author article={article} />
            <span className="flex items-center gap-2 text-aether-accent text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300">
              Read
              <ArrowIcon />
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}

export default function Blog() {
  const [active, setActive] = useState('All')
  const featured = articles.find((a) => a.featured) || articles[0]
  const rest = articles.filter((a) => a !== featured)
  const visible =
    active === 'All' ? rest : rest.filter((a) => a.tag === active)

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
          <Eyebrow center>Watts Up Aether</Eyebrow>
          <h1 className="text-white text-5xl md:text-7xl font-medium tracking-tight mb-6">
            Watts Up Aether
          </h1>
          <p className="text-aether-muted text-lg md:text-xl leading-relaxed">
            Stories, analysis, and perspectives from Nepal’s energy
            transformation.
          </p>
        </div>
      </section>

      {/* ── Featured ───────────────────────────── */}
      <section className="relative py-10">
        <div className="max-w-7xl mx-auto px-6">
          <FeaturedPost article={featured} />
        </div>
      </section>

      {/* ── All posts ──────────────────────────── */}
      <section className="relative py-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* category filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((c) => {
              const count =
                c === 'All' ? rest.length : rest.filter((a) => a.tag === c).length
              if (c !== 'All' && count === 0) return null
              return (
                <button
                  key={c}
                  onClick={() => setActive(c)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold uppercase tracking-wider border transition-all duration-300 ${
                    active === c
                      ? 'bg-aether-accent text-black border-aether-accent'
                      : 'bg-transparent text-aether-muted border-aether-border hover:border-aether-accent/50 hover:text-white'
                  }`}
                >
                  {c}
                  <span className="ml-2 opacity-60">{count}</span>
                </button>
              )
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visible.map((article) => (
              <PostCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
