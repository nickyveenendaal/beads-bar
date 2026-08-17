"use client";

import { useState } from "react";
import { AdminHead } from "@/components/AdminBits";
import { formatPrice } from "@/lib/products";
import { MAIL_FLOWS, type MailFlow } from "@/lib/stats";

export default function AdminMailsPage() {
  const [flows, setFlows] = useState<MailFlow[]>(MAIL_FLOWS);
  const [preview, setPreview] = useState<string | null>("Verlaten mandje");

  const toggle = (name: string) => {
    setFlows((prev) => prev.map((f) => (f.name === name ? { ...f, active: !f.active } : f)));
  };

  const totalFlowRevenue = flows.filter((f) => f.active).reduce((s, f) => s + f.revenue, 0);

  return (
    <div className="mx-auto max-w-5xl p-6 md:p-8">
      <AdminHead
        title="Mails & automatisering"
        sub={`Automatische mails verdienen nu ${formatPrice(totalFlowRevenue)} per maand, zonder dat je er iets voor doet.`}
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="space-y-3">
          {flows.map((f) => (
            <div key={f.name} className="card p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="min-w-48">
                  <p className="font-bold">{f.name}</p>
                  <p className="text-[11px] text-ink-soft">
                    Start: {f.trigger} · {f.emails} {f.emails === 1 ? "mail" : "mails"}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => setPreview(f.name)} className="btn-outline rounded-full px-3.5 py-1.5 text-[11px] font-bold">
                    Voorbeeld
                  </button>
                  <button
                    onClick={() => toggle(f.name)}
                    className={`relative h-6 w-11 rounded-full transition-colors ${f.active ? "bg-mint" : "bg-line"}`}
                    aria-label={`${f.name} ${f.active ? "uitzetten" : "aanzetten"}`}
                  >
                    <span
                      className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${
                        f.active ? "left-5.5" : "left-0.5"
                      }`}
                    />
                  </button>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-4 gap-2 text-center">
                {[
                  ["Verstuurd", f.sent.toLocaleString("nl-NL")],
                  ["Geopend", `${f.openPct}%`],
                  ["Geklikt", `${f.clickPct}%`],
                  ["Omzet", formatPrice(f.revenue)],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl bg-canvas px-2 py-2">
                    <p className="text-[9px] font-bold uppercase tracking-wide text-ink-soft">{label}</p>
                    <p className="mt-0.5 text-sm font-bold">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="card h-fit overflow-hidden">
          <div className="border-b border-line bg-canvas px-5 py-3">
            <p className="text-[11px] font-bold text-ink-soft">Voorbeeld · {preview}</p>
          </div>
          <div className="p-5">
            <div className="rounded-2xl border border-line p-5 text-center">
              <p className="font-script text-2xl text-pink-deep">The Beads Bar</p>
              {preview === "Verlaten mandje" ? (
                <>
                  <p className="mt-3 font-display text-lg font-medium">Je mandje mist je al 💗</p>
                  <p className="mt-2 text-[12px] leading-relaxed text-ink-soft">
                    Hoi Emma, je Flower Beads Mix ligt nog klaar. Op = op, en er zijn er nog maar een
                    paar. Zullen we hem inpakken?
                  </p>
                  <span className="btn-cta mt-4 inline-block rounded-full px-6 py-2.5 text-[12px] font-bold">
                    Maak je bestelling af
                  </span>
                </>
              ) : preview === "Review-verzoek" ? (
                <>
                  <p className="mt-3 font-display text-lg font-medium">En... gelukt? ✨</p>
                  <p className="mt-2 text-[12px] leading-relaxed text-ink-soft">
                    Je kralen zijn nu een paar dagen binnen. Deel je creatie met #thebeadsbar en maak
                    kans op €25 shoptegoed.
                  </p>
                  <span className="btn-cta mt-4 inline-block rounded-full px-6 py-2.5 text-[12px] font-bold">
                    Laat een review achter
                  </span>
                </>
              ) : preview === "Restock-alert" ? (
                <>
                  <p className="mt-3 font-display text-lg font-medium">Hij is er weer 🌸</p>
                  <p className="mt-2 text-[12px] leading-relaxed text-ink-soft">
                    De Flower Beads Mix is terug op voorraad. Vorige keer was hij in 2 dagen weg,
                    dus wees er snel bij.
                  </p>
                  <span className="btn-cta mt-4 inline-block rounded-full px-6 py-2.5 text-[12px] font-bold">
                    Shop de restock
                  </span>
                </>
              ) : (
                <>
                  <p className="mt-3 font-display text-lg font-medium">Welkom bij de club 💌</p>
                  <p className="mt-2 text-[12px] leading-relaxed text-ink-soft">
                    Leuk dat je er bent! Hier is je welkomstcode voor 10% korting op je eerste
                    bestelling: <span className="font-bold text-pink-deep">BEADS10</span>
                  </p>
                  <span className="btn-cta mt-4 inline-block rounded-full px-6 py-2.5 text-[12px] font-bold">
                    Begin met shoppen
                  </span>
                </>
              )}
            </div>
            <p className="mt-3 text-[11px] text-ink-soft">
              In het echt versturen we dit automatisch via bijvoorbeeld Klaviyo of Resend.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
