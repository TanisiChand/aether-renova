import { useEffect, useRef, useState } from 'react'

/* ---------------------------------------------------------------------------
   Scroll-linked "storybook" timeline.

   The green connector line is scrubbed directly to scroll position (updated on
   a requestAnimationFrame, writing the height straight to the DOM — no React
   re-render per frame), so it tracks the scroll smoothly and identically on
   every project page. Each node lights up the instant the line passes its
   centre; cards ease + un-blur into focus as they activate.

   items: [{ date, title, detail, icon, highlight? }]
--------------------------------------------------------------------------- */

const PATHS = {
  flag: 'M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7',
  build:
    'M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z',
  panel: 'M3 4h18v11H3zM7 4v11M12 4v11M17 4v11M3 9h18M9 19h6M12 15v4',
  check: 'M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4 12 14.01l-3-3',
  bolt: 'M13 2 3 14h9l-1 8 10-12h-9l1-8z',
  cash: 'M2 7h20v10H2zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6M6 7v10M18 7v10',
}

function Icon({ type }) {
  return (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={PATHS[type] || PATHS.check} />
    </svg>
  )
}

export default function StoryTimeline({ items }) {
  const containerRef = useRef(null)
  const fillRef = useRef(null)
  const nodeRefs = useRef([])
  const [activeCount, setActiveCount] = useState(0)

  useEffect(() => {
    const cont = containerRef.current
    if (!cont) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (fillRef.current) fillRef.current.style.height = '100%'
      setActiveCount(items.length)
      return
    }

    // Compute directly on scroll — cheap (a handful of getBoundingClientRect
    // reads) and avoids any rAF-throttling/stall, so it stays perfectly in
    // sync with scroll position on every browser.
    const compute = () => {
      const rect = cont.getBoundingClientRect()
      // The line "draws" down to a fixed activation line ~58% down the screen.
      const lineY = window.innerHeight * 0.58
      const fill = Math.max(0, Math.min(rect.height, lineY - rect.top))
      if (fillRef.current) fillRef.current.style.height = `${fill}px`

      let count = 0
      nodeRefs.current.forEach((el) => {
        if (!el) return
        const nr = el.getBoundingClientRect()
        const centre = nr.top - rect.top + nr.height / 2
        if (centre <= fill + 1) count += 1
      })
      setActiveCount((prev) => (prev === count ? prev : count))
    }

    compute()
    window.addEventListener('scroll', compute, { passive: true })
    window.addEventListener('resize', compute)
    // recompute after layout settles (fonts/images)
    const t1 = setTimeout(compute, 300)
    const t2 = setTimeout(compute, 1200)
    return () => {
      window.removeEventListener('scroll', compute)
      window.removeEventListener('resize', compute)
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [items.length])

  return (
    <div ref={containerRef} className="relative">
      {/* base connector */}
      <div className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-[2px] bg-aether-border md:-translate-x-1/2" />
      {/* scroll-scrubbed fill (height written directly in rAF) */}
      <div
        ref={fillRef}
        className="absolute left-[19px] md:left-1/2 top-0 w-[2px] bg-gradient-to-b from-aether-accent to-aether-accent/50 md:-translate-x-1/2 shadow-[0_0_12px_rgba(0,240,152,0.6)]"
        style={{ height: '0px' }}
      />

      <div className="space-y-8">
        {items.map((m, i) => {
          const on = i < activeCount
          return (
            <div
              key={m.date}
              className={`relative flex items-center gap-6 md:gap-0 ${
                i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* node */}
              <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 z-10">
                <div
                  ref={(el) => (nodeRefs.current[i] = el)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ease-out ${
                    on
                      ? m.highlight
                        ? 'bg-aether-accent text-black border-aether-accent shadow-[0_0_30px_rgba(0,240,152,0.75)] scale-110'
                        : 'bg-aether-accent text-black border-aether-accent shadow-[0_0_20px_rgba(0,240,152,0.5)]'
                      : 'bg-[#0c0c11] text-aether-muted border-aether-border'
                  }`}
                >
                  <Icon type={m.icon} />
                </div>
              </div>

              {/* card */}
              <div
                className={`ml-16 md:ml-0 md:w-[calc(50%-3rem)] ${
                  i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'
                }`}
              >
                <div
                  className={`bg-aether-card border rounded-2xl p-5 transition-all duration-700 ease-out ${
                    on
                      ? 'border-aether-accent/40 opacity-100 translate-y-0 blur-0 shadow-[0_0_24px_rgba(0,240,152,0.08)]'
                      : 'border-aether-border opacity-40 translate-y-3 blur-[2px]'
                  }`}
                >
                  <p
                    className={`text-xs font-bold uppercase tracking-wider mb-1 transition-colors duration-500 ${
                      on ? 'text-aether-accent' : 'text-aether-muted'
                    }`}
                  >
                    {m.date}
                  </p>
                  <h3 className="text-white text-lg font-bold mb-1">{m.title}</h3>
                  <p className="text-aether-muted text-sm">{m.detail}</p>
                </div>
              </div>

              <div className="hidden md:block md:w-[calc(50%-3rem)]" />
            </div>
          )
        })}
      </div>
    </div>
  )
}
