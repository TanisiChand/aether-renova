import { useEffect, useRef, useState } from 'react'

const languages = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'ne', label: 'नेपाली', short: 'ने' },
]

const GlobeIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
)

const CaretIcon = ({ open }) => (
  <svg
    className={`lang-caret${open ? ' open' : ''}`}
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

const CheckIcon = () => (
  <svg
    className="lang-check"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 6L9 17l-5-5" />
  </svg>
)

export default function LanguageSwitcher() {
  const [lang, setLang] = useState('en')
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  // Restore saved preference (English is the default).
  useEffect(() => {
    const saved = localStorage.getItem('lang')
    if (saved === 'ne' || saved === 'en') setLang(saved)
  }, [])

  // Reflect the selection on the document and persist it.
  useEffect(() => {
    document.documentElement.lang = lang
    localStorage.setItem('lang', lang)
  }, [lang])

  // Close the menu when clicking outside.
  useEffect(() => {
    if (!open) return
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  const current = languages.find((l) => l.code === lang)

  return (
    <div className="lang-switcher" ref={ref}>
      <button
        type="button"
        className="lang-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <GlobeIcon />
        <span>{current.short}</span>
        <CaretIcon open={open} />
      </button>

      {open && (
        <div className="lang-menu" role="listbox">
          {languages.map((l) => (
            <button
              key={l.code}
              type="button"
              role="option"
              aria-selected={l.code === lang}
              className={`lang-option${l.code === lang ? ' active' : ''}`}
              onClick={() => {
                setLang(l.code)
                setOpen(false)
              }}
            >
              <span>{l.label}</span>
              <CheckIcon />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
