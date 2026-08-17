import Image from "next/image";
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
          <Link href="/">
            <Image src="/brand/logo-horizontal.png" alt="The Beads Bar" width={160} height={39} className="h-8 w-auto" />
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
