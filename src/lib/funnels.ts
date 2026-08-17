// Elke TikTok-video krijgt z'n eigen landingspagina met precies de deal
// uit die video. Link in bio -> /t/<video> -> checkout met TIKTOK15.

export type Funnel = {
  slug: string;
  videoTitle: string;
  hook: string;
  sub: string;
  products: { slug: string; qty: number }[];
  code: string;
  socialStat: string;
};

export const FUNNELS: Funnel[] = [
  {
    slug: "pen-pov",
    videoTitle: "POV: je maakt je eigen pen ✨",
    hook: "Die pen uit de video? Die dus.",
    sub: "De Beadable Pen - Pink Bow + Gold Charm Mix, samen precies zoals in de video. Met code TIKTOK15 krijg je 15% korting, alleen via deze link.",
    products: [
      { slug: "beadable-pen-pink-bow", qty: 1 },
      { slug: "gold-charm-mix", qty: 1 },
    ],
    code: "TIKTOK15",
    socialStat: "412k views · 1.189 bestellingen via deze video",
  },
  {
    slug: "flower-restock",
    videoTitle: "Restock ASMR: flower beads 🌸",
    hook: "De flower beads zijn terug.",
    sub: "Vorige restock was in 2 dagen uitverkocht. Pak er direct 3: dan krijg je 10% staffelkorting bovenop je TIKTOK15-code.",
    products: [{ slug: "acryl-flower-beads-mix", qty: 3 }],
    code: "TIKTOK15",
    socialStat: "186k views · 502 bestellingen via deze video",
  },
  {
    slug: "armband-party",
    videoTitle: "Armbandjes-party met m'n zusje",
    hook: "Zo'n middagje? Alles zit in deze doos.",
    sub: "De DIY Set Armband Party: 800+ kralen, elastiek en uitleg. Goed voor 8+ armbanden en een middag pret.",
    products: [{ slug: "diy-set-armband-party", qty: 1 }],
    code: "TIKTOK15",
    socialStat: "94k views · 291 bestellingen via deze video",
  },
  {
    slug: "mystery",
    videoTitle: "Wat zit er in een Mystery Bag?",
    hook: "Durf jij de Mystery Bag aan?",
    sub: "Altijd minstens het dubbele waard. Maximaal 2 per bestelling, want anders is de voorraad zo weg.",
    products: [{ slug: "mystery-beads-bag", qty: 2 }],
    code: "TIKTOK15",
    socialStat: "58k views · 366 bestellingen via deze video",
  },
];

export function findFunnel(slug: string): Funnel | undefined {
  return FUNNELS.find((f) => f.slug === slug);
}
