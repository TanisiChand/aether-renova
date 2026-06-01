import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

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

/**
 * Reusable hover dropdown for the nav.
 * - `label` + `to`: the trigger text and the page it links to.
 * - `items`: [{ to, name, tag, logo? }] rendered in the menu.
 */
export default function NavDropdown({ label, to, items }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const closeTimer = useRef(null)

  const handleEnter = () => {
    clearTimeout(closeTimer.current)
    setOpen(true)
  }
  const handleLeave = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120)
  }

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
        to={to}
        className="nav-dropdown-trigger"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen(false)}
      >
        {label}
        <CaretIcon open={open} />
      </Link>

      {open && (
        <div className="nav-dropdown-menu" role="menu">
          {items.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              role="menuitem"
              className="nav-dropdown-item"
              onClick={() => setOpen(false)}
            >
              {item.logo && (
                <span className="nav-dropdown-logo">
                  <img src={item.logo} alt="" draggable="false" />
                </span>
              )}
              <span className="nav-dropdown-text">
                <span className="nav-dropdown-name">{item.name}</span>
                {item.tag && (
                  <span className="nav-dropdown-tag">{item.tag}</span>
                )}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
