/**
 * Western New York horizon — a Buffalo skyline silhouette with the glow of
 * Niagara Falls to the west. Grounds the brand in its actual place (Buffalo
 * down to the falls) rather than generic "somewhere." Sits low in the hero,
 * quiet and atmospheric.
 */
export function NiagaraSkyline({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 220"
      className={className}
      preserveAspectRatio="xMidYMax slice"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="skyGlow" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="var(--void)" />
          <stop offset="100%" stopColor="var(--void)" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="fallsMist" cx="50%" cy="100%" r="70%">
          <stop offset="0%" stopColor="var(--cyan)" stopOpacity="0.5" />
          <stop offset="45%" stopColor="var(--violet)" stopOpacity="0.18" />
          <stop offset="100%" stopColor="var(--violet)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* falls mist glow, lower-left (west) */}
      <ellipse cx="250" cy="220" rx="360" ry="150" fill="url(#fallsMist)" />

      {/* skyline silhouette */}
      <path
        fill="var(--void-2)"
        stroke="color-mix(in srgb, var(--cyan) 30%, transparent)"
        strokeWidth="1"
        d="M0 220 L0 168 L60 168 L60 150 L120 150 L120 176 L180 176
           L180 120 L196 96 L212 120 L212 176 L280 176 L280 140 L340 140
           L340 100 L360 100 L360 60 L372 60 L372 100 L392 100 L392 140
           L470 140 L470 168 L540 168 L540 118 L600 118 L600 156 L660 156
           L660 92 L676 92 L676 60 L688 60 L688 92 L704 92 L704 156 L780 156
           L780 132 L840 132 L840 168 L900 168 L900 108 L960 108 L960 150
           L1030 150 L1030 124 L1090 124 L1090 168 L1160 168 L1160 96
           L1176 72 L1192 96 L1192 168 L1260 168 L1260 140 L1320 140
           L1320 160 L1380 160 L1380 150 L1440 150 L1440 220 Z"
      />
      {/* a few lit windows / beacons */}
      <g fill="var(--cyan)" opacity="0.65">
        <circle cx="196" cy="112" r="1.6" />
        <circle cx="366" cy="74" r="1.6" />
        <circle cx="682" cy="74" r="1.6" />
        <circle cx="1176" cy="88" r="1.6" />
      </g>

      {/* base fade into the page */}
      <rect x="0" y="150" width="1440" height="70" fill="url(#skyGlow)" />
    </svg>
  );
}
