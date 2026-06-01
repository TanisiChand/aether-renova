import Logo from './Logo'

const socials = [
  {
    label: 'Twitter',
    path: 'M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z',
  },
  {
    label: 'LinkedIn',
    path: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z',
  },
  {
    label: 'Facebook',
    path: 'M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z',
  },
]

const companyLinks = [
  'About Us',
  'Our Projects',
  'Leadership',
  'Careers',
  'News & Blog',
]
const solutionLinks = [
  'Solar Energy',
  'Wind Power',
  'Microgrids',
  'Transmission',
  'Civil Infrastructure',
]

function LinkColumn({ title, links }) {
  return (
    <div>
      <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-6">
        {title}
      </h4>
      <ul className="space-y-4">
        {links.map((link) => (
          <li key={link}>
            <a
              href="#"
              className="text-aether-muted text-sm hover:text-aether-accent transition-colors duration-300"
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="relative bg-[#020203] font-sans z-10 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-aether-accent/0 via-aether-accent/30 to-aether-accent/0" />
        <div className="absolute top-0 right-1/4 w-[1px] h-full bg-gradient-to-b from-aether-accent/0 via-aether-accent/30 to-aether-accent/0" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 relative">
                <Logo className="w-full h-full object-contain" />
              </div>
              <span className="text-white font-bold tracking-wider text-lg uppercase">
                Aether Renova
              </span>
            </div>
            <p className="text-aether-muted text-sm leading-relaxed mb-6">
              Building what tomorrow runs on. Developing next-generation
              infrastructure for a sustainable, resilient, and electrified
              Nepal.
            </p>
            <div className="flex gap-4">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href="#"
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

          <LinkColumn title="Company" links={companyLinks} />
          <LinkColumn title="Solutions" links={solutionLinks} />

          <div>
            <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-6">
              Stay Connected
            </h4>
            <p className="text-aether-muted text-sm mb-4">
              Subscribe for updates on our latest projects and insights.
            </p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-aether-card border border-aether-border rounded-lg text-white text-sm placeholder:text-aether-muted/50 focus:outline-none focus:border-aether-accent/50 transition-colors"
              />
              <button
                type="submit"
                className="group w-full px-4 py-3 bg-aether-accent text-black font-semibold text-sm uppercase tracking-wider rounded-lg transition-all duration-300 hover:bg-white hover:shadow-[0_0_20px_rgba(0,240,152,0.3)]"
              >
                Subscribe
              </button>
            </form>
          </div>
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
