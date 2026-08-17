"use client";

import { useEffect, useRef, useState } from "react";

// Cijfer dat bij binnenkomst omhoog telt: maakt het dashboard levendig.
export default function CountUp({
  value,
  format,
}: {
  value: number;
  format?: "euro" | "plain";
}) {
  const [display, setDisplay] = useState(0);
  const done = useRef(false);

  useEffect(() => {
    if (done.current) return;
    done.current = true;
    const start = performance.now();
    const duration = 1100;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(value * eased));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [value]);

  if (format === "euro") {
    return <>€{(display / 100).toLocaleString("nl-NL", { minimumFractionDigits: 2 })}</>;
  }
  return <>{display.toLocaleString("nl-NL")}</>;
}
