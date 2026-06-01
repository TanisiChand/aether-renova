import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import LanguageSwitcher from './LanguageSwitcher'
import NavDropdown from './NavDropdown'
import Logo from './Logo'
import Button from './Button'
import { projects } from '../data/projects'

const projectItems = projects.map((p) => ({
  to: p.detailUrl || `/projects#${p.id}`,
  name: p.name,
  tag: `${p.capacity} · ${p.company}`,
  logo: p.companyLogo,
}))

const companyItems = [
  { to: '/companies#terra-sol', name: 'Terra Sol', tag: 'Solar Farms', logo: '/logos/terrasol.svg' },
  { to: '/companies#solaeris', name: 'Solaeris', tag: 'Microgrids', logo: '/logos/solaeris.svg' },
  { to: '/companies#grid-nepal', name: 'Grid Nepal', tag: 'Transmission', logo: '/logos/gridnepal.svg' },
  { to: '/companies#west-star', name: 'West Star', tag: 'Wind & Hydro', logo: '/logos/weststar.svg' },
  {
    to: '/companies#aether-construction',
    name: 'Aether Construction',
    tag: 'Civil & Heavy Infra',
    logo: '/logos/aether.svg',
  },
]

const aboutItems = [
  { to: '/about', name: 'Who Are We', tag: 'Our Story & CSR' },
  { to: '/team', name: 'Our Team', tag: 'The People' },
]

// Mobile menu structure (flat groups).
const mobileGroups = [
  { label: 'Projects', to: '/projects', items: projectItems },
  { label: 'Companies', to: '/companies', items: companyItems },
  { label: 'Who Are We', to: '/about', items: aboutItems },
  { label: 'Investors', to: '/investors' },
  { label: 'Blog', to: '/blog' },
  { label: 'Careers', to: '/careers' },
  { label: 'Contact Us', to: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname, hash } = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.pageYOffset > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close the mobile menu on navigation.
  useEffect(() => {
    setOpen(false)
  }, [pathname, hash])

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
    <nav className={`site-nav${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-inner">
        <Link to="/" className="logo-container">
          <div className="logo-mark">
            <Logo className="w-full h-full object-contain" />
          </div>
          <span className="logo-text">AETHER RENOVA</span>
        </Link>

        {/* desktop links */}
        <div className="nav-links">
          <NavDropdown label="Projects" to="/projects" items={projectItems} />
          <NavDropdown label="Companies" to="/companies" items={companyItems} />
          <NavDropdown label="Who Are We" to="/about" items={aboutItems} />
          <Link to="/investors">Investors</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/careers">Careers</Link>
        </div>

        <div className="nav-right">
          <LanguageSwitcher />
          <Button href="/contact" variant="secondary" size="sm" withArrow={false}>
            Contact Us
          </Button>
        </div>

        {/* mobile hamburger */}
        <button
          type="button"
          className="nav-burger"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span className={`nav-burger-line${open ? ' a' : ''}`} />
          <span className={`nav-burger-line${open ? ' b' : ''}`} />
          <span className={`nav-burger-line${open ? ' c' : ''}`} />
        </button>
      </div>
    </nav>

      {/* mobile menu panel — rendered OUTSIDE <nav> so the nav's
          backdrop-filter (added on scroll) doesn't become the containing
          block for this position:fixed overlay and trap it. */}
      <div className={`mobile-menu${open ? ' open' : ''}`}>
        <div className="mobile-menu-inner">
          {mobileGroups.map((g) => (
            <div key={g.label} className="mobile-group">
              <Link to={g.to} className="mobile-group-title">
                {g.label}
              </Link>
              {g.items && (
                <div className="mobile-sub">
                  {g.items.map((it) => (
                    <Link key={it.to} to={it.to} className="mobile-sub-link">
                      {it.logo && (
                        <span className="mobile-sub-logo">
                          <img src={it.logo} alt="" draggable="false" />
                        </span>
                      )}
                      <span>
                        <span className="mobile-sub-name">{it.name}</span>
                        {it.tag && (
                          <span className="mobile-sub-tag">{it.tag}</span>
                        )}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="mobile-lang">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </>
  )
}
