import Link from "next/link";

const COLS = [
  {
    title: "Klantenservice",
    links: ["Verzending & bezorging", "Retourneren", "Veelgestelde vragen", "Contact"],
  },
  {
    title: "Informatie",
    links: ["Over ons", "Algemene voorwaarden", "Privacy policy", "Beads Club"],
  },
];

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-line bg-card">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-xl font-bold">
            <span className="italic">The</span> <span className="text-pink-deep">Beads Bar</span>
          </p>
          <p className="mt-2 text-sm text-ink-soft">
            Premium kralen en beadable pens, met liefde verpakt en razendsnel verzonden.
          </p>
          <div className="mt-4 flex gap-2">
            {["TikTok", "Instagram", "Pinterest"].map((s) => (
              <span
                key={s}
                className="cursor-pointer rounded-full border border-line px-3 py-1 text-[11px] font-bold text-ink-soft transition-all hover:border-pink hover:text-pink-deep"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
        {COLS.map((col) => (
          <div key={col.title}>
            <p className="text-[12px] font-bold uppercase tracking-wider text-ink-soft">{col.title}</p>
            <ul className="mt-3 space-y-2 text-sm">
              {col.links.map((l) => (
                <li key={l}>
                  <span className="cursor-pointer transition-colors hover:text-pink-deep">{l}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <p className="text-[12px] font-bold uppercase tracking-wider text-ink-soft">Join de Beads Club</p>
          <p className="mt-3 text-sm text-ink-soft">
            10% korting op je eerste bestelling en als eerste toegang tot restocks.
          </p>
          <div className="mt-3 flex items-center rounded-full border border-line bg-canvas pl-4">
            <input
              placeholder="Jouw e-mailadres"
              className="w-full bg-transparent py-2 text-sm outline-none placeholder:text-ink-soft"
            />
            <span className="gradient-cta m-1 flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-white">
              →
            </span>
          </div>
        </div>
      </div>
      <div className="border-t border-line/60 py-4 text-center text-[11px] text-ink-soft">
        © 2026 The Beads Bar · Demo gebouwd door{" "}
        <Link href="https://vosna.nl" className="font-bold text-pink-deep">
          Vosna
        </Link>{" "}
        · iDEAL · Klarna · PayPal · Visa · Mastercard
      </div>
    </footer>
  );
}
