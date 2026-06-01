import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const companies = [
  { id: 'terra-sol', name: 'Terra Sol', logo: '/logos/terrasol.svg', tag: 'Solar Farms' },
  { id: 'solaeris', name: 'Solaeris', logo: '/logos/solaeris.svg', tag: 'Microgrids' },
  { id: 'grid-nepal', name: 'Grid Nepal', logo: '/logos/gridnepal.svg', tag: 'Transmission' },
  { id: 'west-star', name: 'West Star', logo: '/logos/weststar.svg', tag: 'Wind & Hydro' },
  {
    id: 'aether-construction',
    name: 'Aether Construction',
    logo: '/logos/aether.svg',
    tag: 'Civil & Heavy Infra',
  },
]

const CaretIcon = ({ open }) => (
  <svg
    className={`nav-caret${open ? ' open' : ''}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
)

export default function CompaniesDropdown() {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const closeTimer = useRef(null)

  // Open on hover (desktop), with a small close delay so the gap to the menu
  // doesn't dismiss it.
  const handleEnter = () => {
    clearTimeout(closeTimer.current)
    setOpen(true)
  }
  const handleLeave = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120)
  }

  // Close on outside click / Escape (covers tap + keyboard).
  useEffect(() => {
    if (!open) return
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div
      className="nav-dropdown"
      ref={ref}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <Link
        to="/companies"
        className="nav-dropdown-trigger"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen(false)}
      >
        Companies
        <CaretIcon open={open} />
      </Link>

      {open && (
        <div className="nav-dropdown-menu" role="menu">
          {companies.map((c) => (
            <Link
              key={c.id}
              to={`/companies#${c.id}`}
              role="menuitem"
              className="nav-dropdown-item"
              onClick={() => setOpen(false)}
            >
              <span className="nav-dropdown-logo">
                <img src={c.logo} alt="" draggable="false" />
              </span>
              <span className="nav-dropdown-text">
                <span className="nav-dropdown-name">{c.name}</span>
                <span className="nav-dropdown-tag">{c.tag}</span>
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
