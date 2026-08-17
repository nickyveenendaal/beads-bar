import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { CATEGORIES, PRODUCTS } from "@/lib/products";

export const metadata = { title: "Shop" };

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string; q?: string }>;
}) {
  const { cat, q } = await searchParams;
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
        <h1 className="font-display text-4xl font-medium">
          {activeCat ? activeCat.name : query ? `Zoeken: "${q}"` : "Alle producten"}
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
              ? "bg-pink border-transparent text-white shadow-sm"
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
                ? "bg-pink border-transparent text-white shadow-sm"
                : "border-line bg-card text-ink-soft hover:border-pink hover:text-pink-deep"
            }`}
          >
            {c.name}
          </Link>
        ))}
      </div>

      {items.length === 0 ? (
        <div className="py-20 text-center">
                    <p className="mt-3 font-bold">Niks gevonden</p>
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
