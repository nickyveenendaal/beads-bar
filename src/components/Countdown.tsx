"use client";

import { useEffect, useState } from "react";

// Aftelklok die elke dag om middernacht "reset": klassieke
// deal-van-de-dag-urgentie. Rendert pas na mount (hydration-veilig).
export default function Countdown({ label = "Deal eindigt over" }: { label?: string }) {
  const [left, setLeft] = useState<{ h: number; m: number; s: number } | null>(null);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const end = new Date(now);
      end.setHours(23, 59, 59, 999);
      const ms = end.getTime() - now.getTime();
      setLeft({
        h: Math.floor(ms / 3600000),
        m: Math.floor((ms % 3600000) / 60000),
        s: Math.floor((ms % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");
  const cell = (value: string, unit: string) => (
    <div className="flex flex-col items-center">
      <span className="min-w-11 rounded-xl bg-ink px-2 py-1.5 text-center font-display text-lg font-bold text-white tabular-nums">
        {value}
      </span>
      <span className="mt-1 text-[10px] font-bold uppercase tracking-wider text-ink-soft">{unit}</span>
    </div>
  );

  return (
    <div className="flex items-center gap-3">
      <span className="text-[12px] font-bold uppercase tracking-wide text-pink-deep">{label}</span>
      <div className="flex items-start gap-1.5">
        {cell(left ? pad(left.h) : "--", "uur")}
        <span className="pt-1.5 font-bold text-pink-deep">:</span>
        {cell(left ? pad(left.m) : "--", "min")}
        <span className="pt-1.5 font-bold text-pink-deep">:</span>
        {cell(left ? pad(left.s) : "--", "sec")}
      </div>
    </div>
  );
}
