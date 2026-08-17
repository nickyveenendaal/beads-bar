const MESSAGES = [
  "Gratis verzending vanaf €15 in NL & BE",
  "Voor 15:00 besteld, zelfde werkdag verzonden",
  "Cadeautje bij elke bestelling",
  "4,9/5 van 1.200+ blije creators",
];

export default function AnnouncementBar() {
  const row = MESSAGES.map((m) => (
    <span key={m} className="flex items-center whitespace-nowrap">
      <span className="mx-6 text-[11px] font-bold uppercase tracking-[0.18em] text-pink-deep">{m}</span>
      <span className="text-[10px] text-gold" aria-hidden>✦</span>
    </span>
  ));
  return (
    <div className="overflow-hidden bg-blush-deep py-2" aria-label="Winkelvoordelen">
      <div className="marquee">
        <div className="flex items-center">{row}</div>
        <div className="flex items-center" aria-hidden>
          {row}
        </div>
      </div>
    </div>
  );
}
