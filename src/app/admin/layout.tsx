"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSession } from "@/lib/auth";

const NAV = [
  { href: "/admin", label: "Overzicht", icon: "📊" },
  { href: "/admin/orders", label: "Bestellingen", icon: "📦" },
  { href: "/admin/products", label: "Producten & voorraad", icon: "🧿" },
  { href: "/admin/videos", label: "TikTok-funnels", icon: "🎬" },
  { href: "/admin/customers", label: "Klanten", icon: "💗" },
  { href: "/admin/discounts", label: "Kortingscodes", icon: "🏷️" },
  { href: "/admin/mails", label: "Mails & automatisering", icon: "💌" },
  { href: "/admin/settings", label: "Instellingen", icon: "⚙️" },
];

const MOBILE_NAV = NAV.slice(0, 4);

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { session, ready, logout } = useSession();
  const isLogin = pathname === "/admin/login";
  const authed = session?.role === "admin";

  useEffect(() => {
    if (ready && !authed && !isLogin) router.replace("/admin/login");
  }, [ready, authed, isLogin, router]);

  if (isLogin) return <>{children}</>;
  if (!ready || !authed) return <div className="min-h-screen bg-canvas" />;

  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-60 shrink-0 border-r border-line bg-card p-4 md:block">
        <Link href="/admin" className="block px-2 py-2">
          <Image src="/brand/logo-horizontal.png" alt="The Beads Bar" width={150} height={37} className="h-8 w-auto" />
        </Link>
        <p className="px-2 pb-3 text-[10px] font-bold uppercase tracking-[0.28em] text-ink-soft">
          Backoffice
        </p>
        <nav className="space-y-1">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-bold transition-colors ${
                  active ? "bg-blush text-pink-deep" : "text-ink-soft hover:bg-canvas hover:text-ink"
                }`}
              >
                <span aria-hidden>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-8 space-y-2">
          <Link
            href="/"
            className="block rounded-2xl border border-line px-3 py-2.5 text-center text-sm font-bold text-ink-soft transition-colors hover:border-pink hover:text-pink-deep"
          >
            ← Naar de shop
          </Link>
          <button
            onClick={() => {
              logout();
              router.push("/admin/login");
            }}
            className="block w-full rounded-2xl px-3 py-2 text-center text-[12px] font-bold text-ink-soft hover:text-pink-deep"
          >
            Uitloggen ({session.name})
          </button>
        </div>
      </aside>

      <div className="min-w-0 flex-1 bg-canvas pb-20 md:pb-0">{children}</div>

      {/* Mobiel: de eigenaresse werkt vanaf haar telefoon, dus een vaste tab-balk */}
      <nav className="fixed inset-x-0 bottom-0 z-40 flex justify-around border-t border-line bg-card/95 py-2 backdrop-blur-md md:hidden">
        {MOBILE_NAV.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 rounded-xl px-3 py-1 text-[10px] font-bold ${
                active ? "text-pink-deep" : "text-ink-soft"
              }`}
            >
              <span className="text-base" aria-hidden>{item.icon}</span>
              {item.label.split(" ")[0]}
            </Link>
          );
        })}
        <Link
          href="/admin/settings"
          className={`flex flex-col items-center gap-0.5 rounded-xl px-3 py-1 text-[10px] font-bold ${
            pathname === "/admin/settings" ? "text-pink-deep" : "text-ink-soft"
          }`}
        >
          <span className="text-base" aria-hidden>⚙️</span>
          Meer
        </Link>
      </nav>
    </div>
  );
}
