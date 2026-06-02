import Button from './Button'

const ArrowIcon = ({ className = 'w-4 h-4' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M17 8l4 4m0 0l-4 4m4-4H3"
    />
  </svg>
)

const articles = [
  {
    img: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=500&fit=crop',
    alt: 'Solar panels in Nepal mountains',
    tag: 'Innovation',
    date: 'Jan 15, 2024',
    read: '5 min read',
    title:
      'Harnessing Himalayan Winds: The Future of High-Altitude Wind Energy',
    excerpt:
      "Exploring how Nepal's unique topography presents unprecedented opportunities for wind energy generation in previously inaccessible regions.",
    initials: 'RS',
    author: 'Ravi Sharma',
  },
  {
    img: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=500&fit=crop',
    alt: 'Solar farm workers',
    tag: 'Community',
    date: 'Jan 10, 2024',
    read: '8 min read',
    title: "Powering Remote Villages: Kusaha's Impact on Local Communities",
    excerpt:
      'How our flagship solar installation is transforming lives in Sunsari District through sustainable employment and energy access.',
    initials: 'AP',
    author: 'Anita Poudel',
  },
  {
    img: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=500&fit=crop',
    alt: 'Engineering team',
    tag: 'Engineering',
    date: 'Jan 5, 2024',
    read: '6 min read',
    title:
      'Building for Tomorrow: Our Approach to Climate-Resilient Infrastructure',
    excerpt:
      "Engineering insights into designing energy infrastructure that withstands Nepal's monsoon seasons and seismic challenges.",
    initials: 'BK',
    author: 'Bikash Koirala',
  },
]

function ArticleCard({ article }) {
  return (
    <article className="group cursor-pointer">
      <div className="relative bg-aether-card border border-aether-border rounded-2xl overflow-hidden transition-all duration-700 hover:border-aether-accent/40 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,240,152,0.1)]">
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-aether-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative h-[220px] overflow-hidden">
          <img
            src={article.img}
            alt={article.alt}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-aether-card via-aether-card/20 to-transparent" />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-aether-accent/20 backdrop-blur-sm border border-aether-accent/30 rounded-full text-aether-accent text-xs font-semibold uppercase tracking-wider">
              {article.tag}
            </span>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-3 mb-4 text-aether-muted text-xs">
            <span>{article.date}</span>
            <span className="w-1 h-1 rounded-full bg-aether-accent/50" />
            <span>{article.read}</span>
          </div>

          <h3 className="text-white text-xl font-bold mb-3 leading-tight group-hover:text-aether-accent transition-colors duration-300">
            {article.title}
          </h3>

          <p className="text-aether-muted text-sm leading-relaxed mb-4 line-clamp-3">
            {article.excerpt}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-aether-border group-hover:border-aether-accent/20 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-aether-accent/20 flex items-center justify-center">
                <span className="text-aether-accent text-xs font-bold">
                  {article.initials}
                </span>
              </div>
              <span className="text-white/70 text-xs font-medium">
                {article.author}
              </span>
            </div>

            <div className="flex items-center gap-2 text-aether-accent text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
              <span>Read</span>
              <ArrowIcon />
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default function FromTheGrid() {
  return (
    <section
      id="community"
      className="relative py-24 md:py-32 bg-gradient-to-b from-[#020203] via-[#0a1510] to-[#020203] font-sans z-10 overflow-hidden"
    >
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,240,152,0.15)_0%,_transparent_70%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-14">
          <p className="text-aether-accent uppercase tracking-[0.25em] text-sm font-semibold mb-6 flex items-center justify-center gap-4">
            <span className="w-16 h-[1px] bg-aether-accent/50" />
            Latest Insights
            <span className="w-16 h-[1px] bg-aether-accent/50" />
          </p>
          <h2 className="text-white text-5xl md:text-6xl font-bold tracking-tight uppercase mb-6">
            From The Grid
          </h2>
          <p className="text-aether-muted text-lg max-w-xl mx-auto">
            Stories, updates, and perspectives from Nepal's energy
            transformation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <ArticleCard key={article.title} article={article} />
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Button href="/blog" variant="secondary">
            View All Articles
          </Button>
        </div>
      </div>
    </section>
  )
}
