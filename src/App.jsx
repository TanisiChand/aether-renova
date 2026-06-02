import { BrowserRouter, Routes, Route } from 'react-router-dom'
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
import DhalkebarSolar from './pages/DhalkebarSolar'
import ChameliyaHydropower from './pages/ChameliyaHydropower'
import Investors from './pages/Investors'
import Translator from './i18n/Translator'
import ScrollReveal from './components/ScrollReveal'

/**
 * Page routes. Entrance animation + scroll handling on route change are owned
 * by <ScrollReveal/>, so navigation and refresh animate identically.
 */
function Pages() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/companies" element={<Companies />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/kusaha-solar" element={<KusahaSolar />} />
      <Route path="/projects/dhalkebar-solar" element={<DhalkebarSolar />} />
      <Route path="/projects/chameliya-chettigad" element={<ChameliyaHydropower />} />
      <Route path="/about" element={<About />} />
      <Route path="/team" element={<Team />} />
      <Route path="/careers" element={<Careers />} />
      <Route path="/careers/:slug" element={<JobDetail />} />
      <Route path="/investors" element={<Investors />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
    </Routes>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Translator />
      <ScrollReveal />
      <DnaTexture />
      <Navbar />
      <Pages />
      <Footer />
    </BrowserRouter>
  )
}

export default App
