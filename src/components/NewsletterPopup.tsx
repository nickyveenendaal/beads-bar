"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { IconClose } from "./Icons";

// Welkomstkorting-popup: verschijnt één keer na 14 seconden en onthoudt
// dat hij weggeklikt is. Levert e-mailadressen op voor remarketing.
export default function NewsletterPopup() {
  const [open, setOpen] = useState(false);
  const [claimed, setClaimed] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("beads-bar-popup")) return;
    const id = setTimeout(() => setOpen(true), 14000);
    return () => clearTimeout(id);
  }, []);

  const dismiss = () => {
    localStorage.setItem("beads-bar-popup", "1");
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/40 p-4 backdrop-blur-sm">
      <div className="pop-in card relative w-full max-w-sm overflow-hidden text-center">
        <button
          onClick={dismiss}
          aria-label="Sluiten"
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/85 text-ink-soft transition-colors hover:bg-blush"
        >
          <IconClose size={14} />
        </button>
        <div className="gradient-animated px-6 pb-5 pt-7">
          <Image
            src="/brand/mascot-1.png"
            alt=""
            width={110}
            height={105}
            className="mx-auto drop-shadow"
            aria-hidden
          />
          <p className="font-script mt-2 text-3xl text-pink-deep">Psst... 10% korting</p>
          <p className="mt-1 text-sm text-ink-soft">
            Join de Beads Club en krijg 10% korting op je eerste bestelling.
          </p>
        </div>
        <div className="p-6 pt-4">
          {claimed ? (
            <div className="rounded-2xl bg-cream p-4">
              <p className="text-sm font-bold">Jouw code:</p>
              <p className="font-display mt-1 text-2xl font-medium tracking-widest text-pink-deep">
                BEADS10
              </p>
              <p className="mt-1 text-[11px] text-ink-soft">Vul hem in bij het afrekenen</p>
            </div>
          ) : (
            <>
              <input
                placeholder="Jouw e-mailadres"
                className="w-full rounded-full border border-line bg-canvas px-4 py-2.5 text-sm outline-none focus:shadow-[0_0_0_3px_rgba(238,143,184,0.25)]"
              />
              <button
                onClick={() => setClaimed(true)}
                className="btn-cta mt-3 w-full rounded-full py-3 font-bold"
              >
                Geef mij die korting
              </button>
              <button onClick={dismiss} className="mt-2 text-[11px] text-ink-soft underline">
                Nee dank je
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
