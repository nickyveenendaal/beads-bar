import type { Product } from "@/lib/products";

// Kralen-illustraties in SVG: gestileerde flatlays in huisstijl, tot er
// echte productfoto's zijn. Deterministisch (seed = slug), anders
// verschillen server en browser. Diepte komt van contactschaduwen,
// vignet en een onscherpe achtergrondlaag.

const PALETTES: string[][] = [
  ["#f6c3d3", "#fdeff4", "#efa3bf", "#d9b06b", "#ffffff"], // baby pink + goud
  ["#e987ae", "#ffffff", "#f6c3d3", "#d9b06b", "#fbe0ea"], // snoeproze
  ["#d9b06b", "#e8cb90", "#f9efd9", "#f6c3d3", "#ffffff"], // goud
  ["#ffffff", "#f6c3d3", "#fbd9e4", "#fdeff4", "#e987ae"], // wit/roze letters
  ["#f6c3d3", "#d9b06b", "#ffffff", "#efa3bf", "#f9efd9"], // armband
  ["#bfe3d2", "#d3c6ee", "#f6c3d3", "#f6e3ab", "#fbd9e4"], // pastel candy
];

// Achtergrond per palet: blush, crème of dieper roze (afwisseling in grids)
const BACKGROUNDS: [string, string][] = [
  ["#fff7f9", "#fdeaf1"],
  ["#fdeaf1", "#f9d6e2"],
  ["#fff9f2", "#fdf1dc"],
  ["#fff7f9", "#fbe0ea"],
  ["#fff9f2", "#fdeaf1"],
  ["#fdeaf1", "#fbe0ea"],
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

function Bead({
  x,
  y,
  r,
  fill,
  blur = false,
}: {
  x: number;
  y: number;
  r: number;
  fill: string;
  blur?: boolean;
}) {
  return (
    <g filter={blur ? "url(#softBlur)" : undefined} opacity={blur ? 0.8 : 1}>
      <ellipse cx={x} cy={y + r * 0.85} rx={r * 0.85} ry={r * 0.3} fill="#5a4436" opacity={0.1} filter="url(#contactBlur)" />
      <circle cx={x} cy={y} r={r} fill={fill} />
      <circle cx={x} cy={y} r={r} fill="url(#beadShade)" />
      <ellipse cx={x - r * 0.38} cy={y - r * 0.42} rx={r * 0.3} ry={r * 0.2} fill="#ffffff" opacity={0.55} />
      <circle cx={x - r * 0.28} cy={y - r * 0.5} r={r * 0.1} fill="#ffffff" opacity={0.95} />
    </g>
  );
}

function GoldChain({ path }: { path: string }) {
  return (
    <g>
      <path d={path} fill="none" stroke="#c9a24a" strokeWidth={2.5} strokeDasharray="1 5" strokeLinecap="round" />
      <path d={path} fill="none" stroke="#e6cf9a" strokeWidth={1} strokeDasharray="1 5" strokeLinecap="round" />
    </g>
  );
}

function Heart({ x, y, s, fill }: { x: number; y: number; s: number; fill: string }) {
  return (
    <g>
      <ellipse cx={x} cy={y + s * 0.95} rx={s * 0.75} ry={s * 0.22} fill="#5a4436" opacity={0.09} filter="url(#contactBlur)" />
      <path
        transform={`translate(${x} ${y}) scale(${s / 24})`}
        d="M0 8 C -10 -4, -24 4, -12 16 L 0 26 L 12 16 C 24 4, 10 -4, 0 8 Z"
        fill={fill}
      />
      <ellipse cx={x - s * 0.28} cy={y + s * 0.1} rx={s * 0.14} ry={s * 0.1} fill="#ffffff" opacity={0.6} />
    </g>
  );
}

function Bow({ x, y, s, fill }: { x: number; y: number; s: number; fill: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s / 24})`}>
      <path d="M0 0 L -20 -12 C -28 -6 -28 6 -20 12 Z" fill={fill} />
      <path d="M0 0 L 20 -12 C 28 -6 28 6 20 12 Z" fill={fill} />
      <circle cx={0} cy={0} r={6} fill={fill} stroke="#ffffff" strokeWidth={1.5} />
      <ellipse cx={-14} cy={-4} rx={5} ry={3} fill="#ffffff" opacity={0.4} />
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
  // Achtergrondlaag: een paar grote onscherpe kralen voor scherptediepte
  const bgBeads = Array.from({ length: 4 }, (_, i) => ({
    x: Math.round(120 + rand() * 160),
    y: Math.round(140 + rand() * 130),
    r: Math.round(26 + rand() * 10),
    fill: palette[i % palette.length],
  }));
  const beads = Array.from({ length: 40 }, (_, i) => {
    const angle = rand() * Math.PI * 2;
    const dist = Math.sqrt(rand()) * 112;
    return {
      x: Math.round(200 + Math.cos(angle) * dist),
      y: Math.round(212 + Math.sin(angle) * dist * 0.8),
      r: Math.round(13 + rand() * 11),
      fill: palette[i % palette.length],
    };
  }).sort((a, b) => a.y - b.y);
  return (
    <g>
      <ellipse cx={200} cy={235} rx={152} ry={110} fill="#5a4436" opacity={0.07} filter="url(#contactBlur)" />
      <ellipse cx={200} cy={218} rx={150} ry={122} fill="#ffffff" opacity={0.85} />
      <ellipse cx={200} cy={222} rx={140} ry={112} fill="#fbe0ea" opacity={0.55} />
      {bgBeads.map((b, i) => (
        <Bead key={`bg-${i}`} {...b} blur />
      ))}
      <GoldChain path="M110 250 Q 170 290 235 265 T 305 215" />
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
    <g>
      <ellipse cx={205} cy={330} rx={110} ry={22} fill="#5a4436" opacity={0.08} filter="url(#contactBlur)" />
      <g transform="rotate(14 200 200)">
        <rect x={186} y={70} width={28} height={230} rx={14} fill="#ffffff" stroke="#f5dde6" strokeWidth={2} />
        <path d="M193 300 L207 300 L200 336 Z" fill={palette[3]} />
        <rect x={188} y={288} width={24} height={14} rx={6} fill={palette[3]} />
        {beadYs.map((y, i) => (
          <Bead key={y} x={200} y={y} r={Math.round(15 + rand() * 3)} fill={palette[i % palette.length]} />
        ))}
        <Bow x={200} y={62} s={30} fill={palette[0]} />
      </g>
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
        <ellipse cx={0} cy={34} rx={34} ry={9} fill="#5a4436" opacity={0.09} filter="url(#contactBlur)" />
        <ellipse cx={-16} cy={-8} rx={16} ry={22} fill={gold} transform="rotate(-30)" />
        <ellipse cx={16} cy={-8} rx={16} ry={22} fill={gold} transform="rotate(30)" />
        <ellipse cx={-11} cy={12} rx={10} ry={14} fill={gold} transform="rotate(-20)" />
        <ellipse cx={11} cy={12} rx={10} ry={14} fill={gold} transform="rotate(20)" />
        <rect x={-3} y={-18} width={6} height={36} rx={3} fill="#b08b35" />
      </g>
      <GoldChain path="M100 200 Q 200 240 300 200" />
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
  }).sort((a, b) => a.y - b.y);
  return (
    <g>
      <ellipse cx={200} cy={330} rx={130} ry={20} fill="#5a4436" opacity={0.07} filter="url(#contactBlur)" />
      <circle cx={200} cy={200} r={115} fill="none" stroke="#f5dde6" strokeWidth={5} />
      {beads.map((b, i) => (
        <Bead key={i} {...b} />
      ))}
      <Heart x={200} y={56} s={26} fill={palette[1]} />
    </g>
  );
}

function SetVisual({ seed, palette }: { seed: string; palette: string[] }) {
  const rand = seededRand(seed);
  const cells = [0, 1, 2, 3, 4, 5];
  return (
    <g>
      <ellipse cx={200} cy={322} rx={150} ry={18} fill="#5a4436" opacity={0.08} filter="url(#contactBlur)" />
      <rect x={64} y={84} width={272} height={232} rx={26} fill="#ffffff" stroke="#f5dde6" strokeWidth={3} />
      {cells.map((c) => {
        const cx = 64 + 45 + (c % 3) * 91;
        const cy = 84 + 58 + Math.floor(c / 3) * 116;
        return (
          <g key={c}>
            <rect x={cx - 38} y={cy - 46} width={76} height={92} rx={16} fill="#fff7f9" />
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
      <path d="M90 200 Q 200 380 310 200" fill="none" stroke="#f5dde6" strokeWidth={5} />
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
  const [bgFrom, bgTo] = BACKGROUNDS[product.paletteIndex % BACKGROUNDS.length];
  const gradId = `bg-${product.paletteIndex % BACKGROUNDS.length}`;
  return (
    <svg viewBox="0 0 400 400" className={className} role="img" aria-label="Productafbeelding">
      <defs>
        <radialGradient id="beadShade" cx="38%" cy="34%" r="75%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
          <stop offset="55%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="100%" stopColor="#5a3a45" stopOpacity="0.3" />
        </radialGradient>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={bgFrom} />
          <stop offset="100%" stopColor={bgTo} />
        </linearGradient>
        <radialGradient id="vignette" cx="50%" cy="46%" r="72%">
          <stop offset="0%" stopColor="#5a4436" stopOpacity="0" />
          <stop offset="82%" stopColor="#5a4436" stopOpacity="0" />
          <stop offset="100%" stopColor="#5a4436" stopOpacity="0.06" />
        </radialGradient>
        <filter id="softBlur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3.5" />
        </filter>
        <filter id="contactBlur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>
      <rect width="400" height="400" fill={`url(#${gradId})`} />
      {product.visual === "mix" && <MixVisual seed={product.slug} palette={palette} />}
      {product.visual === "pen" && <PenVisual seed={product.slug} palette={palette} />}
      {product.visual === "charm" && <CharmVisual palette={palette} />}
      {product.visual === "bracelet" && <BraceletVisual seed={product.slug} palette={palette} />}
      {product.visual === "set" && <SetVisual seed={product.slug} palette={palette} />}
      {product.visual === "accessory" && <AccessoryVisual seed={product.slug} palette={palette} />}
      <rect width="400" height="400" fill="url(#vignette)" />
    </svg>
  );
}
