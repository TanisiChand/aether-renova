import { Link } from 'react-router-dom'
import Logo from './Logo'

const socials = [
  {
    label: 'X',
    href: '#',
    path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  },
  {
    label: 'Instagram',
    href: '#',
    path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
  },
  {
    label: 'LinkedIn',
    href: '#',
    path: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z',
  },
  {
    label: 'Facebook',
    href: '#',
    path: 'M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z',
  },
]

// Footer columns mirror the site navigation.
const columns = [
  {
    title: 'Explore',
    links: [
      { label: 'Projects', to: '/projects' },
      { label: 'Companies', to: '/companies' },
      { label: 'Who Are We', to: '/about' },
      { label: 'Our Team', to: '/team' },
      { label: 'Watts Up Aether', to: '/blog' },
      { label: 'Careers', to: '/careers' },
    ],
  },
  {
    title: 'Companies',
    links: [
      { label: 'Terra Sol', to: '/companies#terra-sol' },
      { label: 'Solaeris', to: '/companies#solaeris' },
      { label: 'Grid Nepal', to: '/companies#grid-nepal' },
      { label: 'West Star', to: '/companies#west-star' },
      { label: 'Aether Construction', to: '/companies#aether-construction' },
    ],
  },
  {
    title: 'Projects',
    links: [
      { label: 'Kusaha Solar', to: '/projects/kusaha-solar' },
      { label: 'Dhalkebar Solar', to: '/projects' },
      { label: 'Chameliya–Chettigad', to: '/projects' },
      { label: 'Chaulani Hydropower', to: '/projects' },
    ],
  },
]

function LinkColumn({ title, links }) {
  return (
    <div>
      <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-6">
        {title}
      </h4>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              to={link.to}
              className="text-aether-muted text-sm hover:text-aether-accent transition-colors duration-300"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="relative bg-[#020203] font-sans z-10 overflow-hidden border-t border-aether-border/40">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-aether-accent/0 via-aether-accent/30 to-aether-accent/0" />
        <div className="absolute top-0 right-1/4 w-[1px] h-full bg-gradient-to-b from-aether-accent/0 via-aether-accent/30 to-aether-accent/0" />
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-12 md:pt-16 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-14">
          {/* Brand + socials */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 relative">
                <Logo className="w-full h-full object-contain" />
              </div>
              <span className="text-white font-bold tracking-wider text-lg uppercase">
                Aether Renova
              </span>
            </Link>
            <p className="text-aether-muted text-sm leading-relaxed mb-2 max-w-sm">
              Building what tomorrow runs on.
            </p>
            <p className="text-aether-accent text-sm font-semibold tracking-wide mb-6">
              Integrity First. Clean Energy Always.
            </p>
            <div className="flex gap-4">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="group w-10 h-10 rounded-full border border-aether-border flex items-center justify-center transition-all duration-300 hover:border-aether-accent hover:bg-aether-accent/10"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-aether-muted group-hover:text-aether-accent transition-colors"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <LinkColumn key={col.title} title={col.title} links={col.links} />
          ))}
        </div>

        {/* Contact CTA strip */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 rounded-2xl border border-aether-border bg-aether-card/40 p-6 mb-12">
          <div>
            <p className="text-white font-bold text-lg mb-1">
              Let’s build the future together.
            </p>
            <p className="text-aether-muted text-sm">
              Partnerships, investment, or careers — we’d love to talk.
            </p>
          </div>
          <Link
            to="/contact"
            className="shrink-0 inline-flex items-center gap-2 rounded-full bg-aether-accent text-black font-semibold tracking-wide text-sm px-7 py-3 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,240,152,0.4)]"
          >
            Contact Us
          </Link>
        </div>

        <div className="pt-8 border-t border-aether-border/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-aether-muted text-xs tracking-wider">
            © 2024 Aether Renova Holdings. All rights reserved. Nepal.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-aether-muted text-xs hover:text-aether-accent transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-aether-muted text-xs hover:text-aether-accent transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-aether-muted text-xs hover:text-aether-accent transition-colors">
              Cookie Settings
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
