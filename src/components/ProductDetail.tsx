"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { formatPrice, PRODUCTS, REVIEWS, type Product } from "@/lib/products";
import BeadImage from "./BeadImage";
import ProductCard from "./ProductCard";
import Stars from "./Stars";

// "X mensen bekijken dit nu": stabiel per product (geen random bij
// renderen, anders klopt server niet met browser).
function watchers(slug: string): number {
  let h = 0;
  for (const ch of slug) h = (h * 31 + ch.charCodeAt(0)) % 997;
  return 8 + (h % 24);
}

export default function ProductDetail({ product }: { product: Product }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);

  const discountPct = product.compareAt
    ? Math.round((1 - product.price / product.compareAt) * 100)
    : 0;
  const activeTier = product.bulkDeal?.filter((t) => qty >= t.qty).at(-1);
  const lineDiscount = activeTier ? Math.round((product.price * qty * activeTier.discountPct) / 100) : 0;
  const total = product.price * qty - lineDiscount;

  const related = PRODUCTS.filter(
    (p) => p.slug !== product.slug && (p.category === product.category || p.badge === "bestseller")
  ).slice(0, 4);
  const review = REVIEWS.find((r) => r.product === product.name) ?? REVIEWS[0];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <nav className="mb-6 text-[12px] font-semibold text-ink-soft">
        <Link href="/" className="hover:text-pink-deep">Home</Link>
        {" / "}
        <Link href="/shop" className="hover:text-pink-deep">Shop</Link>
        {" / "}
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="rise-in">
          <div className="card group overflow-hidden p-3">
            <div className="overflow-hidden rounded-[20px]">
              <BeadImage
                product={product}
                className="w-full transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-rotate-2"
              />
            </div>
          </div>
          <div className="mt-4 flex items-center justify-center gap-6 text-[11px] font-bold text-ink-soft">
            <span>📦 Voor 15:00 = vandaag verzonden</span>
            <span>🎁 Cadeautje bij elke bestelling</span>
          </div>
        </div>

        <div className="rise-in" style={{ animationDelay: "120ms" }}>
          <div className="flex items-center gap-2">
            <Stars rating={product.rating} size={15} />
            <span className="text-sm font-bold">{product.rating.toLocaleString("nl-NL")}</span>
            <span className="text-sm text-ink-soft">({product.reviews} reviews)</span>
          </div>
          <h1 className="font-display mt-2 text-4xl font-bold">{product.name}</h1>

          <p className="mt-4">
            <span className="font-display text-4xl font-bold text-pink-deep">
              {formatPrice(product.price)}
            </span>
            {product.compareAt && (
              <>
                <span className="ml-3 text-xl text-ink-soft line-through">
                  {formatPrice(product.compareAt)}
                </span>
                <span className="ml-3 rounded-full bg-ink px-3 py-1 text-[12px] font-bold text-white">
                  Je bespaart {discountPct}%
                </span>
              </>
            )}
          </p>

          <p className="mt-4 leading-relaxed text-ink-soft">{product.description}</p>

          <ul className="mt-4 space-y-1.5">
            {product.bullets.map((b) => (
              <li key={b} className="flex items-center gap-2 text-sm">
                <span className="text-mint">✓</span> {b}
              </li>
            ))}
          </ul>

          <div className="mt-5 flex items-center gap-4 text-[12px] font-bold">
            <span className="flex items-center gap-1.5 text-pink-deep">
              <span className="pulse-dot h-2 w-2 rounded-full bg-pink-deep" />
              {watchers(product.slug)} mensen bekijken dit nu
            </span>
            {product.stock <= 10 && (
              <span className="rounded-full bg-blush px-3 py-1 text-pink-deep">
                🔥 Nog maar {product.stock} op voorraad
              </span>
            )}
          </div>

          {product.bulkDeal && (
            <div className="mt-6">
              <p className="mb-2 text-[12px] font-bold uppercase tracking-wide text-ink-soft">
                Meer halen = minder betalen
              </p>
              <div className="flex gap-2">
                {[{ qty: 1, discountPct: 0 }, ...product.bulkDeal].map((tier) => {
                  const active = (activeTier?.qty ?? 1) === tier.qty || (!activeTier && tier.qty === 1);
                  return (
                    <button
                      key={tier.qty}
                      onClick={() => setQty(tier.qty)}
                      className={`flex-1 rounded-2xl border-2 px-3 py-3 text-center transition-all duration-300 ${
                        active
                          ? "border-pink-deep bg-blush shadow-[0_6px_18px_rgba(224,90,146,0.25)]"
                          : "border-line bg-card hover:border-pink"
                      }`}
                    >
                      <p className="font-display text-lg font-bold">{tier.qty}×</p>
                      <p className="text-[11px] font-bold text-pink-deep">
                        {tier.discountPct > 0 ? `-${tier.discountPct}%` : "normaal"}
                      </p>
                      <p className="text-[11px] text-ink-soft">
                        {formatPrice(Math.round(product.price * tier.qty * (1 - tier.discountPct / 100)))}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="mt-6 flex items-center gap-3">
            <div className="flex items-center rounded-full border-2 border-line bg-card">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="px-4 py-2.5 text-lg font-bold text-ink-soft hover:text-pink-deep"
              >
                −
              </button>
              <span className="min-w-8 text-center font-bold">{qty}</span>
              <button
                onClick={() => setQty(qty + 1)}
                className="px-4 py-2.5 text-lg font-bold text-ink-soft hover:text-pink-deep"
              >
                +
              </button>
            </div>
            <button
              onClick={() => add(product.slug, qty)}
              className="gradient-cta btn-cta flex-1 rounded-full py-3.5 font-bold text-white"
            >
              In winkelwagen · {formatPrice(total)}
              {lineDiscount > 0 && <span className="ml-1.5 opacity-80">(-{formatPrice(lineDiscount)})</span>}
            </button>
          </div>

          <div className="mt-5 flex items-center justify-center gap-4 rounded-2xl bg-cream px-4 py-3 text-[11px] font-bold text-ink-soft">
            <span>🔒 Veilig betalen</span>
            <span>iDEAL</span>
            <span>Klarna</span>
            <span>PayPal</span>
            <span>↩️ 30 dagen retour</span>
          </div>

          <div className="card mt-6 p-5">
            <div className="flex items-center gap-2">
              <Stars rating={review.rating} />
              <span className="text-[12px] font-bold">
                {review.name} uit {review.place}
              </span>
              <span className="text-[11px] text-ink-soft">· geverifieerd ✓</span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">“{review.text}”</p>
          </div>
        </div>
      </div>

      <section className="mt-16">
        <h2 className="font-display mb-6 text-center text-2xl font-bold">
          Vaak samen <span className="gradient-text italic">gekocht</span>
        </h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {related.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
