import { useParams, Link } from 'react-router-dom'
import { articles } from '../data/articles'
import Button from '../components/Button'

const ArrowLeftIcon = () => (
  <svg
    className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 12H5M11 18l-6-6 6-6" />
  </svg>
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

function Block({ block }) {
  switch (block.type) {
    case 'h2':
      return (
        <h2 className="text-white text-2xl md:text-3xl font-bold tracking-tight mt-12 mb-4">
          {block.text}
        </h2>
      )
    case 'quote':
      return (
        <blockquote className="my-10 border-l-2 border-aether-accent pl-6">
          <p className="text-white/90 text-xl md:text-2xl italic leading-relaxed">
            “{block.text}”
          </p>
        </blockquote>
      )
    case 'list':
      return (
        <ul className="my-6 space-y-3">
          {block.items.map((item) => (
            <li key={item} className="flex items-start gap-3 text-aether-muted">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-aether-accent shrink-0" />
              <span className="text-lg leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      )
    default:
      return (
        <p className="text-aether-muted text-lg leading-relaxed mb-6">
          {block.text}
        </p>
      )
  }
}

export default function BlogPost() {
  const { slug } = useParams()
  const article = articles.find((a) => a.slug === slug)

  if (!article) {
    return (
      <main className="relative bg-[#020203] font-sans min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-aether-accent uppercase tracking-[0.25em] text-sm font-semibold mb-4">
            404
          </p>
          <h1 className="text-white text-3xl font-bold mb-6">
            Article not found
          </h1>
          <Button href="/blog" variant="primary">
            Back to Blog
          </Button>
        </div>
      </main>
    )
  }

  const related = articles.filter((a) => a.slug !== article.slug).slice(0, 2)

  return (
    <main className="relative bg-[#020203] font-sans">
      {/* ── Article header ─────────────────────── */}
      <article className="relative pt-36 pb-20">
        <div className="max-w-3xl mx-auto px-6">
          <Link
            to="/blog"
            className="group inline-flex items-center gap-2 text-aether-muted hover:text-aether-accent text-sm font-medium mb-10 transition-colors"
          >
            <ArrowLeftIcon />
            Back to Blog
          </Link>

          <div className="mb-6">
            <span className="inline-block px-3 py-1 bg-aether-accent/20 border border-aether-accent/30 rounded-full text-aether-accent text-xs font-semibold uppercase tracking-wider">
              {article.tag}
            </span>
          </div>

          <h1 className="text-white text-3xl md:text-5xl font-bold tracking-tight leading-tight mb-6">
            {article.title}
          </h1>

          <p className="text-aether-muted text-lg md:text-xl leading-relaxed mb-8">
            {article.excerpt}
          </p>

          <div className="flex items-center gap-4 pb-8 border-b border-aether-border">
            <div className="w-11 h-11 rounded-full bg-aether-accent/20 flex items-center justify-center">
              <span className="text-aether-accent text-sm font-bold">
                {article.initials}
              </span>
            </div>
            <div>
              <p className="text-white text-sm font-semibold">
                {article.author}
              </p>
              <p className="text-aether-muted text-xs">
                {article.authorRole ? `${article.authorRole} · ` : ''}
                {article.date} · {article.read}
              </p>
            </div>
          </div>
        </div>

        {/* hero image */}
        <div className="max-w-5xl mx-auto px-6 mt-10">
          <div className="relative rounded-3xl overflow-hidden border border-aether-border aspect-[16/9]">
            <img
              src={article.img}
              alt={article.alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020203]/40 to-transparent" />
          </div>
        </div>

        {/* body */}
        <div className="max-w-3xl mx-auto px-6 mt-12">
          {(article.body || []).map((block, i) => (
            <Block key={i} block={block} />
          ))}

          {/* share / footer */}
          <div className="mt-14 pt-8 border-t border-aether-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-full bg-aether-accent/20 flex items-center justify-center">
                <span className="text-aether-accent text-sm font-bold">
                  {article.initials}
                </span>
              </div>
              <div>
                <p className="text-white text-sm font-semibold">
                  {article.author}
                </p>
                {article.authorRole && (
                  <p className="text-aether-muted text-xs">
                    {article.authorRole}
                  </p>
                )}
              </div>
            </div>
            <Button href="/contact" variant="secondary" withArrow={false}>
              Get In Touch
            </Button>
          </div>
        </div>
      </article>

      {/* ── Related ────────────────────────────── */}
      {related.length > 0 && (
        <section className="relative py-24 md:py-32 border-t border-aether-border/50">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-white text-2xl font-bold tracking-tight mb-8">
              More from the Grid
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {related.map((a) => (
                <Link
                  key={a.slug}
                  to={`/blog/${a.slug}`}
                  className="group block"
                >
                  <article className="relative h-full bg-aether-card border border-aether-border rounded-2xl overflow-hidden transition-all duration-500 hover:border-aether-accent/40 hover:-translate-y-1">
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={a.img}
                        alt={a.alt}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-aether-card to-transparent" />
                      <span className="absolute top-4 left-4 px-3 py-1 bg-aether-accent/20 backdrop-blur-sm border border-aether-accent/30 rounded-full text-aether-accent text-xs font-semibold uppercase tracking-wider">
                        {a.tag}
                      </span>
                    </div>
                    <div className="p-6">
                      <h3 className="text-white text-lg font-bold leading-tight mb-3 group-hover:text-aether-accent transition-colors">
                        {a.title}
                      </h3>
                      <span className="flex items-center gap-2 text-aether-accent text-sm font-semibold">
                        Read
                        <ArrowIcon />
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
