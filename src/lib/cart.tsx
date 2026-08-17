"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { findProduct, FREE_SHIPPING_FROM, type Product } from "./products";

export type CartLine = { slug: string; qty: number };

type CartContextValue = {
  lines: CartLine[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  add: (slug: string, qty?: number, opts?: { silent?: boolean }) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  discountForLine: (line: CartLine) => number;
  lineTotal: (line: CartLine) => number;
  toFreeShipping: number;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "beads-bar-cart";

// Staffelkorting per regel: hoogste trede die gehaald wordt.
function lineDiscountPct(product: Product | undefined, qty: number): number {
  if (!product?.bulkDeal) return 0;
  let best = 0;
  for (const tier of product.bulkDeal) {
    if (qty >= tier.qty) best = Math.max(best, tier.discountPct);
  }
  return best;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      // Mandje mag pas na het laden uit de browser-opslag komen (anders
      // verschilt de server-render van de browser).
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setLines(JSON.parse(raw));
    } catch {
      // leeg mandje bij kapotte data
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, loaded]);

  const add = useCallback((slug: string, qty = 1, opts?: { silent?: boolean }) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.slug === slug);
      if (existing) {
        return prev.map((l) => (l.slug === slug ? { ...l, qty: l.qty + qty } : l));
      }
      return [...prev, { slug, qty }];
    });
    if (!opts?.silent) setIsOpen(true);
  }, []);

  const remove = useCallback((slug: string) => {
    setLines((prev) => prev.filter((l) => l.slug !== slug));
  }, []);

  const setQty = useCallback((slug: string, qty: number) => {
    setLines((prev) =>
      qty <= 0 ? prev.filter((l) => l.slug !== slug) : prev.map((l) => (l.slug === slug ? { ...l, qty } : l))
    );
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<CartContextValue>(() => {
    const discountForLine = (line: CartLine) => {
      const product = findProduct(line.slug);
      if (!product) return 0;
      const pctOff = lineDiscountPct(product, line.qty);
      return Math.round((product.price * line.qty * pctOff) / 100);
    };
    const lineTotal = (line: CartLine) => {
      const product = findProduct(line.slug);
      if (!product) return 0;
      return product.price * line.qty - discountForLine(line);
    };
    const subtotal = lines.reduce((sum, l) => sum + lineTotal(l), 0);
    const count = lines.reduce((sum, l) => sum + l.qty, 0);
    return {
      lines,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      add,
      remove,
      setQty,
      clear,
      count,
      subtotal,
      discountForLine,
      lineTotal,
      toFreeShipping: Math.max(0, FREE_SHIPPING_FROM - subtotal),
    };
  }, [lines, isOpen, add, remove, setQty, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart moet binnen CartProvider gebruikt worden");
  return ctx;
}
