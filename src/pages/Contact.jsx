import { useState } from 'react'
import SynergyBackground from '../components/SynergyBackground'
import Button from '../components/Button'

const Eyebrow = ({ children, center }) => (
  <p
    className={`text-aether-accent uppercase tracking-[0.25em] text-sm font-semibold mb-6 flex items-center gap-4 ${
      center ? 'justify-center' : ''
    }`}
  >
    <span className="w-12 h-[1px] bg-aether-accent/60" />
    {children}
    {center && <span className="w-12 h-[1px] bg-aether-accent/60" />}
  </p>
)

const contactDetails = [
  {
    label: 'Email',
    value: 'info@aetherrenova.com',
    href: 'mailto:info@aetherrenova.com',
    icon: (
      <>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </>
    ),
  },
  {
    label: 'Phone',
    value: '+977 1 4000000',
    href: 'tel:+97714000000',
    icon: (
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    ),
  },
  {
    label: 'Office',
    value: 'Kathmandu, Nepal',
    href: null,
    icon: (
      <>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </>
    ),
  },
]

const socials = [
  {
    label: 'Twitter',
    href: '#',
    path: 'M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z',
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

const inputClass =
  'w-full px-4 py-3 bg-aether-card border border-aether-border rounded-lg text-white text-sm placeholder:text-aether-muted/50 focus:outline-none focus:border-aether-accent/50 transition-colors'

export default function Contact() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Placeholder — wire to a real form backend / email service later.
    setSent(true)
  }

  return (
    <main className="relative bg-[#020203] font-sans">
      {/* ── Hero ───────────────────────────────── */}
      <section className="relative pt-40 pb-24 overflow-hidden bg-[#020203]">
        <SynergyBackground />
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_center,_rgba(0,240,152,0.12)_0%,_transparent_65%)]" />
        </div>
        <div className="absolute left-0 right-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[#020203] pointer-events-none z-[1]" />

        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <Eyebrow center>Get In Touch</Eyebrow>
          <h1 className="text-white text-5xl md:text-7xl font-bold tracking-tight uppercase mb-6">
            Contact Us
          </h1>
          <p className="text-aether-muted text-lg md:text-xl leading-relaxed">
            Whether you’re a partner, an investor, or just curious about our
            work — we’d love to hear from you.
          </p>
        </div>
      </section>

      {/* ── Form + details ─────────────────────── */}
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Form */}
          <div className="lg:col-span-3 bg-aether-card border border-aether-border rounded-3xl p-8 lg:p-10">
            <h2 className="text-white text-2xl font-bold mb-2">
              Send us a message
            </h2>
            <p className="text-aether-muted text-sm mb-8">
              Fill out the form and our team will get back to you within two
              business days.
            </p>

            {sent ? (
              <div className="flex flex-col items-center justify-center text-center py-16">
                <div className="w-16 h-16 rounded-full bg-aether-accent/15 border border-aether-accent/30 flex items-center justify-center text-aether-accent mb-6">
                  <svg
                    className="w-8 h-8"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
                <h3 className="text-white text-xl font-bold mb-2">
                  Thank you!
                </h3>
                <p className="text-aether-muted text-sm max-w-sm">
                  Your message has been received. We’ll be in touch shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-aether-muted text-xs uppercase tracking-wider mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-aether-muted text-xs uppercase tracking-wider mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-aether-muted text-xs uppercase tracking-wider mb-2">
                      Company <span className="opacity-50">(optional)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Your company"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-aether-muted text-xs uppercase tracking-wider mb-2">
                      Subject
                    </label>
                    <select required className={inputClass + ' appearance-none'}>
                      <option value="">Select a topic</option>
                      <option>Partnership</option>
                      <option>Investment</option>
                      <option>Careers</option>
                      <option>Media & Press</option>
                      <option>General Inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-aether-muted text-xs uppercase tracking-wider mb-2">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="How can we help?"
                    className={inputClass + ' resize-none'}
                  />
                </div>

                <Button type="submit" variant="primary" withArrow={false}>
                  Send Message
                </Button>
              </form>
            )}
          </div>

          {/* Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-aether-card border border-aether-border rounded-3xl p-8">
              <Eyebrow>Reach Us</Eyebrow>
              <div className="space-y-6">
                {contactDetails.map((d) => {
                  const inner = (
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-xl bg-aether-accent/10 border border-aether-accent/30 flex items-center justify-center text-aether-accent shrink-0">
                        <svg
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          {d.icon}
                        </svg>
                      </div>
                      <div>
                        <p className="text-aether-muted text-xs uppercase tracking-wider mb-0.5">
                          {d.label}
                        </p>
                        <p className="text-white text-sm font-medium">
                          {d.value}
                        </p>
                      </div>
                    </div>
                  )
                  return d.href ? (
                    <a
                      key={d.label}
                      href={d.href}
                      className="block group [&_p.text-white]:group-hover:text-aether-accent"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div key={d.label}>{inner}</div>
                  )
                })}
              </div>

              <div className="border-t border-aether-border/50 mt-8 pt-6">
                <p className="text-aether-muted text-xs uppercase tracking-wider mb-4">
                  Follow Us
                </p>
                <div className="flex gap-3">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      aria-label={s.label}
                      className="group w-10 h-10 rounded-full border border-aether-border flex items-center justify-center transition-all duration-300 hover:border-aether-accent hover:bg-aether-accent/10"
                    >
                      <svg
                        className="w-4 h-4 text-aether-muted group-hover:text-aether-accent transition-colors"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d={s.path} />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-aether-card border border-aether-border rounded-3xl p-8">
              <p className="text-aether-muted text-xs uppercase tracking-wider mb-2">
                Business Hours
              </p>
              <p className="text-white text-sm leading-relaxed">
                Sunday – Friday
                <br />
                10:00 AM – 5:00 PM (NPT)
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
