import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-canvas px-4 text-center">
      <Image src="/brand/mascot-3.png" alt="" width={160} height={175} className="drop-shadow" aria-hidden />
      <h1 className="font-display mt-6 text-4xl font-medium">
        Oeps, dit kraaltje is <span className="italic text-pink-deep">weggerold</span>
      </h1>
      <p className="mt-3 max-w-sm text-ink-soft">
        Deze pagina bestaat niet (meer). Geen zorgen, de mooiste dingen liggen gewoon in de shop.
      </p>
      <Link href="/" className="btn-cta mt-6 rounded-full px-8 py-3.5 font-bold">
        Terug naar The Beads Bar →
      </Link>
    </div>
  );
}
