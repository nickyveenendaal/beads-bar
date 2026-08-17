"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import BeadImage from "@/components/BeadImage";
import Countdown from "@/components/Countdown";
import { IconCheck, IconHeart } from "@/components/Icons";
import Stars from "@/components/Stars";
import { useCart } from "@/lib/cart";
import { findProduct, formatPrice, DISCOUNT_CODES } from "@/lib/products";
import type { Funnel } from "@/lib/funnels";

// Nagespeelde TikTok-video (CSS-animatie): zelfde sfeer als de echte
// video zodat de overgang feed -> shop klopt. Bij een echte shop komt
// hier de video zelf te staan (mp4-loop).
function VideoMock({ title }: { title: string }) {
  const beads = [
    { left: "12%", delay: "0s", color: "#f6c3d3", size: 22 },
    { left: "28%", delay: "1.1s", color: "#d9b06b", size: 16 },
    { left: "46%", delay: "0.4s", color: "#ffffff", size: 19 },
    { left: "63%", delay: "1.6s", color: "#e987ae", size: 24 },
    { left: "80%", delay: "0.8s", color: "#f6c3d3", size: 15 },
  ];
  return (
    <div className="gradient-animated relative mx-auto aspect-[9/13] w-full max-w-xs overflow-hidden rounded-[28px] shadow-lg">
      {beads.map((b, i) => (
        <span
          key={i}
          className="absolute -top-8 animate-[confetti-fall_5s_linear_infinite] rounded-full"
          style={{
            left: b.left,
            width: b.size,
            height: b.size,
            background: b.color,
            animationDelay: b.delay,
            boxShadow: "inset -3px -4px 6px rgba(90,68,54,0.25), inset 3px 4px 6px rgba(255,255,255,0.8)",
          }}
          aria-hidden
        />
      ))}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/50 to-transparent p-4 pt-10">
        <p className="text-[12px] font-bold text-white">@thebeadsbar_</p>
        <p className="text-[11px] text-white/90">{title} · #beads #diy #fyp</p>
      </div>
      <div className="absolute right-2.5 top-1/2 flex -translate-y-1/2 flex-col items-center gap-4 text-white" aria-hidden>
        <span className="flex flex-col items-center text-[9px] font-bold">
          <IconHeart size={22} filled /> 48,2k
        </span>
        <span className="flex flex-col items-center gap-0.5 text-[9px] font-bold">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M12 3C7 3 3 6.6 3 11c0 2.2 1 4.1 2.7 5.5-.1 1-.5 2.3-1.5 3.5 1.9-.2 3.4-.9 4.4-1.6.7.2 1.6.6 3.4.6 5 0 9-3.6 9-8s-4-8-9-8Z" />
          </svg>
          1.204
        </span>
        <span className="flex flex-col items-center gap-0.5 text-[9px] font-bold">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M13 5 21 12l-8 7v-4.5C8 14.5 5 16 3 19c.5-5 3-9.5 10-10.5Z" />
          </svg>
          9.418
        </span>
      </div>
      <div className="absolute inset-x-4 top-3 h-0.5 overflow-hidden rounded-full bg-white/30">
        <div className="h-full w-full origin-left animate-[progress-loop_5s_linear_infinite] bg-white" />
      </div>
      <div className="absolute left-3 top-6 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold text-pink-deep">
        uit je TikTok-feed
      </div>
    </div>
  );
}

export default function FunnelLanding({ funnel }: { funnel: Funnel }) {
  const router = useRouter();
  const { add } = useCart();
  const [busy, setBusy] = useState(false);

  const items = funnel.products
    .map(({ slug, qty }) => ({ product: findProduct(slug)!, qty }))
    .filter((i) => i.product);

  // Zelfde regels als het mandje: staffelkorting per regel, en de code
  // geldt alleen op regels zonder staffel (niet stapelbaar).
  const pct = DISCOUNT_CODES[funnel.code] ?? 0;
  const linePrice = (product: (typeof items)[number]["product"], qty: number) => {
    // Zelfde afronding als het mandje: korting berekenen en aftrekken
    const tier = product.bulkDeal?.filter((t) => qty >= t.qty).at(-1);
    const gross = product.price * qty;
    return gross - Math.round((gross * (tier?.discountPct ?? 0)) / 100);
  };
  const hasBulk = (product: (typeof items)[number]["product"], qty: number) =>
    Boolean(product.bulkDeal?.some((t) => qty >= t.qty));
  const normal = items.reduce((sum, i) => sum + i.product.price * i.qty, 0);
  const afterBulk = items.reduce((sum, i) => sum + linePrice(i.product, i.qty), 0);
  const eligible = items.reduce(
    (sum, i) => (hasBulk(i.product, i.qty) ? sum : sum + linePrice(i.product, i.qty)),
    0
  );
  const withCode = afterBulk - Math.round((eligible * pct) / 100);

  const orderNow = () => {
    setBusy(true);
    for (const { product, qty } of items) add(product.slug, qty, { silent: true });
    router.push(`/checkout?code=${funnel.code}`);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 pb-28 md:pb-8">
      <div className="rise-in text-center">
        <p className="inline-flex items-center gap-2 rounded-full bg-blush px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-pink-deep">
          {funnel.socialStat}
        </p>
        <h1 className="font-display mt-4 text-4xl font-medium leading-tight">
          {funnel.hook.split(" ").slice(0, -1).join(" ")}{" "}
          <span className="italic text-pink-deep">{funnel.hook.split(" ").at(-1)}</span>
        </h1>
        <p className="mx-auto mt-3 max-w-lg text-ink-soft">{funnel.sub}</p>
      </div>

      <div className="mt-8">
        <VideoMock title={funnel.videoTitle} />
      </div>

      <div className="card mt-6 p-6">
        <div className="space-y-4">
          {items.map(({ product, qty }) => (
            <div key={product.slug} className="flex items-center gap-4">
              <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl">
                <BeadImage product={product} className="h-full w-full" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-bold">
                  {qty > 1 && <span className="text-pink-deep">{qty}× </span>}
                  {product.name}
                </p>
                <div className="flex items-center gap-1.5">
                  <Stars rating={product.rating} />
                  <span className="text-[11px] text-ink-soft">({product.reviews})</span>
                </div>
                {product.stock <= 10 && (
                  <p className="mt-0.5 text-[11px] font-bold text-pink-deep">
                    Nog {product.stock} op voorraad
                  </p>
                )}
              </div>
              <p className="font-bold">{formatPrice(product.price * qty)}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-2xl bg-cream p-4 text-center">
          <p className="microlabel">Alleen via deze link</p>
          <p className="mt-1">
            <span className="font-display text-4xl font-medium text-pink-deep">
              {formatPrice(withCode)}
            </span>
            <span className="ml-3 text-lg text-ink-soft line-through">{formatPrice(normal)}</span>
          </p>
          <p className="mt-1 text-[12px] font-bold text-gold">
            {eligible > 0
              ? `Code ${funnel.code} (-${pct}%) wordt automatisch toegepast`
              : "Staffelkorting zit al in de prijs"}
          </p>
        </div>

        <button
          onClick={orderNow}
          disabled={busy}
          className="btn-cta mt-5 w-full rounded-full py-4 text-lg font-bold disabled:opacity-70"
        >
          {busy ? "Mandje wordt gevuld..." : "Bestel direct →"}
        </button>
        <p className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-center text-[11px] text-ink-soft">
          <span className="flex items-center gap-1"><IconCheck size={12} /> Vandaag verzonden (vóór 15:00)</span>
          <span className="flex items-center gap-1"><IconCheck size={12} /> Cadeautje erbij</span>
          <span className="flex items-center gap-1"><IconCheck size={12} /> 30 dagen retour</span>
        </p>
      </div>

      <div className="mt-6 flex justify-center">
        <Countdown label="Deze video-deal eindigt over" />
      </div>

      <div className="card mt-8 p-5 text-center">
        <Stars rating={5} size={14} />
        <p className="mt-2 text-sm italic leading-relaxed text-ink-soft">
          “Via TikTok besteld en echt binnen een dag in huis. Verpakking is zo schattig dat ik hem
          niet weg durfde te gooien.”
        </p>
        <p className="mt-2 text-[12px] font-bold">Sofie uit Antwerpen · geverifieerde aankoop ✓</p>
      </div>

      <div className="pointer-events-none fixed inset-x-0 bottom-4 z-30 flex justify-center px-4 md:hidden">
        <button
          onClick={orderNow}
          disabled={busy}
          className="btn-cta pointer-events-auto w-full max-w-md rounded-full py-4 font-bold shadow-xl disabled:opacity-70"
        >
          {busy ? "Mandje wordt gevuld..." : `Bestel direct · ${formatPrice(withCode)}`}
        </button>
      </div>

      <div className="mt-8 flex justify-center opacity-70">
        <Image src="/brand/logo-stacked.png" alt="The Beads Bar" width={120} height={43} className="h-9 w-auto" />
      </div>
    </div>
  );
}
