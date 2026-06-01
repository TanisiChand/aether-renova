import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import LanguageSwitcher from './LanguageSwitcher'
import Logo from './Logo'
import Button from './Button'

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
          <Link to="/companies">Companies</Link>
          <Link to="/#about">About Us</Link>
          <Link to="/#careers">Careers</Link>
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
