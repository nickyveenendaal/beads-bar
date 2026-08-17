"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import BeadImage from "@/components/BeadImage";
import ProductCard from "@/components/ProductCard";
import { useFavorites, useSession } from "@/lib/auth";
import { useCart } from "@/lib/cart";
import { findProduct, formatPrice } from "@/lib/products";

// Bestelgeschiedenis van de demo-klant. De bovenste komt uit je eigen
// demo-checkout zodra je iets "besteld" hebt.
const HISTORY = [
  {
    id: "#1201",
    date: "29 juli 2026",
    status: "Afgeleverd",
    total: 1185,
    trackTrace: "3SBEAD8821004",
    items: [
      { slug: "acryl-flower-beads-mix", qty: 2 },
      { slug: "gold-charm-mix", qty: 1 },
    ],
  },
  {
    id: "#1148",
    date: "14 juli 2026",
    status: "Afgeleverd",
    total: 495,
    trackTrace: "3SBEAD8809913",
    items: [{ slug: "beadable-pen-pink-bow", qty: 1 }],
  },
];

type LastOrder = { id: string; total: number; items: { slug: string; qty: number }[] };

function AccountInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { session, ready, logout } = useSession();
  const { favorites } = useFavorites();
  const { add } = useCart();
  const [tab, setTab] = useState(searchParams.get("tab") === "favorieten" ? "favorieten" : "bestellingen");
  const [lastOrder, setLastOrder] = useState<LastOrder | null>(null);
  const [reordered, setReordered] = useState<string | null>(null);

  useEffect(() => {
    if (ready && !session) router.replace("/inloggen");
  }, [ready, session, router]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("beads-bar-last-order");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setLastOrder(JSON.parse(raw));
    } catch {
      // geen demo-bestelling geplaatst
    }
  }, []);

  if (!ready || !session) return <div className="py-24" />;

  const orders = [
    ...(lastOrder
      ? [{ id: lastOrder.id, date: "vandaag", status: "Nieuw", total: lastOrder.total, trackTrace: undefined as string | undefined, items: lastOrder.items }]
      : []),
    ...HISTORY,
  ];

  const reorder = (orderId: string, items: { slug: string; qty: number }[]) => {
    for (const item of items) add(item.slug, item.qty, { silent: true });
    setReordered(orderId);
    setTimeout(() => setReordered(null), 2000);
  };

  const favProducts = favorites.map((slug) => findProduct(slug)).filter(Boolean);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-medium">Hoi {session.name}</h1>
          <p className="mt-1 text-sm text-ink-soft">{session.email}</p>
        </div>
        <button onClick={() => { logout(); router.push("/"); }} className="btn-outline rounded-full px-5 py-2 text-sm font-bold">
          Uitloggen
        </button>
      </div>

      <div className="mt-6 flex gap-2">
        {[
          { id: "bestellingen", label: "Bestellingen" },
          { id: "favorieten", label: `Favorieten (${favorites.length})` },
          { id: "gegevens", label: "Gegevens" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`rounded-full px-5 py-2 text-sm font-bold transition-all ${
              tab === t.id ? "bg-pink text-white shadow-sm" : "btn-outline"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "bestellingen" && (
        <div className="mt-6 space-y-4">
          {orders.map((o) => (
            <div key={o.id} className="card p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-bold">
                    {o.id} <span className="ml-2 text-[12px] font-semibold text-ink-soft">{o.date}</span>
                  </p>
                  <p className="mt-0.5 text-[12px]">
                    <span className={`rounded-full px-2.5 py-0.5 font-bold ${o.status === "Afgeleverd" ? "bg-mint/15 text-mint" : "bg-blush text-pink-deep"}`}>
                      {o.status}
                    </span>
                    {o.trackTrace && (
                      <span className="ml-2 text-ink-soft">
                        Track &amp; Trace: <span className="font-bold text-ink">{o.trackTrace}</span>
                      </span>
                    )}
                  </p>
                </div>
                <p className="font-display text-lg font-medium">{formatPrice(o.total)}</p>
              </div>
              <div className="mt-3 flex items-center gap-2">
                {o.items.map((item) => {
                  const p = findProduct(item.slug);
                  if (!p) return null;
                  return (
                    <Link key={item.slug} href={`/product/${p.slug}`} className="relative h-14 w-14 overflow-hidden rounded-xl">
                      <BeadImage product={p} className="h-full w-full" />
                      {item.qty > 1 && (
                        <span className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-ink text-[9px] font-bold text-white">
                          {item.qty}
                        </span>
                      )}
                    </Link>
                  );
                })}
                <button
                  onClick={() => reorder(o.id, o.items)}
                  className="btn-cta ml-auto rounded-full px-5 py-2 text-sm font-bold"
                >
                  {reordered === o.id ? "In je mandje ✓" : "Bestel opnieuw"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "favorieten" &&
        (favProducts.length === 0 ? (
          <div className="mt-10 text-center">
            <p className="font-bold">Nog geen favorieten</p>
            <p className="mt-1 text-sm text-ink-soft">Tik op het hartje bij een product om hem hier te bewaren.</p>
            <Link href="/shop" className="btn-cta mt-4 inline-block rounded-full px-6 py-2.5 text-sm font-bold">
              Naar de shop
            </Link>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
            {favProducts.map((p, i) => (
              <ProductCard key={p!.slug} product={p!} index={i} />
            ))}
          </div>
        ))}

      {tab === "gegevens" && (
        <div className="card mt-6 max-w-lg p-6">
          <div className="grid gap-3 sm:grid-cols-2">
            <input defaultValue={session.name} className="rounded-2xl border border-line bg-canvas px-4 py-3 text-sm outline-none" />
            <input defaultValue={session.email} className="rounded-2xl border border-line bg-canvas px-4 py-3 text-sm outline-none" />
            <input placeholder="Straat + huisnummer" className="rounded-2xl border border-line bg-canvas px-4 py-3 text-sm outline-none" />
            <input placeholder="Postcode + plaats" className="rounded-2xl border border-line bg-canvas px-4 py-3 text-sm outline-none" />
          </div>
          <button className="btn-cta mt-4 rounded-full px-6 py-2.5 text-sm font-bold">Opslaan</button>
          <p className="mt-3 text-[11px] text-ink-soft">Demo: wijzigingen worden niet echt bewaard.</p>
        </div>
      )}
    </div>
  );
}

export default function AccountPage() {
  return (
    <Suspense>
      <AccountInner />
    </Suspense>
  );
}
