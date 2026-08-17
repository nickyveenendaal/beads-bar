"use client";

// Demo-inlog: sessie in de browser-opslag. In de echte shop wordt dit
// Supabase-auth met beveiligde rollen; de flow is alvast dezelfde.

import { useCallback, useEffect, useState } from "react";

export type Session = { role: "klant" | "admin"; name: string; email: string };

const KEY = "beads-bar-session";

export function readSession(): Session | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}

export function useSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSession(readSession());
    setReady(true);
    // Alle useSession-instanties (header, layout, pagina) syncen mee
    const onChange = () => setSession(readSession());
    window.addEventListener("beads-session", onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener("beads-session", onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  const login = useCallback((s: Session) => {
    localStorage.setItem(KEY, JSON.stringify(s));
    setSession(s);
    window.dispatchEvent(new Event("beads-session"));
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(KEY);
    setSession(null);
    window.dispatchEvent(new Event("beads-session"));
  }, []);

  return { session, ready, login, logout };
}

// Favorieten (wishlist) in browser-opslag, gedeeld tussen kaarten en account.
const FAV_KEY = "beads-bar-favorites";

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(FAV_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setFavorites(JSON.parse(raw));
    } catch {
      // dan geen favorieten
    }
    const onChange = (e: StorageEvent | Event) => {
      if ("key" in e && e.key !== FAV_KEY) return;
      try {
        setFavorites(JSON.parse(localStorage.getItem(FAV_KEY) ?? "[]"));
      } catch {
        setFavorites([]);
      }
    };
    window.addEventListener("storage", onChange);
    window.addEventListener("beads-favorites", onChange);
    return () => {
      window.removeEventListener("storage", onChange);
      window.removeEventListener("beads-favorites", onChange);
    };
  }, []);

  const toggle = useCallback((slug: string) => {
    setFavorites((prev) => {
      const next = prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug];
      localStorage.setItem(FAV_KEY, JSON.stringify(next));
      window.dispatchEvent(new Event("beads-favorites"));
      return next;
    });
  }, []);

  return { favorites, toggle };
}
