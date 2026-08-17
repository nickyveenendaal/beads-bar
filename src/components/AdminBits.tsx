// Kleine gedeelde bouwstenen voor de beheerpagina's.

export function AdminHead({ title, sub, right }: { title: string; sub?: string; right?: React.ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="font-display text-3xl font-medium">{title}</h1>
        {sub && <p className="mt-1 text-sm text-ink-soft">{sub}</p>}
      </div>
      {right}
    </div>
  );
}

export const STATUS_STYLE: Record<string, string> = {
  nieuw: "bg-blush text-pink-deep",
  verpakt: "bg-cream text-gold",
  verzonden: "bg-blush-deep/60 text-ink",
  afgeleverd: "bg-mint/15 text-mint",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${STATUS_STYLE[status] ?? "bg-canvas text-ink-soft"}`}>
      {status}
    </span>
  );
}

export function SourceBadge({ source }: { source: string }) {
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
        source.startsWith("TikTok") ? "bg-ink text-white" : "bg-canvas text-ink-soft"
      }`}
    >
      {source}
    </span>
  );
}
