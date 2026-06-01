import { useEffect, useState } from 'react'

/**
 * Sticky scroll-spy navigation.
 * - A thin progress bar at the very top of the viewport.
 * - A vertical dot-nav (desktop) that highlights the section in view and
 *   lets you jump to any section. Labels reveal on hover.
 *
 * `sections`: [{ id, label }] — ids must match section element ids.
 */
export default function SectionNav({ sections }) {
  const [active, setActive] = useState(sections[0]?.id)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      // overall page scroll progress (0–100)
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      setProgress(max > 0 ? (h.scrollTop / max) * 100 : 0)

      // active section = the last one whose top has passed ~40% of viewport
      const mark = window.innerHeight * 0.4
      let current = sections[0]?.id
      for (const s of sections) {
        const el = document.getElementById(s.id)
        if (el && el.getBoundingClientRect().top <= mark) current = s.id
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [sections])

  const jump = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* top progress bar */}
      <div className="fixed top-0 left-0 right-0 h-[3px] z-[1200] bg-transparent pointer-events-none">
        <div
          className="h-full bg-aether-accent shadow-[0_0_10px_rgba(0,240,152,0.6)] transition-[width] duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* vertical dot-nav (desktop only) */}
      <nav
        className="hidden lg:flex flex-col gap-3 fixed right-6 top-1/2 -translate-y-1/2 z-[1100]"
        aria-label="Section navigation"
      >
        {sections.map((s) => {
          const on = active === s.id
          return (
            <button
              key={s.id}
              onClick={() => jump(s.id)}
              className="group flex items-center gap-3 justify-end"
              aria-label={s.label}
              aria-current={on ? 'true' : undefined}
            >
              <span
                className={`whitespace-nowrap text-[11px] uppercase tracking-wider transition-all duration-300 ${
                  on
                    ? 'text-aether-accent opacity-100'
                    : 'text-aether-muted opacity-0 group-hover:opacity-100'
                }`}
              >
                {s.label}
              </span>
              <span
                className={`rounded-full transition-all duration-300 ${
                  on
                    ? 'w-3 h-3 bg-aether-accent shadow-[0_0_8px_rgba(0,240,152,0.7)]'
                    : 'w-2 h-2 bg-aether-muted/40 group-hover:bg-aether-accent/60'
                }`}
              />
            </button>
          )
        })}
      </nav>
    </>
  )
}
