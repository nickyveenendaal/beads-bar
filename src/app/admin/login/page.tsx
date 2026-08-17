"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSession } from "@/lib/auth";

export default function AdminLoginPage() {
  const router = useRouter();
  const { login } = useSession();
  const [email, setEmail] = useState("admin@thebeadsbar.nl");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const doLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    login({ role: "admin", name: "Eigenaar", email });
    setTimeout(() => router.push("/admin"), 400);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas px-4">
      <div className="w-full max-w-sm">
        <div className="card p-8 text-center">
          <Image src="/brand/badge.png" alt="The Beads Bar" width={84} height={84} className="mx-auto" />
          <h1 className="font-display mt-4 text-2xl font-medium">Beheeromgeving</h1>
          <p className="mt-1 text-[13px] text-ink-soft">Alleen voor medewerkers.</p>
          <form onSubmit={doLogin} className="mt-6 space-y-3 text-left">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mailadres"
              className="w-full rounded-2xl border border-line bg-canvas px-4 py-3 text-sm outline-none focus:shadow-[0_0_0_3px_rgba(238,143,184,0.25)]"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Wachtwoord"
              className="w-full rounded-2xl border border-line bg-canvas px-4 py-3 text-sm outline-none focus:shadow-[0_0_0_3px_rgba(238,143,184,0.25)]"
            />
            <button type="submit" disabled={busy} className="btn-cta w-full rounded-full py-3 font-bold disabled:opacity-70">
              {busy ? "Inloggen..." : "Inloggen"}
            </button>
          </form>
          <p className="mt-4 text-[11px] text-ink-soft">
            Demo: druk gewoon op inloggen (wachtwoord mag leeg).
            <br />
            In het echt: tweestapsverificatie verplicht.
          </p>
        </div>
        <p className="mt-5 text-center text-[12px] text-ink-soft">
          <Link href="/" className="underline hover:text-pink-deep">← Terug naar de shop</Link>
        </p>
      </div>
    </div>
  );
}
