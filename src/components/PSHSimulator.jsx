import { useEffect, useRef, useState } from 'react'

/* ---------------------------------------------------------------------------
   PSHSimulator — an interactive recreation of the "A Day in the Life of a PSH
   Plant" schematic from the article. Toggle between off-peak (pump water up)
   and peak (generate, water down) and the diagram animates accordingly:
   flow direction reverses, the powerhouse switches between pump/turbine, the
   transmission line energises, the reservoir fills or draws down, and the
   narrative panel swaps. Auto-cycles until the reader interacts.
--------------------------------------------------------------------------- */

// Centreline of the penstock corridor — reused for the animated flow path.
const PENSTOCK = 'M 262 208 L 572 350'

const COPY = {
  pump: {
    clock: '2:00 AM',
    mode: 'Off-peak · Pump',
    price: 'Low price · surplus',
    text:
      "Nepal's run-of-river plants are generating at full capacity. Demand is low. Instead of curtailing, the PSH plant's pumps activate — pushing water 400 metres uphill into the saddle reservoir above the valley. Every megawatt-hour stored is one that would otherwise have been wasted.",
  },
  generate: {
    clock: '6:00 PM',
    mode: 'Peak · Generate',
    price: '3–5× price · peak',
    text:
      "Homes light up. Factories run a final shift. India's power exchange, 200 kilometres south, registers peak prices. The PSH plant opens its penstocks. Water roars down through the turbines. The plant dispatches power at 3 to 5 times the price it would have fetched at midnight.",
  },
}

export default function PSHSimulator() {
  const [mode, setMode] = useState('pump')
  const [auto, setAuto] = useState(true)
  const timer = useRef(null)

  useEffect(() => {
    if (!auto) return
    timer.current = setInterval(() => {
      setMode((m) => (m === 'pump' ? 'generate' : 'pump'))
    }, 6000)
    return () => clearInterval(timer.current)
  }, [auto])

  const pick = (m) => {
    setAuto(false)
    setMode(m)
  }

  const c = COPY[mode]
  const generating = mode === 'generate'

  return (
    <figure className={`psh-sim ${generating ? 'mode-generate' : 'mode-pump'}`}>
      <style>{`
        .psh-sim {
          margin: 0;
          border: 1px solid var(--ar-border, #1a1a24);
          border-radius: 1.25rem;
          background:
            radial-gradient(ellipse at 60% 0%, rgba(0,240,152,0.10) 0%, transparent 55%),
            linear-gradient(180deg, #0a0f12 0%, #060a0c 100%);
          overflow: hidden;
        }
        .psh-head {
          display:flex; align-items:center; justify-content:space-between;
          gap:12px; flex-wrap:wrap;
          padding:16px 20px; border-bottom:1px solid rgba(255,255,255,0.06);
        }
        .psh-eyebrow { display:flex; align-items:center; gap:8px; color:#00F098;
          font-size:.72rem; font-weight:700; letter-spacing:.12em; text-transform:uppercase; }
        .psh-sub { color:#8ba1b5; font-size:.78rem; }
        .psh-toggle { display:inline-flex; background:rgba(255,255,255,0.05);
          border:1px solid rgba(255,255,255,0.08); border-radius:999px; padding:3px; }
        .psh-toggle button {
          appearance:none; border:0; cursor:pointer; background:transparent;
          color:#8ba1b5; font-size:.74rem; font-weight:600; letter-spacing:.02em;
          padding:6px 13px; border-radius:999px; transition:all .25s ease; white-space:nowrap;
        }
        .psh-toggle button.active { color:#03130c; background:#00F098; }
        .psh-stage { position:relative; }
        .psh-stage svg { display:block; width:100%; height:auto; }

        /* flowing droplets along the penstock */
        .psh-dot { offset-path: path('${PENSTOCK}'); offset-rotate:0deg;
          animation: psh-flow 1.7s linear infinite; }
        .mode-pump .psh-dot { animation-direction: reverse; }
        .psh-dot:nth-child(2){ animation-delay:.42s }
        .psh-dot:nth-child(3){ animation-delay:.85s }
        .psh-dot:nth-child(4){ animation-delay:1.27s }
        @keyframes psh-flow { from { offset-distance:0% } to { offset-distance:100% } }

        /* transmission wire energises only when generating */
        .psh-wire { stroke:#00F098; stroke-width:2; fill:none;
          stroke-dasharray:5 8; animation: psh-wire 1s linear infinite; transition:opacity .5s ease; }
        @keyframes psh-wire { to { stroke-dashoffset:-13 } }
        .mode-pump .psh-wire { opacity:.18 }
        .mode-generate .psh-wire { opacity:1 }

        .psh-reservoir { transition: all .9s ease; }
        .psh-gen { transition: fill .5s ease; }
        .mode-pump .psh-gen { fill:#3aa0ff }
        .mode-generate .psh-gen { fill:#00F098 }
        .psh-pulse { animation: psh-pulse 2.4s ease-in-out infinite; transform-origin:center; }
        @keyframes psh-pulse { 0%,100%{opacity:.55} 50%{opacity:1} }

        .psh-label { fill:#b9c6d1; font-size:12px; font-weight:600;
          font-family: ui-sans-serif, system-ui, sans-serif; }
        .psh-label.dim { fill:#7c8b99; font-size:10.5px; font-weight:500; }
        .psh-pipe { stroke:#2b3a44; stroke-width:9; fill:none; stroke-linecap:round; }
        .psh-pipe-core { stroke:#0e1518; stroke-width:4; fill:none; stroke-linecap:round; }

        .psh-foot { display:grid; grid-template-columns: 1fr; gap:14px;
          padding:18px 20px 20px; border-top:1px solid rgba(255,255,255,0.06); }
        @media (min-width:640px){ .psh-foot { grid-template-columns: auto 1fr; align-items:start; } }
        .psh-clock { display:flex; flex-direction:column; gap:4px; }
        .psh-clock .t { color:#fff; font-size:1.7rem; font-weight:600; line-height:1; letter-spacing:-.01em; }
        .psh-chip { display:inline-block; margin-top:2px; padding:3px 10px; border-radius:999px;
          font-size:.68rem; font-weight:700; letter-spacing:.04em; text-transform:uppercase;
          border:1px solid rgba(0,240,152,0.3); color:#00F098; background:rgba(0,240,152,0.12); width:max-content; }
        .psh-narr { color:#aeb9c4; font-size:.92rem; line-height:1.6; }
        .psh-kicker2 { color:#fff; font-weight:600; }
        .psh-close { color:#fff; font-style:italic; font-size:1.02rem; text-align:center;
          padding:0 20px 20px; }
        @media (prefers-reduced-motion: reduce){
          .psh-dot,.psh-wire,.psh-pulse{ animation:none }
        }
      `}</style>

      <figcaption className="psh-head">
        <div>
          <span className="psh-eyebrow">
            <svg width="11" height="11" viewBox="0 0 10 10" aria-hidden="true">
              <path d="M2 1 L9 5 L2 9 Z" fill="#00F098" />
            </svg>
            A Day in the Life of a PSH Plant
          </span>
          <div className="psh-sub">One cycle · Monsoon season · Karnali Valley</div>
        </div>
        <div className="psh-toggle" role="group" aria-label="Plant mode">
          <button
            className={mode === 'pump' ? 'active' : ''}
            onClick={() => pick('pump')}
          >
            2:00 AM · Pump
          </button>
          <button
            className={generating ? 'active' : ''}
            onClick={() => pick('generate')}
          >
            6:00 PM · Generate
          </button>
        </div>
      </figcaption>

      <div className="psh-stage">
        <svg viewBox="0 0 820 470" role="img" aria-label="Pumped storage hydropower schematic">
          {/* mountain massif with a saddle holding the upper reservoir */}
          <path
            d="M0 470 L0 300 L110 150 L196 214 L250 196 L332 122 L432 222 L560 168 L700 300 L820 256 L820 470 Z"
            fill="#10171c"
            stroke="#1c2730"
            strokeWidth="1"
          />
          {/* valley floor */}
          <rect x="0" y="430" width="820" height="40" fill="#0b1417" />

          {/* upper reservoir (pondage) — fills slightly more in pump mode */}
          <g className="psh-reservoir" transform={generating ? 'translate(0,4)' : 'translate(0,0)'}>
            <path d="M178 210 Q224 188 276 210 L270 228 Q224 240 184 228 Z" fill="#0e2f33" />
            <path
              d="M178 210 Q224 192 276 210"
              fill="none"
              stroke="#22e3c4"
              strokeWidth="3"
              className="psh-pulse"
            />
          </g>
          {/* embankment dam */}
          <path d="M272 205 L288 207 L284 232 L268 230 Z" fill="#33414b" stroke="#465763" strokeWidth="1" />

          {/* HEAD indicator */}
          <line x1="410" y1="206" x2="410" y2="424" stroke="#56707e" strokeWidth="1.4" strokeDasharray="3 4" />
          <path d="M410 206 l-4 8 h8 Z" fill="#56707e" />
          <path d="M410 424 l-4 -8 h8 Z" fill="#56707e" />
          <text x="420" y="320" className="psh-label">Head (H) ≈ 400 m</text>

          {/* penstocks (two parallel pipes) */}
          <path className="psh-pipe" d="M256 212 L566 354" />
          <path className="psh-pipe" d="M268 204 L578 346" />
          <path className="psh-pipe-core" d="M262 208 L572 350" />

          {/* flowing droplets */}
          <g>
            <circle className="psh-dot" r="4" fill="#7fe9ff" />
            <circle className="psh-dot" r="4" fill="#7fe9ff" />
            <circle className="psh-dot" r="4" fill="#7fe9ff" />
            <circle className="psh-dot" r="4" fill="#7fe9ff" />
          </g>

          {/* powerhouse */}
          <rect x="548" y="346" width="132" height="70" rx="6" fill="#161f25" stroke="#2c3a44" strokeWidth="1.5" />
          <circle cx="592" cy="381" r="17" fill="none" stroke="#2c3a44" strokeWidth="2" />
          <circle className="psh-gen" cx="592" cy="381" r="11" />
          <text x="592" y="385" textAnchor="middle" style={{ fontSize: 12, fontWeight: 700, fill: '#03130c' }}>G</text>

          {/* tailrace to river */}
          <path className="psh-pipe-core" d="M614 416 L614 432" />
          {/* Karnali river */}
          <path
            d="M0 440 Q60 433 120 440 T240 440 T360 440 T480 440 T600 440 T720 440 T820 440"
            fill="none"
            stroke="#1f6f8f"
            strokeWidth="6"
            className="psh-pulse"
          />

          {/* transmission line: powerhouse → village */}
          <path className="psh-wire" d="M676 360 L706 352 L744 352 L778 352" />
          <line x1="706" y1="352" x2="706" y2="372" stroke="#2c3a44" strokeWidth="2" />
          <line x1="744" y1="352" x2="744" y2="372" stroke="#2c3a44" strokeWidth="2" />
          {/* village */}
          <path d="M772 352 l16 -12 l16 12 Z" fill="#2c3a44" />
          <rect x="776" y="352" width="24" height="18" fill="#1c2730" stroke="#2c3a44" />

          {/* labels */}
          <text x="150" y="178" className="psh-label">Pondage reservoir</text>
          <text x="150" y="252" className="psh-label dim">Saddle between peaks</text>
          <text x="296" y="222" className="psh-label dim">Embankment dam</text>
          <text x="300" y="276" className="psh-label">Pump &amp; power penstock</text>
          <text x="300" y="292" className="psh-label dim">river ⇄ pondage ⇄ turbine</text>
          <text x="614" y="436" className="psh-label dim">Powerhouse</text>
          <text x="40" y="462" className="psh-label dim">Karnali River · Tailrace</text>
          <text x="700" y="392" className="psh-label dim">132 kV line</text>
          <text x="760" y="392" className="psh-label dim">Village</text>
        </svg>
      </div>

      <div className="psh-foot">
        <div className="psh-clock">
          <span className="t">{c.clock}</span>
          <span className="psh-chip">{c.price}</span>
        </div>
        <p className="psh-narr">
          <span className="psh-kicker2">{c.mode}. </span>
          {c.text}
        </p>
      </div>
      <p className="psh-close">The same water. The same mountain. An entirely different economics.</p>
    </figure>
  )
}
