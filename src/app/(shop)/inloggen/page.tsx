"use client";

import Image from "next/image";
import { asset } from "@/lib/asset";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSession } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useSession();
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);

  const doLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const name = email.split("@")[0] || "Emma";
    const pretty = name.charAt(0).toUpperCase() + name.slice(1);
    login({ role: "klant", name: pretty, email: email || "emma@demo.nl" });
    setTimeout(() => router.push("/account"), 400);
  };

  return (
    <div className="mx-auto max-w-md px-4 py-14">
      <div className="card overflow-hidden">
        <div className="gradient-animated px-6 pb-4 pt-7 text-center">
          <Image src={asset("/brand/mascot-1.png")} alt="" width={110} height={105} className="mx-auto drop-shadow" aria-hidden />
          <h1 className="font-display mt-2 text-3xl font-medium">Welkom terug</h1>
          <p className="mt-1 text-sm text-ink-soft">
            Log in voor je bestellingen, favorieten en sneller afrekenen.
          </p>
        </div>
        <form onSubmit={doLogin} className="space-y-3 p-6">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mailadres"
            className="w-full rounded-full border border-line bg-canvas px-5 py-3 text-sm outline-none focus:shadow-[0_0_0_3px_rgba(238,143,184,0.25)]"
          />
          <input
            type="password"
            placeholder="Wachtwoord"
            className="w-full rounded-full border border-line bg-canvas px-5 py-3 text-sm outline-none focus:shadow-[0_0_0_3px_rgba(238,143,184,0.25)]"
          />
          <button type="submit" disabled={busy} className="btn-cta w-full rounded-full py-3.5 font-bold disabled:opacity-70">
            {busy ? "Inloggen..." : "Inloggen"}
          </button>
          <p className="text-center text-[11px] text-ink-soft">
            Demo: elk e-mailadres werkt, wachtwoord mag je verzinnen.
          </p>
          <div className="border-t border-line pt-3 text-center text-[12px] text-ink-soft">
            Nog geen account? Die maak je vanzelf bij je eerste bestelling.
          </div>
        </form>
      </div>
      <p className="mt-6 text-center text-[11px] text-ink-soft">
        Medewerker?{" "}
        <Link href="/admin/login" className="font-bold underline hover:text-pink-deep">
          Log in op de beheeromgeving
        </Link>
      </p>
    </div>
  );
}
