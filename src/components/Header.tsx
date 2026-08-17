"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/lib/cart";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/shop?cat=beadable-pens", label: "Beadable Pens" },
  { href: "/shop?cat=kralen", label: "Kralen" },
  { href: "/shop?cat=diy-sets", label: "DIY Sets" },
  { href: "/shop?cat=bedels", label: "Bedels" },
];

export default function Header() {
  const { count, openCart } = useCart();
  const router = useRouter();
  const [q, setQ] = useState("");

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-card/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
        <Link href="/" className="group flex items-baseline gap-1.5" aria-label="The Beads Bar home">
          <span className="font-display text-lg italic text-ink">The</span>
          <span className="font-display text-2xl font-bold tracking-tight text-pink-deep transition-transform duration-300 group-hover:scale-105">
            Beads Bar
          </span>
          <span className="hidden text-[10px] font-bold tracking-[0.2em] text-gold sm:inline">
            BEADS · CREATE · INSPIRE
          </span>
        </Link>

        <form
          className="ml-auto hidden flex-1 max-w-xs md:block"
          onSubmit={(e) => {
            e.preventDefault();
            router.push(q ? `/shop?q=${encodeURIComponent(q)}` : "/shop");
          }}
        >
          <div className="flex items-center rounded-full border border-line bg-canvas pl-4 transition-shadow focus-within:shadow-[0_0_0_3px_rgba(240,120,168,0.2)]">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Zoek naar kralen, pens, bedels..."
              className="w-full bg-transparent py-2 text-sm outline-none placeholder:text-ink-soft"
            />
            <button
              type="submit"
              aria-label="Zoeken"
              className="gradient-cta m-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
            </button>
          </div>
        </form>

        <button
          onClick={openCart}
          className="relative ml-auto flex items-center gap-2 rounded-full border border-line bg-card px-4 py-2 text-sm font-bold transition-all hover:border-pink hover:shadow-[0_4px_14px_rgba(224,90,146,0.25)] md:ml-0"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 7h12l1.5 13.5a1 1 0 0 1-1 1.1H5.5a1 1 0 0 1-1-1.1L6 7Z" />
            <path d="M9 10V6a3 3 0 0 1 6 0v4" />
          </svg>
          Winkelwagen
          {count > 0 && (
            <span className="gradient-cta absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[11px] font-bold text-white shadow-md">
              {count}
            </span>
          )}
        </button>
      </div>

      <nav className="border-t border-line/60">
        <div className="mx-auto flex max-w-6xl items-center gap-1 overflow-x-auto px-4 py-1.5 text-[13px] font-semibold">
          {NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="whitespace-nowrap rounded-full px-3 py-1.5 text-ink-soft transition-colors hover:bg-blush hover:text-pink-deep"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/admin"
            className="ml-auto whitespace-nowrap rounded-full border border-line px-3 py-1.5 text-[11px] font-bold text-ink-soft transition-colors hover:border-pink hover:text-pink-deep"
          >
            Admin demo →
          </Link>
        </div>
      </nav>
    </header>
  );
}
