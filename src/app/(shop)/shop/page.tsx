"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import ProductCard from "@/components/ProductCard";
import { CATEGORIES, PRODUCTS } from "@/lib/products";

// Client-side filteren zodat de hele shop statisch te hosten is.
function ShopInner() {
  const searchParams = useSearchParams();
  const cat = searchParams.get("cat") ?? undefined;
  const q = searchParams.get("q") ?? undefined;
  const query = q?.toLowerCase().trim();

  let items = PRODUCTS;
  if (cat) items = items.filter((p) => p.category === cat);
  if (query)
    items = items.filter(
      (p) => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query)
    );

  const activeCat = CATEGORIES.find((c) => c.slug === cat);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="rise-in text-center">
        <p className="microlabel">♥ Shop ♥</p>
        <h1 className="font-display mt-2 text-4xl font-medium">
          {activeCat ? activeCat.name : query ? `Zoeken: “${q}”` : "Alle producten"}
        </h1>
        <p className="mt-1 text-sm text-ink-soft">
          {items.length} {items.length === 1 ? "product" : "producten"} · gratis verzending vanaf €15
        </p>
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <Link
          href="/shop"
          className={`rounded-full border px-4 py-1.5 text-[13px] font-bold transition-all ${
            !cat
              ? "border-transparent bg-pink text-white shadow-md"
              : "border-line bg-card text-ink-soft hover:border-pink hover:text-pink-deep"
          }`}
        >
          Alles
        </Link>
        {CATEGORIES.map((c) => (
          <Link
            key={c.slug}
            href={`/shop?cat=${c.slug}`}
            className={`rounded-full border px-4 py-1.5 text-[13px] font-bold transition-all ${
              cat === c.slug
                ? "border-transparent bg-pink text-white shadow-md"
                : "border-line bg-card text-ink-soft hover:border-pink hover:text-pink-deep"
            }`}
          >
            {c.name}
          </Link>
        ))}
      </div>

      {items.length === 0 ? (
        <div className="py-20 text-center">
          <p className="font-bold">Niks gevonden</p>
          <p className="mt-1 text-sm text-ink-soft">Probeer een andere zoekterm of categorie.</p>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {items.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense>
      <ShopInner />
    </Suspense>
  );
}
