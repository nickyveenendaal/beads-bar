"use client";

import { useState } from "react";
import { AdminHead, SourceBadge, StatusBadge } from "@/components/AdminBits";
import { formatPrice } from "@/lib/products";
import { ADMIN_ORDERS, type AdminOrder } from "@/lib/stats";

const FLOW: AdminOrder["status"][] = ["nieuw", "verpakt", "verzonden", "afgeleverd"];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState(ADMIN_ORDERS);
  const [filter, setFilter] = useState<string>("alle");
  const [open, setOpen] = useState<string | null>(null);

  const shown = orders.filter((o) => filter === "alle" || o.status === filter);
  const newCount = orders.filter((o) => o.status === "nieuw").length;

  const advance = (id: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== id) return o;
        const next = FLOW[Math.min(FLOW.indexOf(o.status) + 1, FLOW.length - 1)];
        return {
          ...o,
          status: next,
          trackTrace: next === "verzonden" && !o.trackTrace ? `3SBEAD${Math.floor(8834800 + Math.random() * 900)}` : o.trackTrace,
        };
      })
    );
  };

  const shipAllNew = () => {
    setOrders((prev) =>
      prev.map((o) =>
        o.status === "nieuw" || o.status === "verpakt"
          ? { ...o, status: "verzonden", trackTrace: o.trackTrace ?? `3SBEAD${Math.floor(8834800 + Math.random() * 900)}` }
          : o
      )
    );
  };

  return (
    <div className="mx-auto max-w-5xl p-6 md:p-8">
      <AdminHead
        title="Bestellingen"
        sub={`${orders.length} bestellingen · ${newCount} nieuw`}
        right={
          <button onClick={shipAllNew} className="btn-cta rounded-full px-5 py-2.5 text-sm font-bold">
            Markeer alles als verzonden
          </button>
        }
      />

      <div className="mb-4 flex flex-wrap gap-2">
        {["alle", ...FLOW].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-1.5 text-[12px] font-bold capitalize transition-all ${
              filter === f ? "bg-pink text-white shadow-sm" : "border border-line bg-card text-ink-soft hover:border-pink"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {shown.map((o) => (
          <div key={o.id} className="card overflow-hidden">
            <button
              onClick={() => setOpen(open === o.id ? null : o.id)}
              className="flex w-full flex-wrap items-center gap-3 p-4 text-left transition-colors hover:bg-blush/30"
            >
              <div className="min-w-36">
                <p className="font-bold">{o.id}</p>
                <p className="text-[11px] text-ink-soft">{o.when}</p>
              </div>
              <div className="min-w-40 flex-1">
                <p className="text-sm font-bold">{o.customer}</p>
                <p className="text-[11px] text-ink-soft">{o.place} ({o.country})</p>
              </div>
              <SourceBadge source={o.source} />
              <span className="font-bold">{formatPrice(o.total)}</span>
              <StatusBadge status={o.status} />
              <span className="text-ink-soft">{open === o.id ? "▴" : "▾"}</span>
            </button>

            {open === o.id && (
              <div className="border-t border-line bg-canvas/60 p-5">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <p className="microlabel mb-2">Bestelde producten</p>
                    <div className="space-y-1.5">
                      {o.lines.map((l) => (
                        <p key={l.name} className="flex justify-between text-sm">
                          <span>{l.qty}× {l.name}</span>
                          <span className="font-bold">{formatPrice(l.price)}</span>
                        </p>
                      ))}
                      {o.discount && (
                        <p className="flex justify-between text-sm text-pink-deep">
                          <span>Korting ({o.discount.code})</span>
                          <span className="font-bold">-{formatPrice(o.discount.amount)}</span>
                        </p>
                      )}
                      <p className="flex justify-between text-sm">
                        <span>Verzending</span>
                        <span className="font-bold">{o.shipping === 0 ? "Gratis" : formatPrice(o.shipping)}</span>
                      </p>
                      <p className="flex justify-between border-t border-line pt-1.5 text-sm font-bold">
                        <span>Totaal · {o.payment}</span>
                        <span>{formatPrice(o.total)}</span>
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="microlabel mb-2">Klant & verzending</p>
                    <p className="text-sm">{o.customer} · <span className="text-ink-soft">{o.email}</span></p>
                    <p className="text-sm text-ink-soft">{o.place}, {o.country === "NL" ? "Nederland" : "België"}</p>
                    <p className="mt-2 text-sm">
                      Track &amp; Trace:{" "}
                      {o.trackTrace ? (
                        <span className="font-bold text-pink-deep">{o.trackTrace}</span>
                      ) : (
                        <span className="text-ink-soft">wordt aangemaakt bij verzenden</span>
                      )}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {o.status !== "afgeleverd" && (
                        <button onClick={() => advance(o.id)} className="btn-cta rounded-full px-4 py-2 text-[12px] font-bold">
                          {o.status === "nieuw" ? "Markeer als verpakt" : o.status === "verpakt" ? "Markeer als verzonden" : "Markeer als afgeleverd"}
                        </button>
                      )}
                      <button onClick={() => window.print()} className="btn-outline rounded-full px-4 py-2 text-[12px] font-bold">
                        Print pakbon
                      </button>
                      <button className="btn-outline rounded-full px-4 py-2 text-[12px] font-bold">
                        Verzendlabel (PostNL)
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <p className="mt-4 text-[11px] text-ink-soft">
        Demo: statuswijzigingen gelden tot je de pagina ververst. In het echt zit hier de koppeling met PostNL/MyParcel.
      </p>
    </div>
  );
}
