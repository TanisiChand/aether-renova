import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/* ---------------------------------------------------------------------------
   Scroll-reveal: content blocks gently fade + rise into view as you scroll,
   giving the site a more premium, layered feel.

   Applied globally — it tags the direct children of the main content
   containers (.max-w-* wrappers) on each page rather than requiring a class
   on every component. Elements already on screen show instantly (no flicker);
   the rest animate in when scrolled to. Safe by design:
     - respects prefers-reduced-motion (no-op),
     - skips fixed/absolute (decorative) elements,
     - a safety timer guarantees nothing ever stays hidden.
--------------------------------------------------------------------------- */

const CONTAINER_SEL =
  '.max-w-7xl, .max-w-6xl, .max-w-5xl, .max-w-4xl, .max-w-3xl, .max-w-2xl'

export default function ScrollReveal() {
  const location = useLocation()

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const root = document.getElementById('root')
    if (!root) return

    let observer
    let safety

    const setup = () => {
      const targets = []
      root.querySelectorAll(CONTAINER_SEL).forEach((container) => {
        Array.from(container.children).forEach((child, i) => {
          // Already tagged (e.g. the persistent footer). The observer is
          // recreated each route, so re-observe anything not yet revealed —
          // otherwise persistent elements can get stuck hidden.
          if (child.dataset.reveal) {
            if (!child.classList.contains('is-visible')) targets.push(child)
            return
          }
          const pos = getComputedStyle(child).position
          if (pos === 'fixed' || pos === 'absolute') return
          child.dataset.reveal = '1'
          child.style.setProperty('--reveal-delay', `${Math.min(i, 5) * 70}ms`)
          child.classList.add('reveal')
          targets.push(child)
        })
      })

      observer = new IntersectionObserver(
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

      const vh = window.innerHeight || 800
      targets.forEach((t) => {
        const r = t.getBoundingClientRect()
        if (r.top < vh && r.bottom > 0) {
          // Already on screen — reveal instantly so there's no flash.
          t.classList.add('is-visible')
        } else {
          observer.observe(t)
        }
      })

      // Last-resort safety net so content can never stay hidden if the
      // observer never fires. On real browsers the observer reveals on scroll
      // long before this; it only matters in environments without IO support.
      safety = setTimeout(() => {
        targets.forEach((t) => t.classList.add('is-visible'))
      }, 6000)
    }

    // Wait a beat for the page-transition crossfade to swap in the new view.
    const timer = setTimeout(setup, 240)

    return () => {
      clearTimeout(timer)
      clearTimeout(safety)
      if (observer) observer.disconnect()
    }
  }, [location.pathname])

  return null
}
