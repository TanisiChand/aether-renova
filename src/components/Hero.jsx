import Button from './Button'

const projects = [
  {
    category: 'Hydropower',
    name: 'Haru Ko',
    image:
      'https://images.unsplash.com/photo-1538300342682-cf57afb97285?w=800&h=900&fit=crop',
  },
  {
    category: 'Transmission',
    name: 'Kusaha',
    image:
      'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=700&h=500&fit=crop',
  },
  {
    category: 'Grid Tech',
    name: 'Dhalkebar',
    image:
      'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=700&h=500&fit=crop',
  },
  {
    category: 'Infrastructure',
    name: 'Chameliya',
    image:
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=700&h=500&fit=crop',
  },
  {
    category: 'Solar Farm',
    name: 'Chettigad',
    image:
      'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=700&h=500&fit=crop',
  },
]

export default function Hero() {
  return (
    <section className="hero">
      <div className="halo" />
      <div className="hero-fade" />
      <div className="hero-inner">
        <div className="hero-content">
          <span className="hero-label">Leading Nepal's Energy Future</span>
          <h1>AETHER RENOVA</h1>
          <p>
            We build what tomorrow runs on. Developing next-generation
            infrastructure for a sustainable, resilient, and electrified Nepal.
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Button href="#companies" variant="primary" withArrow={false}>
              Our Ecosystem
            </Button>
            <Button href="#story" variant="secondary" withArrow={false}>
              Our Mission
            </Button>
          </div>
        </div>
        <div className="hero-visual" id="projects">
          {projects.map((project) => (
            <div className="project-card" key={project.name}>
              <img
                className="project-card-img"
                src={project.image}
                alt={project.name}
                loading="lazy"
              />
              <div className="project-card-overlay" />
              <span>{project.category}</span>
              <h3>{project.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
