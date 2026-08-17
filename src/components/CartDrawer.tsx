"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";
import { findProduct, formatPrice, FREE_SHIPPING_FROM } from "@/lib/products";
import BeadImage from "./BeadImage";

function FreeShippingBar() {
  const { subtotal, toFreeShipping } = useCart();
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_FROM) * 100);
  return (
    <div className="rounded-2xl bg-blush p-3">
      <p className="text-[12px] font-bold">
        {toFreeShipping === 0 ? (
          <>🎉 Yes! Je bestelling wordt <span className="text-pink-deep">gratis verzonden</span></>
        ) : (
          <>
            Nog <span className="text-pink-deep">{formatPrice(toFreeShipping)}</span> tot gratis verzending 🚚
          </>
        )}
      </p>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-white">
        <div
          className="progress-fill gradient-cta h-full rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

function UpsellRow() {
  const { lines, add } = useCart();
  const inCart = new Set(lines.map((l) => l.slug));
  const suggestions = ["mystery-beads-bag", "gold-charm-mix", "smiley-beads-pastel"]
    .filter((slug) => !inCart.has(slug))
    .slice(0, 2)
    .map((slug) => findProduct(slug)!)
    .filter(Boolean);
  if (suggestions.length === 0 || lines.length === 0) return null;
  return (
    <div>
      <p className="mb-2 text-[12px] font-bold text-ink-soft">Maak je bestelling af ✨</p>
      <div className="space-y-2">
        {suggestions.map((p) => (
          <div key={p.slug} className="flex items-center gap-3 rounded-2xl border border-line bg-card p-2">
            <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl">
              <BeadImage product={p} className="h-full w-full" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-bold">{p.name}</p>
              <p className="text-[12px] text-pink-deep">
                {formatPrice(p.price)}
                {p.compareAt && (
                  <span className="ml-1.5 text-ink-soft line-through">{formatPrice(p.compareAt)}</span>
                )}
              </p>
            </div>
            <button
              onClick={() => add(p.slug, 1, { silent: true })}
              className="gradient-cta btn-cta rounded-full px-3 py-1.5 text-[12px] font-bold text-white"
            >
              + Voeg toe
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CartDrawer() {
  const { isOpen, closeCart, lines, setQty, remove, subtotal, discountForLine, lineTotal } = useCart();

  return (
    <>
      <div
        onClick={closeCart}
        className={`fixed inset-0 z-50 bg-ink/30 backdrop-blur-[2px] transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col bg-canvas shadow-2xl transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Winkelwagen"
      >
        <div className="flex items-center justify-between border-b border-line bg-card px-5 py-4">
          <h2 className="font-display text-xl font-bold">
            Jouw mandje <span className="text-pink-deep">♥</span>
          </h2>
          <button
            onClick={closeCart}
            aria-label="Sluiten"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-line transition-colors hover:bg-blush"
          >
            ✕
          </button>
        </div>

        <div className="nice-scroll flex-1 space-y-4 overflow-y-auto p-5">
          <FreeShippingBar />

          {lines.length === 0 ? (
            <div className="py-10 text-center">
              <p className="text-4xl">🫧</p>
              <p className="mt-3 font-bold">Je mandje is nog leeg</p>
              <p className="mt-1 text-sm text-ink-soft">Tijd om iets moois uit te zoeken!</p>
              <Link
                href="/shop"
                onClick={closeCart}
                className="gradient-cta btn-cta mt-4 inline-block rounded-full px-6 py-2.5 text-sm font-bold text-white"
              >
                Shop alle producten
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {lines.map((line) => {
                const p = findProduct(line.slug);
                if (!p) return null;
                const discount = discountForLine(line);
                const nextTier = p.bulkDeal?.find((t) => line.qty < t.qty);
                return (
                  <div key={line.slug} className="card p-3">
                    <div className="flex gap-3">
                      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-2xl">
                        <BeadImage product={p} className="h-full w-full" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold">{p.name}</p>
                        <p className="text-sm text-pink-deep">{formatPrice(lineTotal(line))}</p>
                        {discount > 0 && (
                          <p className="text-[11px] font-bold text-mint">
                            Staffelkorting: -{formatPrice(discount)} 🎉
                          </p>
                        )}
                        <div className="mt-2 flex items-center gap-2">
                          <div className="flex items-center rounded-full border border-line">
                            <button
                              onClick={() => setQty(line.slug, line.qty - 1)}
                              className="px-2.5 py-0.5 font-bold text-ink-soft hover:text-pink-deep"
                            >
                              −
                            </button>
                            <span className="min-w-6 text-center text-sm font-bold">{line.qty}</span>
                            <button
                              onClick={() => setQty(line.slug, line.qty + 1)}
                              className="px-2.5 py-0.5 font-bold text-ink-soft hover:text-pink-deep"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => remove(line.slug)}
                            className="text-[11px] font-semibold text-ink-soft underline hover:text-pink-deep"
                          >
                            verwijder
                          </button>
                        </div>
                      </div>
                    </div>
                    {nextTier && (
                      <p className="mt-2 rounded-xl bg-cream px-3 py-1.5 text-[11px] font-semibold text-gold">
                        💡 Neem er {nextTier.qty} en krijg {nextTier.discountPct}% korting op deze regel
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          <UpsellRow />
        </div>

        {lines.length > 0 && (
          <div className="border-t border-line bg-card p-5">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-semibold text-ink-soft">Subtotaal</span>
              <span className="font-display text-xl font-bold">{formatPrice(subtotal)}</span>
            </div>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="gradient-cta btn-cta block w-full rounded-full py-3.5 text-center font-bold text-white"
            >
              Afrekenen →
            </Link>
            <p className="mt-2 text-center text-[11px] text-ink-soft">
              🎁 Gratis mini-zakje kralen zit er al bij · iDEAL · Klarna · PayPal
            </p>
          </div>
        )}
      </aside>
    </>
  );
}