/**
 * The HyperBloom — the site's signature centerpiece.
 *
 * A generative, radially-symmetric cannabis mandala: layered fan-leaves
 * radiating from a bioluminescent core, wrapped in orbiting iridescent rings
 * and drifting light motes. Pure SVG + CSS — crisp at any resolution, a few
 * KB, and it animates on transform/opacity only (respects reduced-motion).
 *
 * This is "Cyberdelic Bio-Tech" rendered as vector light rather than a stock
 * image: original, on-brand, and instant to load.
 */

const CENTER = 300;

// One cannabis fan-leaf (7 leaflets) drawn pointing "up" from the origin.
function fanLeaf(base: number, key: string, opacity: number) {
  const spec = [
    { a: -72, l: 0.52 },
    { a: -48, l: 0.74 },
    { a: -24, l: 0.9 },
    { a: 0, l: 1 },
    { a: 24, l: 0.9 },
    { a: 48, l: 0.74 },
    { a: 72, l: 0.52 },
  ];
  return (
    <g key={key} opacity={opacity}>
      {spec.map((s, i) => {
        const L = base * s.l;
        const W = L * 0.15;
        const d = `M0 0 C ${-W} ${-L * 0.32}, ${-W * 0.55} ${-L * 0.82}, 0 ${-L} C ${W * 0.55} ${-L * 0.82}, ${W} ${-L * 0.32}, 0 0 Z`;
        return (
          <path
            key={i}
            d={d}
            transform={`rotate(${s.a})`}
            fill="url(#bloomFill)"
            stroke="url(#bloomStroke)"
            strokeWidth={1.6}
            strokeLinejoin="round"
          />
        );
      })}
    </g>
  );
}

// A ring of `count` fan-leaves radiating from center.
function leafRing(count: number, base: number, rot: number, opacity: number) {
  return Array.from({ length: count }, (_, i) => {
    const a = (360 / count) * i + rot;
    return (
      <g key={i} transform={`rotate(${a} ${CENTER} ${CENTER})`}>
        <g transform={`translate(${CENTER} ${CENTER})`}>
          {fanLeaf(base, `l${i}`, opacity)}
        </g>
      </g>
    );
  });
}

const MOTES = [
  { x: 140, y: 120, r: 2.5, d: "0s" },
  { x: 470, y: 160, r: 1.8, d: "1.2s" },
  { x: 500, y: 420, r: 2.2, d: "2.4s" },
  { x: 120, y: 440, r: 1.6, d: "0.6s" },
  { x: 300, y: 70, r: 2, d: "3s" },
  { x: 300, y: 530, r: 2, d: "1.8s" },
  { x: 80, y: 300, r: 1.5, d: "2.1s" },
  { x: 520, y: 300, r: 1.5, d: "0.9s" },
];

export function HyperBloom({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 600"
      className={className}
      role="img"
      aria-label="Crystalline cannabis hyperbloom — the Malachi Syndicate emblem"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="bloomStroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--cyan)" />
          <stop offset="45%" stopColor="var(--violet)" />
          <stop offset="75%" stopColor="var(--magenta)" />
          <stop offset="100%" stopColor="var(--gold)" />
        </linearGradient>
        <radialGradient id="bloomFill" cx="50%" cy="90%" r="80%">
          <stop offset="0%" stopColor="var(--violet)" stopOpacity="0.85" />
          <stop offset="45%" stopColor="var(--magenta)" stopOpacity="0.45" />
          <stop offset="100%" stopColor="var(--cyan)" stopOpacity="0.12" />
        </radialGradient>
        <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="20%" stopColor="var(--cyan)" stopOpacity="0.95" />
          <stop offset="50%" stopColor="var(--violet)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="var(--magenta)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="haze" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--violet)" stopOpacity="0.45" />
          <stop offset="45%" stopColor="var(--magenta)" stopOpacity="0.18" />
          <stop offset="100%" stopColor="var(--cyan)" stopOpacity="0" />
        </radialGradient>
        <filter id="neon" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* volumetric haze behind the bloom */}
      <circle cx={CENTER} cy={CENTER} r={300} fill="url(#haze)" />

      {/* orbit rings */}
      <g className="bloom-spin-rev" style={{ transformBox: "fill-box" }}>
        <circle
          cx={CENTER}
          cy={CENTER}
          r={272}
          fill="none"
          stroke="url(#bloomStroke)"
          strokeWidth={1}
          strokeDasharray="2 10"
          opacity={0.5}
        />
      </g>
      <circle
        cx={CENTER}
        cy={CENTER}
        r={232}
        fill="none"
        stroke="url(#bloomStroke)"
        strokeWidth={1}
        opacity={0.25}
      />

      {/* the bloom: three nested leaf rings, counter-rotating + neon glow */}
      <g filter="url(#neon)">
        <g className="bloom-spin" style={{ transformBox: "fill-box" }}>
          {leafRing(12, 250, 0, 0.9)}
        </g>
        <g className="bloom-spin-rev" style={{ transformBox: "fill-box" }}>
          {leafRing(12, 168, 15, 0.95)}
        </g>
        <g className="bloom-spin" style={{ transformBox: "fill-box" }}>
          {leafRing(8, 96, 22, 1)}
        </g>
      </g>

      {/* bioluminescent core */}
      <circle
        cx={CENTER}
        cy={CENTER}
        r={130}
        fill="url(#coreGlow)"
        className="bloom-pulse"
        style={{ transformBox: "fill-box" }}
      />
      <circle cx={CENTER} cy={CENTER} r={9} fill="#ffffff" filter="url(#neon)" />

      {/* drifting light motes */}
      {MOTES.map((m, i) => (
        <circle
          key={i}
          cx={m.x}
          cy={m.y}
          r={m.r}
          fill="var(--cyan)"
          className="mote"
          style={{ animationDelay: m.d }}
        />
      ))}
    </svg>
  );
}
