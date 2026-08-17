import Link from "next/link";
import { SourceBadge, StatusBadge } from "@/components/AdminBits";
import CountUp from "@/components/CountUp";
import { formatPrice } from "@/lib/products";
import {
  ADMIN_ORDERS,
  compact,
  LAST_14_DAYS,
  LOW_STOCK,
  pct,
  PERIOD,
  SOURCES,
  VIDEO_FUNNELS,
} from "@/lib/stats";

export const metadata = { title: "Admin · Overzicht" };

function RevenueChart() {
  const max = Math.max(...LAST_14_DAYS.map((d) => d.revenue));
  const W = 720;
  const H = 180;
  const bw = W / LAST_14_DAYS.length;
  return (
    <svg viewBox={`0 0 ${W} ${H + 30}`} className="w-full">
      <defs>
        <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ee8fb8" />
          <stop offset="100%" stopColor="#f9d6e2" />
        </linearGradient>
      </defs>
      {LAST_14_DAYS.map((d, i) => {
        const h = Math.round((d.revenue / max) * (H - 20));
        const x = Math.round(i * bw + 8);
        const isTop = d.revenue === max;
        return (
          <g key={d.day}>
            <rect
              x={x}
              y={H - h}
              width={Math.round(bw - 16)}
              height={h}
              rx={10}
              fill={isTop ? "#d95f95" : "url(#barGrad)"}
            >
              <animate attributeName="height" from="0" to={h} dur="0.8s" fill="freeze" />
              <animate attributeName="y" from={H} to={H - h} dur="0.8s" fill="freeze" />
            </rect>
            {isTop && (
              <text x={x + (bw - 16) / 2} y={H - h - 8} textAnchor="middle" fontSize="11" fontWeight="700" fill="#d95f95">
                {formatPrice(d.revenue)}
              </text>
            )}
            <text x={x + (bw - 16) / 2} y={H + 18} textAnchor="middle" fontSize="9" fill="#99806f">
              {d.day.replace(" aug", "")}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function FunnelBar({ label, value, total, color }: { label: string; value: number; total: number; color: string }) {
  const width = Math.max(2, (value / total) * 100);
  return (
    <div className="flex items-center gap-3">
      <span className="w-28 shrink-0 text-[11px] font-bold text-ink-soft">{label}</span>
      <div className="h-5 flex-1 overflow-hidden rounded-full bg-canvas">
        <div
          className="progress-fill flex h-full items-center rounded-full pl-2 text-[10px] font-bold text-white"
          style={{ width: `${width}%`, background: color }}
        >
          {compact(value)}
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const today = LAST_14_DAYS.at(-1)!;
  const week = LAST_14_DAYS.slice(-7);
  const weekRevenue = week.reduce((s, d) => s + d.revenue, 0);
  const weekOrders = week.reduce((s, d) => s + d.orders, 0);
  const weekVisitors = week.reduce((s, d) => s + d.visitors, 0);
  const aov = Math.round(PERIOD.revenue / PERIOD.orders);
  const conversion = ((weekOrders / weekVisitors) * 100).toLocaleString("nl-NL", { maximumFractionDigits: 1 });

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-6 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-medium">Goedemiddag ✨</h1>
          <p className="mt-1 text-sm text-ink-soft">
            Zondag 17 augustus · <span className="pulse-dot mx-1 inline-block h-2 w-2 rounded-full bg-mint align-middle" />
            <span className="font-bold text-mint">23 mensen nu in de shop</span>
          </p>
        </div>
        <span className="rounded-full border border-line bg-card px-4 py-2 text-[11px] font-bold text-ink-soft">
          Demo-dashboard met voorbeeldcijfers
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card card-hover p-5">
          <p className="microlabel">Omzet vandaag</p>
          <p className="font-display mt-2 text-3xl font-medium"><CountUp value={today.revenue} format="euro" /></p>
          <p className="mt-1 text-[12px] text-ink-soft">{today.orders} bestellingen</p>
          <p className="mt-2 inline-block rounded-full bg-mint/15 px-2.5 py-1 text-[10px] font-bold text-mint">↑ +12% vs vorige zondag</p>
        </div>
        <div className="card card-hover p-5">
          <p className="microlabel">Omzet deze week</p>
          <p className="font-display mt-2 text-3xl font-medium"><CountUp value={weekRevenue} format="euro" /></p>
          <p className="mt-1 text-[12px] text-ink-soft">{weekOrders} bestellingen</p>
          <p className="mt-2 inline-block rounded-full bg-mint/15 px-2.5 py-1 text-[10px] font-bold text-mint">↑ +34% vs vorige week</p>
        </div>
        <div className="card card-hover p-5">
          <p className="microlabel">Gem. bestelwaarde</p>
          <p className="font-display mt-2 text-3xl font-medium"><CountUp value={aov} format="euro" /></p>
          <p className="mt-1 text-[12px] text-ink-soft">doel: €12,50</p>
          <p className="mt-2 inline-block rounded-full bg-mint/15 px-2.5 py-1 text-[10px] font-bold text-mint">↑ +€0,91 door staffels</p>
        </div>
        <div className="card card-hover p-5">
          <p className="microlabel">Conversie</p>
          <p className="font-display mt-2 text-3xl font-medium">{conversion}<span className="text-xl">%</span></p>
          <p className="mt-1 text-[12px] text-ink-soft">{compact(weekVisitors)} bezoekers deze week</p>
          <p className="mt-2 inline-block rounded-full bg-mint/15 px-2.5 py-1 text-[10px] font-bold text-mint">↑ funnel-pagina&apos;s: 4,6%</p>
        </div>
      </div>

      <div className="card p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl font-medium">Omzet per dag</h2>
          <span className="text-[11px] font-bold text-ink-soft">Laatste 14 dagen · totaal {formatPrice(PERIOD.revenue)}</span>
        </div>
        <RevenueChart />
        <p className="mt-2 text-center text-[11px] text-ink-soft">
          De piek van 14 augustus kwam door de “POV: je maakt je eigen pen”-video (82k views).
        </p>
      </div>

      <div className="card p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl font-medium">Waar komt de omzet vandaan?</h2>
          <span className="text-[11px] font-bold text-ink-soft">laatste 14 dagen</span>
        </div>
        <div className="space-y-2.5">
          {SOURCES.map((s) => (
            <div key={s.source} className="flex items-center gap-3">
              <span className="w-32 shrink-0 text-[12px] font-bold">{s.source}</span>
              <div className="h-5 flex-1 overflow-hidden rounded-full bg-canvas">
                <div
                  className="progress-fill flex h-full items-center rounded-full bg-pink pl-2 text-[10px] font-bold text-white"
                  style={{ width: `${(s.orders / PERIOD.orders) * 100}%` }}
                >
                  {s.orders}
                </div>
              </div>
              <span className="w-20 text-right text-[12px] font-bold">{formatPrice(s.revenue)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card p-6">
        <div className="mb-1 flex items-center justify-between">
          <h2 className="font-display text-xl font-medium">TikTok-funnels</h2>
          <Link href="/admin/videos" className="text-[12px] font-bold text-pink-deep hover:underline">
            Beheer funnels →
          </Link>
        </div>
        <p className="mb-5 text-[12px] text-ink-soft">
          Per video, van view tot bestelling. Samen goed voor {pct(363, PERIOD.orders)} van alle bestellingen.
        </p>
        <div className="space-y-6">
          {VIDEO_FUNNELS.map((v) => (
            <div key={v.id} className="rounded-2xl border border-line p-4">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-sm font-bold">{v.title}</p>
                  <p className="text-[11px] text-ink-soft">
                    Geplaatst {v.posted} · landingspagina{" "}
                    <span className="font-bold text-pink-deep">{v.landing}</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-display text-lg font-medium text-pink-deep">{formatPrice(v.revenue)}</p>
                  <p className="text-[11px] text-ink-soft">
                    {v.orders} bestellingen · conversie op kliks: {pct(v.orders, v.clicks)}
                  </p>
                </div>
              </div>
              <div className="space-y-1.5">
                <FunnelBar label="Views" value={v.views} total={v.views} color="#f6c3d3" />
                <FunnelBar label="Kliks op link" value={v.clicks} total={v.views} color="#efa3bf" />
                <FunnelBar label="In winkelwagen" value={v.addedToCart} total={v.views} color="#e987ae" />
                <FunnelBar label="Checkout gestart" value={v.checkouts} total={v.views} color="#d95f95" />
                <FunnelBar label="Besteld" value={v.orders} total={v.views} color="#c9a24a" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-xl font-medium">Recente bestellingen</h2>
            <Link href="/admin/orders" className="text-[12px] font-bold text-pink-deep hover:underline">
              Alle bestellingen →
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-line text-[10px] font-bold uppercase tracking-wider text-ink-soft">
                  <th className="pb-2 pr-3">Bestelling</th>
                  <th className="pb-2 pr-3">Bron</th>
                  <th className="pb-2 pr-3">Totaal</th>
                  <th className="pb-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {ADMIN_ORDERS.slice(0, 6).map((o) => (
                  <tr key={o.id} className="border-b border-line/50 transition-colors hover:bg-blush/40">
                    <td className="py-2.5 pr-3">
                      <p className="font-bold">{o.id}</p>
                      <p className="text-[11px] text-ink-soft">
                        {o.customer} · {o.place} · {o.when}
                      </p>
                    </td>
                    <td className="py-2.5 pr-3"><SourceBadge source={o.source} /></td>
                    <td className="py-2.5 pr-3 font-bold">{formatPrice(o.total)}</td>
                    <td className="py-2.5"><StatusBadge status={o.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card p-6">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-display text-xl font-medium">Voorraad-alerts</h2>
              <Link href="/admin/products" className="text-[12px] font-bold text-pink-deep hover:underline">→</Link>
            </div>
            <div className="space-y-2.5">
              {LOW_STOCK.map((s) => (
                <div key={s.product} className="flex items-center justify-between rounded-2xl bg-blush/60 px-3.5 py-2.5">
                  <div>
                    <p className="text-[13px] font-bold">{s.product}</p>
                    <p className="text-[11px] text-ink-soft">op in ±{s.daysLeft} dagen</p>
                  </div>
                  <span className="font-display text-lg font-medium text-pink-deep">{s.stock}</span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-[11px] text-ink-soft">
              Tip: kondig de restock aan op TikTok. Restock-video’s converteren hier het best.
            </p>
          </div>

          <div className="card p-6">
            <h2 className="font-display mb-3 text-xl font-medium">Wat werkt</h2>
            <ul className="space-y-2 text-[12px] leading-relaxed text-ink-soft">
              <li>• <span className="font-bold text-ink">Staffelkorting</span> tilt de gemiddelde bestelling van €8,43 naar €9,34</li>
              <li>• <span className="font-bold text-ink">Cadeauverpakking</span> wordt bij 34% van de bestellingen aangevinkt</li>
              <li>• <span className="font-bold text-ink">Mystery Bag</span> op de checkout: 41% zegt ja</li>
              <li>• <span className="font-bold text-ink">TIKTOK15</span> is goed voor 61% van alle nieuwe klanten</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
