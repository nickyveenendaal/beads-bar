import CountUp from "@/components/CountUp";
import { formatPrice } from "@/lib/products";
import {
  compact,
  LAST_14_DAYS,
  LOW_STOCK,
  pct,
  RECENT_ORDERS,
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
          <stop offset="0%" stopColor="#f078a8" />
          <stop offset="100%" stopColor="#ffd6e4" />
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
              fill={isTop ? "#e05a92" : "url(#barGrad)"}
            >
              <animate attributeName="height" from="0" to={h} dur="0.8s" fill="freeze" />
              <animate attributeName="y" from={H} to={H - h} dur="0.8s" fill="freeze" />
            </rect>
            {isTop && (
              <text x={x + (bw - 16) / 2} y={H - h - 8} textAnchor="middle" fontSize="11" fontWeight="700" fill="#e05a92">
                {formatPrice(d.revenue)}
              </text>
            )}
            <text x={x + (bw - 16) / 2} y={H + 18} textAnchor="middle" fontSize="9" fill="#8a6f66">
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

const STATUS_STYLE: Record<string, string> = {
  nieuw: "bg-blush text-pink-deep",
  verzonden: "bg-cream text-gold",
  afgeleverd: "bg-mint/15 text-mint",
};

export default function AdminDashboard() {
  const today = LAST_14_DAYS.at(-1)!;
  const week = LAST_14_DAYS.slice(-7);
  const weekRevenue = week.reduce((s, d) => s + d.revenue, 0);
  const weekOrders = week.reduce((s, d) => s + d.orders, 0);
  const weekVisitors = week.reduce((s, d) => s + d.visitors, 0);
  const aov = Math.round(weekRevenue / weekOrders);
  const conversion = ((weekOrders / weekVisitors) * 100).toFixed(1);

  const kpis = [
    { label: "Omzet vandaag", value: today.revenue, format: "euro" as const, sub: `${today.orders} bestellingen`, delta: "+12% vs vorige zondag" },
    { label: "Omzet deze week", value: weekRevenue, format: "euro" as const, sub: `${weekOrders} bestellingen`, delta: "+34% vs vorige week" },
    { label: "Gem. bestelwaarde", value: aov, format: "euro" as const, sub: "doel: €12,50", delta: "+€1,10 door staffels" },
    { label: "Conversie", value: Number(conversion.replace(",", ".")) * 10, format: "conv" as const, sub: `${compact(weekVisitors)} bezoekers deze week`, delta: "TikTok-funnel: 6,4%" },
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-6 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold">Goedemiddag ✨</h1>
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
        {kpis.map((kpi, i) => (
          <div key={kpi.label} className="card card-hover p-5" style={{ animationDelay: `${i * 80}ms` }}>
            <p className="text-[11px] font-bold uppercase tracking-wider text-ink-soft">{kpi.label}</p>
            <p className="font-display mt-2 text-3xl font-bold">
              {kpi.format === "euro" ? (
                <CountUp value={kpi.value} format="euro" />
              ) : (
                <>
                  {conversion.replace(".", ",")}
                  <span className="text-xl">%</span>
                </>
              )}
            </p>
            <p className="mt-1 text-[12px] text-ink-soft">{kpi.sub}</p>
            <p className="mt-2 inline-block rounded-full bg-mint/15 px-2.5 py-1 text-[10px] font-bold text-mint">
              ↑ {kpi.delta}
            </p>
          </div>
        ))}
      </div>

      <div className="card p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl font-bold">Omzet per dag</h2>
          <span className="text-[11px] font-bold text-ink-soft">Laatste 14 dagen</span>
        </div>
        <RevenueChart />
        <p className="mt-2 text-center text-[11px] text-ink-soft">
          De piek van 14 augustus kwam door de “POV: je maakt je eigen pen”-video (412k views).
        </p>
      </div>

      <div className="card p-6">
        <div className="mb-1 flex items-center justify-between">
          <h2 className="font-display text-xl font-bold">TikTok-funnels 🎬</h2>
          <span className="text-[11px] font-bold text-ink-soft">per video, van view tot bestelling</span>
        </div>
        <p className="mb-5 text-[12px] text-ink-soft">
          Elke video linkt naar z’n eigen landingspagina, dus je ziet precies welke video verkoopt.
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
                  <p className="font-display text-lg font-bold text-pink-deep">{formatPrice(v.revenue)}</p>
                  <p className="text-[11px] text-ink-soft">
                    {v.orders} bestellingen · conversie op kliks: {pct(v.orders, v.clicks)}
                  </p>
                </div>
              </div>
              <div className="space-y-1.5">
                <FunnelBar label="Views" value={v.views} total={v.views} color="#f9c1d4" />
                <FunnelBar label="Kliks op link" value={v.clicks} total={v.views} color="#f7a8c4" />
                <FunnelBar label="In winkelwagen" value={v.addedToCart} total={v.views} color="#f078a8" />
                <FunnelBar label="Checkout gestart" value={v.checkouts} total={v.views} color="#e05a92" />
                <FunnelBar label="Besteld" value={v.orders} total={v.views} color="#d9a441" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="card p-6">
          <h2 className="font-display mb-4 text-xl font-bold">Recente bestellingen</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-line text-[10px] font-bold uppercase tracking-wider text-ink-soft">
                  <th className="pb-2 pr-3">Bestelling</th>
                  <th className="pb-2 pr-3">Inhoud</th>
                  <th className="pb-2 pr-3">Bron</th>
                  <th className="pb-2 pr-3">Totaal</th>
                  <th className="pb-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {RECENT_ORDERS.map((o) => (
                  <tr key={o.id} className="border-b border-line/50 transition-colors hover:bg-blush/40">
                    <td className="py-2.5 pr-3">
                      <p className="font-bold">{o.id}</p>
                      <p className="text-[11px] text-ink-soft">
                        {o.customer} · {o.place} · {o.when}
                      </p>
                    </td>
                    <td className="max-w-44 truncate py-2.5 pr-3 text-[12px]">{o.items}</td>
                    <td className="py-2.5 pr-3">
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${o.source.startsWith("TikTok") ? "bg-ink text-white" : "bg-canvas text-ink-soft"}`}>
                        {o.source}
                      </span>
                    </td>
                    <td className="py-2.5 pr-3 font-bold">{formatPrice(o.total)}</td>
                    <td className="py-2.5">
                      <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${STATUS_STYLE[o.status]}`}>
                        {o.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card p-6">
            <h2 className="font-display mb-3 text-xl font-bold">Voorraad-alerts 🔔</h2>
            <div className="space-y-2.5">
              {LOW_STOCK.map((s) => (
                <div key={s.product} className="flex items-center justify-between rounded-2xl bg-blush/60 px-3.5 py-2.5">
                  <div>
                    <p className="text-[13px] font-bold">{s.product}</p>
                    <p className="text-[11px] text-ink-soft">op in ±{s.daysLeft} dagen</p>
                  </div>
                  <span className="font-display text-lg font-bold text-pink-deep">{s.stock}</span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-[11px] text-ink-soft">
              Tip: kondig de restock aan op TikTok. Restock-video’s converteren hier het best.
            </p>
          </div>

          <div className="card p-6">
            <h2 className="font-display mb-3 text-xl font-bold">Wat werkt 💡</h2>
            <ul className="space-y-2 text-[12px] leading-relaxed text-ink-soft">
              <li>• <span className="font-bold text-ink">Staffelkorting</span> tilt de gemiddelde bestelling van €8,43 naar €9,53</li>
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
