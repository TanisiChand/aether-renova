import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SynergyBackground from './SynergyBackground'

/* ---------------------------------------------------------------------------
   Interactive energy-landscape panorama. A teal line-art scene of what Aether
   Renova builds — hydropower, solar, civil construction, transmission — with
   live animation (rotating/working parts, flowing current) and rich hover:
   circular radar markers spotlight their element, dim the rest, draw a leader
   line, and surface an info card that links through. Subtle cursor parallax.
--------------------------------------------------------------------------- */

const A = '#0af2ad'
// viewBox is cropped at the top (VB_Y) to trim empty sky; elements + markers are
// scaled by SCALE around (850, 440) while the land/ground stays full width.
const VB_X = 0
const VB_Y = 100
const VB_W = 1700
const VB_H = 460
const SCALE = 0.88
const ORIGIN_Y = (((440 - VB_Y) / VB_H) * 100).toFixed(3) // % for the overlay transform

// build a realistic solar-cell grid inside a tilted panel (4 corners)
const lerp = (p, q, t) => [p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t]
function panelLines(TL, TR, BR, BL, cols, rows) {
  const out = []
  for (let i = 1; i < cols; i++) {
    const t = i / cols
    out.push([lerp(TL, TR, t), lerp(BL, BR, t)])
  }
  for (let j = 1; j < rows; j++) {
    const t = j / rows
    out.push([lerp(TL, BL, t), lerp(TR, BR, t)])
  }
  return out
}

const SPOTS = [
  {
    id: 'hydro',
    title: 'Hydro Energy',
    desc: 'Run-of-river & storage hydropower harnessing Nepal’s rivers.',
    href: '/projects',
    mx: 200, my: 236, ax: 200, ay: 290, dir: 'up',
  },
  {
    id: 'solar',
    title: 'Solar Energy',
    desc: 'Utility-scale PV farms across the sun-rich Terai belt.',
    href: '/projects',
    mx: 560, my: 332, ax: 566, ay: 404, dir: 'up',
  },
  {
    id: 'construction',
    title: 'Construction',
    desc: 'Civil & heavy infrastructure, engineered in-house by Aether Construction.',
    href: '/companies#aether-construction',
    mx: 945, my: 100, ax: 945, ay: 150, dir: 'down',
  },
  {
    id: 'transmission',
    title: 'Transmission Line',
    desc: 'Evacuation lines & substations delivered by Grid Nepal.',
    href: '/companies#grid-nepal',
    mx: 1360, my: 206, ax: 1408, ay: 262, dir: 'up',
  },
]

export default function EnergyLandscape() {
  const ref = useRef(null)
  const [show, setShow] = useState(false)
  const [active, setActive] = useState(null)
  const navigate = useNavigate()

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

  const elStyle = (id) => ({
    opacity: active && active !== id ? 0.16 : 1,
    filter: active === id ? 'drop-shadow(0 0 16px rgba(10,242,173,0.5))' : 'none',
    transition: 'opacity .45s ease, filter .45s ease',
  })

  return (
    <div
      ref={ref}
      className="relative font-sans"
    >
      <style>{`
        @keyframes ar-hook { 0%,100% { transform: translateY(0); } 50% { transform: translateY(11px); } }
        .ar-hook { transform-box: fill-box; animation: ar-hook 4.6s ease-in-out infinite; }
        @keyframes ar-twinkle { 0%,100% { opacity:.25 } 50% { opacity:.9 } }
        .ar-win { animation: ar-twinkle 3.4s ease-in-out infinite; }
        @keyframes ar-ping { 0% { transform:translate(-50%,-50%) scale(.5); opacity:.7 } 100% { transform:translate(-50%,-50%) scale(2.1); opacity:0 } }

        .ar-spot { position:absolute; transform:translate(-50%,-50%); }
        .ar-dot { position:relative; width:20px; height:20px; border-radius:9999px; border:2px solid ${A}; background:rgba(2,2,3,.6); transition:transform .3s ease, box-shadow .3s ease; }
        .ar-dot .ring { position:absolute; left:50%; top:50%; width:20px; height:20px; border-radius:9999px; border:1px solid rgba(10,242,173,.5); transform:translate(-50%,-50%); animation:ar-ping 2.6s ease-out infinite; }
        .ar-dot .core { position:absolute; inset:5px; border-radius:9999px; background:${A}; transition:transform .3s ease; }
        .ar-spot.on .ar-dot { transform:scale(1.3); box-shadow:0 0 22px rgba(10,242,173,.65); }

        .ar-label { position:absolute; left:50%; bottom:calc(100% + 14px); transform:translateX(-50%); white-space:nowrap; color:#fff; font-weight:600; font-size:clamp(13px,1.05vw,17px); letter-spacing:-.01em; transition:color .3s ease; text-shadow:0 1px 10px rgba(0,0,0,.7); pointer-events:none; }
        .ar-spot.on .ar-label, .ar-spot:hover .ar-label { color:${A}; }

        .ar-card { position:absolute; left:50%; width:236px; padding:15px 17px; border-radius:16px; background:rgba(6,7,11,.96); border:1px solid rgba(10,242,173,.28); box-shadow:0 16px 50px rgba(0,0,0,.55); backdrop-filter:blur(10px); opacity:0; pointer-events:none; z-index:30; transition:opacity .28s ease, transform .28s ease; text-align:left; }
        .ar-card.up { bottom:calc(100% + 46px); transform:translateX(-50%) translateY(8px); }
        .ar-card.down { top:calc(100% + 26px); transform:translateX(-50%) translateY(-8px); }
        .ar-spot.on .ar-card { opacity:1; transform:translateX(-50%) translateY(0); }
        .ar-card .t { color:#fff; font-weight:600; font-size:15px; margin-bottom:5px; }
        .ar-card .d { color:#8ba1b5; font-size:12.5px; line-height:1.55; }
        .ar-card .l { display:inline-flex; align-items:center; gap:5px; margin-top:10px; color:${A}; font-size:12px; font-weight:600; letter-spacing:.02em; }
      `}</style>

      {/* animated node-web — contained to the graphic (no bleed) so it never
          reaches up into the Who We Are text; fades softly at top & bottom */}
      <div className="absolute inset-0 opacity-70 pointer-events-none z-0">
        <SynergyBackground bleed={0} fade />
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[60%] bg-[radial-gradient(60%_120%_at_50%_120%,rgba(10,242,173,0.10),transparent_70%)]" />

      <div
        className={`relative z-10 transition-all duration-[1100ms] ease-out ${
          show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <div className="relative">
          <svg viewBox={`${VB_X} ${VB_Y} ${VB_W} ${VB_H}`} className="w-full h-auto block" role="img" aria-label="Aether Renova energy value chain">
            <defs>
              <linearGradient id="arGround" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(10,242,173,0.10)" />
                <stop offset="100%" stopColor="rgba(10,242,173,0.015)" />
              </linearGradient>
              <linearGradient id="arSolid" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(10,242,173,0.22)" />
                <stop offset="100%" stopColor="rgba(10,242,173,0.04)" />
              </linearGradient>
              <radialGradient id="arDotG" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={A} />
                <stop offset="100%" stopColor="rgba(10,242,173,0)" />
              </radialGradient>
            </defs>

            {/* ground — full width, unscaled */}
            <path
              d="M0,420 C 250,400 380,440 560,430 C 760,420 840,452 1040,442 C 1260,430 1360,456 1560,444 C 1640,440 1680,448 1700,444 L1700,560 L0,560 Z"
              fill="url(#arGround)"
              stroke="rgba(10,242,173,0.18)"
              strokeWidth="1.5"
            />

            {/* everything except the ground is scaled a touch (around the ground
                line) so the land itself stays full width */}
            <g transform={`translate(850 440) scale(${SCALE}) translate(-850 -440)`}>

            {/* ============ HYDRO (dam + spilling water) ============ */}
            <g style={elStyle('hydro')}>
              {/* dam wall */}
              <path d="M70,440 L100,308 L300,308 L330,440 Z" fill="url(#arSolid)" stroke={A} strokeWidth="2.5" strokeLinejoin="round" />
              {/* reservoir water along the crest */}
              <path d="M104,306 q 24,-6 48,0 t 48,0 t 48,0" stroke="rgba(10,242,173,0.6)" strokeWidth="2" fill="none" />
              {/* central spillway sheet */}
              <path d="M150,314 L250,314 L264,440 L136,440 Z" fill="rgba(10,242,173,0.10)" stroke="none" />
              {/* gate piers */}
              <path d="M150,314 L136,440 M250,314 L264,440 M175,314 L168,440 M200,314 L200,440 M225,314 L232,440" stroke={A} strokeWidth="2.2" fill="none" strokeLinecap="round" opacity="0.8" />
              {/* crest gates either side */}
              <g stroke={A} strokeWidth="2" fill="none" opacity="0.7">
                <path d="M118,440 L126,322" /><path d="M140,440 L146,322" />
                <path d="M262,440 L256,322" /><path d="M284,440 L276,322" />
              </g>
              {/* intake towers */}
              <g fill="url(#arSolid)" stroke={A} strokeWidth="2.5" strokeLinejoin="round">
                <rect x="100" y="278" width="34" height="32" rx="3" />
                <ellipse cx="117" cy="278" rx="17" ry="7" />
                <rect x="266" y="278" width="34" height="32" rx="3" />
                <ellipse cx="283" cy="278" rx="17" ry="7" />
              </g>
              {/* powerhouse */}
              <rect x="334" y="406" width="54" height="34" fill="url(#arSolid)" stroke={A} strokeWidth="2.5" />
              {/* downstream water */}
              <g stroke="rgba(10,242,173,0.5)" strokeWidth="1.8" fill="none">
                <path d="M70,448 q 26,7 52,0 t 52,0 t 52,0 t 52,0 t 52,0" />
              </g>
            </g>

            {/* ============ SOLAR (panel array) ============ */}
            <g style={elStyle('solar')} strokeLinejoin="round">
              {/* panel face */}
              <path d="M468,438 L612,392 L692,424 L548,474 Z" fill="url(#arSolid)" stroke={A} strokeWidth="2.4" />
              {/* cell grid */}
              <g stroke="rgba(10,242,173,0.55)" strokeWidth="1.3">
                {panelLines([468, 438], [612, 392], [692, 424], [548, 474], 6, 3).map((l, i) => (
                  <line key={i} x1={l[0][0]} y1={l[0][1]} x2={l[1][0]} y2={l[1][1]} />
                ))}
              </g>
              {/* support frame + legs */}
              <g stroke={A} strokeWidth="2.5" strokeLinecap="round" fill="none">
                <path d="M528,456 L520,486 M620,426 L628,470 M580,440 L580,478" />
                <path d="M508,486 L548,486 M610,470 L646,470" />
              </g>
            </g>

            {/* ============ CONSTRUCTION ============ */}
            <g style={elStyle('construction')}>
              <g stroke={A} strokeWidth="2.4" strokeLinejoin="round" fill="none">
                <path d="M902,440 L902,252 M956,440 L956,252 M1010,440 L1010,252 M1064,440 L1064,252" />
                <path d="M896,440 L1070,440 M896,396 L1070,396 M896,352 L1070,352 M896,308 L1070,308 M896,264 L1070,264" />
                <rect x="902" y="396" width="162" height="44" fill="url(#arSolid)" />
                <rect x="902" y="352" width="108" height="44" fill="url(#arSolid)" />
              </g>
              <g fill="rgba(10,242,173,0.6)" stroke="none">
                <rect className="ar-win" x="916" y="410" width="12" height="14" rx="1.5" />
                <rect className="ar-win" x="952" y="410" width="12" height="14" rx="1.5" style={{ animationDelay: '1s' }} />
                <rect className="ar-win" x="988" y="410" width="12" height="14" rx="1.5" style={{ animationDelay: '2s' }} />
                <rect className="ar-win" x="924" y="366" width="12" height="14" rx="1.5" style={{ animationDelay: '1.6s' }} />
                <rect className="ar-win" x="966" y="366" width="12" height="14" rx="1.5" style={{ animationDelay: '0.5s' }} />
              </g>
              <g stroke={A} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" fill="none">
                <path d="M812,440 L812,150 M832,440 L832,150" />
                <path d="M812,440 L832,416 L812,392 L832,368 L812,344 L832,320 L812,296 L832,272 L812,248 L832,224 L812,200 L832,176 L812,152" stroke="rgba(10,242,173,0.55)" strokeWidth="1.6" />
                <path d="M822,118 L812,150 L832,150 Z" fill="url(#arSolid)" />
                <path d="M822,150 L746,150" />
                <rect x="742" y="146" width="22" height="22" rx="2" fill="url(#arSolid)" />
                <path d="M822,120 L1090,150 M822,120 L752,150" stroke="rgba(10,242,173,0.5)" strokeWidth="1.6" />
                <path d="M822,150 L1098,150 M822,166 L1090,158" />
                <path d="M860,150 L876,166 M912,150 L928,158 M964,150 L980,158 L996,150 M1016,150 L1032,158 M1060,150 L1076,158" stroke="rgba(10,242,173,0.5)" strokeWidth="1.5" />
                <rect x="806" y="150" width="20" height="20" rx="2" fill="url(#arSolid)" />
                <g className="ar-hook">
                  <path d="M1006,160 L1006,300" />
                  <rect x="990" y="300" width="32" height="18" rx="2" fill="url(#arSolid)" />
                </g>
                <rect x="998" y="150" width="16" height="11" rx="2" fill="url(#arSolid)" />
              </g>
            </g>

            {/* ============ TRANSMISSION (+ flowing current) ============ */}
            <g style={elStyle('transmission')}>
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
              <g stroke={A} strokeWidth="2.2" fill="none" strokeLinejoin="round" opacity="0.92">
                <path d="M1372,440 L1408,262 L1444,440" />
                <path d="M1372,440 L1444,440" />
                <path d="M1380,402 L1436,402 M1388,362 L1428,362 M1395,322 L1421,322" />
                <path d="M1372,440 L1408,402 L1444,440 M1380,402 L1408,362 L1436,402 M1388,362 L1408,322 L1428,362" />
                <path d="M1372,306 L1444,306 M1380,284 L1436,284" />
                <circle cx="1372" cy="306" r="3" fill={A} /><circle cx="1444" cy="306" r="3" fill={A} />
                <circle cx="1380" cy="284" r="3" fill={A} /><circle cx="1436" cy="284" r="3" fill={A} />
              </g>
              <g fill="none" stroke="rgba(10,242,173,0.45)" strokeWidth="1.6">
                <path id="ar-wireA" d="M390,408 Q 820,470 1216,312" />
                <path id="ar-wireB" d="M1288,312 Q 1330,360 1372,306" />
                <path id="ar-wireC" d="M1444,306 Q 1560,344 1700,318" />
              </g>
              {['ar-wireA', 'ar-wireB', 'ar-wireC'].map((w, i) => (
                <circle key={w} r="8" fill="url(#arDotG)">
                  <animateMotion dur={`${3.2 + i * 0.7}s`} repeatCount="indefinite" begin={`${i * 0.9}s`} rotate="auto">
                    <mpath href={`#${w}`} />
                  </animateMotion>
                </circle>
              ))}
            </g>

            {/* leader lines (marker → element) */}
            {SPOTS.map((s) => (
              <line
                key={s.id}
                x1={s.ax} y1={s.ay} x2={s.mx} y2={s.my}
                stroke={A}
                strokeWidth={active === s.id ? 2 : 1.2}
                strokeOpacity={active === s.id ? 0.9 : 0.3}
                strokeDasharray="3 5"
                style={{ transition: 'stroke-opacity .3s ease, stroke-width .3s ease' }}
              />
            ))}
            </g>
          </svg>

          {/* interactive hotspot overlay (HTML — crisp + hoverable).
              Scaled to match the SVG element group so markers stay aligned. */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ transform: `scale(${SCALE})`, transformOrigin: `50% ${ORIGIN_Y}%` }}
          >
            {SPOTS.map((s, i) => (
              <div
                key={s.id}
                className={`ar-spot pointer-events-auto cursor-pointer ${active === s.id ? 'on' : ''}`}
                style={{
                  left: `${((s.mx - VB_X) / VB_W) * 100}%`,
                  top: `${((s.my - VB_Y) / VB_H) * 100}%`,
                  opacity: show ? 1 : 0,
                  transitionProperty: 'opacity',
                  transitionDuration: '.6s',
                  transitionDelay: `${0.4 + i * 0.12}s`,
                }}
                onMouseEnter={() => setActive(s.id)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(s.id)}
                onBlur={() => setActive(null)}
                onClick={() => navigate(s.href)}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), navigate(s.href))}
                role="link"
                tabIndex={0}
                aria-label={`${s.title} — ${s.desc}`}
              >
                <span className="ar-label">{s.title}</span>
                <span className="ar-dot">
                  <span className="ring" />
                  <span className="core" />
                </span>
                <div className={`ar-card ${s.dir}`}>
                  <p className="t">{s.title}</p>
                  <p className="d">{s.desc}</p>
                  <span className="l">
                    Explore
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
