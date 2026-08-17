"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import BeadImage from "@/components/BeadImage";
import { IconLock } from "@/components/Icons";
import { useCart } from "@/lib/cart";
import {
  DISCOUNT_CODES,
  findProduct,
  formatPrice,
  FREE_SHIPPING_FROM,
  SHIPPING_RATES,
} from "@/lib/products";

const GIFT_WRAP_PRICE = 195;

const PAYMENT_METHODS = [
  { id: "ideal", label: "iDEAL", note: "Meest gekozen", icon: "iD" },
  { id: "klarna", label: "Klarna", note: "Achteraf betalen", icon: "K" },
  { id: "paypal", label: "PayPal", note: "", icon: "P" },
  { id: "card", label: "Creditcard", note: "Visa / Mastercard", icon: "💳" },
];

function CheckoutInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { lines, subtotal, lineTotal, discountForLine, clear, add } = useCart();

  const [giftWrap, setGiftWrap] = useState(false);
  const [payment, setPayment] = useState("ideal");
  const [country, setCountry] = useState<"NL" | "BE">("NL");
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

  // Niet stapelbaar: de code geldt alleen op regels zónder staffelkorting.
  const codePct = appliedCode ? DISCOUNT_CODES[appliedCode] : 0;
  const eligibleSubtotal = lines.reduce(
    (sum, l) => (discountForLine(l) > 0 ? sum : sum + lineTotal(l)),
    0
  );
  const codeDiscount = Math.round((eligibleSubtotal * codePct) / 100);
  const afterDiscount = subtotal - codeDiscount;
  const shippingRate = SHIPPING_RATES[country];
  const shipping = afterDiscount >= FREE_SHIPPING_FROM ? 0 : lines.length > 0 ? shippingRate.cost : 0;
  const total = afterDiscount + shipping + (giftWrap ? GIFT_WRAP_PRICE : 0);

  const applyCode = () => {
    const code = codeInput.toUpperCase().trim();
    if (DISCOUNT_CODES[code]) {
      setAppliedCode(code);
      setCodeError(false);
    } else {
      setCodeError(true);
    }
  };

  const placeOrder = (method: string) => {
    setPlacing(true);
    // Demo: geen echte betaling. Hier zou Mollie/Stripe de betaling starten.
    const orderId = 1288 + Math.floor(Math.random() * 40);
    const order = {
      id: `#${orderId}`,
      total,
      payment: method,
      giftWrap,
      code: appliedCode,
      country,
      items: lines.map((l) => ({ slug: l.slug, qty: l.qty })),
    };
    localStorage.setItem("beads-bar-last-order", JSON.stringify(order));
    setTimeout(() => {
      clear();
      router.push("/bedankt");
    }, 1200);
  };

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="font-display mt-4 text-3xl font-medium">Je mandje is leeg</h1>
        <p className="mt-2 text-ink-soft">Eerst iets moois uitzoeken, dan afrekenen.</p>
        <Link href="/shop" className="btn-cta mt-6 inline-block rounded-full px-8 py-3 font-bold">
          Naar de shop →
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-8 text-center">
        <h1 className="font-display text-3xl font-medium">Bijna van jou</h1>
        <p className="mt-1 text-sm text-ink-soft">Eén pagina, geen account nodig. Klaar in een minuut.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
        <div className="space-y-6">
          <section className="card p-6">
            <p className="microlabel mb-3">Direct afrekenen</p>
            <button
              onClick={() => placeOrder("Apple Pay")}
              disabled={placing}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-ink py-3.5 font-bold text-white transition-transform hover:-translate-y-0.5 disabled:opacity-70"
            >
               Pay
            </button>
            <div className="my-4 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.18em] text-ink-soft">
              <span className="h-px flex-1 bg-line" /> of vul in <span className="h-px flex-1 bg-line" />
            </div>

            <h2 className="font-display text-lg font-medium">1 · Jouw gegevens</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <input placeholder="Voornaam" className="rounded-2xl border border-line bg-canvas px-4 py-3 text-sm outline-none focus:shadow-[0_0_0_3px_rgba(238,143,184,0.25)]" />
              <input placeholder="Achternaam" className="rounded-2xl border border-line bg-canvas px-4 py-3 text-sm outline-none focus:shadow-[0_0_0_3px_rgba(238,143,184,0.25)]" />
              <input placeholder="E-mailadres" className="rounded-2xl border border-line bg-canvas px-4 py-3 text-sm outline-none focus:shadow-[0_0_0_3px_rgba(238,143,184,0.25)] sm:col-span-2" />
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value as "NL" | "BE")}
                className="rounded-2xl border border-line bg-canvas px-4 py-3 text-sm outline-none"
              >
                <option value="NL">Nederland</option>
                <option value="BE">België</option>
              </select>
              <div className="grid grid-cols-2 gap-3">
                <input placeholder="Postcode" className="rounded-2xl border border-line bg-canvas px-4 py-3 text-sm outline-none focus:shadow-[0_0_0_3px_rgba(238,143,184,0.25)]" />
                <input placeholder="Huisnr." className="rounded-2xl border border-line bg-canvas px-4 py-3 text-sm outline-none focus:shadow-[0_0_0_3px_rgba(238,143,184,0.25)]" />
              </div>
            </div>
            <p className="mt-2 text-[11px] text-ink-soft">
              Straat en plaats vullen we automatisch aan. (Demo: velden zijn niet verplicht.)
            </p>
          </section>

          <section className="card p-6">
            <h2 className="font-display text-lg font-medium">2 · Betaalmethode</h2>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {PAYMENT_METHODS.map((pm) => (
                <button
                  key={pm.id}
                  onClick={() => setPayment(pm.id)}
                  className={`flex items-center gap-3 rounded-2xl border-2 px-4 py-3 text-left transition-all ${
                    payment === pm.id
                      ? "border-pink bg-blush shadow-[0_6px_18px_rgba(217,95,149,0.15)]"
                      : "border-line bg-card hover:border-pink"
                  }`}
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-canvas text-[13px] font-bold text-ink-soft">
                    {pm.icon}
                  </span>
                  <span>
                    <span className="block text-sm font-bold">{pm.label}</span>
                    {pm.note && <span className="block text-[11px] text-ink-soft">{pm.note}</span>}
                  </span>
                  {payment === pm.id && <span className="ml-auto text-pink-deep">●</span>}
                </button>
              ))}
            </div>
          </section>

          <section className="card overflow-hidden">
            <button
              onClick={() => setGiftWrap(!giftWrap)}
              className="flex w-full items-center gap-4 p-5 text-left transition-colors hover:bg-cream"
            >
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border-2 text-sm text-white transition-all ${
                  giftWrap ? "border-pink bg-pink" : "border-line bg-white"
                }`}
              >
                {giftWrap && "✓"}
              </span>
              <span className="flex-1">
                <span className="block font-bold">
                  Maak er een cadeautje van <span className="text-pink-deep">+{formatPrice(GIFT_WRAP_PRICE)}</span>
                </span>
                <span className="block text-[12px] text-ink-soft">
                  Luxe verpakking met lint en een handgeschreven kaartje.
                </span>
              </span>
            </button>
          </section>
        </div>

        <div className="space-y-4">
          <section className="card p-6">
            <h2 className="font-display text-lg font-medium">Jouw bestelling</h2>
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
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold">{p.name}</p>
                      {discountForLine(line) > 0 && (
                        <p className="text-[10px] font-bold text-mint">staffelkorting toegepast</p>
                      )}
                    </div>
                    <p className="text-sm font-bold">{formatPrice(lineTotal(line))}</p>
                  </div>
                );
              })}
              <div className="flex items-center gap-3 rounded-xl bg-cream px-3 py-2">
                <p className="flex-1 text-[12px] font-bold">Mini-zakje kralen (cadeautje)</p>
                <p className="text-[12px] font-bold text-mint">Gratis</p>
              </div>
            </div>

            <div className="mt-4 border-t border-line pt-4">
              {appliedCode ? (
                <p className="flex items-center justify-between rounded-xl bg-blush px-3 py-2 text-[12px] font-bold">
                  <span>
                    Code <span className="text-pink-deep">{appliedCode}</span> toegepast
                    {eligibleSubtotal < subtotal && (
                      <span className="block text-[10px] font-semibold text-ink-soft">
                        geldt niet op regels met staffelkorting
                      </span>
                    )}
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
                      className="min-w-0 flex-1 rounded-full border border-line bg-canvas px-4 py-2 text-sm outline-none focus:shadow-[0_0_0_3px_rgba(238,143,184,0.25)]"
                    />
                    <button
                      onClick={applyCode}
                      className="btn-outline rounded-full px-4 py-2 text-sm font-bold"
                    >
                      Toepassen
                    </button>
                  </div>
                  {codeError && (
                    <p className="mt-1.5 text-[11px] font-bold text-pink-deep">Deze code is niet geldig.</p>
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
                <span className="text-ink-soft">{shippingRate.label}</span>
                <span className={`font-bold ${shipping === 0 ? "text-mint" : ""}`}>
                  {shipping === 0 ? "Gratis" : formatPrice(shipping)}
                </span>
              </p>
              {shipping > 0 && (
                <p className="text-[11px] text-ink-soft">
                  Nog {formatPrice(FREE_SHIPPING_FROM - afterDiscount)} tot gratis verzending
                </p>
              )}
              <p className="flex justify-between border-t border-line pt-2 text-base">
                <span className="font-bold">Totaal</span>
                <span className="font-display text-xl font-medium text-pink-deep">{formatPrice(total)}</span>
              </p>
            </div>

            <button
              onClick={() => placeOrder(PAYMENT_METHODS.find((m) => m.id === payment)?.label ?? "iDEAL")}
              disabled={placing}
              className="btn-cta mt-5 w-full rounded-full py-4 font-bold disabled:opacity-70"
            >
              {placing ? "Bestelling plaatsen..." : `Bestellen en betalen · ${formatPrice(total)}`}
            </button>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[11px] text-ink-soft">
              <IconLock size={12} /> Veilig betalen · 30 dagen retour · 4,9★ uit 1.214 reviews
            </p>
          </section>

          <button
            onClick={() => add("mystery-beads-bag", 1, { silent: true })}
            disabled={lines.some((l) => l.slug === "mystery-beads-bag")}
            className="card card-hover w-full p-4 text-left disabled:opacity-50"
          >
            <p className="text-sm font-bold">
              Last-minute: Mystery Beads Bag <span className="text-pink-deep">€2,50</span>{" "}
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
