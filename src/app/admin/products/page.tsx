"use client";

import Link from "next/link";
import { useState } from "react";
import { AdminHead } from "@/components/AdminBits";
import BeadImage from "@/components/BeadImage";
import { COST_PRICES, formatPrice, PRODUCTS } from "@/lib/products";

const LOW_STOCK_THRESHOLD = 10;

export default function AdminProductsPage() {
  const [stock, setStock] = useState<Record<string, number>>(
    Object.fromEntries(PRODUCTS.map((p) => [p.slug, p.stock]))
  );

  const totalValue = PRODUCTS.reduce((s, p) => s + (stock[p.slug] ?? 0) * (COST_PRICES[p.slug] ?? 0), 0);
  const lowCount = PRODUCTS.filter((p) => (stock[p.slug] ?? 0) <= LOW_STOCK_THRESHOLD).length;

  return (
    <div className="mx-auto max-w-5xl p-6 md:p-8">
      <AdminHead
        title="Producten & voorraad"
        sub={`${PRODUCTS.length} producten · voorraadwaarde ${formatPrice(totalValue)} (inkoop) · ${lowCount} bijna op`}
        right={<button className="btn-cta rounded-full px-5 py-2.5 text-sm font-bold">+ Nieuw product</button>}
      />

      <div className="card overflow-x-auto">
        <table className="w-full min-w-175 text-left text-sm">
          <thead>
            <tr className="border-b border-line text-[10px] font-bold uppercase tracking-wider text-ink-soft">
              <th className="p-4">Product</th>
              <th className="p-4">Verkoopprijs</th>
              <th className="p-4">Inkoop</th>
              <th className="p-4">Marge</th>
              <th className="p-4">Staffel</th>
              <th className="p-4">Voorraad</th>
              <th className="p-4" />
            </tr>
          </thead>
          <tbody>
            {PRODUCTS.map((p) => {
              const cost = COST_PRICES[p.slug] ?? 0;
              const margin = Math.round(((p.price - cost) / p.price) * 100);
              const currentStock = stock[p.slug] ?? 0;
              const low = currentStock <= LOW_STOCK_THRESHOLD;
              return (
                <tr key={p.slug} className="border-b border-line/50 transition-colors hover:bg-blush/30">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 shrink-0 overflow-hidden rounded-xl">
                        <BeadImage product={p} className="h-full w-full" />
                      </div>
                      <div>
                        <p className="font-bold">{p.name}</p>
                        <p className="text-[11px] text-ink-soft">{p.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-bold">{formatPrice(p.price)}</td>
                  <td className="p-4 text-ink-soft">{formatPrice(cost)}</td>
                  <td className="p-4">
                    <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${margin >= 60 ? "bg-mint/15 text-mint" : "bg-cream text-gold"}`}>
                      {margin}%
                    </span>
                  </td>
                  <td className="p-4 text-[11px] font-bold text-gold">
                    {p.bulkDeal ? p.bulkDeal.map((t) => `${t.qty}=-${t.discountPct}%`).join(" · ") : "—"}
                  </td>
                  <td className="p-4">
                    <input
                      type="number"
                      value={currentStock}
                      onChange={(e) => setStock((prev) => ({ ...prev, [p.slug]: Math.max(0, Number(e.target.value)) }))}
                      className={`w-18 rounded-xl border px-2 py-1.5 text-center text-sm font-bold outline-none ${
                        low ? "border-pink bg-blush text-pink-deep" : "border-line bg-canvas"
                      }`}
                    />
                  </td>
                  <td className="p-4">
                    {low && (
                      <Link
                        href="/admin/videos"
                        className="whitespace-nowrap rounded-full bg-pink px-3 py-1.5 text-[11px] font-bold text-white"
                      >
                        Restock aankondigen →
                      </Link>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-[11px] text-ink-soft">
        Voorraad pas je hier direct aan (demo: tot je ververst). Onder de {LOW_STOCK_THRESHOLD} stuks kleurt het veld roze
        en toont de shop automatisch “nog X op voorraad”.
      </p>
    </div>
  );
}
