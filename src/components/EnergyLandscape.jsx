import { useEffect, useRef, useState } from 'react'

/* ---------------------------------------------------------------------------
   Animated energy-landscape panorama, on brand. A teal line-art scene of what
   Aether Renova actually builds — hydropower, solar, civil construction, and
   transmission — with rotating/working parts, current flowing along the lines,
   and glowing hotspot markers that reveal on scroll.
--------------------------------------------------------------------------- */

const A = '#0af2ad' // accent

// Hotspot label + marker positions (in viewBox units).
const HOTSPOTS = [
  { id: 'hydro', label: ['Hydro Energy'], x: 188, y: 300 },
  { id: 'solar', label: ['Solar Energy'], x: 556, y: 326 },
  { id: 'construction', label: ['Construction'], x: 930, y: 120 },
  { id: 'transmission', label: ['Transmission Line'], x: 1352, y: 244 },
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
        @keyframes ar-hook { 0%,100% { transform: translateY(0); } 50% { transform: translateY(11px); } }
        .ar-hook { transform-box: fill-box; animation: ar-hook 4.6s ease-in-out infinite; }
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
          From the river and the sun, to the civil works that build it, to the
          lines that carry it — every link, under one roof.
        </p>
      </div>

      {/* radial ground glow */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[60%] bg-[radial-gradient(60%_120%_at_50%_120%,rgba(10,242,173,0.10),transparent_70%)]" />

      <div
        className={`relative mt-6 transition-all duration-[1100ms] ease-out ${
          show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <svg viewBox="0 0 1700 560" className="w-full h-auto block" role="img" aria-label="Aether Renova energy value chain">
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

          {/* ---- ground ---- */}
          <path
            d="M0,420 C 250,400 380,440 560,430 C 760,420 840,452 1040,442 C 1260,430 1360,456 1560,444 C 1640,440 1680,448 1700,444 L1700,560 L0,560 Z"
            fill="url(#arGround)"
            stroke="rgba(10,242,173,0.18)"
            strokeWidth="1.5"
          />

          {/* ================= HYDRO DAM ================= */}
          <g stroke={A} strokeWidth="2.5" fill="url(#arSolid)" strokeLinejoin="round">
            <path d="M70,440 L100,308 L300,308 L330,440 Z" />
            <g stroke={A} strokeWidth="2" fill="none" opacity="0.7">
              <path d="M128,440 L136,326" /><path d="M166,440 L170,326" />
              <path d="M204,440 L204,326" /><path d="M242,440 L238,326" />
              <path d="M280,440 L272,326" />
            </g>
            {/* towers */}
            <g fill="url(#arSolid)">
              <rect x="100" y="278" width="34" height="32" rx="3" />
              <ellipse cx="117" cy="278" rx="17" ry="7" />
              <rect x="266" y="278" width="34" height="32" rx="3" />
              <ellipse cx="283" cy="278" rx="17" ry="7" />
            </g>
            {/* powerhouse */}
            <rect x="334" y="404" width="56" height="36" fill="url(#arSolid)" />
          </g>
          <path d="M70,446 Q 200,438 330,446" stroke="rgba(10,242,173,0.5)" strokeWidth="2" fill="none" />

          {/* ================= SOLAR ARRAY ================= */}
          <g strokeLinejoin="round">
            <g fill="url(#arSolid)" stroke={A} strokeWidth="2.4">
              <path d="M474,434 L610,394 L682,422 L546,466 Z" />
            </g>
            <g stroke="rgba(10,242,173,0.6)" strokeWidth="1.4" fill="none">
              <path d="M520,421 L592,447" /><path d="M566,408 L638,434" />
              <path d="M512,411 L644,452" /><path d="M540,452 L672,410" />
            </g>
            <path d="M528,450 L528,476 M614,424 L614,448" stroke={A} strokeWidth="2.5" />
          </g>

          {/* ================= CONSTRUCTION ================= */}
          {/* building under construction */}
          <g stroke={A} strokeWidth="2.4" strokeLinejoin="round" fill="none">
            {/* columns */}
            <path d="M902,440 L902,252 M956,440 L956,252 M1010,440 L1010,252 M1064,440 L1064,252" />
            {/* floor slabs */}
            <path d="M896,440 L1070,440 M896,396 L1070,396 M896,352 L1070,352 M896,308 L1070,308 M896,264 L1070,264" />
            {/* finished lower floors (filled) */}
            <rect x="902" y="396" width="162" height="44" fill="url(#arSolid)" />
            <rect x="902" y="352" width="108" height="44" fill="url(#arSolid)" />
          </g>
          {/* a few lit windows on finished floors */}
          <g fill="rgba(10,242,173,0.6)" stroke="none">
            <rect className="ar-win" x="916" y="410" width="12" height="14" rx="1.5" />
            <rect className="ar-win" x="952" y="410" width="12" height="14" rx="1.5" style={{ animationDelay: '1s' }} />
            <rect className="ar-win" x="988" y="410" width="12" height="14" rx="1.5" style={{ animationDelay: '2s' }} />
            <rect className="ar-win" x="924" y="366" width="12" height="14" rx="1.5" style={{ animationDelay: '1.6s' }} />
            <rect className="ar-win" x="966" y="366" width="12" height="14" rx="1.5" style={{ animationDelay: '0.5s' }} />
          </g>

          {/* tower crane */}
          <g stroke={A} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" fill="none">
            {/* mast (lattice) */}
            <path d="M812,440 L812,150 M832,440 L832,150" />
            <path d="M812,440 L832,416 L812,392 L832,368 L812,344 L832,320 L812,296 L832,272 L812,248 L832,224 L812,200 L832,176 L812,152" stroke="rgba(10,242,173,0.55)" strokeWidth="1.6" />
            {/* apex */}
            <path d="M822,118 L812,150 L832,150 Z" fill="url(#arSolid)" />
            {/* counter-jib + counterweight */}
            <path d="M822,150 L746,150" />
            <rect x="742" y="146" width="22" height="22" rx="2" fill="url(#arSolid)" />
            {/* tie bars */}
            <path d="M822,120 L1090,150 M822,120 L752,150" stroke="rgba(10,242,173,0.5)" strokeWidth="1.6" />
            {/* jib (working arm truss) */}
            <path d="M822,150 L1098,150 M822,166 L1090,158" />
            <path d="M860,150 L876,166 M912,150 L928,158 M964,150 L980,158 L996,150 M1016,150 L1032,158 M1060,150 L1076,158" stroke="rgba(10,242,173,0.5)" strokeWidth="1.5" />
            {/* cab */}
            <rect x="806" y="150" width="20" height="20" rx="2" fill="url(#arSolid)" />
            {/* trolley + hook + load (bobbing) */}
            <g className="ar-hook">
              <path d="M1006,160 L1006,300" />
              <rect x="990" y="300" width="32" height="18" rx="2" fill="url(#arSolid)" />
            </g>
            <rect x="998" y="150" width="16" height="11" rx="2" fill="url(#arSolid)" />
          </g>

          {/* ============ TRANSMISSION LINE ============ */}
          {/* distribution pole */}
          <g stroke={A} strokeWidth="2.5" strokeLinecap="round" fill="none">
            <path d="M1252,440 L1252,300" />
            <path d="M1216,312 L1288,312" />
            <path d="M1224,326 L1280,326" />
            <circle cx="1222" cy="308" r="3.5" fill={A} />
            <circle cx="1252" cy="304" r="3.5" fill={A} />
            <circle cx="1282" cy="308" r="3.5" fill={A} />
            <rect x="1240" y="338" width="11" height="20" rx="3" fill="url(#arSolid)" />
            <rect x="1256" y="338" width="11" height="20" rx="3" fill="url(#arSolid)" />
          </g>
          {/* lattice pylon */}
          <g stroke={A} strokeWidth="2.2" fill="none" strokeLinejoin="round" opacity="0.92">
            <path d="M1372,440 L1408,262 L1444,440" />
            <path d="M1372,440 L1444,440" />
            <path d="M1380,402 L1436,402 M1388,362 L1428,362 M1395,322 L1421,322" />
            <path d="M1372,440 L1408,402 L1444,440 M1380,402 L1408,362 L1436,402 M1388,362 L1408,322 L1428,362" />
            <path d="M1372,306 L1444,306 M1380,284 L1436,284" />
            <circle cx="1372" cy="306" r="3" fill={A} /><circle cx="1444" cy="306" r="3" fill={A} />
            <circle cx="1380" cy="284" r="3" fill={A} /><circle cx="1436" cy="284" r="3" fill={A} />
          </g>

          {/* power lines (catenary) + flowing current */}
          <g fill="none" stroke="rgba(10,242,173,0.45)" strokeWidth="1.6">
            <path id="ar-wireA" d="M390,408 Q 820,470 1216,312" />
            <path id="ar-wireB" d="M1288,312 Q 1330,360 1372,306" />
            <path id="ar-wireC" d="M1444,306 Q 1560,344 1700,318" />
          </g>
          {['ar-wireA', 'ar-wireB', 'ar-wireC'].map((w, i) => (
            <circle key={w} r="8" fill="url(#arDot)">
              <animateMotion dur={`${3.2 + i * 0.7}s`} repeatCount="indefinite" begin={`${i * 0.9}s`} rotate="auto">
                <mpath href={`#${w}`} />
              </animateMotion>
            </circle>
          ))}

          {/* ================= HOTSPOTS ================= */}
          {HOTSPOTS.map((h, i) => (
            <g
              key={h.id}
              style={{
                opacity: show ? 1 : 0,
                transform: show ? 'translateY(0)' : 'translateY(10px)',
                transition: `opacity .6s ease ${0.4 + i * 0.14}s, transform .6s ease ${0.4 + i * 0.14}s`,
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
