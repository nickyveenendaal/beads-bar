"use client";

import { useState } from "react";
import { AdminHead } from "@/components/AdminBits";
import { formatPrice } from "@/lib/products";
import { ADMIN_CUSTOMERS } from "@/lib/stats";

const TAG_STYLE: Record<string, string> = {
  nieuw: "bg-blush text-pink-deep",
  terugkerend: "bg-cream text-gold",
  VIP: "bg-ink text-white",
};

export default function AdminCustomersPage() {
  const [q, setQ] = useState("");
  const shown = ADMIN_CUSTOMERS.filter(
    (c) => c.name.toLowerCase().includes(q.toLowerCase()) || c.email.toLowerCase().includes(q.toLowerCase())
  );
  const returning = ADMIN_CUSTOMERS.filter((c) => c.orders > 1).length;

  return (
    <div className="mx-auto max-w-5xl p-6 md:p-8">
      <AdminHead title="Klanten" sub={`${ADMIN_CUSTOMERS.length} klanten in beeld`} />

      <div className="mb-5 grid gap-4 sm:grid-cols-3">
        <div className="card p-5">
          <p className="microlabel">Herhaalaankopen</p>
          <p className="font-display mt-1 text-2xl font-medium">
            {Math.round((returning / ADMIN_CUSTOMERS.length) * 100)}%
          </p>
          <p className="text-[11px] text-ink-soft">bestelt binnen 60 dagen opnieuw</p>
        </div>
        <div className="card p-5">
          <p className="microlabel">Gem. klantwaarde</p>
          <p className="font-display mt-1 text-2xl font-medium">
            {formatPrice(Math.round(ADMIN_CUSTOMERS.reduce((s, c) => s + c.spent, 0) / ADMIN_CUSTOMERS.length))}
          </p>
          <p className="text-[11px] text-ink-soft">totaal besteed per klant</p>
        </div>
        <div className="card p-5">
          <p className="microlabel">Mail-toestemming</p>
          <p className="font-display mt-1 text-2xl font-medium">
            {Math.round((ADMIN_CUSTOMERS.filter((c) => c.consent).length / ADMIN_CUSTOMERS.length) * 100)}%
          </p>
          <p className="text-[11px] text-ink-soft">mag je mailen (AVG)</p>
        </div>
      </div>

      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Zoek op naam of e-mailadres..."
        className="mb-4 w-full max-w-sm rounded-full border border-line bg-card px-5 py-2.5 text-sm outline-none focus:shadow-[0_0_0_3px_rgba(238,143,184,0.25)]"
      />

      <div className="card overflow-x-auto">
        <table className="w-full min-w-150 text-left text-sm">
          <thead>
            <tr className="border-b border-line text-[10px] font-bold uppercase tracking-wider text-ink-soft">
              <th className="p-4">Klant</th>
              <th className="p-4">Bestellingen</th>
              <th className="p-4">Totaal besteed</th>
              <th className="p-4">Laatste bestelling</th>
              <th className="p-4">Tag</th>
              <th className="p-4">Mail</th>
            </tr>
          </thead>
          <tbody>
            {shown.map((c) => (
              <tr key={c.email} className="border-b border-line/50 transition-colors hover:bg-blush/30">
                <td className="p-4">
                  <p className="font-bold">{c.name}</p>
                  <p className="text-[11px] text-ink-soft">{c.email} · {c.place}</p>
                </td>
                <td className="p-4 font-bold">{c.orders}</td>
                <td className="p-4 font-bold">{formatPrice(c.spent)}</td>
                <td className="p-4 text-ink-soft">{c.lastOrder}</td>
                <td className="p-4">
                  <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${TAG_STYLE[c.tag]}`}>{c.tag}</span>
                </td>
                <td className="p-4">{c.consent ? "✓" : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-[11px] text-ink-soft">
        VIP = 4+ bestellingen. Die krijgen automatisch een kaartje extra in de doos.
      </p>
    </div>
  );
}
