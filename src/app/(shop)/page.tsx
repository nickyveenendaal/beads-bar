import Image from "next/image";
import { asset } from "@/lib/asset";
import Link from "next/link";
import BeadImage from "@/components/BeadImage";
import Countdown from "@/components/Countdown";
import {
  IconDiamond,
  IconGift,
  IconHeart,
  IconLock,
  IconPlay,
  IconSparkle,
  IconTruck,
} from "@/components/Icons";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import Stars from "@/components/Stars";
import { CATEGORIES, findProduct, formatPrice, PRODUCTS, RATING_BREAKDOWN, REVIEWS } from "@/lib/products";
import { VIDEO_FUNNELS } from "@/lib/stats";

function SectionHeader({ label, title, sub }: { label: string; title: React.ReactNode; sub?: string }) {
  return (
    <div className="mb-8 text-center">
      <p className="microlabel">♥ {label} ♥</p>
      <h2 className="font-display mt-2 text-3xl font-medium md:text-4xl">{title}</h2>
      {sub && <p className="mt-2 text-sm text-ink-soft">{sub}</p>}
    </div>
  );
}

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

const USPS = [
  { icon: IconDiamond, label: "Premium quality" },
  { icon: IconHeart, label: "Made with love" },
  { icon: IconGift, label: "Beautiful packaging" },
  { icon: IconSparkle, label: "Endless creativity" },
];

function Hero() {
  const hero = findProduct("acryl-flower-beads-mix")!;
  return (
    <section className="mx-auto max-w-6xl px-4 pt-6">
      <div className="gradient-animated relative overflow-hidden rounded-[32px]">
        <FloatingBead className="left-[5%] top-[16%]" color="#f6c3d3" size={30} delayClass="float-slow" />
        <FloatingBead className="left-[12%] bottom-[16%]" color="#e6cf9a" size={20} delayClass="float-slower" />
        <FloatingBead className="right-[6%] top-[14%]" color="#fbd9e4" size={26} delayClass="float-slower" />
        <span className="twinkle absolute left-[24%] top-[24%] text-lg text-gold" aria-hidden>✦</span>
        <span className="twinkle absolute right-[30%] bottom-[18%] text-sm text-gold" style={{ animationDelay: "2s" }} aria-hidden>✦</span>

        <div className="grid items-center gap-8 px-6 py-12 md:grid-cols-2 md:gap-4 md:px-12 md:py-14">
          <div className="rise-in relative z-10 text-center md:text-left">
            <p className="microlabel">Premium beads &amp; beadable pens</p>
            <h1 className="font-display mt-4 text-5xl font-medium leading-[1.08] md:text-6xl">
              Create.
              <br />
              <span className="italic text-pink-deep">Bead.</span>
              <br />
              Inspire.
            </h1>
            <p className="mx-auto mt-4 max-w-md text-lg text-ink-soft md:mx-0">
              Met de hand samengestelde kralenmixen, dezelfde werkdag verzonden.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3 md:justify-start">
              <Link href="/shop" className="btn-cta inline-flex items-center gap-2 rounded-full px-8 py-3.5 font-bold">
                Shop nu <IconHeart size={15} filled />
              </Link>
              <Link href="/t/pen-pov" className="btn-outline inline-flex items-center gap-2 rounded-full px-6 py-3 font-bold">
                <IconPlay size={14} /> De TikTok-deal
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-sm">
            <div className="card float-slow overflow-hidden p-3">
              <BeadImage product={hero} className="w-full rounded-[20px]" />
              <div className="flex items-center justify-between px-2 py-2">
                <div>
                  <p className="text-sm font-bold">{hero.name}</p>
                  <Stars rating={hero.rating} />
                </div>
                <p className="font-display text-lg font-medium text-pink-deep">{formatPrice(hero.price)}</p>
              </div>
            </div>
            <div className="sway absolute -left-24 bottom-14 hidden w-32 lg:block" aria-hidden>
              <Image src={asset("/brand/mascot-beading.png")} alt="" width={128} height={141} className="drop-shadow-lg" />
            </div>
            <div className="absolute -right-3 -top-4 rotate-12 rounded-full border-2 border-gold-soft bg-white px-5 py-3 text-center shadow-md">
              <p className="font-script text-xl leading-none text-gold">Handmade</p>
              <p className="font-script text-lg leading-tight text-gold">with love</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-6 flex max-w-3xl flex-wrap items-start justify-center gap-x-10 gap-y-4">
        {USPS.map((u) => (
          <div key={u.label} className="flex flex-col items-center gap-1.5 text-pink-mid">
            <u.icon size={24} />
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-ink-soft">{u.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function CategoryRow() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14">
      <div className="flex flex-wrap items-center justify-center gap-6 md:gap-9">
        {CATEGORIES.map((cat) => (
          <Link key={cat.slug} href={`/shop?cat=${cat.slug}`} className="group text-center">
            <div className="card card-hover mx-auto flex h-20 w-20 items-center justify-center overflow-hidden rounded-full md:h-24 md:w-24">
              <div className="flex gap-1 transition-transform duration-500 group-hover:scale-110">
                {cat.palette.map((c, j) => (
                  <span
                    key={j}
                    className="block h-5 w-5 rounded-full border border-white shadow-sm md:h-6 md:w-6"
                    style={{ background: c }}
                  />
                ))}
              </div>
            </div>
            <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-ink-soft transition-colors group-hover:text-pink-deep">
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
      <Reveal>
        <SectionHeader label="Nieuw binnen" title={<>Vers uit de <span className="italic text-pink-deep">voorraadkast</span></>} sub="Met de hand samengesteld, op = op" />
      </Reveal>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {items.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 4) * 70}>
            <ProductCard product={p} index={i} />
          </Reveal>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link href="/shop" className="btn-cta inline-block rounded-full px-8 py-3 font-bold">
          Bekijk alle producten →
        </Link>
      </div>
    </section>
  );
}

function DealOfTheDay() {
  const deal = findProduct("diy-set-pen-studio")!;
  return (
    <section className="mx-auto max-w-6xl px-4 pb-16">
      <Reveal>
        <div className="card overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="relative">
              <BeadImage product={deal} className="h-full w-full object-cover" />
              <span className="shimmer absolute left-4 top-4 rounded-full bg-pink px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white">
                Deal van de dag
              </span>
            </div>
            <div className="flex flex-col justify-center gap-4 p-8 md:p-10">
              <p className="microlabel">Alleen vandaag</p>
              <h2 className="font-display text-3xl font-medium">{deal.name}</h2>
              <p className="text-ink-soft">{deal.description}</p>
              <p>
                <span className="font-display text-4xl font-medium text-pink-deep">
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
              <p className="text-[12px] font-bold text-pink-deep">Nog {deal.stock} beschikbaar</p>
              <Link
                href={`/product/${deal.slug}`}
                className="btn-cta rounded-full px-8 py-3.5 text-center font-bold"
              >
                Claim de deal →
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

const WHY = [
  { icon: IconTruck, title: "Snelle verzending", text: "Voor 15:00 besteld, zelfde werkdag verzonden" },
  { icon: IconGift, title: "Cadeautje", text: "Bij elke bestelling een verrassing" },
  { icon: IconDiamond, title: "Premium kwaliteit", text: "Alle kralen geselecteerd met zorg en liefde" },
  { icon: IconLock, title: "Veilig betalen", text: "iDEAL, PayPal, Klarna & meer" },
];

function WhyUs() {
  return (
    <section className="bg-blush/60 py-16">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal>
          <SectionHeader label="Waarom The Beads Bar" title={<>Gemaakt om te <span className="italic text-pink-deep">verwennen</span></>} />
        </Reveal>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {WHY.map((w, i) => (
            <Reveal key={w.title} delay={i * 70}>
              <div className="card card-hover h-full p-6 text-center">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blush text-pink-mid">
                  <w.icon size={22} />
                </span>
                <p className="mt-3 text-sm font-bold">{w.title}</p>
                <p className="mt-1 text-[12px] text-ink-soft">{w.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function TikTokRow() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <Reveal>
        <SectionHeader
          label="Gezien op TikTok"
          title={<>Van je feed naar je <span className="italic text-pink-deep">brievenbus</span></>}
          sub="Elke video heeft een eigen deal-pagina. Tik en je zit meteen goed."
        />
      </Reveal>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {VIDEO_FUNNELS.map((v, i) => (
          <Reveal key={v.id} delay={(i % 4) * 70}>
            <Link href={v.landing} className="card card-hover group block overflow-hidden">
              <div className="gradient-animated relative flex aspect-[3/4] items-center justify-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-pink-deep shadow-lg transition-transform duration-300 group-hover:scale-110">
                  <IconPlay size={22} />
                </span>
                <span className="absolute bottom-3 left-3 rounded-full bg-ink/70 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur">
                  {Intl.NumberFormat("nl-NL", { notation: "compact" }).format(v.views)} views
                </span>
              </div>
              <p className="truncate p-3 text-[13px] font-bold">{v.title}</p>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ReviewsSection() {
  const total = RATING_BREAKDOWN.reduce((s, r) => s + r.count, 0);
  return (
    <section className="mx-auto max-w-6xl px-4 pb-16">
      <Reveal>
        <SectionHeader
          label="Reviews"
          title={<>1.200+ blije <span className="italic text-pink-deep">creators</span></>}
        />
      </Reveal>
      <Reveal>
        <div className="mx-auto mb-8 flex max-w-md flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            <Stars rating={4.9} size={16} />
            <span className="text-sm font-bold">4,9/5</span>
            <span className="text-sm text-ink-soft">· {total.toLocaleString("nl-NL")} reviews</span>
          </div>
          <div className="w-full space-y-1">
            {RATING_BREAKDOWN.map((r) => (
              <div key={r.stars} className="flex items-center gap-2 text-[11px] font-bold text-ink-soft">
                <span className="w-6 text-right">{r.stars}★</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-blush">
                  <div className="progress-fill h-full rounded-full bg-gold" style={{ width: `${(r.count / total) * 100}%` }} />
                </div>
                <span className="w-10">{r.count}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {REVIEWS.map((r, i) => (
          <Reveal key={r.name} delay={(i % 5) * 60}>
            <div className="card card-hover h-full p-5">
              <Stars rating={r.rating} />
              <p className="mt-3 text-sm leading-relaxed">“{r.text}”</p>
              <p className="mt-4 text-[12px] font-bold">
                {r.name} uit {r.place}
              </p>
              <p className="text-[11px] text-ink-soft">kocht {r.product} · geverifieerd ✓</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function BeadsClub() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-16">
      <Reveal>
        <div className="gradient-animated relative overflow-hidden rounded-[32px] px-6 py-12 text-center md:px-12">
          <div className="pointer-events-none absolute -right-4 bottom-0 hidden w-40 md:block" aria-hidden>
            <Image src={asset("/brand/mascot-2.png")} alt="" width={160} height={190} className="drop-shadow-lg" />
          </div>
          <p className="font-script text-4xl text-pink-deep">Join the Beads Club</p>
          <p className="mx-auto mt-3 max-w-md text-sm text-ink-soft">
            Ontvang als eerste nieuwe producten, kortingen en inspiratie in je inbox. Plus 10%
            korting op je eerste bestelling.
          </p>
          <div className="mx-auto mt-5 flex max-w-sm items-center rounded-full border border-line bg-white pl-5 shadow-sm">
            <input
              placeholder="Jouw e-mailadres"
              className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-ink-soft"
            />
            <span className="btn-cta m-1.5 cursor-pointer rounded-full px-5 py-2 text-sm font-bold">Join ♥</span>
          </div>
        </div>
      </Reveal>
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
      <WhyUs />
      <TikTokRow />
      <ReviewsSection />
      <BeadsClub />
    </>
  );
}
