import Link from "next/link";
import BeadImage from "@/components/BeadImage";
import Countdown from "@/components/Countdown";
import ProductCard from "@/components/ProductCard";
import Stars from "@/components/Stars";
import { CATEGORIES, findProduct, formatPrice, PRODUCTS, REVIEWS } from "@/lib/products";
import { VIDEO_FUNNELS } from "@/lib/stats";

function FloatingBead({
  className,
  color,
  size,
  delayClass,
}: {
  className: string;
  color: string;
  size: number;
  delayClass: string;
}) {
  return (
    <div className={`absolute ${className} ${delayClass} pointer-events-none`} aria-hidden>
      <svg width={size} height={size} viewBox="0 0 40 40">
        <circle cx="20" cy="20" r="18" fill={color} />
        <ellipse cx="14" cy="13" rx="6" ry="4" fill="#fff" opacity="0.7" />
      </svg>
    </div>
  );
}

function Hero() {
  const hero = findProduct("acryl-flower-beads-mix")!;
  const pen = findProduct("beadable-pen-pink-bow")!;
  return (
    <section className="gradient-animated relative overflow-hidden">
      <FloatingBead className="left-[6%] top-[18%]" color="#f7a8c4" size={34} delayClass="float-slow" />
      <FloatingBead className="left-[14%] bottom-[14%]" color="#ecc987" size={22} delayClass="float-slower" />
      <FloatingBead className="right-[8%] top-[12%]" color="#ffd6e4" size={28} delayClass="float-slower" />
      <FloatingBead className="right-[20%] bottom-[20%]" color="#f078a8" size={18} delayClass="float-slow" />
      <span className="twinkle absolute left-[22%] top-[30%] text-xl text-gold" aria-hidden>✦</span>
      <span className="twinkle absolute right-[28%] top-[55%] text-sm text-pink-deep" style={{ animationDelay: "1s" }} aria-hidden>✦</span>
      <span className="twinkle absolute left-[45%] bottom-[12%] text-lg text-gold" style={{ animationDelay: "2s" }} aria-hidden>✦</span>

      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-20">
        <div className="rise-in">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-pink-deep backdrop-blur">
            <span className="pulse-dot h-2 w-2 rounded-full bg-mint" /> Handmade with love
          </p>
          <h1 className="font-display mt-5 text-5xl font-bold leading-[1.05] md:text-6xl">
            Create.
            <br />
            <span className="gradient-text italic">Bead.</span>
            <br />
            Inspire.
          </h1>
          <p className="mt-4 max-w-md text-lg text-ink-soft">
            Premium kralen en beadable pens, met de hand samengesteld en dezelfde dag verzonden.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              href="/shop"
              className="gradient-cta btn-cta rounded-full px-8 py-3.5 font-bold text-white"
            >
              Shop nu ♥
            </Link>
            <Link
              href="/t/pen-pov"
              className="rounded-full border-2 border-ink/10 bg-white/80 px-6 py-3 font-bold backdrop-blur transition-all hover:border-pink hover:text-pink-deep"
            >
              🎬 De TikTok-deal
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[11px] font-bold uppercase tracking-wider text-ink-soft">
            <span>💎 Premium quality</span>
            <span>💗 Made with love</span>
            <span>🎁 Beautiful packaging</span>
            <span>✨ Endless creativity</span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div className="card float-slow overflow-hidden p-3">
            <BeadImage product={hero} className="w-full rounded-[20px]" />
            <div className="flex items-center justify-between px-2 py-2">
              <div>
                <p className="text-sm font-bold">{hero.name}</p>
                <Stars rating={hero.rating} />
              </div>
              <p className="font-display text-lg font-bold text-pink-deep">{formatPrice(hero.price)}</p>
            </div>
          </div>
          <div className="card float-slower absolute -left-8 -bottom-6 hidden w-40 overflow-hidden p-2 md:block" style={{ animationDelay: "1.2s" }}>
            <BeadImage product={pen} className="w-full rounded-[16px]" />
            <p className="truncate px-1 py-1 text-[11px] font-bold">{pen.name}</p>
          </div>
          <div className="absolute -right-4 -top-4 rotate-12 rounded-full border-2 border-gold bg-white px-4 py-3 text-center shadow-lg">
            <p className="font-display text-[13px] font-bold italic leading-tight text-gold">
              Handmade
              <br />
              with love
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function CategoryRow() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
        {CATEGORIES.map((cat, i) => (
          <Link key={cat.slug} href={`/shop?cat=${cat.slug}`} className="group text-center">
            <div
              className="card card-hover mx-auto flex h-20 w-20 items-center justify-center overflow-hidden rounded-full md:h-24 md:w-24"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="flex gap-1 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                {cat.palette.map((c, j) => (
                  <span
                    key={j}
                    className="block h-5 w-5 rounded-full border border-white shadow-sm md:h-6 md:w-6"
                    style={{ background: c }}
                  />
                ))}
              </div>
            </div>
            <p className="mt-2 text-[11px] font-bold uppercase tracking-wider transition-colors group-hover:text-pink-deep">
              {cat.name}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

function NewIn() {
  const items = PRODUCTS.slice(0, 8);
  return (
    <section className="mx-auto max-w-6xl px-4 pb-16">
      <div className="mb-6 text-center">
        <h2 className="font-display text-3xl font-bold">
          Nieuw <span className="gradient-text italic">binnen</span>
        </h2>
        <p className="mt-1 text-sm text-ink-soft">Vers uit de voorraadkast, op = op</p>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {items.map((p, i) => (
          <ProductCard key={p.slug} product={p} index={i} />
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link
          href="/shop"
          className="gradient-cta btn-cta inline-block rounded-full px-8 py-3 font-bold text-white"
        >
          Bekijk alle producten →
        </Link>
      </div>
    </section>
  );
}

function DealOfTheDay() {
  const deal = findProduct("diy-set-pen-studio")!;
  const claimedPct = 87;
  return (
    <section className="mx-auto max-w-6xl px-4 pb-16">
      <div className="card overflow-hidden">
        <div className="grid md:grid-cols-2">
          <div className="relative">
            <BeadImage product={deal} className="h-full w-full object-cover" />
            <span className="shimmer gradient-cta absolute left-4 top-4 rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-white">
              Deal van de dag 🔥
            </span>
          </div>
          <div className="flex flex-col justify-center gap-4 p-8 md:p-10">
            <h2 className="font-display text-3xl font-bold">{deal.name}</h2>
            <p className="text-ink-soft">{deal.description}</p>
            <p>
              <span className="font-display text-4xl font-bold text-pink-deep">
                {formatPrice(deal.price)}
              </span>
              <span className="ml-3 text-lg text-ink-soft line-through">
                {formatPrice(deal.compareAt!)}
              </span>
              <span className="ml-3 rounded-full bg-ink px-2.5 py-1 text-[11px] font-bold text-white">
                -{Math.round((1 - deal.price / deal.compareAt!) * 100)}%
              </span>
            </p>
            <Countdown />
            <div>
              <div className="mb-1 flex justify-between text-[11px] font-bold">
                <span className="text-pink-deep">Al {claimedPct}% geclaimd</span>
                <span className="text-ink-soft">Nog {deal.stock} beschikbaar</span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-blush">
                <div className="progress-fill gradient-cta h-full" style={{ width: `${claimedPct}%` }} />
              </div>
            </div>
            <Link
              href={`/product/${deal.slug}`}
              className="gradient-cta btn-cta rounded-full px-8 py-3.5 text-center font-bold text-white"
            >
              Claim de deal →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function TikTokRow() {
  return (
    <section className="overflow-hidden bg-blush/50 py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8 text-center">
          <h2 className="font-display text-3xl font-bold">
            Gezien op <span className="gradient-text italic">TikTok</span>?
          </h2>
          <p className="mt-1 text-sm text-ink-soft">
            Elke video heeft z’n eigen deal-pagina. Tik en je zit meteen goed.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {VIDEO_FUNNELS.map((v, i) => (
            <Link
              key={v.id}
              href={v.landing}
              className="card card-hover group overflow-hidden"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="gradient-animated relative flex aspect-[3/4] items-center justify-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-xl shadow-lg transition-transform duration-300 group-hover:scale-110">
                  ▶
                </span>
                <span className="absolute bottom-3 left-3 rounded-full bg-ink/70 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur">
                  {Intl.NumberFormat("nl-NL", { notation: "compact" }).format(v.views)} views
                </span>
              </div>
              <p className="truncate p-3 text-[13px] font-bold">{v.title}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewsSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="mb-8 text-center">
        <h2 className="font-display text-3xl font-bold">
          1.200+ blije <span className="gradient-text italic">creators</span>
        </h2>
        <div className="mt-2 flex items-center justify-center gap-2">
          <Stars rating={5} size={16} />
          <span className="text-sm font-bold">4,9/5</span>
          <span className="text-sm text-ink-soft">op basis van 1.214 reviews</span>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {REVIEWS.map((r, i) => (
          <div key={r.name} className="card card-hover p-5" style={{ animationDelay: `${i * 80}ms` }}>
            <Stars rating={r.rating} />
            <p className="mt-3 text-sm leading-relaxed">“{r.text}”</p>
            <p className="mt-4 text-[12px] font-bold">
              {r.name} uit {r.place}
            </p>
            <p className="text-[11px] text-ink-soft">kocht {r.product} · geverifieerde aankoop ✓</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryRow />
      <NewIn />
      <DealOfTheDay />
      <TikTokRow />
      <ReviewsSection />
    </>
  );
}
