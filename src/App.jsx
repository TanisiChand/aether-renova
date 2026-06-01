import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import DnaTexture from './components/DnaTexture'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Companies from './pages/Companies'
import About from './pages/About'
import Team from './pages/Team'
import Careers from './pages/Careers'
import JobDetail from './pages/JobDetail'
import Contact from './pages/Contact'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Projects from './pages/Projects'
import KusahaSolar from './pages/KusahaSolar'

const FADE_MS = 160

/**
 * Crossfade between pages: when the path changes, fade the current page out,
 * then swap content + scroll, then fade the new page in. Reads as smooth
 * rather than an instant snap.
 */
function PageTransition() {
  const location = useLocation()
  // The location actually rendered (lags real location during fade-out).
  const [shown, setShown] = useState(location)
  const [stage, setStage] = useState('in') // 'in' | 'out'

  const reduce =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Same pathname+hash means no visual change needed.
  const sameKey =
    location.pathname === shown.pathname && location.hash === shown.hash

  useEffect(() => {
    if (sameKey) return
    if (reduce) {
      setShown(location)
      return
    }
    setStage('out')
    const t = setTimeout(() => {
      setShown(location)
      setStage('in')
    }, FADE_MS)
    return () => clearTimeout(t)
  }, [location, sameKey, reduce])

  // Handle scrolling once the new page is shown.
  useEffect(() => {
    const { hash } = shown
    if (hash) {
      let tries = 0
      const tryScroll = () => {
        const el = document.querySelector(hash)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
        else if (tries++ < 10) setTimeout(tryScroll, 50)
      }
      tryScroll()
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }
  }, [shown])

  return (
    <div
      className="page-transition"
      style={{
        opacity: stage === 'out' ? 0 : 1,
        transform: stage === 'out' ? 'translateY(8px)' : 'translateY(0)',
        transition: reduce
          ? 'none'
          : `opacity ${FADE_MS}ms ease, transform ${FADE_MS}ms ease`,
      }}
    >
      {/* render the lagging "shown" location, not the live one */}
      <ShownRoutes location={shown} />
    </div>
  )
}

// Render routes for a specific (possibly stale) location object.
function ShownRoutes({ location }) {
  return (
    <Routes location={location}>
      <Route path="/" element={<Home />} />
      <Route path="/companies" element={<Companies />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/kusaha-solar" element={<KusahaSolar />} />
      <Route path="/about" element={<About />} />
      <Route path="/team" element={<Team />} />
      <Route path="/careers" element={<Careers />} />
      <Route path="/careers/:slug" element={<JobDetail />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
    </Routes>
  )
}

function App() {
  return (
    <BrowserRouter>
      <DnaTexture />
      <Navbar />
      <PageTransition />
      <Footer />
    </BrowserRouter>
  )
}

export default App
