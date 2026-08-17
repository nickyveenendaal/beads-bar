import Link from "next/link";
import CartDrawer from "@/components/CartDrawer";
import SocialProofToast from "@/components/SocialProofToast";

// Funnel-pagina's krijgen bewust GEEN volledig menu: hoe minder
// afleiding, hoe meer mensen doorklikken naar de checkout.
export default function FunnelLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line bg-card/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-baseline gap-1.5">
            <span className="font-display text-base italic">The</span>
            <span className="font-display text-xl font-bold text-pink-deep">Beads Bar</span>
          </Link>
          <span className="text-[11px] font-bold text-ink-soft">🔒 Veilig betalen · iDEAL</span>
        </div>
      </header>
      <main>{children}</main>
      <CartDrawer />
      <SocialProofToast />
    </>
  );
}
