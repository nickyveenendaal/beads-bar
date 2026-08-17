"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { useCart } from "@/lib/cart";
import { useSession } from "@/lib/auth";
import { IconCart, IconHeart, IconSearch, IconUser } from "./Icons";

const NAV = [
  { href: "/", label: "Home", match: (p: string) => p === "/" },
  { href: "/shop", label: "Shop", match: (p: string, c: string | null) => p === "/shop" && !c },
  { href: "/shop?cat=beadable-pens", label: "Beadable Pens", match: (p: string, c: string | null) => c === "beadable-pens" },
  { href: "/shop?cat=kralen", label: "Kralen", match: (p: string, c: string | null) => c === "kralen" },
  { href: "/shop?cat=diy-sets", label: "DIY Sets", match: (p: string, c: string | null) => c === "diy-sets" },
  { href: "/shop?cat=bedels", label: "Bedels", match: (p: string, c: string | null) => c === "bedels" },
  { href: "/shop?cat=armbanden", label: "Armbanden", match: (p: string, c: string | null) => c === "armbanden" },
];

function PillNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const cat = searchParams.get("cat");
  return (
    <nav className="bg-blush-deep/60">
      <div className="mx-auto flex max-w-6xl items-center justify-start gap-1 overflow-x-auto px-4 py-1.5 md:justify-center">
        {NAV.map((item) => {
          const active = item.match(pathname, cat);
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`whitespace-nowrap rounded-full px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.14em] transition-all duration-300 ${
                active ? "bg-pink text-white shadow-sm" : "text-ink-soft hover:bg-white/70 hover:text-pink-deep"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

function CartButton() {
  const { count, openCart } = useCart();
  const [pop, setPop] = useState(false);
  const prev = useRef(count);
  useEffect(() => {
    if (count > prev.current) {
      setPop(true);
      const id = setTimeout(() => setPop(false), 350);
      return () => clearTimeout(id);
    }
    prev.current = count;
  }, [count]);
  return (
    <button
      onClick={openCart}
      className="relative flex flex-col items-center gap-0.5 text-ink transition-colors hover:text-pink-deep"
      aria-label="Winkelwagen openen"
    >
      <IconCart size={22} />
      <span className="hidden text-[10px] font-bold text-ink-soft sm:block">Winkelwagen</span>
      {count > 0 && (
        <span
          className={`absolute -right-2 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-pink px-1 text-[11px] font-bold text-white shadow-sm ${
            pop ? "badge-pop" : ""
          }`}
        >
          {count}
        </span>
      )}
    </button>
  );
}

function HeaderInner() {
  const router = useRouter();
  const { session } = useSession();
  const [q, setQ] = useState("");

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-card/95 backdrop-blur-md">
      <div className="mx-auto grid max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 py-3">
        <form
          className="hidden max-w-60 md:block"
          onSubmit={(e) => {
            e.preventDefault();
            router.push(q ? `/shop?q=${encodeURIComponent(q)}` : "/shop");
          }}
        >
          <div className="flex items-center rounded-full border border-line bg-canvas pl-4 transition-shadow focus-within:shadow-[0_0_0_3px_rgba(238,143,184,0.25)]">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Zoek naar kralen, pens, bedels..."
              className="w-full bg-transparent py-2 text-[13px] outline-none placeholder:text-ink-soft"
            />
            <button
              type="submit"
              aria-label="Zoeken"
              className="btn-cta m-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
            >
              <IconSearch size={13} />
            </button>
          </div>
        </form>
        <span className="md:hidden" />

        <Link href="/" className="justify-self-center text-center" aria-label="The Beads Bar home">
          <Image
            src="/brand/logo-horizontal.png"
            alt="The Beads Bar"
            width={216}
            height={53}
            priority
            className="h-10 w-auto transition-transform duration-300 hover:scale-[1.03] md:h-[46px]"
          />
          <span className="mt-0.5 hidden text-[9px] font-bold uppercase tracking-[0.3em] text-gold md:block">
            Beads · Create · Inspire
          </span>
        </Link>

        <div className="flex items-center gap-5 justify-self-end">
          <Link
            href={session ? "/account" : "/inloggen"}
            className="flex flex-col items-center gap-0.5 text-ink transition-colors hover:text-pink-deep"
          >
            <IconUser size={22} />
            <span className="hidden text-[10px] font-bold text-ink-soft sm:block">
              {session && session.role === "klant" ? session.name.split(" ")[0] : "Account"}
            </span>
          </Link>
          <Link
            href="/account?tab=favorieten"
            className="hidden flex-col items-center gap-0.5 text-ink transition-colors hover:text-pink-deep sm:flex"
          >
            <IconHeart size={22} />
            <span className="text-[10px] font-bold text-ink-soft">Favorieten</span>
          </Link>
          <CartButton />
        </div>
      </div>
      <PillNav />
    </header>
  );
}

export default function Header() {
  return (
    <Suspense
      fallback={<header className="sticky top-0 z-40 h-[108px] border-b border-line bg-card/95" />}
    >
      <HeaderInner />
    </Suspense>
  );
}
