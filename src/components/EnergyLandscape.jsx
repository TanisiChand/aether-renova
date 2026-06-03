import { useEffect, useRef, useState } from 'react'

/* ---------------------------------------------------------------------------
   Animated energy-landscape panorama (Tata-Power-style), on brand.
   A teal line-art scene running the full value chain — hydro, conventional,
   wind, solar, transmission, smart buildings, power trading, EV charging —
   with rotating turbines, current flowing along the lines, and glowing
   hotspot markers that reveal on scroll.
--------------------------------------------------------------------------- */

const A = '#0af2ad' // accent

// Hotspot label + marker positions (in viewBox units), with the element they tag.
const HOTSPOTS = [
  { id: 'hydro', label: ['Hydro Energy'], x: 150, y: 322 },
  { id: 'conventional', label: ['Conventional', 'Energy'], x: 452, y: 318 },
  { id: 'wind', label: ['Wind Energy'], x: 712, y: 150 },
  { id: 'solar', label: ['Solar Energy'], x: 858, y: 470 },
  { id: 'transmission', label: ['Transmission &', 'Distribution'], x: 1086, y: 300 },
  { id: 'iot', label: ['IoT Automation'], x: 1352, y: 392 },
  { id: 'trading', label: ['Power Trading'], x: 1566, y: 196 },
  { id: 'ev', label: ['EV Charging'], x: 1858, y: 420 },
]

export default function EnergyLandscape() {
  const ref = useRef(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const check = () => el.getBoundingClientRect().top < window.innerHeight * 0.85
    if (check()) return setShow(true)
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setShow(true), obs.disconnect()),
      { threshold: 0.1 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      className="relative bg-[#020203] overflow-hidden border-t border-aether-border/40 font-sans"
    >
      <style>{`
        @keyframes ar-spin { to { transform: rotate(360deg); } }
        .ar-blades { transform-box: fill-box; transform-origin: center; animation: ar-spin 11s linear infinite; }
        .ar-blades.f { animation-duration: 7.5s; }
        @keyframes ar-twinkle { 0%,100% { opacity:.25 } 50% { opacity:.9 } }
        .ar-win { animation: ar-twinkle 3.4s ease-in-out infinite; }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 pt-16 md:pt-20 text-center relative z-10">
        <p className="text-aether-accent uppercase tracking-[0.25em] text-sm font-semibold mb-5 flex items-center justify-center gap-4">
          <span className="w-12 h-[1px] bg-aether-accent/60" />
          The Full Value Chain
          <span className="w-12 h-[1px] bg-aether-accent/60" />
        </p>
        <h2 className="text-white text-3xl md:text-5xl font-medium tracking-tight">
          One Integrated Energy Ecosystem
        </h2>
        <p className="text-aether-muted text-base md:text-lg mt-4 max-w-2xl mx-auto">
          From generation to the grid to the plug — every link in Nepal’s clean
          energy future, built and operated under one roof.
        </p>
      </div>

      {/* radial ground glow */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[60%] bg-[radial-gradient(60%_120%_at_50%_120%,rgba(10,242,173,0.10),transparent_70%)]" />

      <div
        className={`relative mt-6 transition-all duration-[1100ms] ease-out ${
          show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <svg viewBox="0 0 2080 600" className="w-full h-auto block" role="img" aria-label="Aether Renova energy value chain">
          <defs>
            <linearGradient id="arGround" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(10,242,173,0.10)" />
              <stop offset="100%" stopColor="rgba(10,242,173,0.015)" />
            </linearGradient>
            <linearGradient id="arSolid" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(10,242,173,0.22)" />
              <stop offset="100%" stopColor="rgba(10,242,173,0.04)" />
            </linearGradient>
            <radialGradient id="arDot" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={A} />
              <stop offset="100%" stopColor="rgba(10,242,173,0)" />
            </radialGradient>
          </defs>

          {/* ---- background ridge ---- */}
          <path
            d="M0,430 C 240,408 360,452 520,442 C 700,430 760,470 940,460 C 1140,448 1220,478 1420,464 C 1640,448 1760,476 2080,456 L2080,600 L0,600 Z"
            fill="url(#arGround)"
            stroke="rgba(10,242,173,0.18)"
            strokeWidth="1.5"
          />

          {/* ================= HYDRO DAM ================= */}
          <g stroke={A} strokeWidth="2.5" fill="url(#arSolid)" strokeLinejoin="round">
            <path d="M30,470 L60,330 L250,330 L280,470 Z" />
            {/* spillway gates */}
            <g stroke={A} strokeWidth="2" fill="none" opacity="0.7">
              <path d="M86,470 L96,348" /><path d="M120,470 L126,348" />
              <path d="M154,470 L156,348" /><path d="M188,470 L186,348" />
              <path d="M222,470 L216,348" />
            </g>
            {/* towers */}
            <g fill="url(#arSolid)">
              <rect x="60" y="300" width="34" height="34" rx="3" />
              <ellipse cx="77" cy="300" rx="17" ry="7" />
              <rect x="216" y="300" width="34" height="34" rx="3" />
              <ellipse cx="233" cy="300" rx="17" ry="7" />
            </g>
          </g>
          {/* water hint */}
          <path d="M30,476 Q 155,468 280,476" stroke="rgba(10,242,173,0.5)" strokeWidth="2" fill="none" />

          {/* ============== CONVENTIONAL PLANT ============== */}
          <g stroke={A} strokeWidth="2.5" fill="url(#arSolid)" strokeLinejoin="round">
            {/* cooling tower (hyperboloid) */}
            <path d="M372,470 C 380,400 392,392 392,360 C 392,352 372,348 372,340 L452,340 C 452,348 432,352 432,360 C 432,392 444,400 452,470 Z" />
            <ellipse cx="412" cy="340" rx="40" ry="8" fill="rgba(10,242,173,0.05)" />
            {/* plant block + stacks */}
            <rect x="468" y="408" width="86" height="62" />
            <rect x="486" y="356" width="12" height="54" rx="3" />
            <rect x="512" y="368" width="12" height="42" rx="3" />
            <g stroke="none" fill="rgba(10,242,173,0.55)">
              <rect className="ar-win" x="480" y="422" width="10" height="10" rx="1.5" />
              <rect className="ar-win" x="500" y="422" width="10" height="10" rx="1.5" style={{ animationDelay: '1.1s' }} />
              <rect className="ar-win" x="520" y="422" width="10" height="10" rx="1.5" style={{ animationDelay: '2s' }} />
            </g>
          </g>

          {/* ================= WIND TURBINES ================= */}
          {[
            { x: 648, s: 0.78, fast: true, delay: 0 },
            { x: 712, s: 1, fast: false, delay: 0 },
          ].map((t) => (
            <g key={t.x} stroke={A} strokeWidth="2.5" strokeLinecap="round">
              {/* tower */}
              <path d={`M${t.x - 6 * t.s},470 L${t.x - 2.5 * t.s},${470 - 200 * t.s} L${t.x + 2.5 * t.s},${470 - 200 * t.s} L${t.x + 6 * t.s},470 Z`} fill="url(#arSolid)" />
              {/* blades (rotate around hub) */}
              <g transform={`translate(${t.x} ${470 - 200 * t.s})`}>
                <g className={`ar-blades ${t.fast ? 'f' : ''}`}>
                  {[0, 120, 240].map((deg) => (
                    <path
                      key={deg}
                      d={`M0,0 L${-7 * t.s},${-12 * t.s} L0,${-92 * t.s} L${7 * t.s},${-12 * t.s} Z`}
                      transform={`rotate(${deg})`}
                      fill="rgba(10,242,173,0.18)"
                    />
                  ))}
                </g>
                <circle r={6 * t.s} fill={A} />
              </g>
            </g>
          ))}

          {/* ================= SOLAR ARRAY ================= */}
          <g stroke={A} strokeWidth="2" strokeLinejoin="round">
            {/* tilted panel */}
            <g fill="url(#arSolid)">
              <path d="M772,560 L900,520 L968,548 L840,592 Z" />
            </g>
            <g stroke="rgba(10,242,173,0.6)" strokeWidth="1.4" fill="none">
              <path d="M815,545 L884,571" /><path d="M858,532 L926,558" />
              <path d="M806,536 L928,576" /><path d="M828,576 L956,536" />
            </g>
            {/* legs */}
            <path d="M820,575 L820,596 M905,548 L905,572" stroke={A} strokeWidth="2.5" />
          </g>

          {/* ============ TRANSMISSION & DISTRIBUTION ============ */}
          {/* distribution pole */}
          <g stroke={A} strokeWidth="2.5" strokeLinecap="round" fill="none">
            <path d="M1066,470 L1066,318" />
            <path d="M1030,330 L1102,330" />
            <path d="M1038,344 L1094,344" />
            {/* insulators */}
            <circle cx="1036" cy="326" r="3.5" fill={A} />
            <circle cx="1066" cy="322" r="3.5" fill={A} />
            <circle cx="1096" cy="326" r="3.5" fill={A} />
            {/* transformer cans */}
            <rect x="1054" y="356" width="11" height="20" rx="3" fill="url(#arSolid)" />
            <rect x="1070" y="356" width="11" height="20" rx="3" fill="url(#arSolid)" />
          </g>
          {/* lattice pylon */}
          <g stroke={A} strokeWidth="2.2" fill="none" strokeLinejoin="round" opacity="0.92">
            <path d="M1150,470 L1186,300 L1222,470" />
            <path d="M1150,470 L1222,470" />
            <path d="M1158,432 L1214,432 M1166,394 L1206,394 M1173,356 L1199,356" />
            <path d="M1150,470 L1186,432 L1222,470 M1158,432 L1186,394 L1214,432 M1166,394 L1186,356 L1206,394" />
            {/* arms */}
            <path d="M1150,344 L1222,344 M1158,322 L1214,322" />
            <circle cx="1150" cy="344" r="3" fill={A} /><circle cx="1222" cy="344" r="3" fill={A} />
            <circle cx="1158" cy="322" r="3" fill={A} /><circle cx="1214" cy="322" r="3" fill={A} />
          </g>

          {/* power lines (catenary) + flowing current */}
          <g fill="none" stroke="rgba(10,242,173,0.45)" strokeWidth="1.6">
            <path id="ar-wire1" d="M1102,330 Q 1130,372 1150,344" />
            <path id="ar-wire2" d="M1222,344 Q 1262,392 1300,420" />
            <path id="ar-wire3" d="M712,272 Q 900,360 1030,330" />
          </g>
          {['ar-wire1', 'ar-wire2', 'ar-wire3'].map((w, i) => (
            <circle key={w} r="9" fill="url(#arDot)">
              <animateMotion dur={`${3 + i * 0.6}s`} repeatCount="indefinite" begin={`${i * 0.8}s`} rotate="auto">
                <mpath href={`#${w}`} />
              </animateMotion>
            </circle>
          ))}

          {/* ================= SMART BUILDINGS (IoT) ================= */}
          <g stroke={A} strokeWidth="2.4" fill="url(#arSolid)" strokeLinejoin="round">
            <rect x="1282" y="400" width="56" height="70" rx="2" />
            <rect x="1344" y="372" width="64" height="98" rx="2" />
          </g>
          <g fill="rgba(10,242,173,0.6)" stroke="none">
            {[0, 1, 2].map((r) =>
              [0, 1].map((c) => (
                <rect key={`a${r}${c}`} className="ar-win" x={1294 + c * 20} y={414 + r * 18} width="11" height="11" rx="1.5" style={{ animationDelay: `${(r + c) * 0.5}s` }} />
              )),
            )}
            {[0, 1, 2, 3].map((r) =>
              [0, 1, 2].map((c) => (
                <rect key={`b${r}${c}`} className="ar-win" x={1356 + c * 16} y={388 + r * 19} width="9" height="9" rx="1.5" style={{ animationDelay: `${(r * c + 1) * 0.4}s` }} />
              )),
            )}
          </g>

          {/* ============ POWER TRADING (skyscraper) ============ */}
          <g stroke={A} strokeWidth="2.5" fill="url(#arSolid)" strokeLinejoin="round">
            <path d="M1516,470 L1516,300 Q 1560,236 1612,310 L1612,470 Z" />
          </g>
          <g stroke="rgba(10,242,173,0.45)" strokeWidth="1.3" fill="none">
            {Array.from({ length: 9 }).map((_, i) => (
              <path key={i} d={`M1518,${336 + i * 15} L1610,${336 + i * 15}`} />
            ))}
            <path d="M1564,300 L1564,470" />
          </g>

          {/* ================= EV CHARGING ================= */}
          <g strokeLinejoin="round" strokeLinecap="round">
            {/* charger post */}
            <g stroke={A} strokeWidth="2.5" fill="url(#arSolid)">
              <rect x="1772" y="424" width="20" height="46" rx="4" />
              <rect x="1776" y="430" width="12" height="12" rx="2" fill="rgba(10,242,173,0.5)" />
            </g>
            <path d="M1792,452 q 16,2 16,16" stroke={A} strokeWidth="2" fill="none" />
            {/* car */}
            <g stroke={A} strokeWidth="2.5" fill="url(#arSolid)">
              <path d="M1814,470 L1822,446 Q 1828,432 1846,430 L1886,430 Q 1906,432 1916,452 L1924,470 Z" />
              <path d="M1838,431 L1846,446 L1900,446 L1892,431" fill="rgba(10,242,173,0.06)" stroke="rgba(10,242,173,0.5)" strokeWidth="1.6" />
            </g>
            <circle cx="1842" cy="470" r="10" fill="#020203" stroke={A} strokeWidth="2.5" />
            <circle cx="1900" cy="470" r="10" fill="#020203" stroke={A} strokeWidth="2.5" />
            <circle cx="1826" cy="452" r="2.5" fill={A} />
          </g>

          {/* ================= HOTSPOTS ================= */}
          {HOTSPOTS.map((h, i) => (
            <g
              key={h.id}
              className="ar-hotspot"
              style={{
                opacity: show ? 1 : 0,
                transform: show ? 'translateY(0)' : 'translateY(10px)',
                transition: `opacity .6s ease ${0.4 + i * 0.12}s, transform .6s ease ${0.4 + i * 0.12}s`,
              }}
            >
              {h.label.map((ln, j) => (
                <text
                  key={j}
                  x={h.x + 12}
                  y={h.y - 18 + (j - (h.label.length - 1)) * 26}
                  fill="#fff"
                  fontSize="26"
                  fontWeight="600"
                  fontFamily="Inter, sans-serif"
                >
                  {ln}
                </text>
              ))}
              {/* marker square */}
              <rect x={h.x} y={h.y} width="22" height="22" rx="3" fill="rgba(2,2,3,0.6)" stroke={A} strokeWidth="2">
                <animate attributeName="stroke-opacity" values="0.5;1;0.5" dur="2.4s" repeatCount="indefinite" begin={`${i * 0.3}s`} />
              </rect>
              <circle cx={h.x + 11} cy={h.y + 11} r="3.5" fill={A}>
                <animate attributeName="r" values="3;4.5;3" dur="2.4s" repeatCount="indefinite" begin={`${i * 0.3}s`} />
              </circle>
            </g>
          ))}
        </svg>
      </div>
    </section>
  )
}
