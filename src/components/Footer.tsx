import Image from "next/image";
import Link from "next/link";

const COLS = [
  {
    title: "Klantenservice",
    links: [
      { label: "Verzending & bezorging", href: "/info/verzending" },
      { label: "Retourneren", href: "/info/retourneren" },
      { label: "Veelgestelde vragen", href: "/info/veelgestelde-vragen" },
      { label: "Contact", href: "/info/contact" },
    ],
  },
  {
    title: "Informatie",
    links: [
      { label: "Algemene voorwaarden", href: "/info/voorwaarden" },
      { label: "Privacy", href: "/info/privacy" },
      { label: "Mijn account", href: "/account" },
      { label: "Beheer (demo)", href: "/admin/login" },
    ],
  },
];

const PAYMENTS = ["iDEAL", "Klarna", "PayPal", "Apple Pay", "Visa", "Mastercard"];

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-line bg-card">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Image src="/brand/logo-stacked.png" alt="The Beads Bar" width={168} height={60} className="h-14 w-auto" />
          <p className="mt-3 text-sm text-ink-soft">
            Premium kralen en beadable pens, met liefde verpakt en dezelfde werkdag verzonden.
          </p>
          <div className="mt-4 flex gap-2">
            {["TikTok", "Instagram", "Pinterest"].map((s) => (
              <span
                key={s}
                className="btn-outline cursor-pointer rounded-full px-3 py-1 text-[11px] font-bold text-ink-soft"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
        {COLS.map((col) => (
          <div key={col.title}>
            <p className="microlabel">{col.title}</p>
            <ul className="mt-3 space-y-2 text-sm">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="transition-colors hover:text-pink-deep">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <p className="microlabel">Join de Beads Club</p>
          <p className="mt-3 text-sm text-ink-soft">
            10% korting op je eerste bestelling en als eerste toegang tot restocks.
          </p>
          <div className="mt-3 flex items-center rounded-full border border-line bg-canvas pl-4">
            <input
              placeholder="Jouw e-mailadres"
              className="w-full bg-transparent py-2 text-sm outline-none placeholder:text-ink-soft"
            />
            <span className="btn-cta m-1 flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full">
              →
            </span>
          </div>
        </div>
      </div>
      <div className="border-t border-line/60 py-5">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4">
          <div className="flex flex-wrap justify-center gap-2">
            {PAYMENTS.map((p) => (
              <span
                key={p}
                className="rounded-lg border border-line bg-canvas px-2.5 py-1 text-[10px] font-bold text-ink-soft"
              >
                {p}
              </span>
            ))}
          </div>
          <p className="text-center text-[11px] text-ink-soft">
            © 2026 The Beads Bar · KVK 93847561 · BTW NL004821736B29 · Demo gebouwd door{" "}
            <Link href="https://vosna.nl" className="font-bold text-pink-deep">
              Vosna
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
