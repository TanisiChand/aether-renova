import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import DnaTexture from './components/DnaTexture'
import HeroCanvas from './components/HeroCanvas'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Companies from './pages/Companies'
import About from './pages/About'
import Team from './pages/Team'
import Careers from './pages/Careers'
import Contact from './pages/Contact'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'

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
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <DnaTexture />
      <HeroCanvas />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/about" element={<About />} />
        <Route path="/team" element={<Team />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
