import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import DnaTexture from './components/DnaTexture'
import HeroCanvas from './components/HeroCanvas'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Companies from './pages/Companies'

// Scroll to top on route change, or to a hash target if present.
function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        return
      }
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
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
