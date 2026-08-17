"use client";

import { useState } from "react";
import { AdminHead } from "@/components/AdminBits";
import { IconCopy } from "@/components/Icons";
import { formatPrice, PRODUCTS } from "@/lib/products";
import { pct, VIDEO_FUNNELS, type VideoFunnel } from "@/lib/stats";

export default function AdminVideosPage() {
  const [funnels, setFunnels] = useState<VideoFunnel[]>(VIDEO_FUNNELS);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [product, setProduct] = useState(PRODUCTS[0].slug);
  const [copied, setCopied] = useState<string | null>(null);

  const copyLink = (landing: string) => {
    navigator.clipboard?.writeText(`https://thebeadsbar.nl${landing}`).catch(() => {});
    setCopied(landing);
    setTimeout(() => setCopied(null), 1500);
  };

  const createFunnel = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanSlug = (slug || title).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "nieuwe-video";
    setFunnels((prev) => [
      {
        id: `v${prev.length + 1}`,
        title: title || "Nieuwe video",
        posted: "vandaag",
        landing: `/t/${cleanSlug}`,
        code: "TIKTOK15",
        views: 0,
        clicks: 0,
        addedToCart: 0,
        checkouts: 0,
        orders: 0,
        revenue: 0,
      },
      ...prev,
    ]);
    setShowForm(false);
    setTitle("");
    setSlug("");
  };

  const duplicate = (f: VideoFunnel) => {
    setFunnels((prev) => [
      { ...f, id: `v${prev.length + 1}`, title: `${f.title} (kopie)`, landing: `${f.landing}-2`, posted: "vandaag", views: 0, clicks: 0, addedToCart: 0, checkouts: 0, orders: 0, revenue: 0 },
      ...prev,
    ]);
  };

  return (
    <div className="mx-auto max-w-5xl p-6 md:p-8">
      <AdminHead
        title="TikTok-funnels"
        sub="Elke video een eigen landingspagina: zo zie je precies welke video verkoopt."
        right={
          <button onClick={() => setShowForm(!showForm)} className="btn-cta rounded-full px-5 py-2.5 text-sm font-bold">
            + Nieuwe funnel
          </button>
        }
      />

      {showForm && (
        <form onSubmit={createFunnel} className="card mb-6 space-y-3 p-6">
          <p className="microlabel">Nieuwe video koppelen</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Titel van de video"
              className="rounded-2xl border border-line bg-canvas px-4 py-3 text-sm outline-none focus:shadow-[0_0_0_3px_rgba(238,143,184,0.25)]"
            />
            <input
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="Link-naam (bijv. zomer-drop)"
              className="rounded-2xl border border-line bg-canvas px-4 py-3 text-sm outline-none focus:shadow-[0_0_0_3px_rgba(238,143,184,0.25)]"
            />
            <select
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              className="rounded-2xl border border-line bg-canvas px-4 py-3 text-sm outline-none"
            >
              {PRODUCTS.map((p) => (
                <option key={p.slug} value={p.slug}>
                  {p.name} · {formatPrice(p.price)}
                </option>
              ))}
            </select>
            <select className="rounded-2xl border border-line bg-canvas px-4 py-3 text-sm outline-none">
              <option>Code: TIKTOK15 (-15%)</option>
              <option>Code: BEADS10 (-10%)</option>
              <option>Geen code</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button type="submit" className="btn-cta rounded-full px-6 py-2.5 text-sm font-bold">
              Funnel aanmaken
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="btn-outline rounded-full px-6 py-2.5 text-sm font-bold">
              Annuleren
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {funnels.map((v) => (
          <div key={v.id} className="card p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="min-w-52">
                <p className="font-bold">{v.title}</p>
                <p className="text-[11px] text-ink-soft">
                  Geplaatst {v.posted} · code {v.code}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <code className="rounded-full bg-canvas px-3 py-1.5 text-[12px] font-bold text-pink-deep">
                  thebeadsbar.nl{v.landing}
                </code>
                <button
                  onClick={() => copyLink(v.landing)}
                  className="btn-outline flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold"
                >
                  <IconCopy size={13} /> {copied === v.landing ? "Gekopieerd ✓" : "Kopieer link"}
                </button>
                <button onClick={() => duplicate(v)} className="btn-outline rounded-full px-3 py-1.5 text-[11px] font-bold">
                  Dupliceer
                </button>
              </div>
            </div>
            {v.views > 0 ? (
              <div className="mt-4 grid grid-cols-3 gap-3 text-center sm:grid-cols-6">
                {[
                  ["Views", v.views.toLocaleString("nl-NL")],
                  ["Kliks", v.clicks.toLocaleString("nl-NL")],
                  ["Mandjes", v.addedToCart.toLocaleString("nl-NL")],
                  ["Checkouts", v.checkouts.toLocaleString("nl-NL")],
                  ["Bestellingen", v.orders.toLocaleString("nl-NL")],
                  ["Omzet", formatPrice(v.revenue)],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl bg-canvas px-2 py-2.5">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-ink-soft">{label}</p>
                    <p className="mt-0.5 text-sm font-bold">{value}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-3 rounded-2xl bg-cream px-4 py-2.5 text-[12px] font-bold text-gold">
                Nog geen cijfers: zet de link in je bio en de teller loopt vanzelf.
              </p>
            )}
            {v.orders > 0 && (
              <p className="mt-2 text-[11px] text-ink-soft">
                Conversie op kliks: <span className="font-bold text-ink">{pct(v.orders, v.clicks)}</span> ·
                gemiddelde bestelling: <span className="font-bold text-ink">{formatPrice(Math.round(v.revenue / v.orders))}</span>
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
