/**
 * The Crystal Plant — signature centerpiece, modeled on the reference
 * mockups: a faceted crystalline cannabis plant rising off a glowing dais,
 * wrapped in traveling light-orbits, ring mandala behind, shards and
 * sparkles drifting in the air. Pure SVG + CSS (transform/opacity/dash
 * animations only) — crisp at any size, a few KB, reduced-motion safe.
 */

const CX = 300;

/** Serrated crystalline leaflet pointing +x from origin (spine on x-axis). */
function leafletPath(L: number, W: number, teeth = 9): string {
  const pts: string[] = [`M0 0`];
  // upper serrated edge out to the tip
  for (let i = 1; i <= teeth; i++) {
    const t = i / (teeth + 1);
    const x = L * t;
    const w = W * Math.sin(Math.PI * Math.min(t * 1.15, 1));
    pts.push(`L${x.toFixed(1)} ${(-w).toFixed(1)}`);
    pts.push(`L${(x + L * 0.045).toFixed(1)} ${(-w * 0.55).toFixed(1)}`);
  }
  pts.push(`L${L} 0`);
  // lower serrated edge back to base
  for (let i = teeth; i >= 1; i--) {
    const t = i / (teeth + 1);
    const x = L * t;
    const w = W * Math.sin(Math.PI * Math.min(t * 1.15, 1)) * 0.8;
    pts.push(`L${(x + L * 0.045).toFixed(1)} ${(w * 0.55).toFixed(1)}`);
    pts.push(`L${x.toFixed(1)} ${w.toFixed(1)}`);
  }
  pts.push("Z");
  return pts.join(" ");
}

function Leaf({
  x,
  y,
  len,
  angle,
  flip = false,
}: {
  x: number;
  y: number;
  len: number;
  angle: number;
  flip?: boolean;
}) {
  const d = leafletPath(len, len * 0.15);
  const rot = flip ? 180 - angle : angle;
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      <path d={d} fill="url(#leafFill)" stroke="url(#crysEdge)" strokeWidth={1.4} strokeLinejoin="round" />
      {/* facet shadow on the lower half for a cut-crystal read */}
      <path d={d} fill="#03140b" opacity={0.32} transform="scale(1 -1)" style={{ clipPath: "inset(50% 0 0 0)" }} />
      <line x1={0} y1={0} x2={len * 0.92} y2={0} stroke="url(#crysEdge)" strokeWidth={0.8} opacity={0.7} />
    </g>
  );
}

/** A crystal bud cluster: overlapping hexagon gems. */
function Gem({ x, y, s, hue }: { x: number; y: number; s: number; hue: string }) {
  const hex = (r: number) =>
    Array.from({ length: 6 }, (_, i) => {
      const a = (Math.PI / 3) * i - Math.PI / 6;
      return `${(Math.cos(a) * r).toFixed(1)},${(Math.sin(a) * r).toFixed(1)}`;
    }).join(" ");
  return (
    <g transform={`translate(${x} ${y})`}>
      <polygon points={hex(s)} fill={hue} opacity={0.85} stroke="url(#crysEdge)" strokeWidth={1.2} />
      <polygon points={hex(s * 0.55)} fill="#eafff5" opacity={0.5} />
    </g>
  );
}

const TIERS = [
  { y: 585, len: 205, ang: 16 },
  { y: 505, len: 178, ang: 12 },
  { y: 428, len: 150, ang: 8 },
  { y: 352, len: 122, ang: 5 },
  { y: 282, len: 96, ang: 1 },
  { y: 222, len: 70, ang: -5 },
];

const GEMS = [
  { y: 206, s: 30, hue: "var(--lime)" },
  { y: 168, s: 26, hue: "var(--cyan)" },
  { y: 134, s: 22, hue: "var(--lime)" },
  { y: 104, s: 18, hue: "var(--violet)" },
  { y: 78, s: 13, hue: "var(--cyan)" },
];

const SHARDS = [
  { x: 130, y: 170, s: 7, d: "0s" },
  { x: 470, y: 140, s: 9, d: "1.4s" },
  { x: 510, y: 330, s: 6, d: "2.6s" },
  { x: 90, y: 360, s: 8, d: "0.7s" },
  { x: 445, y: 500, s: 6, d: "1.9s" },
  { x: 150, y: 520, s: 5, d: "3.1s" },
];

const SPARKS = [
  { x: 300, y: 46, s: 11, d: "0s" },
  { x: 205, y: 250, s: 7, d: "1.1s" },
  { x: 402, y: 210, s: 8, d: "2.2s" },
  { x: 355, y: 420, s: 6, d: "0.6s" },
  { x: 238, y: 470, s: 7, d: "1.7s" },
];

export function CrystalPlant({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 720"
      className={className}
      role="img"
      aria-label="Crystalline cannabis plant glowing on a holographic dais — the Lake Erie Cannabis emblem"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="crysEdge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--cyan)" />
          <stop offset="50%" stopColor="var(--lime)" />
          <stop offset="100%" stopColor="var(--violet)" />
        </linearGradient>
        <linearGradient id="leafFill" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0e3d24" />
          <stop offset="45%" stopColor="#1d7a41" />
          <stop offset="80%" stopColor="var(--lime)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--cyan)" />
        </linearGradient>
        <linearGradient id="stemFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--cyan)" />
          <stop offset="100%" stopColor="#0e3d24" />
        </linearGradient>
        <linearGradient id="beam" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--cyan)" stopOpacity="0.22" />
          <stop offset="100%" stopColor="var(--cyan)" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="daisGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--cyan)" stopOpacity="0.9" />
          <stop offset="55%" stopColor="var(--violet)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="var(--violet)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="plantHaze" cx="50%" cy="42%" r="55%">
          <stop offset="0%" stopColor="var(--lime)" stopOpacity="0.28" />
          <stop offset="55%" stopColor="var(--violet)" stopOpacity="0.14" />
          <stop offset="100%" stopColor="var(--cyan)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="orbitA" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--cyan)" />
          <stop offset="100%" stopColor="var(--magenta)" />
        </linearGradient>
        <filter id="soft" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3.5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ambient haze + ring mandala behind the plant */}
      <ellipse cx={CX} cy={330} rx={295} ry={320} fill="url(#plantHaze)" />
      <g stroke="url(#crysEdge)" fill="none" opacity={0.35}>
        <circle cx={CX} cy={300} r={252} strokeWidth={1} strokeDasharray="1 7" className="bloom-spin" style={{ transformBox: "fill-box" }} />
        <circle cx={CX} cy={300} r={216} strokeWidth={0.8} opacity={0.7} />
        <circle cx={CX} cy={300} r={178} strokeWidth={0.6} strokeDasharray="14 10" className="bloom-spin-rev" style={{ transformBox: "fill-box" }} />
      </g>

      {/* light beam rising from the dais */}
      <polygon points={`${CX - 120},648 ${CX - 30},70 ${CX + 30},70 ${CX + 120},648`} fill="url(#beam)" />

      {/* stem */}
      <polygon
        points={`${CX - 7},640 ${CX - 3.2},92 ${CX + 3.2},92 ${CX + 7},640`}
        fill="url(#stemFill)"
        stroke="url(#crysEdge)"
        strokeWidth={0.9}
      />

      {/* crystalline leaf tiers */}
      <g filter="url(#soft)">
        {TIERS.map((t, i) => (
          <g key={i}>
            <Leaf x={CX - 4} y={t.y} len={t.len} angle={t.ang} flip />
            <Leaf x={CX + 4} y={t.y} len={t.len} angle={t.ang} />
          </g>
        ))}
        {/* short forward leaves for depth */}
        <Leaf x={CX} y={548} len={92} angle={58} />
        <Leaf x={CX} y={548} len={92} angle={58} flip />
        <Leaf x={CX} y={392} len={70} angle={54} />
        <Leaf x={CX} y={392} len={70} angle={54} flip />
      </g>

      {/* crystal bud cola */}
      <g filter="url(#soft)">
        {GEMS.map((g, i) => (
          <g key={i}>
            <Gem x={CX - g.s * 0.6} y={g.y + 6} s={g.s * 0.72} hue="var(--violet)" />
            <Gem x={CX + g.s * 0.6} y={g.y + 6} s={g.s * 0.72} hue="var(--cyan)" />
            <Gem x={CX} y={g.y} s={g.s} hue={g.hue} />
          </g>
        ))}
      </g>

      {/* traveling light orbits */}
      <g fill="none" strokeLinecap="round" filter="url(#soft)">
        <ellipse cx={CX} cy={430} rx={238} ry={54} stroke="url(#orbitA)" strokeWidth={3.2} pathLength={300} strokeDasharray="52 248" className="orbit-run" opacity={1} />
        <ellipse cx={CX} cy={300} rx={205} ry={44} stroke="url(#orbitA)" strokeWidth={2.6} pathLength={300} strokeDasharray="40 260" className="orbit-run-rev" opacity={0.9} transform={`rotate(-8 ${CX} 300)`} />
        <ellipse cx={CX} cy={182} rx={150} ry={34} stroke="url(#orbitA)" strokeWidth={2.2} pathLength={300} strokeDasharray="30 270" className="orbit-run" opacity={0.8} transform={`rotate(6 ${CX} 182)`} />
      </g>
      {/* faint full orbit tracks */}
      <g fill="none" opacity={0.22} stroke="url(#orbitA)">
        <ellipse cx={CX} cy={430} rx={238} ry={54} strokeWidth={0.8} />
        <ellipse cx={CX} cy={300} rx={205} ry={44} strokeWidth={0.7} transform={`rotate(-8 ${CX} 300)`} />
        <ellipse cx={CX} cy={182} rx={150} ry={34} strokeWidth={0.6} transform={`rotate(6 ${CX} 182)`} />
      </g>

      {/* the dais */}
      <g>
        <ellipse cx={CX} cy={648} rx={190} ry={40} fill="url(#daisGlow)" className="bloom-pulse" style={{ transformBox: "fill-box" }} />
        <ellipse cx={CX} cy={648} rx={150} ry={28} fill="none" stroke="url(#crysEdge)" strokeWidth={1.4} opacity={0.8} />
        <ellipse cx={CX} cy={654} rx={104} ry={19} fill="none" stroke="url(#crysEdge)" strokeWidth={1} opacity={0.55} />
        <ellipse cx={CX} cy={660} rx={62} ry={11} fill="none" stroke="var(--cyan)" strokeWidth={1} opacity={0.5} />
        <ellipse cx={CX} cy={648} rx={26} ry={5.5} fill="var(--cyan)" opacity={0.9} filter="url(#soft)" />
      </g>

      {/* floating crystal shards */}
      {SHARDS.map((s, i) => (
        <g key={i} className="mote" style={{ animationDelay: s.d }}>
          <polygon
            points={`0,${-s.s} ${s.s * 0.6},0 0,${s.s} ${-s.s * 0.6},0`}
            transform={`translate(${s.x} ${s.y}) rotate(${(i * 37) % 90})`}
            fill="url(#leafFill)"
            stroke="url(#crysEdge)"
            strokeWidth={0.8}
            opacity={0.85}
          />
        </g>
      ))}

      {/* four-point sparkles */}
      {SPARKS.map((s, i) => (
        <path
          key={i}
          d={`M${s.x} ${s.y - s.s} Q${s.x + s.s * 0.18} ${s.y - s.s * 0.18} ${s.x + s.s} ${s.y} Q${s.x + s.s * 0.18} ${s.y + s.s * 0.18} ${s.x} ${s.y + s.s} Q${s.x - s.s * 0.18} ${s.y + s.s * 0.18} ${s.x - s.s} ${s.y} Q${s.x - s.s * 0.18} ${s.y - s.s * 0.18} ${s.x} ${s.y - s.s} Z`}
          fill="#eafff5"
          className="mote"
          style={{ animationDelay: `${i * 0.8}s` }}
          opacity={0.9}
        />
      ))}
    </svg>
  );
}
