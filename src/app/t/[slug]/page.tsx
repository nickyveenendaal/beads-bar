import { notFound } from "next/navigation";
import FunnelLanding from "@/components/FunnelLanding";
import { findFunnel, FUNNELS } from "@/lib/funnels";

export function generateStaticParams() {
  return FUNNELS.map((f) => ({ slug: f.slug }));
}

export default async function FunnelPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const funnel = findFunnel(slug);
  if (!funnel) notFound();
  return <FunnelLanding funnel={funnel} />;
}
