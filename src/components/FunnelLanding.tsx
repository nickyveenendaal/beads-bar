"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import BeadImage from "@/components/BeadImage";
import Countdown from "@/components/Countdown";
import Stars from "@/components/Stars";
import { useCart } from "@/lib/cart";
import { findProduct, formatPrice, DISCOUNT_CODES } from "@/lib/products";
import type { Funnel } from "@/lib/funnels";

export default function FunnelLanding({ funnel }: { funnel: Funnel }) {
  const router = useRouter();
  const { add } = useCart();
  const [busy, setBusy] = useState(false);

  const items = funnel.products
    .map(({ slug, qty }) => ({ product: findProduct(slug)!, qty }))
    .filter((i) => i.product);

  const normal = items.reduce((sum, i) => sum + i.product.price * i.qty, 0);
  const pct = DISCOUNT_CODES[funnel.code] ?? 0;
  const withCode = Math.round(normal * (1 - pct / 100));

  const orderNow = () => {
    setBusy(true);
    for (const { product, qty } of items) add(product.slug, qty, { silent: true });
    router.push(`/checkout?code=${funnel.code}`);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="rise-in text-center">
        <p className="inline-flex items-center gap-2 rounded-full bg-blush px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-pink-deep">
          <span className="pulse-dot h-2 w-2 rounded-full bg-pink-deep" /> {funnel.socialStat}
        </p>
        <h1 className="font-display mt-4 text-4xl font-bold leading-tight">
          {funnel.hook.split(" ").slice(0, -1).join(" ")}{" "}
          <span className="gradient-text italic">{funnel.hook.split(" ").at(-1)}</span>
        </h1>
        <p className="mx-auto mt-3 max-w-lg text-ink-soft">{funnel.sub}</p>
      </div>

      <div className="card mt-8 overflow-hidden">
        <div className="gradient-animated relative flex aspect-video items-center justify-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-2xl shadow-xl transition-transform hover:scale-110">
            ▶
          </span>
          <span className="absolute bottom-3 left-3 rounded-full bg-ink/70 px-3 py-1 text-[11px] font-bold text-white backdrop-blur">
            {funnel.videoTitle}
          </span>
          <span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-pink-deep">
            uit je TikTok-feed 💗
          </span>
        </div>
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
                    🔥 Nog {product.stock} op voorraad
                  </p>
                )}
              </div>
              <p className="font-bold">{formatPrice(product.price * qty)}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-2xl bg-cream p-4 text-center">
          <p className="text-[12px] font-bold uppercase tracking-wide text-ink-soft">
            Alleen via deze link
          </p>
          <p className="mt-1">
            <span className="font-display text-4xl font-bold text-pink-deep">
              {formatPrice(withCode)}
            </span>
            <span className="ml-3 text-lg text-ink-soft line-through">{formatPrice(normal)}</span>
          </p>
          <p className="mt-1 text-[12px] font-bold text-gold">
            Code {funnel.code} (-{pct}%) wordt automatisch toegepast ✨
          </p>
        </div>

        <button
          onClick={orderNow}
          disabled={busy}
          className="gradient-cta btn-cta mt-5 w-full rounded-full py-4 text-lg font-bold text-white disabled:opacity-70"
        >
          {busy ? "Mandje wordt gevuld..." : "Bestel direct →"}
        </button>
        <p className="mt-3 text-center text-[11px] text-ink-soft">
          Voor 15:00 besteld = vandaag verzonden · 🎁 cadeautje bij elke bestelling · 30 dagen retour
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
    </div>
  );
}
