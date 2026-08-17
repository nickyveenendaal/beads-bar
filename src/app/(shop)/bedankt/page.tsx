"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import BeadImage from "@/components/BeadImage";
import Countdown from "@/components/Countdown";
import { findProduct, formatPrice } from "@/lib/products";

const CONFETTI_COLORS = ["#ee8fb8", "#c9a24a", "#f6c3d3", "#bfe3d2", "#d3c6ee"];

function Confetti() {
  const [pieces, setPieces] = useState<
    { left: number; delay: number; duration: number; color: string; size: number }[]
  >([]);
  useEffect(() => {
    // Confetti pas in de browser strooien (echte willekeur kan niet op de server)
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

type LastOrder = { id: string; total: number; payment: string };

const UPSELL_SLUG = "gold-charm-mix";
const UPSELL_DISCOUNT = 30;

export default function ThanksPage() {
  const [order, setOrder] = useState<LastOrder | null>(null);
  const [upsellTaken, setUpsellTaken] = useState(false);
  const upsell = findProduct(UPSELL_SLUG)!;
  const upsellPrice = Math.round(upsell.price * (1 - UPSELL_DISCOUNT / 100));

  useEffect(() => {
    try {
      const raw = localStorage.getItem("beads-bar-last-order");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setOrder(JSON.parse(raw));
    } catch {
      // geen order gevonden: pagina blijft algemeen
    }
  }, []);

  return (
    <div className="relative mx-auto max-w-2xl px-4 py-16 text-center">
      <Confetti />
      <div className="pop-in mx-auto w-36" aria-hidden>
        <Image src="/brand/mascot-4.png" alt="" width={144} height={139} className="drop-shadow-lg" />
      </div>
      <h1 className="font-display mt-5 text-4xl font-medium">
        Gelukt! Je bestelling is <span className="italic text-pink-deep">binnen</span>
      </h1>
      <p className="mt-3 text-ink-soft">
        {order ? (
          <>
            Bestelling <span className="font-bold text-ink">{order.id}</span> ·{" "}
            <span className="font-bold text-ink">{formatPrice(order.total)}</span> betaald via{" "}
            {order.payment}.{" "}
          </>
        ) : (
          <>We hebben je betaling ontvangen. </>
        )}
        Je krijgt zo een bevestiging per mail. Voor 15:00 besteld, dus hij gaat{" "}
        <span className="font-bold text-ink">vandaag nog</span> op de post.
      </p>

      <div className="card mt-10 overflow-hidden text-left">
        <div className="bg-pink px-6 py-3 text-center text-[11px] font-bold uppercase tracking-[0.2em] text-white">
          Alleen nu · gaat mee in dezelfde doos
        </div>
        <div className="flex flex-col items-center gap-5 p-6 sm:flex-row">
          <div className="h-28 w-28 shrink-0 overflow-hidden rounded-2xl">
            <BeadImage product={upsell} className="h-full w-full" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <p className="font-display text-xl font-medium">{upsell.name}</p>
            <p className="mt-1 text-sm text-ink-soft">
              Maakt je nieuwe creaties af. Eenmalig{" "}
              <span className="font-bold text-pink-deep">-{UPSELL_DISCOUNT}%</span> omdat er geen
              extra verzending nodig is. Je betaalt via de link in je bevestigingsmail.
            </p>
            <p className="mt-2">
              <span className="font-display text-2xl font-medium text-pink-deep">{formatPrice(upsellPrice)}</span>
              <span className="ml-2 text-sm text-ink-soft line-through">{formatPrice(upsell.price)}</span>
            </p>
          </div>
          <div className="text-center">
            {upsellTaken ? (
              <p className="rounded-full bg-mint/15 px-5 py-3 text-sm font-bold text-mint">
                Toegevoegd ✓<br />
                <span className="text-[11px] font-semibold">betaallink staat in je mail</span>
              </p>
            ) : (
              <button
                onClick={() => setUpsellTaken(true)}
                className="btn-cta rounded-full px-6 py-3 text-sm font-bold"
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
        <Link href="/shop" className="btn-outline rounded-full px-6 py-3 font-bold">
          Verder shoppen
        </Link>
        <Link href="/account" className="text-sm font-bold text-ink-soft underline hover:text-pink-deep">
          Volg je bestelling in je account →
        </Link>
      </div>

      <p className="mt-8 text-[11px] text-ink-soft">
        Deel je creatie met #thebeadsbar en maak kans op een shoptegoed van €25
      </p>
    </div>
  );
}
