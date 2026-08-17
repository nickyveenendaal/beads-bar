const MESSAGES = [
  "✨ GRATIS VERZENDING vanaf €50 in NL & BE",
  "💗 Voor 15:00 besteld, zelfde werkdag verzonden",
  "🎁 Cadeautje bij elke bestelling",
  "⭐ 4,9/5 van 1.200+ blije creators",
];

export default function AnnouncementBar() {
  const row = MESSAGES.map((m) => (
    <span key={m} className="mx-8 text-[12px] font-semibold tracking-wide whitespace-nowrap">
      {m}
    </span>
  ));
  return (
    <div className="gradient-cta overflow-hidden py-2 text-white" aria-label="Aanbiedingen">
      <div className="marquee">
        <div className="flex items-center">{row}</div>
        <div className="flex items-center" aria-hidden>
          {row}
        </div>
      </div>
    </div>
  );
}
