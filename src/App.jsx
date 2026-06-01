import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
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

// Scroll to top on route change, or to a hash target if present.
function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      // The target section may not be mounted on the first frame after a
      // cross-page navigation — retry briefly until it appears.
      let tries = 0
      const tryScroll = () => {
        const el = document.querySelector(hash)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        } else if (tries++ < 10) {
          setTimeout(tryScroll, 50)
        }
      }
      tryScroll()
      return
    }
    // New page: jump to the top instantly (the fade animation covers it),
    // so the smooth-scroll setting doesn't cause a long visible scroll.
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname, hash])
  return null
}

// Re-mounts (via key) on each path change so the fade-in animation replays.
function AnimatedRoutes() {
  const { pathname } = useLocation()
  return (
    <div key={pathname} className="page-fade">
      <Routes>
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
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <DnaTexture />
      <Navbar />
      <AnimatedRoutes />
      <Footer />
    </BrowserRouter>
  )
}

export default App
