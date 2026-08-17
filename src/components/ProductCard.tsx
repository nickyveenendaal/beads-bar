"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";
import { useFavorites } from "@/lib/auth";
import { formatPrice, type Product } from "@/lib/products";
import BeadImage from "./BeadImage";
import { IconHeart } from "./Icons";
import Stars from "./Stars";

const BADGE_STYLES: Record<string, string> = {
  nieuw: "bg-mint text-white",
  deal: "bg-pink text-white",
  bestseller: "bg-gold text-white",
};

const BADGE_LABELS: Record<string, string> = {
  nieuw: "Nieuw",
  deal: "Deal",
  bestseller: "Bestseller",
};

export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { add } = useCart();
  const { favorites, toggle } = useFavorites();
  const isFavorite = favorites.includes(product.slug);
  const discountPct = product.compareAt
    ? Math.round((1 - product.price / product.compareAt) * 100)
    : 0;

  return (
    <div
      className="card card-hover group relative overflow-hidden"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <button
        onClick={() => toggle(product.slug)}
        aria-label={isFavorite ? "Verwijder uit favorieten" : "Bewaar als favoriet"}
        className={`absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 shadow-sm transition-colors ${
          isFavorite ? "text-pink-deep" : "text-ink-soft hover:text-pink-deep"
        }`}
      >
        <span className={isFavorite ? "heart-bounce" : ""}>
          <IconHeart size={16} filled={isFavorite} />
        </span>
      </button>

      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative overflow-hidden">
          <BeadImage
            product={product}
            className="aspect-square w-full transition-transform duration-500 ease-out group-hover:scale-105"
          />
          <span className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
            {product.badge && (
              <span
                className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] ${BADGE_STYLES[product.badge]}`}
              >
                {BADGE_LABELS[product.badge]}
              </span>
            )}
            {discountPct > 0 && (
              <span className="rounded-full bg-ink px-2.5 py-1 text-[10px] font-bold text-white">
                -{discountPct}%
              </span>
            )}
          </span>
          {product.stock <= 10 && (
            <span className="absolute bottom-3 left-3 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold text-pink-deep backdrop-blur">
              Nog {product.stock} op voorraad
            </span>
          )}
        </div>
        <div className="p-4 pb-3">
          <div className="flex items-center gap-1.5">
            <Stars rating={product.rating} />
            <span className="text-[10px] font-semibold text-ink-soft">({product.reviews})</span>
          </div>
          <h3 className="mt-1 truncate text-sm font-bold">{product.name}</h3>
          <p className="mt-0.5 text-sm">
            <span className="font-display text-base font-medium text-pink-deep">
              {formatPrice(product.price)}
            </span>
            {product.compareAt && (
              <span className="ml-2 text-[12px] text-ink-soft line-through">
                {formatPrice(product.compareAt)}
              </span>
            )}
          </p>
          {product.bulkDeal && (
            <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.08em] text-gold">
              {product.bulkDeal[0].qty} halen = {product.bulkDeal[0].discountPct}% korting
            </p>
          )}
        </div>
      </Link>
      <button
        onClick={() => add(product.slug)}
        className="btn-cta absolute bottom-16 right-3 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full text-lg font-bold opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 max-lg:translate-y-0 max-lg:opacity-100"
        aria-label={`${product.name} in winkelwagen`}
      >
        +
      </button>
    </div>
  );
}
