import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

/* ---------------------------------------------------------------------------
   Entrance + scroll reveal (x.ai-style).

   On every page mount AND route change this:
     1. jumps scroll to top (or the #hash target),
     2. hides the page's content blocks *before the browser paints*
        (useLayoutEffect → no flash),
     3. on the next frame, eases the on-screen blocks in with a soft stagger
        (fade + rise + blur-to-sharp), and watches the rest to reveal on scroll.

   Because it runs identically on mount and on navigation, the animation looks
   the same whether you jump between pages or hard-refresh.
--------------------------------------------------------------------------- */

const CONTAINER_SEL =
  '.max-w-7xl, .max-w-6xl, .max-w-5xl, .max-w-4xl, .max-w-3xl, .max-w-2xl, .hero-content, .hero-visual'

export default function ScrollReveal() {
  const location = useLocation()

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return
    const root = document.getElementById('root')
    if (!root) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // 1) scroll for the new view (synchronously, before paint)
    if (!location.hash) window.scrollTo(0, 0)

    // 2) tag content blocks, hiding any new ones before the first paint
    const targets = []
    root.querySelectorAll(CONTAINER_SEL).forEach((container) => {
      let idx = 0
      Array.from(container.children).forEach((child) => {
        if (child.dataset.reveal) {
          // persistent element (e.g. footer): re-watch if not yet shown
          if (!child.classList.contains('is-visible')) targets.push(child)
          return
        }
        const cs = getComputedStyle(child)
        if (cs.position === 'fixed' || cs.position === 'absolute') return
        child.dataset.reveal = '1'
        child.style.setProperty('--reveal-delay', `${Math.min(idx, 6) * 80}ms`)
        child.classList.add('reveal')
        targets.push(child)
        idx += 1
      })
    })

    if (reduce) {
      targets.forEach((t) => t.classList.add('is-visible'))
      return
    }

    const vh = window.innerHeight || 800
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            observer.unobserve(e.target)
          }
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    )

    // 3) after paint: animate in-view blocks (staggered), observe the rest
    const raf = requestAnimationFrame(() => {
      targets.forEach((t) => {
        const r = t.getBoundingClientRect()
        if (r.top < vh && r.bottom > 0) t.classList.add('is-visible')
        else observer.observe(t)
      })
      if (location.hash) {
        const el = document.querySelector(location.hash)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }
    })

    // safety net — nothing can ever stay stuck hidden
    const safety = setTimeout(
      () => targets.forEach((t) => t.classList.add('is-visible')),
      6000,
    )

    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
      clearTimeout(safety)
    }
  }, [location.pathname, location.hash])

  return null
}
