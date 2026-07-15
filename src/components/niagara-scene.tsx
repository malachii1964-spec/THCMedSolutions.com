/**
 * Full-bleed hero backdrop: Niagara Falls at night, illuminated.
 * The real falls are floodlit in shifting colors after dark, so a
 * magenta/violet/cyan-lit cascade is both accurate and on-brand. Layers:
 * night sky + stars, a Buffalo/WNY skyline with lit windows and reflection,
 * the glowing falls with a rising mist plume, and a water surface. Sits
 * behind the hero content with scrims for text legibility. Pure SVG/CSS.
 */
export function NiagaraScene({ className = "" }: { className?: string }) {
  // vertical flow lines for the cascade
  const flow = Array.from({ length: 60 }, (_, i) => 470 + i * 11);

  return (
    <svg
      viewBox="0 0 1600 900"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="nsSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0a0716" />
          <stop offset="45%" stopColor="#0c1030" />
          <stop offset="100%" stopColor="#070a1c" />
        </linearGradient>
        <radialGradient id="nsMoon" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#dfe6ff" stopOpacity="0.9" />
          <stop offset="40%" stopColor="var(--violet)" stopOpacity="0.25" />
          <stop offset="100%" stopColor="var(--violet)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="nsFalls" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#eafcff" stopOpacity="0.9" />
          <stop offset="50%" stopColor="var(--cyan)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="var(--violet)" stopOpacity="0.35" />
        </linearGradient>
        <linearGradient id="nsIllum" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--magenta)" stopOpacity="0.5" />
          <stop offset="35%" stopColor="var(--violet)" stopOpacity="0.4" />
          <stop offset="70%" stopColor="var(--cyan)" stopOpacity="0.45" />
          <stop offset="100%" stopColor="var(--lime)" stopOpacity="0.35" />
        </linearGradient>
        <radialGradient id="nsMist" cx="50%" cy="100%" r="75%">
          <stop offset="0%" stopColor="#eafcff" stopOpacity="0.55" />
          <stop offset="40%" stopColor="var(--cyan)" stopOpacity="0.22" />
          <stop offset="100%" stopColor="var(--cyan)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="nsWater" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0d1636" />
          <stop offset="100%" stopColor="#05070c" />
        </linearGradient>
      </defs>

      {/* sky */}
      <rect width="1600" height="900" fill="url(#nsSky)" />
      <circle cx="1230" cy="150" r="150" fill="url(#nsMoon)" />
      <circle cx="1230" cy="150" r="34" fill="#eef2ff" opacity="0.9" />

      {/* stars */}
      <g fill="#fff">
        {Array.from({ length: 60 }, (_, i) => {
          const x = (i * 137.5) % 1600;
          const y = (i * 71.3) % 430;
          const r = (i % 4) * 0.35 + 0.4;
          return <circle key={i} cx={x} cy={y} r={r} opacity={0.35 + (i % 5) * 0.12} />;
        })}
      </g>

      {/* distant skyline (both riverbanks) with lit windows */}
      <g>
        <path
          fill="#0a0f24"
          d="M0 470 L0 430 L70 430 L70 400 L120 400 L120 430 L190 430 L190 360 L206 336
             L222 360 L222 430 L300 430 L300 470 Z"
        />
        <path
          fill="#0a0f24"
          d="M1300 470 L1300 420 L1360 420 L1360 380 L1380 356 L1400 380 L1400 420
             L1470 420 L1470 400 L1520 400 L1520 430 L1600 430 L1600 470 Z"
        />
        <g fill="var(--cyan)" opacity="0.7">
          {Array.from({ length: 26 }, (_, i) => {
            const left = i < 13;
            const x = left ? 20 + (i % 13) * 21 : 1310 + (i % 13) * 21;
            const y = 405 + ((i * 7) % 55);
            return <rect key={i} x={x} y={y} width="2.2" height="2.2" opacity={0.4 + (i % 3) * 0.2} />;
          })}
        </g>
      </g>

      {/* the illuminated falls */}
      <g>
        {/* crest line */}
        <path
          d="M470 470 Q800 452 1130 470"
          fill="none"
          stroke="#eafcff"
          strokeWidth="3"
          opacity="0.8"
        />
        {/* cascade body */}
        <path d="M470 470 L1130 470 L1120 690 L480 690 Z" fill="url(#nsFalls)" opacity="0.5" />
        {/* colored illumination wash */}
        <path d="M470 470 L1130 470 L1120 690 L480 690 Z" fill="url(#nsIllum)" />
        {/* flowing water lines */}
        <g stroke="#eafcff" strokeWidth="1" opacity="0.5" className="falls-flow">
          {flow.map((x, i) => (
            <line
              key={i}
              x1={x}
              y1={472}
              x2={x - 6}
              y2={688}
              opacity={0.2 + ((i * 7) % 10) / 20}
            />
          ))}
        </g>
      </g>

      {/* rising mist plume at the base */}
      <ellipse cx="800" cy="700" rx="420" ry="150" fill="url(#nsMist)" className="mist-rise" style={{ transformBox: "fill-box" }} />
      <ellipse cx="620" cy="700" rx="180" ry="90" fill="url(#nsMist)" className="mist-rise" style={{ transformBox: "fill-box", animationDelay: "2s" }} />
      <ellipse cx="980" cy="700" rx="200" ry="100" fill="url(#nsMist)" className="mist-rise" style={{ transformBox: "fill-box", animationDelay: "3.5s" }} />

      {/* lower river / water surface with color reflection */}
      <rect y="690" width="1600" height="210" fill="url(#nsWater)" />
      <g opacity="0.35">
        <rect x="480" y="695" width="640" height="60" fill="url(#nsIllum)" />
      </g>
      {/* reflection shimmer bars */}
      <g stroke="var(--cyan)" strokeWidth="2" opacity="0.25" className="water-shimmer">
        {Array.from({ length: 10 }, (_, i) => (
          <line key={i} x1={520 + i * 60} y1={720 + (i % 3) * 18} x2={620 + i * 60} y2={720 + (i % 3) * 18} />
        ))}
      </g>
    </svg>
  );
}
