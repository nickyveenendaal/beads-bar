"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import BeadImage from "@/components/BeadImage";
import { useCart } from "@/lib/cart";
import { DISCOUNT_CODES, findProduct, formatPrice, FREE_SHIPPING_FROM } from "@/lib/products";

const GIFT_WRAP_PRICE = 195;

function ReservationTimer() {
  const [left, setLeft] = useState(10 * 60);
  useEffect(() => {
    const id = setInterval(() => setLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, []);
  const m = Math.floor(left / 60);
  const s = String(left % 60).padStart(2, "0");
  return (
    <div className="flex items-center justify-center gap-2 rounded-2xl bg-blush px-4 py-2.5 text-[12px] font-bold">
      <span className="pulse-dot h-2 w-2 rounded-full bg-pink-deep" />
      Je mandje is nog{" "}
      <span className="font-display text-base tabular-nums text-pink-deep">
        {m}:{s}
      </span>{" "}
      gereserveerd
    </div>
  );
}

const PAYMENT_METHODS = [
  { id: "ideal", label: "iDEAL", note: "Meest gekozen", icon: "🏦" },
  { id: "klarna", label: "Klarna", note: "Achteraf betalen", icon: "🛍️" },
  { id: "paypal", label: "PayPal", note: "", icon: "💙" },
  { id: "card", label: "Creditcard", note: "Visa / Mastercard", icon: "💳" },
];

function CheckoutInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { lines, subtotal, lineTotal, clear, add } = useCart();

  const [giftWrap, setGiftWrap] = useState(false);
  const [payment, setPayment] = useState("ideal");
  const [codeInput, setCodeInput] = useState("");
  const [appliedCode, setAppliedCode] = useState<string | null>(null);
  const [codeError, setCodeError] = useState(false);
  const [placing, setPlacing] = useState(false);

  // Kortingscode uit de funnel-link (bijv. /checkout?code=TIKTOK15)
  useEffect(() => {
    const fromUrl = searchParams.get("code")?.toUpperCase();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (fromUrl && DISCOUNT_CODES[fromUrl]) setAppliedCode(fromUrl);
  }, [searchParams]);

  const codePct = appliedCode ? DISCOUNT_CODES[appliedCode] : 0;
  const codeDiscount = Math.round((subtotal * codePct) / 100);
  const shipping = subtotal >= FREE_SHIPPING_FROM ? 0 : subtotal > 0 ? 395 : 0;
  const total = subtotal - codeDiscount + shipping + (giftWrap ? GIFT_WRAP_PRICE : 0);

  const applyCode = () => {
    const code = codeInput.toUpperCase().trim();
    if (DISCOUNT_CODES[code]) {
      setAppliedCode(code);
      setCodeError(false);
    } else {
      setCodeError(true);
    }
  };

  const placeOrder = () => {
    setPlacing(true);
    // Demo: geen echte betaling. Hier zou iDEAL/Mollie/Stripe starten.
    setTimeout(() => {
      clear();
      router.push(`/bedankt?total=${total}&payment=${payment}`);
    }, 1400);
  };

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <p className="text-5xl">🫧</p>
        <h1 className="font-display mt-4 text-3xl font-bold">Je mandje is leeg</h1>
        <p className="mt-2 text-ink-soft">Eerst iets moois uitzoeken, dan afrekenen.</p>
        <Link
          href="/shop"
          className="gradient-cta btn-cta mt-6 inline-block rounded-full px-8 py-3 font-bold text-white"
        >
          Naar de shop →
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-6 text-center">
        <h1 className="font-display text-3xl font-bold">Bijna van jou ✨</h1>
        <p className="mt-1 text-sm text-ink-soft">Eén pagina, geen gedoe. Klaar in 1 minuut.</p>
      </div>

      <div className="mx-auto mb-8 max-w-sm">
        <ReservationTimer />
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
        <div className="space-y-6">
          <section className="card p-6">
            <h2 className="font-display text-lg font-bold">1 · Jouw gegevens</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <input placeholder="Voornaam" className="rounded-2xl border border-line bg-canvas px-4 py-3 text-sm outline-none focus:shadow-[0_0_0_3px_rgba(240,120,168,0.2)]" />
              <input placeholder="Achternaam" className="rounded-2xl border border-line bg-canvas px-4 py-3 text-sm outline-none focus:shadow-[0_0_0_3px_rgba(240,120,168,0.2)]" />
              <input placeholder="E-mailadres" className="rounded-2xl border border-line bg-canvas px-4 py-3 text-sm outline-none focus:shadow-[0_0_0_3px_rgba(240,120,168,0.2)] sm:col-span-2" />
              <input placeholder="Postcode" className="rounded-2xl border border-line bg-canvas px-4 py-3 text-sm outline-none focus:shadow-[0_0_0_3px_rgba(240,120,168,0.2)]" />
              <input placeholder="Huisnummer" className="rounded-2xl border border-line bg-canvas px-4 py-3 text-sm outline-none focus:shadow-[0_0_0_3px_rgba(240,120,168,0.2)]" />
            </div>
            <p className="mt-2 text-[11px] text-ink-soft">
              Straat en plaats vullen we automatisch in. (Demo: velden zijn niet verplicht.)
            </p>
          </section>

          <section className="card p-6">
            <h2 className="font-display text-lg font-bold">2 · Betaalmethode</h2>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {PAYMENT_METHODS.map((pm) => (
                <button
                  key={pm.id}
                  onClick={() => setPayment(pm.id)}
                  className={`flex items-center gap-3 rounded-2xl border-2 px-4 py-3 text-left transition-all ${
                    payment === pm.id
                      ? "border-pink-deep bg-blush shadow-[0_6px_18px_rgba(224,90,146,0.2)]"
                      : "border-line bg-card hover:border-pink"
                  }`}
                >
                  <span className="text-xl">{pm.icon}</span>
                  <span>
                    <span className="block text-sm font-bold">{pm.label}</span>
                    {pm.note && <span className="block text-[11px] text-ink-soft">{pm.note}</span>}
                  </span>
                  {payment === pm.id && <span className="ml-auto text-pink-deep">●</span>}
                </button>
              ))}
            </div>
          </section>

          <section className="card overflow-hidden border-2 border-dashed border-gold/60">
            <button
              onClick={() => setGiftWrap(!giftWrap)}
              className="flex w-full items-center gap-4 p-5 text-left transition-colors hover:bg-cream"
            >
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border-2 text-sm text-white transition-all ${
                  giftWrap ? "border-gold bg-gold" : "border-line bg-white"
                }`}
              >
                {giftWrap && "✓"}
              </span>
              <span className="flex-1">
                <span className="block font-bold">
                  🎀 Maak er een cadeautje van <span className="text-gold">+{formatPrice(GIFT_WRAP_PRICE)}</span>
                </span>
                <span className="block text-[12px] text-ink-soft">
                  Luxe cadeauverpakking met lint en een handgeschreven kaartje. 1 op de 3 klanten kiest dit.
                </span>
              </span>
            </button>
          </section>
        </div>

        <div className="space-y-4">
          <section className="card p-6">
            <h2 className="font-display text-lg font-bold">Jouw bestelling</h2>
            <div className="mt-4 space-y-3">
              {lines.map((line) => {
                const p = findProduct(line.slug);
                if (!p) return null;
                return (
                  <div key={line.slug} className="flex items-center gap-3">
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl">
                      <BeadImage product={p} className="h-full w-full" />
                      <span className="absolute -right-0 -top-0 flex h-5 w-5 items-center justify-center rounded-full bg-ink text-[10px] font-bold text-white">
                        {line.qty}
                      </span>
                    </div>
                    <p className="min-w-0 flex-1 truncate text-sm font-bold">{p.name}</p>
                    <p className="text-sm font-bold">{formatPrice(lineTotal(line))}</p>
                  </div>
                );
              })}
              <div className="flex items-center gap-3 rounded-xl bg-cream px-3 py-2">
                <span className="text-lg">🎁</span>
                <p className="flex-1 text-[12px] font-bold">Mini-zakje kralen (cadeautje)</p>
                <p className="text-[12px] font-bold text-mint">Gratis</p>
              </div>
            </div>

            <div className="mt-4 border-t border-line pt-4">
              {appliedCode ? (
                <p className="flex items-center justify-between rounded-xl bg-blush px-3 py-2 text-[12px] font-bold">
                  <span>
                    Code <span className="text-pink-deep">{appliedCode}</span> toegepast 🎉
                  </span>
                  <button onClick={() => setAppliedCode(null)} className="text-ink-soft underline">
                    weghalen
                  </button>
                </p>
              ) : (
                <div>
                  <div className="flex gap-2">
                    <input
                      value={codeInput}
                      onChange={(e) => setCodeInput(e.target.value)}
                      placeholder="Kortingscode"
                      className="min-w-0 flex-1 rounded-full border border-line bg-canvas px-4 py-2 text-sm outline-none focus:shadow-[0_0_0_3px_rgba(240,120,168,0.2)]"
                    />
                    <button
                      onClick={applyCode}
                      className="rounded-full border-2 border-ink px-4 py-2 text-sm font-bold transition-colors hover:bg-ink hover:text-white"
                    >
                      Toepassen
                    </button>
                  </div>
                  {codeError && (
                    <p className="mt-1.5 text-[11px] font-bold text-pink-deep">
                      Die code kennen we niet. Probeer BEADS10 😉
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="mt-4 space-y-1.5 border-t border-line pt-4 text-sm">
              <p className="flex justify-between">
                <span className="text-ink-soft">Subtotaal</span>
                <span className="font-bold">{formatPrice(subtotal)}</span>
              </p>
              {codeDiscount > 0 && (
                <p className="flex justify-between text-pink-deep">
                  <span>Korting ({appliedCode})</span>
                  <span className="font-bold">-{formatPrice(codeDiscount)}</span>
                </p>
              )}
              {giftWrap && (
                <p className="flex justify-between">
                  <span className="text-ink-soft">Cadeauverpakking</span>
                  <span className="font-bold">{formatPrice(GIFT_WRAP_PRICE)}</span>
                </p>
              )}
              <p className="flex justify-between">
                <span className="text-ink-soft">Verzending</span>
                <span className={`font-bold ${shipping === 0 ? "text-mint" : ""}`}>
                  {shipping === 0 ? "Gratis 🎉" : formatPrice(shipping)}
                </span>
              </p>
              <p className="flex justify-between border-t border-line pt-2 text-base">
                <span className="font-bold">Totaal</span>
                <span className="font-display text-xl font-bold text-pink-deep">{formatPrice(total)}</span>
              </p>
            </div>

            <button
              onClick={placeOrder}
              disabled={placing}
              className="gradient-cta btn-cta mt-5 w-full rounded-full py-4 font-bold text-white disabled:opacity-70"
            >
              {placing ? "Bestelling plaatsen..." : `Bestellen en betalen · ${formatPrice(total)}`}
            </button>
            <p className="mt-3 text-center text-[11px] text-ink-soft">
              🔒 Veilig betalen · 30 dagen retour · 4,9★ uit 1.214 reviews
            </p>
          </section>

          <button
            onClick={() => add("mystery-beads-bag", 1, { silent: true })}
            disabled={lines.some((l) => l.slug === "mystery-beads-bag")}
            className="card card-hover w-full p-4 text-left disabled:opacity-50"
          >
            <p className="text-sm font-bold">
              ✨ Last-minute: Mystery Beads Bag <span className="text-pink-deep">€2,50</span>{" "}
              <span className="text-[11px] text-ink-soft line-through">€5,00</span>
            </p>
            <p className="mt-0.5 text-[11px] text-ink-soft">
              Alleen hier op de checkout. Tik om toe te voegen, waarde minimaal het dubbele.
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense>
      <CheckoutInner />
    </Suspense>
  );
}
