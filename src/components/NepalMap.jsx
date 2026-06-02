import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { projects } from '../data/projects'

// Accurate Nepal outline (equirectangular projection, viewBox 1000x572)
// generated from public-domain country GeoJSON. Project markers below use
// pixel coords (mapX/mapY) computed in the same projection.
const NEPAL_PATH =
  'M191.3 0.0 L190.7 4.5 L183.6 2.3 L183.2 7.4 L183.7 10.1 L174.3 8.8 L168.4 3.5 L165.3 4.0 L164.8 6.5 L168.2 9.4 L164.7 10.6 L164.7 16.2 L167.0 19.4 L165.0 22.5 L166.7 22.7 L163.8 28.6 L163.7 33.9 L158.8 37.8 L156.1 41.1 L152.7 40.1 L146.6 41.7 L150.5 46.4 L150.3 52.4 L147.3 56.7 L144.3 57.8 L146.3 59.3 L142.2 61.5 L139.7 59.2 L138.0 60.2 L131.8 60.3 L126.5 54.2 L128.9 49.2 L124.7 47.4 L126.0 40.4 L119.6 34.6 L107.1 37.1 L105.3 30.6 L98.5 38.8 L99.7 43.9 L90.9 50.4 L85.4 57.0 L83.5 61.8 L74.7 67.6 L67.5 67.8 L62.9 72.6 L60.2 81.6 L51.8 90.6 L45.7 90.1 L41.3 95.4 L37.5 98.3 L40.3 109.2 L43.9 110.7 L42.5 116.4 L40.0 122.3 L34.8 125.3 L35.9 127.9 L27.8 134.9 L29.7 138.6 L22.3 140.1 L22.4 145.1 L26.3 147.1 L27.0 152.5 L31.0 158.5 L28.2 174.6 L23.3 171.1 L22.4 173.7 L26.3 182.3 L21.3 185.1 L14.5 183.4 L9.3 191.5 L7.4 203.6 L3.9 205.2 L0.0 213.6 L1.0 226.2 L6.6 225.7 L19.1 236.3 L24.8 236.3 L24.6 240.2 L30.0 242.9 L32.2 247.6 L38.5 253.8 L45.9 252.5 L50.1 255.2 L51.6 260.6 L55.8 264.9 L57.9 261.7 L54.0 248.9 L59.1 244.9 L64.3 246.9 L63.4 249.8 L73.7 253.3 L77.3 257.2 L77.8 259.6 L84.7 261.9 L87.7 266.3 L96.7 271.2 L102.6 270.8 L103.6 276.7 L109.0 280.3 L115.7 280.3 L118.1 285.2 L122.0 285.2 L139.0 289.9 L142.7 296.7 L145.4 305.6 L153.9 315.1 L154.9 317.1 L152.5 318.8 L154.2 321.2 L154.4 323.2 L160.6 321.8 L162.3 316.9 L170.2 319.8 L171.6 322.9 L174.6 324.7 L173.8 329.8 L194.5 342.3 L201.1 343.3 L214.6 355.2 L218.5 356.6 L224.4 361.1 L228.4 361.5 L229.1 358.8 L234.0 351.3 L246.3 352.1 L253.9 360.6 L256.3 361.0 L257.1 359.9 L268.8 367.9 L282.8 377.4 L288.7 384.4 L296.6 386.9 L301.8 384.7 L306.2 385.1 L319.7 380.5 L325.0 380.8 L325.8 385.2 L326.1 388.1 L328.8 391.0 L328.7 395.8 L331.2 399.2 L329.2 404.9 L330.2 408.3 L328.3 410.6 L336.3 411.9 L351.6 411.1 L355.0 416.2 L365.6 418.4 L383.8 417.7 L387.2 423.3 L395.0 427.2 L393.8 430.5 L398.2 434.7 L404.3 433.4 L408.5 427.8 L410.5 423.7 L408.1 419.9 L410.5 417.4 L408.8 414.1 L437.3 415.5 L463.5 429.3 L466.2 432.5 L469.2 428.3 L464.3 422.3 L465.3 419.9 L472.1 420.6 L476.1 419.1 L485.2 419.6 L487.6 420.3 L490.8 418.4 L493.0 414.1 L495.4 413.3 L496.7 409.2 L499.4 409.9 L502.3 409.2 L502.3 413.1 L509.0 415.7 L509.7 419.9 L512.2 417.5 L515.8 418.7 L518.3 425.0 L519.5 426.9 L538.6 429.5 L547.3 431.5 L560.0 434.1 L568.9 450.9 L567.4 456.2 L567.7 460.8 L566.1 468.3 L562.5 473.5 L575.5 480.5 L578.7 479.3 L581.2 482.0 L585.5 478.3 L589.7 482.7 L602.0 487.0 L603.5 493.0 L606.9 494.0 L606.5 496.4 L613.8 497.2 L610.3 499.3 L610.3 501.3 L614.8 502.5 L619.0 499.1 L630.7 499.6 L629.0 507.2 L632.4 515.0 L636.1 514.7 L647.9 516.9 L650.9 514.7 L657.0 510.4 L662.1 511.1 L668.8 508.0 L677.9 500.8 L679.8 502.0 L684.0 498.9 L686.4 501.7 L693.8 504.9 L697.1 510.9 L695.8 521.4 L696.6 527.5 L701.0 533.2 L704.9 533.5 L708.5 536.5 L711.3 535.8 L711.5 542.3 L720.9 534.9 L723.0 533.5 L724.1 529.6 L733.8 528.2 L746.6 533.2 L747.6 536.5 L753.3 534.6 L754.3 537.7 L758.2 538.3 L760.6 535.4 L771.7 534.2 L771.6 536.5 L779.0 538.9 L791.5 545.4 L794.0 545.0 L799.7 551.6 L806.5 553.6 L807.3 555.9 L814.7 558.1 L820.8 561.9 L823.7 557.9 L830.8 559.8 L839.7 554.6 L839.5 550.2 L853.7 546.8 L858.8 539.0 L861.5 539.9 L863.5 557.7 L872.8 564.3 L878.0 563.6 L884.6 563.9 L885.1 569.1 L891.2 569.8 L895.7 572.0 L896.7 563.2 L907.4 560.1 L913.4 560.8 L920.4 562.2 L925.6 567.5 L931.5 565.8 L935.7 562.9 L935.9 560.1 L942.0 563.6 L943.5 562.4 L945.5 563.2 L947.5 559.8 L948.0 557.9 L950.7 555.9 L955.8 559.6 L961.5 555.2 L963.6 558.3 L966.1 558.8 L966.1 562.2 L974.2 566.3 L975.0 570.1 L979.2 570.6 L979.2 565.8 L986.7 561.2 L988.4 555.3 L986.5 551.0 L988.0 548.3 L987.9 543.1 L991.4 536.8 L994.8 532.0 L996.1 525.7 L998.7 517.4 L996.8 505.3 L995.6 499.1 L991.7 495.5 L993.4 491.8 L989.9 487.5 L992.6 483.5 L987.2 480.8 L985.5 476.0 L980.9 476.5 L973.8 465.3 L977.1 458.1 L976.7 449.1 L980.1 440.4 L983.3 434.6 L980.9 429.8 L981.9 423.7 L984.8 421.3 L979.9 413.8 L983.1 408.2 L985.0 400.9 L989.7 396.1 L990.9 390.8 L994.4 384.7 L994.3 381.0 L997.6 374.4 L998.1 370.3 L997.5 367.4 L1000.0 362.7 L991.9 358.0 L987.9 360.6 L985.3 355.9 L978.4 355.4 L972.7 357.1 L967.4 353.3 L958.7 353.7 L958.0 349.6 L954.6 348.9 L952.8 353.3 L948.0 357.9 L946.0 362.5 L942.3 368.8 L934.2 367.9 L934.9 364.7 L930.2 364.9 L927.3 367.2 L924.4 365.5 L924.4 361.0 L921.2 360.1 L917.8 363.5 L911.6 363.0 L907.7 366.6 L902.5 364.7 L905.3 363.2 L905.0 361.1 L897.2 363.2 L896.2 364.9 L891.0 365.5 L889.5 363.0 L883.8 362.7 L879.7 366.9 L870.1 365.0 L866.7 362.3 L865.4 357.9 L860.6 352.8 L856.6 348.2 L844.8 347.1 L843.6 343.5 L835.8 338.1 L830.8 339.3 L822.3 336.7 L822.0 329.1 L818.1 326.7 L811.5 327.9 L807.7 331.6 L804.1 330.3 L803.1 327.2 L798.5 325.9 L799.1 333.3 L795.3 335.5 L792.3 347.7 L787.1 349.1 L784.5 354.7 L779.8 354.2 L775.4 350.3 L771.7 349.6 L770.7 345.9 L768.7 348.9 L764.3 344.3 L757.7 344.7 L756.5 336.2 L754.9 329.6 L757.0 327.1 L753.2 317.6 L750.8 317.6 L751.3 322.7 L746.2 325.2 L744.4 328.9 L740.3 328.3 L740.8 336.4 L739.5 338.9 L745.2 351.5 L738.8 353.2 L736.8 354.7 L727.2 353.0 L723.5 348.1 L726.5 342.0 L716.6 333.5 L717.7 326.6 L714.0 324.9 L713.9 320.5 L711.5 316.3 L706.1 313.4 L699.8 309.7 L697.3 298.7 L695.1 290.1 L693.8 287.7 L691.4 288.0 L691.1 293.4 L689.2 292.8 L687.2 297.8 L687.7 300.2 L681.8 306.3 L679.4 298.5 L671.0 296.0 L668.0 295.1 L657.7 295.8 L655.6 300.4 L652.4 302.9 L648.2 299.7 L639.8 301.7 L634.7 295.6 L631.2 294.3 L629.2 296.1 L621.7 294.3 L619.7 292.8 L622.2 287.4 L619.4 277.9 L621.1 273.2 L625.9 272.5 L628.1 267.1 L629.3 266.3 L630.5 262.4 L628.1 258.0 L630.7 254.2 L629.8 251.3 L626.3 251.1 L621.4 246.1 L617.5 247.4 L613.3 246.4 L608.9 253.0 L605.5 256.5 L605.7 257.9 L600.8 260.6 L600.3 258.2 L591.2 260.2 L589.3 261.2 L579.9 256.5 L569.3 253.2 L570.1 247.6 L565.2 244.7 L561.0 238.5 L554.2 238.8 L551.4 236.8 L548.5 237.7 L546.7 237.3 L544.1 238.7 L537.5 234.0 L538.9 231.1 L536.5 228.8 L537.4 225.9 L533.7 225.4 L534.5 222.5 L528.6 221.2 L525.9 219.4 L523.2 220.7 L516.3 216.5 L514.8 217.7 L511.6 216.7 L510.9 209.6 L513.6 202.7 L514.8 197.0 L511.9 194.2 L507.2 195.2 L506.7 189.8 L509.0 184.3 L505.0 182.4 L504.1 174.2 L508.5 171.4 L508.2 167.9 L497.9 167.5 L498.7 163.9 L494.9 160.7 L492.0 162.2 L488.6 159.5 L486.1 161.5 L483.0 160.0 L483.9 157.5 L479.3 155.5 L477.0 157.3 L471.6 156.8 L466.0 159.3 L460.6 160.0 L458.2 164.0 L458.9 166.7 L449.5 168.0 L443.1 173.7 L439.7 179.3 L435.6 177.3 L431.6 176.9 L431.4 173.2 L425.8 172.6 L424.0 166.2 L420.4 162.9 L418.1 163.0 L414.9 158.7 L416.1 153.2 L412.0 151.1 L413.0 145.3 L405.8 141.5 L403.9 136.3 L402.7 132.8 L400.2 131.3 L393.8 131.8 L391.8 124.3 L396.0 123.4 L387.5 119.6 L387.2 116.9 L384.5 116.9 L381.8 119.3 L380.6 114.9 L375.9 114.7 L371.9 117.1 L366.1 113.6 L364.8 110.2 L361.2 108.4 L355.2 108.9 L353.8 103.9 L348.2 103.6 L342.0 106.2 L338.3 103.7 L339.1 101.2 L332.0 99.9 L330.5 94.8 L323.3 94.9 L323.8 91.4 L328.3 87.8 L324.6 82.9 L316.7 85.3 L315.2 83.6 L317.4 80.1 L312.1 77.1 L307.1 68.3 L303.0 66.3 L299.5 69.5 L296.3 65.8 L284.8 58.2 L283.1 60.8 L279.2 55.5 L274.8 57.0 L271.3 53.5 L267.6 52.5 L259.5 53.4 L258.6 50.7 L260.8 46.7 L259.3 44.6 L263.5 41.1 L260.2 39.1 L260.8 36.1 L255.6 34.8 L254.6 30.8 L250.9 29.6 L252.7 25.5 L252.4 21.0 L252.9 18.7 L251.1 13.7 L245.5 11.6 L245.3 15.1 L240.1 14.1 L237.6 17.0 L232.7 12.7 L229.5 13.9 L221.5 9.4 L214.1 8.6 L205.3 6.6 L200.9 3.5 L191.3 0.0Z'

// Nepal's true projection slopes down toward the east; counter-rotate a few
// degrees to visually level it. The viewBox is padded so the rotated shape
// and any tooltips never clip.
const TILT = -6
const CX = 500
const CY = 286

const statusColor = {
  Operational: '#0AF2AD',
  'In Development': '#fbbf24',
  Planning: '#38bdf8',
}

export default function NepalMap() {
  const [active, setActive] = useState(null)
  const navigate = useNavigate()

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <svg
        viewBox="-30 -36 1060 644"
        className="w-full h-auto overflow-visible"
        role="img"
        aria-label="Map of Aether Renova projects across Nepal"
      >
        <defs>
          <linearGradient id="nplFill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0c1a14" />
            <stop offset="100%" stopColor="#081210" />
          </linearGradient>
          <filter id="mGlow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* everything rotated together so the map sits level */}
        <g transform={`rotate(${TILT} ${CX} ${CY})`}>
          {/* country shape */}
          <path
            d={NEPAL_PATH}
            fill="url(#nplFill)"
            stroke="rgba(10,242,173,0.45)"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />

          {/* markers */}
          {projects.map((p) => {
            if (p.mapX == null) return null
            const isOn = active === p.id
            const color = statusColor[p.status] || '#0AF2AD'

            const hasLink = !!p.detailUrl

            // tooltip sizing \u2014 generous padding, width based on the longest
            // line, clamped so edge markers never clip.
            const line2 = `${p.capacity} \u00b7 ${p.company}`
            const charW = Math.max(p.name.length * 9, line2.length * 6.8)
            const tipW = Math.min(Math.max(charW + 48, 168), 400)
            const tipH = hasLink ? 78 : 60
            // keep the tooltip inside the [-30, 1030] horizontal bounds
            const half = tipW / 2
            const minC = -30 + half + 6 - p.mapX
            const maxC = 1030 - half - 6 - p.mapX
            const cx = Math.max(minC, Math.min(0, maxC))

            const handleClick = () => {
              if (hasLink) navigate(p.detailUrl)
              else setActive(active === p.id ? null : p.id)
            }

            return (
              <g
                key={p.id}
                transform={`translate(${p.mapX} ${p.mapY})`}
                className="cursor-pointer focus:outline-none"
                style={{ outline: 'none', WebkitTapHighlightColor: 'transparent' }}
                onMouseEnter={() => setActive(p.id)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(p.id)}
                onBlur={() => setActive(null)}
                onClick={handleClick}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleClick()
                  }
                }}
                role="link"
                aria-label={hasLink ? `${p.name} \u2014 view project` : p.name}
                tabIndex={0}
              >
                {/* counter-rotate the marker's visuals so dots/text stay upright */}
                <g transform={`rotate(${-TILT})`}>
                  {/* pulse ring */}
                  <circle r="14" fill={color} opacity={isOn ? 0.18 : 0.1}>
                    <animate attributeName="r" values="9;18;9" dur="2.4s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.25;0;0.25" dur="2.4s" repeatCount="indefinite" />
                  </circle>
                  {/* hit area */}
                  <circle r="20" fill="transparent" />
                  {/* dot */}
                  <circle
                    r={isOn ? 8 : 6}
                    fill={color}
                    stroke="#020203"
                    strokeWidth="2"
                    filter={isOn ? 'url(#mGlow)' : undefined}
                    style={{ transition: 'r 0.2s ease' }}
                  />

                  {/* tooltip */}
                  {isOn && (
                    <g transform="translate(0 -20)" style={{ pointerEvents: 'none' }}>
                      <rect
                        x={cx - half}
                        y={-tipH}
                        width={tipW}
                        height={tipH}
                        rx="9"
                        fill="rgba(5,5,7,0.97)"
                        stroke="rgba(10,242,173,0.4)"
                        strokeWidth="1"
                      />
                      <text
                        x={cx}
                        y={-tipH + 26}
                        textAnchor="middle"
                        fill="#ffffff"
                        fontSize="16"
                        fontWeight="700"
                        fontFamily="Inter, sans-serif"
                      >
                        {p.name}
                      </text>
                      <text
                        x={cx}
                        y={-tipH + 46}
                        textAnchor="middle"
                        fill={color}
                        fontSize="12.5"
                        fontFamily="Inter, sans-serif"
                      >
                        {line2}
                      </text>
                      {hasLink && (
                        <text
                          x={cx}
                          y={-tipH + 66}
                          textAnchor="middle"
                          fill="rgba(10,242,173,0.9)"
                          fontSize="11"
                          fontWeight="600"
                          fontFamily="Inter, sans-serif"
                          letterSpacing="0.04em"
                        >
                          View project →
                        </text>
                      )}
                      <path d="M-7 0 L0 8 L7 0 Z" fill="rgba(5,5,7,0.97)" />
                    </g>
                  )}
                </g>
              </g>
            )
          })}
        </g>
      </svg>

      {/* legend */}
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-6">
        {[
          ['Operational', '#0AF2AD'],
          ['In Development', '#fbbf24'],
          ['Planning', '#38bdf8'],
        ].map(([label, c]) => (
          <span key={label} className="flex items-center gap-2 text-aether-muted text-xs uppercase tracking-wider">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
            {label}
          </span>
        ))}
      </div>
    </div>
  )
}
