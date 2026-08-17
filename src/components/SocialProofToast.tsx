"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { RECENT_BUYS } from "@/lib/products";

// "Kocht zojuist"-melding linksonder: social proof die vertrouwen en
// urgentie geeft. Verschijnt pas na een paar seconden, wisselt rustig.
export default function SocialProofToast() {
  const pathname = usePathname();
  const [index, setIndex] = useState(-1);
  const [visible, setVisible] = useState(false);
  // Niet op de checkout of bedankt-pagina: daar hoort rust
  const suppressed = pathname.startsWith("/checkout") || pathname.startsWith("/bedankt");

  useEffect(() => {
    let i = 0;
    let hideTimer: ReturnType<typeof setTimeout>;
    const show = () => {
      setIndex(i % RECENT_BUYS.length);
      setVisible(true);
      hideTimer = setTimeout(() => setVisible(false), 5000);
      i += 1;
    };
    const first = setTimeout(show, 4500);
    const loop = setInterval(show, 13000);
    return () => {
      clearTimeout(first);
      clearInterval(loop);
      clearTimeout(hideTimer);
    };
  }, []);

  if (index < 0 || suppressed) return null;
  const buy = RECENT_BUYS[index];

  return (
    <div
      className={`fixed bottom-4 left-4 z-40 max-w-[290px] transition-all duration-500 ${
        visible ? "toast-in opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <div className="card flex items-center gap-3 p-3 pr-4">
        <span className="pulse-dot h-2.5 w-2.5 shrink-0 rounded-full bg-mint" />
        <p className="text-[12px] leading-snug">
          <span className="font-bold">
            {buy.name} uit {buy.place}
          </span>{" "}
          kocht zojuist <span className="font-bold text-pink-deep">{buy.product}</span>
        </p>
      </div>
    </div>
  );
}
