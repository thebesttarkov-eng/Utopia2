/* Utopia VPN — Brand Character (SVG mascot) */
export default function UtopiaChar({ size = 160 }: { size?: number }) {
  const w = 100, h = 160
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      width={size}
      height={size * (h / w)}
      style={{ display: 'block', overflow: 'visible' }}
    >
      <defs>
        <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="2.5" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="glow-strong" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="4" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <radialGradient id="skin" cx="50%" cy="40%">
          <stop offset="0%" stopColor="#EDE0D4"/>
          <stop offset="100%" stopColor="#D4C4B4"/>
        </radialGradient>
        <radialGradient id="eye-l" cx="40%" cy="35%">
          <stop offset="0%" stopColor="#7FFFAA"/>
          <stop offset="60%" stopColor="#39D353"/>
          <stop offset="100%" stopColor="#1A6B2A"/>
        </radialGradient>
        <radialGradient id="eye-r" cx="40%" cy="35%">
          <stop offset="0%" stopColor="#7FFFAA"/>
          <stop offset="60%" stopColor="#39D353"/>
          <stop offset="100%" stopColor="#1A6B2A"/>
        </radialGradient>
      </defs>

      {/* ── ground glow ── */}
      <ellipse cx="50" cy="157" rx="32" ry="6" fill="rgba(57,211,83,0.18)" filter="url(#glow)"/>

      {/* ── body / torso ── */}
      <path d="M18 160 L18 120 Q18 108 30 104 L44 100 L56 100 L56 160Z" fill="#131813"/>
      <path d="M82 160 L82 120 Q82 108 70 104 L56 100 L56 160Z" fill="#0E140E"/>
      {/* outfit V-neck */}
      <path d="M38 100 L50 118 L62 100" fill="none" stroke="rgba(57,211,83,0.5)" strokeWidth="1.2"/>
      {/* neon chest line */}
      <path d="M50 118 L50 148" stroke="#39D353" strokeWidth="1" opacity="0.4" strokeLinecap="round"/>
      {/* shoulder trim */}
      <path d="M18 112 L35 108" stroke="rgba(57,211,83,0.35)" strokeWidth="1"/>
      <path d="M82 112 L65 108" stroke="rgba(57,211,83,0.35)" strokeWidth="1"/>

      {/* ── neck ── */}
      <rect x="43" y="85" width="14" height="18" rx="7" fill="url(#skin)"/>

      {/* ── hair back ── */}
      <ellipse cx="50" cy="56" rx="34" ry="38" fill="#0A0A10"/>
      {/* long side hair left */}
      <path d="M16 62 Q10 100 14 130 Q16 138 20 136 L24 100 L20 64Z" fill="#0A0A10"/>
      {/* long side hair right */}
      <path d="M84 62 Q90 100 86 130 Q84 138 80 136 L76 100 L80 64Z" fill="#0A0A10"/>
      {/* green streak left */}
      <path d="M14 70 Q11 105 15 128" stroke="#39D353" strokeWidth="1.5" opacity="0.55" strokeLinecap="round" fill="none"/>
      {/* green streak right */}
      <path d="M86 70 Q89 105 85 128" stroke="#39D353" strokeWidth="1.2" opacity="0.4" strokeLinecap="round" fill="none"/>

      {/* ── face ── */}
      <ellipse cx="50" cy="60" rx="28" ry="32" fill="url(#skin)"/>

      {/* ── bangs ── */}
      <path d="M22 58 Q24 28 50 24 Q76 28 78 58 Q72 46 62 44 Q56 42 50 43 Q44 42 38 44 Q28 46 22 58Z" fill="#0A0A10"/>
      {/* bang fringe left */}
      <path d="M22 58 Q26 44 34 48 L30 66Z" fill="#0A0A10"/>
      {/* bang fringe mid-left */}
      <path d="M34 48 Q42 40 46 46 L42 68Z" fill="#0A0A10"/>
      {/* bang fringe right */}
      <path d="M78 58 Q74 44 66 48 L70 66Z" fill="#0A0A10"/>

      {/* ── hat (beret/cap) ── */}
      <ellipse cx="50" cy="28" rx="33" ry="10" fill="#0D0D18"/>
      <path d="M17 28 Q20 10 50 8 Q80 10 83 28Z" fill="#111120"/>
      {/* hat brim line */}
      <path d="M17 28 L83 28" stroke="rgba(57,211,83,0.45)" strokeWidth="1.2"/>
      {/* hat top highlight */}
      <ellipse cx="50" cy="18" rx="20" ry="6" fill="rgba(57,211,83,0.06)"/>
      {/* heart badge on hat */}
      <g filter="url(#glow)" transform="translate(50,19)">
        <path d="M0 3 Q-4,-1 -4,-4 Q-4,-7 0,-5 Q4,-7 4,-4 Q4,-1 0,3Z" fill="#39D353" opacity="0.9"/>
      </g>

      {/* ── eyebrows ── */}
      <path d="M27 52 Q36 47 44 51" fill="none" stroke="#1C1C1C" strokeWidth="2.2" strokeLinecap="round"/>
      <path d="M56 51 Q64 47 73 52" fill="none" stroke="#1C1C1C" strokeWidth="2.2" strokeLinecap="round"/>

      {/* ── left eye ── */}
      <ellipse cx="36" cy="61" rx="9" ry="7.5" fill="#0C180C"/>
      <ellipse cx="36" cy="61" rx="7" ry="6" fill="url(#eye-l)" filter="url(#glow)"/>
      <ellipse cx="36" cy="61" rx="3.5" ry="3.5" fill="#071007"/>
      <circle cx="38.5" cy="58.5" r="1.5" fill="rgba(255,255,255,0.85)"/>
      <circle cx="35"   cy="63.5" r="0.7" fill="rgba(255,255,255,0.4)"/>
      {/* eyelash top */}
      <path d="M27 57 Q36 53 45 57" fill="none" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round"/>

      {/* ── right eye ── */}
      <ellipse cx="64" cy="61" rx="9" ry="7.5" fill="#0C180C"/>
      <ellipse cx="64" cy="61" rx="7" ry="6" fill="url(#eye-r)" filter="url(#glow)"/>
      <ellipse cx="64" cy="61" rx="3.5" ry="3.5" fill="#071007"/>
      <circle cx="66.5" cy="58.5" r="1.5" fill="rgba(255,255,255,0.85)"/>
      <circle cx="63"   cy="63.5" r="0.7" fill="rgba(255,255,255,0.4)"/>
      {/* eyelash top */}
      <path d="M55 57 Q64 53 73 57" fill="none" stroke="#0A0A0A" strokeWidth="2" strokeLinecap="round"/>

      {/* ── nose ── */}
      <path d="M48 73 Q50 76 52 73" fill="none" stroke="#C0A898" strokeWidth="1.1" strokeLinecap="round"/>

      {/* ── mouth (slight smirk) ── */}
      <path d="M41 80 Q50 86 59 80" fill="none" stroke="#A89080" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M41 80 Q39 82 41 83.5" fill="none" stroke="#A89080" strokeWidth="1.1" strokeLinecap="round"/>

      {/* ── cheek blush ── */}
      <ellipse cx="28" cy="68" rx="7" ry="4" fill="rgba(255,130,130,0.13)"/>
      <ellipse cx="72" cy="68" rx="7" ry="4" fill="rgba(255,130,130,0.13)"/>

      {/* ── tech HUD elements around face ── */}
      {/* top-right corner bracket */}
      <g stroke="rgba(57,211,83,0.5)" strokeWidth="1" fill="none">
        <path d="M78 30 L88 30 L88 40"/>
        <path d="M12 30 L22 30"/>
        <path d="M22 30 L22 40"/>
      </g>
      {/* scanning line detail */}
      <line x1="80" y1="55" x2="88" y2="55" stroke="rgba(57,211,83,0.4)" strokeWidth="0.8"/>
      <line x1="80" y1="60" x2="86" y2="60" stroke="rgba(57,211,83,0.25)" strokeWidth="0.8"/>
      <line x1="80" y1="65" x2="84" y2="65" stroke="rgba(57,211,83,0.15)" strokeWidth="0.8"/>

      {/* ── outer body glow ── */}
      <ellipse cx="50" cy="60" rx="30" ry="34" fill="none" stroke="rgba(57,211,83,0.07)" strokeWidth="3"/>
    </svg>
  )
}
