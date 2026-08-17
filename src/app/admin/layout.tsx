import Link from "next/link";

const NAV = [
  { label: "Overzicht", icon: "📊", active: true },
  { label: "Bestellingen", icon: "📦" },
  { label: "Producten & voorraad", icon: "🫧" },
  { label: "TikTok-video's", icon: "🎬" },
  { label: "Klanten", icon: "💗" },
  { label: "Kortingscodes", icon: "🏷️" },
  { label: "Mails & automatisering", icon: "💌" },
  { label: "Instellingen", icon: "⚙️" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-60 shrink-0 border-r border-line bg-card p-4 md:block">
        <Link href="/" className="flex items-baseline gap-1.5 px-2 py-2">
          <span className="font-display text-base italic">The</span>
          <span className="font-display text-lg font-bold text-pink-deep">Beads Bar</span>
        </Link>
        <p className="px-2 pb-3 text-[10px] font-bold uppercase tracking-widest text-ink-soft">
          Backoffice
        </p>
        <nav className="space-y-1">
          {NAV.map((item) => (
            <div
              key={item.label}
              className={`flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-bold ${
                item.active
                  ? "bg-blush text-pink-deep"
                  : "cursor-default text-ink-soft/70"
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
              {!item.active && (
                <span className="ml-auto rounded-full bg-canvas px-2 py-0.5 text-[9px] uppercase tracking-wide">
                  demo
                </span>
              )}
            </div>
          ))}
        </nav>
        <Link
          href="/"
          className="mt-8 block rounded-2xl border border-line px-3 py-2.5 text-center text-sm font-bold text-ink-soft transition-colors hover:border-pink hover:text-pink-deep"
        >
          ← Terug naar de shop
        </Link>
      </aside>
      <div className="min-w-0 flex-1 bg-canvas">{children}</div>
    </div>
  );
}
