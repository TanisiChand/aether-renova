import { useEffect, useState } from 'react'
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
        <div className="logo-container">
          <div className="logo-mark">
            <Logo className="w-full h-full object-contain" />
          </div>
          <span className="logo-text">AETHER RENOVA</span>
        </div>
        <div className="nav-links">
          <a href="#projects">Projects</a>
          <a href="#companies">Companies</a>
          <a href="#about">About Us</a>
          <a href="#careers">Careers</a>
        </div>
        <div className="nav-right">
          <LanguageSwitcher />
          <Button href="#contact" variant="secondary" size="sm" withArrow={false}>
            Contact Us
          </Button>
        </div>
      </div>
    </nav>
  )
}
