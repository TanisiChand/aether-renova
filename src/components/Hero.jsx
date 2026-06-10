import { Link } from 'react-router-dom'
import Button from './Button'
import SynergyBackground from './SynergyBackground'
import { projects } from '../data/projects'

export default function Hero() {
  return (
    <section className="hero">
      <SynergyBackground />
      <div className="halo" />
      <div className="hero-fade" />
      <div className="hero-inner">
        <div className="hero-content">
          <span className="hero-label">Leading Nepal's Energy Future</span>
          <h1>Aether Renova</h1>
          <p>
            We build what tomorrow runs on — we are working relentlessly to
            leave the world a little bit brighter than we found it.
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Button href="/projects" variant="primary" withArrow={false}>
              Our Projects
            </Button>
            <Button href="/about" variant="secondary" withArrow={false}>
              Our Mission
            </Button>
          </div>
        </div>
        <div className="hero-visual" id="projects">
          {projects.map((project) => (
            <Link
              className="project-card"
              key={project.id}
              to={project.detailUrl || '/projects'}
            >
              <img
                className="project-card-img"
                src={project.image}
                alt={project.name}
                loading="lazy"
              />
              <div className="project-card-overlay" />
              <span>{project.type}</span>
              <h3>{project.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
