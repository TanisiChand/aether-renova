import { useEffect, useRef, useState } from 'react'

/**
 * Section navigation for long project pages.
 *  - A thin reading-progress bar at the very top of the viewport.
 *  - A sticky, labeled "jump to section" pill-bar that slides in under the
 *    navbar once you scroll into the content. It works on every screen size:
 *    on mobile it scrolls horizontally and keeps the active pill centered, so
 *    any section is one tap away — no hunting by scroll.
 *
 * `sections`: [{ id, label }] — ids must match the section element ids.
 */
export default function SectionNav({ sections }) {
  const [active, setActive] = useState(sections[0]?.id)
  const [progress, setProgress] = useState(0)
  const [show, setShow] = useState(false)
  const barRef = useRef(null)
  const pillRefs = useRef({})

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      setProgress(max > 0 ? (h.scrollTop / max) * 100 : 0)

      // reveal the bar once the hero is behind us
      setShow(h.scrollTop > 320)

      // active section = the last one whose top has passed ~35% of viewport
      const mark = window.innerHeight * 0.35
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

  // keep the active pill centered within the scrollable bar (mobile)
  useEffect(() => {
    const bar = barRef.current
    const el = pillRefs.current[active]
    if (bar && el) {
      const target = el.offsetLeft - bar.clientWidth / 2 + el.clientWidth / 2
      bar.scrollTo({ left: Math.max(0, target), behavior: 'smooth' })
    }
  }, [active])

  // smooth-scroll with an offset that clears the fixed navbar + this bar
  const jump = (id) => {
    const el = document.getElementById(id)
    if (!el) return
    const y = el.getBoundingClientRect().top + window.pageYOffset - 132
    window.scrollTo({ top: y, behavior: 'smooth' })
  }

  return (
    <>
      {/* top reading-progress bar */}
      <div className="fixed top-0 left-0 right-0 h-[3px] z-[1200] pointer-events-none">
        <div
          className="h-full bg-aether-accent shadow-[0_0_10px_rgba(0,240,152,0.6)] transition-[width] duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* sticky jump-to-section pill bar (all screen sizes).
          The wrapper is pointer-events-none so only the pill bar itself is
          clickable — it never intercepts taps meant for the navbar/hamburger. */}
      <div
        className={`fixed left-0 right-0 top-[68px] md:top-[72px] z-[980] pointer-events-none transition-all duration-300 ${
          show ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0'
        }`}
        aria-label="Jump to section"
      >
        <div className="mx-auto max-w-5xl px-3 sm:px-6">
          <div className={`flex items-center gap-2 rounded-full border border-aether-border bg-[#06060a]/90 backdrop-blur-md px-2 py-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.45)] ${show ? 'pointer-events-auto' : ''}`}>
            <span className="hidden sm:flex items-center pl-3 pr-1 text-[10px] uppercase tracking-[0.18em] text-aether-muted/70 shrink-0">
              On this page
            </span>
            <span className="hidden sm:block w-px h-5 bg-aether-border shrink-0" />
            <div
              ref={barRef}
              className="flex gap-1.5 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden scroll-smooth"
            >
              {sections.map((s) => {
                const on = active === s.id
                return (
                  <button
                    key={s.id}
                    ref={(el) => (pillRefs.current[s.id] = el)}
                    onClick={() => jump(s.id)}
                    aria-current={on ? 'true' : undefined}
                    className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium tracking-wide whitespace-nowrap transition-all duration-200 ${
                      on
                        ? 'bg-aether-accent text-black'
                        : 'text-aether-muted hover:text-white hover:bg-white/[0.06]'
                    }`}
                  >
                    {s.label}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
