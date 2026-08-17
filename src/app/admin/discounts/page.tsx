"use client";

import { useState } from "react";
import { AdminHead } from "@/components/AdminBits";
import { formatPrice } from "@/lib/products";
import { ADMIN_DISCOUNTS, type AdminDiscount } from "@/lib/stats";

export default function AdminDiscountsPage() {
  const [discounts, setDiscounts] = useState<AdminDiscount[]>(ADMIN_DISCOUNTS);
  const [showForm, setShowForm] = useState(false);
  const [code, setCode] = useState("");
  const [value, setValue] = useState("10");

  const toggle = (codeName: string) => {
    setDiscounts((prev) => prev.map((d) => (d.code === codeName ? { ...d, active: !d.active } : d)));
  };

  const create = (e: React.FormEvent) => {
    e.preventDefault();
    setDiscounts((prev) => [
      {
        code: code.toUpperCase() || "NIEUW",
        type: "percentage",
        value: Number(value) || 10,
        minOrder: 0,
        used: 0,
        revenue: 0,
        stackable: false,
        active: true,
      },
      ...prev,
    ]);
    setShowForm(false);
    setCode("");
  };

  return (
    <div className="mx-auto max-w-5xl p-6 md:p-8">
      <AdminHead
        title="Kortingscodes"
        sub="Eén code per bestelling, nooit stapelbaar met staffelkorting: dat dwingt de checkout af."
        right={
          <button onClick={() => setShowForm(!showForm)} className="btn-cta rounded-full px-5 py-2.5 text-sm font-bold">
            + Nieuwe code
          </button>
        }
      />

      {showForm && (
        <form onSubmit={create} className="card mb-6 flex flex-wrap items-end gap-3 p-6">
          <div>
            <p className="microlabel mb-1.5">Code</p>
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="BIJV. HERFST20"
              className="rounded-2xl border border-line bg-canvas px-4 py-3 text-sm font-bold uppercase outline-none focus:shadow-[0_0_0_3px_rgba(238,143,184,0.25)]"
            />
          </div>
          <div>
            <p className="microlabel mb-1.5">Korting %</p>
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-24 rounded-2xl border border-line bg-canvas px-4 py-3 text-sm font-bold outline-none"
            />
          </div>
          <button type="submit" className="btn-cta rounded-full px-6 py-3 text-sm font-bold">
            Aanmaken
          </button>
        </form>
      )}

      <div className="card overflow-x-auto">
        <table className="w-full min-w-175 text-left text-sm">
          <thead>
            <tr className="border-b border-line text-[10px] font-bold uppercase tracking-wider text-ink-soft">
              <th className="p-4">Code</th>
              <th className="p-4">Type</th>
              <th className="p-4">Min. bestelling</th>
              <th className="p-4">Gebruikt</th>
              <th className="p-4">Omzet via code</th>
              <th className="p-4">Gekoppeld aan</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {discounts.map((d) => (
              <tr key={d.code} className="border-b border-line/50 transition-colors hover:bg-blush/30">
                <td className="p-4">
                  <p className="font-bold tracking-wide text-pink-deep">{d.code}</p>
                  {d.ends && <p className="text-[11px] text-ink-soft">{d.ends}</p>}
                </td>
                <td className="p-4">
                  {d.type === "percentage" ? `-${d.value}%` : d.type === "vast" ? `-${formatPrice(d.value)}` : "gratis verzending"}
                </td>
                <td className="p-4 text-ink-soft">{d.minOrder > 0 ? formatPrice(d.minOrder) : "—"}</td>
                <td className="p-4 font-bold">
                  {d.used}
                  {d.limit ? ` / ${d.limit}` : ""}
                </td>
                <td className="p-4 font-bold">{formatPrice(d.revenue)}</td>
                <td className="p-4 text-[12px] text-ink-soft">{d.linkedFunnel ?? "—"}</td>
                <td className="p-4">
                  <button
                    onClick={() => toggle(d.code)}
                    className={`relative h-6 w-11 rounded-full transition-colors ${d.active ? "bg-mint" : "bg-line"}`}
                    aria-label={`${d.code} ${d.active ? "uitzetten" : "aanzetten"}`}
                  >
                    <span
                      className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${
                        d.active ? "left-5.5" : "left-0.5"
                      }`}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
