import type { Product } from "@/lib/products";

// Kralen-illustraties in SVG, zodat de demo zonder fotografie toch de
// look van de mockup heeft. Alles is deterministisch (seed = slug),
// anders tekenen server en browser verschillende beelden.

const PALETTES: string[][] = [
  ["#f9c1d4", "#fef0f5", "#f7a8c4", "#e8b04b", "#ffffff"], // baby pink + goud
  ["#f078a8", "#ffffff", "#f9c1d4", "#e8b04b", "#ffe1ec"], // hot pink
  ["#e8b04b", "#f3cd82", "#fdf3dd", "#f9c1d4", "#ffffff"], // goud
  ["#ffffff", "#f9c1d4", "#ffd6e4", "#fef0f5", "#f078a8"], // wit/roze letters
  ["#f9c1d4", "#e8b04b", "#ffffff", "#f7a8c4", "#fdf3dd"], // armband
  ["#b8e6d0", "#cdbdf2", "#f9c1d4", "#fbe3a3", "#ffd6e4"], // pastel candy
];

function seededRand(seed: string): () => number {
  let h = 1779033703;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return () => {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    h ^= h >>> 16;
    return (h >>> 0) / 4294967296;
  };
}

function Bead({ x, y, r, fill }: { x: number; y: number; r: number; fill: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={fill} />
      <circle cx={x} cy={y} r={r} fill="url(#beadShade)" />
      <ellipse cx={x - r * 0.35} cy={y - r * 0.4} rx={r * 0.28} ry={r * 0.18} fill="#ffffff" opacity={0.85} />
    </g>
  );
}

function Heart({ x, y, s, fill }: { x: number; y: number; s: number; fill: string }) {
  return (
    <path
      transform={`translate(${x} ${y}) scale(${s / 24})`}
      d="M0 8 C -10 -4, -24 4, -12 16 L 0 26 L 12 16 C 24 4, 10 -4, 0 8 Z"
      fill={fill}
    />
  );
}

function Bow({ x, y, s, fill }: { x: number; y: number; s: number; fill: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s / 24})`}>
      <path d="M0 0 L -20 -12 C -28 -6 -28 6 -20 12 Z" fill={fill} />
      <path d="M0 0 L 20 -12 C 28 -6 28 6 20 12 Z" fill={fill} />
      <circle cx={0} cy={0} r={6} fill={fill} stroke="#ffffff" strokeWidth={1.5} />
    </g>
  );
}

function Star({ x, y, s, fill }: { x: number; y: number; s: number; fill: string }) {
  return (
    <path
      transform={`translate(${x} ${y}) scale(${s / 24})`}
      d="M0 -24 L6 -8 L24 -8 L10 4 L14 22 L0 12 L-14 22 L-10 4 L-24 -8 L-6 -8 Z"
      fill={fill}
    />
  );
}

function MixVisual({ seed, palette }: { seed: string; palette: string[] }) {
  const rand = seededRand(seed);
  const beads = Array.from({ length: 42 }, (_, i) => {
    const angle = rand() * Math.PI * 2;
    const dist = Math.sqrt(rand()) * 118;
    return {
      x: Math.round(200 + Math.cos(angle) * dist),
      y: Math.round(210 + Math.sin(angle) * dist * 0.82),
      r: Math.round(13 + rand() * 12),
      fill: palette[i % palette.length],
    };
  });
  return (
    <g>
      <ellipse cx={200} cy={218} rx={150} ry={128} fill="#ffffff" opacity={0.8} />
      <ellipse cx={200} cy={224} rx={140} ry={118} fill="#ffe1ec" opacity={0.6} />
      {beads.map((b, i) => (
        <Bead key={i} {...b} />
      ))}
    </g>
  );
}

function PenVisual({ seed, palette }: { seed: string; palette: string[] }) {
  const rand = seededRand(seed);
  const beadYs = [96, 128, 160, 192, 224, 256];
  return (
    <g transform="rotate(14 200 200)">
      <rect x={186} y={70} width={28} height={230} rx={14} fill="#ffffff" stroke="#f6dde7" strokeWidth={2} />
      <path d="M193 300 L207 300 L200 336 Z" fill={palette[3]} />
      <rect x={188} y={288} width={24} height={14} rx={6} fill={palette[3]} />
      {beadYs.map((y, i) => (
        <Bead key={y} x={200} y={y} r={Math.round(15 + rand() * 3)} fill={palette[i % palette.length]} />
      ))}
      <Bow x={200} y={62} s={30} fill={palette[0]} />
    </g>
  );
}

function CharmVisual({ palette }: { palette: string[] }) {
  const gold = palette[0];
  return (
    <g>
      <Bow x={130} y={130} s={40} fill={gold} />
      <Heart x={268} y={110} s={40} fill={gold} />
      <Star x={135} y={286} s={34} fill={gold} />
      <g transform="translate(262 262)">
        <ellipse cx={-16} cy={-8} rx={16} ry={22} fill={gold} transform="rotate(-30)" />
        <ellipse cx={16} cy={-8} rx={16} ry={22} fill={gold} transform="rotate(30)" />
        <ellipse cx={-11} cy={12} rx={10} ry={14} fill={gold} transform="rotate(-20)" />
        <ellipse cx={11} cy={12} rx={10} ry={14} fill={gold} transform="rotate(20)" />
        <rect x={-3} y={-18} width={6} height={36} rx={3} fill="#c98f2e" />
      </g>
      <circle cx={200} cy={200} r={10} fill={palette[3]} />
    </g>
  );
}

function BraceletVisual({ seed, palette }: { seed: string; palette: string[] }) {
  const rand = seededRand(seed);
  const beads = Array.from({ length: 18 }, (_, i) => {
    const angle = (i / 18) * Math.PI * 2;
    return {
      x: Math.round(200 + Math.cos(angle) * 115),
      y: Math.round(200 + Math.sin(angle) * 115),
      r: Math.round(16 + rand() * 4),
      fill: palette[i % palette.length],
    };
  });
  return (
    <g>
      <circle cx={200} cy={200} r={115} fill="none" stroke="#f6dde7" strokeWidth={5} />
      {beads.map((b, i) => (
        <Bead key={i} {...b} />
      ))}
      <Heart x={200} y={62} s={26} fill={palette[1]} />
    </g>
  );
}

function SetVisual({ seed, palette }: { seed: string; palette: string[] }) {
  const rand = seededRand(seed);
  const cells = [0, 1, 2, 3, 4, 5];
  return (
    <g>
      <rect x={64} y={84} width={272} height={232} rx={26} fill="#ffffff" stroke="#f6dde7" strokeWidth={3} />
      {cells.map((c) => {
        const cx = 64 + 45 + (c % 3) * 91;
        const cy = 84 + 58 + Math.floor(c / 3) * 116;
        return (
          <g key={c}>
            <rect x={cx - 38} y={cy - 46} width={76} height={92} rx={16} fill="#fff6f8" />
            {Array.from({ length: 5 }, (_, i) => (
              <Bead
                key={i}
                x={Math.round(cx - 20 + rand() * 40)}
                y={Math.round(cy - 26 + rand() * 52)}
                r={Math.round(9 + rand() * 5)}
                fill={palette[(c + i) % palette.length]}
              />
            ))}
          </g>
        );
      })}
      <Bow x={200} y={84} s={34} fill={palette[1] === "#ffffff" ? palette[0] : palette[1]} />
    </g>
  );
}

function AccessoryVisual({ seed, palette }: { seed: string; palette: string[] }) {
  const rand = seededRand(seed);
  const beads = Array.from({ length: 16 }, (_, i) => {
    const t = i / 15;
    return {
      x: Math.round(90 + t * 220),
      y: Math.round(200 + Math.sin(t * Math.PI) * 90),
      r: Math.round(14 + rand() * 5),
      fill: palette[i % palette.length],
    };
  });
  return (
    <g>
      <path d="M90 200 Q 200 380 310 200" fill="none" stroke="#f6dde7" strokeWidth={5} />
      {beads.map((b, i) => (
        <Bead key={i} {...b} />
      ))}
      <Star x={90} y={172} s={22} fill={palette[3]} />
      <Star x={310} y={172} s={22} fill={palette[3]} />
    </g>
  );
}

export default function BeadImage({
  product,
  className,
}: {
  product: Pick<Product, "slug" | "visual" | "paletteIndex">;
  className?: string;
}) {
  const palette = PALETTES[product.paletteIndex % PALETTES.length];
  return (
    <svg viewBox="0 0 400 400" className={className} role="img" aria-label="Productafbeelding">
      <defs>
        <radialGradient id="beadShade" cx="38%" cy="34%" r="75%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
          <stop offset="55%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="100%" stopColor="#5b3a45" stopOpacity="0.22" />
        </radialGradient>
        <linearGradient id="bgSoft" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fff6f8" />
          <stop offset="100%" stopColor="#ffe8f0" />
        </linearGradient>
      </defs>
      <rect width="400" height="400" rx="0" fill="url(#bgSoft)" />
      {product.visual === "mix" && <MixVisual seed={product.slug} palette={palette} />}
      {product.visual === "pen" && <PenVisual seed={product.slug} palette={palette} />}
      {product.visual === "charm" && <CharmVisual palette={palette} />}
      {product.visual === "bracelet" && <BraceletVisual seed={product.slug} palette={palette} />}
      {product.visual === "set" && <SetVisual seed={product.slug} palette={palette} />}
      {product.visual === "accessory" && <AccessoryVisual seed={product.slug} palette={palette} />}
    </svg>
  );
}
