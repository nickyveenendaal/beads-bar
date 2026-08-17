import Image from "next/image";
import { asset } from "@/lib/asset";
import Link from "next/link";
import CartDrawer from "@/components/CartDrawer";
import { IconLock } from "@/components/Icons";
import SocialProofToast from "@/components/SocialProofToast";

// Funnel-pagina's krijgen bewust GEEN volledig menu: hoe minder
// afleiding, hoe meer mensen doorklikken naar de checkout.
export default function FunnelLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line bg-card/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
          <Link href="/">
            <Image src={asset("/brand/logo-horizontal.png")} alt="The Beads Bar" width={160} height={39} className="h-8 w-auto" />
          </Link>
          <span className="flex items-center gap-1.5 text-[11px] font-bold text-ink-soft">
            <IconLock size={13} /> Veilig betalen · iDEAL
          </span>
        </div>
      </header>
      <main>{children}</main>
      <CartDrawer />
      <SocialProofToast />
    </>
  );
}
