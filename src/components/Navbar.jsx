import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import LanguageSwitcher from './LanguageSwitcher'
import NavDropdown from './NavDropdown'
import Logo from './Logo'
import Button from './Button'

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

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.pageYOffset > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`site-nav${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-inner">
        <Link to="/" className="logo-container">
          <div className="logo-mark">
            <Logo className="w-full h-full object-contain" />
          </div>
          <span className="logo-text">AETHER RENOVA</span>
        </Link>
        <div className="nav-links">
          <Link to="/#projects">Projects</Link>
          <NavDropdown label="Companies" to="/companies" items={companyItems} />
          <NavDropdown label="Who Are We" to="/about" items={aboutItems} />
          <Link to="/careers">Careers</Link>
        </div>
        <div className="nav-right">
          <LanguageSwitcher />
          <Button href="/#contact" variant="secondary" size="sm" withArrow={false}>
            Contact Us
          </Button>
        </div>
      </div>
    </nav>
  )
}
