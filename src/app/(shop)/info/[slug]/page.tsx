import Link from "next/link";
import { notFound } from "next/navigation";
import { findInfoPage, INFO_PAGES } from "@/lib/infopages";

export function generateStaticParams() {
  return INFO_PAGES.map((p) => ({ slug: p.slug }));
}

export default async function InfoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = findInfoPage(slug);
  if (!page) notFound();

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <nav className="mb-6 text-[12px] font-semibold text-ink-soft">
        <Link href="/" className="hover:text-pink-deep">Home</Link>
        {" / "}
        <span className="text-ink">{page.title}</span>
      </nav>
      <h1 className="font-display text-4xl font-medium">{page.title}</h1>
      <p className="mt-2 text-ink-soft">{page.intro}</p>
      <div className="mt-8 space-y-4">
        {page.sections.map((s) => (
          <section key={s.heading} className="card p-6">
            <h2 className="font-display text-lg font-medium">{s.heading}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.text}</p>
          </section>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link href="/shop" className="btn-cta inline-block rounded-full px-8 py-3 font-bold">
          Verder shoppen →
        </Link>
      </div>
    </div>
  );
}
