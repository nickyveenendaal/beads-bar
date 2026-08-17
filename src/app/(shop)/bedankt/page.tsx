"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import BeadImage from "@/components/BeadImage";
import Countdown from "@/components/Countdown";
import { findProduct, formatPrice } from "@/lib/products";

const CONFETTI_COLORS = ["#f078a8", "#e8b04b", "#f9c1d4", "#b8e6d0", "#cdbdf2"];

function Confetti() {
  const [pieces, setPieces] = useState<
    { left: number; delay: number; duration: number; color: string; size: number }[]
  >([]);
  useEffect(() => {
    // Confetti pas in de browser strooien (met echte willekeur kan de
    // server-render nooit gelijk zijn aan de browser).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPieces(
      Array.from({ length: 60 }, () => ({
        left: Math.random() * 100,
        delay: Math.random() * 2.5,
        duration: 3 + Math.random() * 3,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        size: 6 + Math.random() * 8,
      }))
    );
  }, []);
  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden" aria-hidden>
      {pieces.map((p, i) => (
        <span
          key={i}
          className="confetti"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 0.6,
            background: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

const UPSELL_SLUG = "gold-charm-mix";
const UPSELL_DISCOUNT = 30;

function ThanksInner() {
  const searchParams = useSearchParams();
  const total = Number(searchParams.get("total") ?? 0);
  const [upsellTaken, setUpsellTaken] = useState(false);
  const upsell = findProduct(UPSELL_SLUG)!;
  const upsellPrice = Math.round(upsell.price * (1 - UPSELL_DISCOUNT / 100));

  return (
    <div className="relative mx-auto max-w-2xl px-4 py-16 text-center">
      <Confetti />
      <p className="pop-in text-6xl">🎉</p>
      <h1 className="font-display mt-4 text-4xl font-bold">
        Gelukt! Je bestelling is <span className="gradient-text italic">binnen</span>
      </h1>
      <p className="mt-3 text-ink-soft">
        {total > 0 && (
          <>
            We hebben je betaling van <span className="font-bold text-ink">{formatPrice(total)}</span>{" "}
            ontvangen.{" "}
          </>
        )}
        Je krijgt zo een bevestiging per mail. Voor 15:00 besteld, dus hij gaat{" "}
        <span className="font-bold text-ink">vandaag nog</span> op de post 📦
      </p>

      <div className="card mt-10 overflow-hidden text-left">
        <div className="gradient-cta shimmer px-6 py-3 text-center text-[12px] font-bold uppercase tracking-widest text-white">
          Alleen nu · wordt met je bestelling meegestuurd
        </div>
        <div className="flex flex-col items-center gap-5 p-6 sm:flex-row">
          <div className="h-28 w-28 shrink-0 overflow-hidden rounded-2xl">
            <BeadImage product={upsell} className="h-full w-full" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <p className="font-display text-xl font-bold">{upsell.name}</p>
            <p className="mt-1 text-sm text-ink-soft">
              Maakt je nieuwe creaties af. Eenmalig <span className="font-bold text-pink-deep">-{UPSELL_DISCOUNT}%</span>{" "}
              omdat we hem gewoon in dezelfde doos stoppen (geen extra verzendkosten).
            </p>
            <p className="mt-2">
              <span className="font-display text-2xl font-bold text-pink-deep">{formatPrice(upsellPrice)}</span>
              <span className="ml-2 text-sm text-ink-soft line-through">{formatPrice(upsell.price)}</span>
            </p>
          </div>
          <div className="text-center">
            {upsellTaken ? (
              <p className="rounded-full bg-mint/15 px-5 py-3 text-sm font-bold text-mint">
                Toegevoegd ✓<br />
                <span className="text-[11px] font-semibold">gaat mee in de doos</span>
              </p>
            ) : (
              <button
                onClick={() => setUpsellTaken(true)}
                className="gradient-cta btn-cta rounded-full px-6 py-3 text-sm font-bold text-white"
              >
                Voeg toe met 1 tik
              </button>
            )}
          </div>
        </div>
        <div className="border-t border-line bg-cream px-6 py-3">
          <Countdown label="Dit aanbod verloopt over" />
        </div>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/shop"
          className="rounded-full border-2 border-ink/10 bg-card px-6 py-3 font-bold transition-all hover:border-pink hover:text-pink-deep"
        >
          Verder shoppen
        </Link>
        <Link href="/admin" className="text-sm font-bold text-ink-soft underline hover:text-pink-deep">
          Bekijk deze bestelling in het admin-dashboard →
        </Link>
      </div>

      <p className="mt-8 text-[11px] text-ink-soft">
        Tip: deel je creatie met #thebeadsbar en maak kans op een shoptegoed van €25 💗
      </p>
    </div>
  );
}

export default function ThanksPage() {
  return (
    <Suspense>
      <ThanksInner />
    </Suspense>
  );
}
