"use client";

import { useState } from "react";
import { AdminHead } from "@/components/AdminBits";

function Toggle({ on, onClick }: { on: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${on ? "bg-mint" : "bg-line"}`}
    >
      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${on ? "left-5.5" : "left-0.5"}`} />
    </button>
  );
}

export default function AdminSettingsPage() {
  const [payments, setPayments] = useState<Record<string, boolean>>({
    iDEAL: true,
    Klarna: true,
    PayPal: true,
    "Apple Pay": true,
    Creditcard: true,
  });

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6 md:p-8">
      <AdminHead title="Instellingen" sub="Verzending, betalen, pixels en bedrijfsgegevens." />

      <section className="card p-6">
        <h2 className="font-display text-lg font-medium">Verzendregels</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-line p-4">
            <p className="font-bold">Nederland</p>
            <p className="mt-1 text-sm text-ink-soft">Brievenbuspost €2,50 · gratis vanaf €15</p>
            <p className="text-[11px] text-mint">PostNL gekoppeld ✓</p>
          </div>
          <div className="rounded-2xl border border-line p-4">
            <p className="font-bold">België</p>
            <p className="mt-1 text-sm text-ink-soft">Brievenbuspost €3,50 · gratis vanaf €15</p>
            <p className="text-[11px] text-mint">PostNL België gekoppeld ✓</p>
          </div>
        </div>
      </section>

      <section className="card p-6">
        <h2 className="font-display text-lg font-medium">Betaalmethodes</h2>
        <div className="mt-4 space-y-3">
          {Object.entries(payments).map(([name, on]) => (
            <div key={name} className="flex items-center justify-between rounded-2xl border border-line px-4 py-3">
              <p className="text-sm font-bold">{name}</p>
              <Toggle on={on} onClick={() => setPayments((p) => ({ ...p, [name]: !p[name] }))} />
            </div>
          ))}
        </div>
        <p className="mt-3 text-[11px] text-ink-soft">Betalingen lopen via Mollie · uitbetaling elke werkdag.</p>
      </section>

      <section className="card p-6">
        <h2 className="font-display text-lg font-medium">Pixels & metingen</h2>
        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between rounded-2xl border border-line px-4 py-3">
            <div>
              <p className="text-sm font-bold">TikTok Pixel</p>
              <p className="text-[11px] text-ink-soft">C9A4B2E8F1</p>
            </div>
            <span className="rounded-full bg-mint/15 px-3 py-1 text-[11px] font-bold text-mint">gekoppeld ✓</span>
          </div>
          <div className="flex items-center justify-between rounded-2xl border border-line px-4 py-3">
            <div>
              <p className="text-sm font-bold">Meta Pixel</p>
              <p className="text-[11px] text-ink-soft">784512369845</p>
            </div>
            <span className="rounded-full bg-mint/15 px-3 py-1 text-[11px] font-bold text-mint">gekoppeld ✓</span>
          </div>
        </div>
        <p className="mt-3 text-[11px] text-ink-soft">
          Hierdoor weet TikTok welke video’s verkopen en kun je later gericht adverteren.
        </p>
      </section>

      <section className="card p-6">
        <h2 className="font-display text-lg font-medium">Bedrijfsgegevens</h2>
        <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
          <p><span className="text-ink-soft">Naam:</span> <span className="font-bold">The Beads Bar</span></p>
          <p><span className="text-ink-soft">KVK:</span> <span className="font-bold">93847561</span></p>
          <p><span className="text-ink-soft">BTW-id:</span> <span className="font-bold">NL004821736B29</span></p>
          <p><span className="text-ink-soft">BTW-tarief:</span> <span className="font-bold">21%</span></p>
          <p><span className="text-ink-soft">Mail:</span> <span className="font-bold">hello@thebeadsbar.nl</span></p>
          <p><span className="text-ink-soft">Uitbetaalrekening:</span> <span className="font-bold">NL•• •••• 4482</span></p>
        </div>
      </section>
    </div>
  );
}
