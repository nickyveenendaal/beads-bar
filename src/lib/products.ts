// Alle bedragen in centen, net als bij echte betaalsystemen.

export type Category = {
  slug: string;
  name: string;
  palette: string[];
};

export const CATEGORIES: Category[] = [
  { slug: "kralen", name: "Kralen", palette: ["#f7a8c4", "#fff1f5", "#ecc987"] },
  { slug: "beadable-pens", name: "Beadable Pens", palette: ["#f078a8", "#fff", "#d9a441"] },
  { slug: "bedels", name: "Bedels", palette: ["#ecc987", "#d9a441", "#fff6f8"] },
  { slug: "diy-sets", name: "DIY Sets", palette: ["#ffd6e4", "#f7a8c4", "#fff"] },
  { slug: "armbanden", name: "Armbanden", palette: ["#f7a8c4", "#ecc987", "#fff"] },
  { slug: "accessoires", name: "Accessoires", palette: ["#ffd6e4", "#fff9f2", "#f078a8"] },
];

export type Product = {
  slug: string;
  name: string;
  category: string;
  price: number;
  compareAt?: number; // doorgestreepte "van"-prijs (prijsanker)
  rating: number;
  reviews: number;
  stock: number; // laag = schaarste tonen
  badge?: "nieuw" | "deal" | "bestseller";
  visual: "mix" | "pen" | "charm" | "bracelet" | "set" | "accessory";
  paletteIndex: number;
  description: string;
  bullets: string[];
  bulkDeal?: { qty: number; discountPct: number }[]; // staffelkorting
};

export const PRODUCTS: Product[] = [
  {
    slug: "acryl-flower-beads-mix",
    name: "Acryl Flower Beads Mix",
    category: "kralen",
    price: 395,
    compareAt: 495,
    rating: 4.9,
    reviews: 214,
    stock: 42,
    badge: "bestseller",
    visual: "mix",
    paletteIndex: 0,
    description:
      "Onze populairste mix: zachtroze bloemkralen met parels en een vleugje goud. Elke zak is met de hand samengesteld, dus geen twee mixen zijn hetzelfde.",
    bullets: ["±120 kralen per zak", "8-10 mm, gat 2 mm", "Mix van bloemen, parels en goud"],
    bulkDeal: [
      { qty: 3, discountPct: 10 },
      { qty: 5, discountPct: 20 },
    ],
  },
  {
    slug: "beadable-pen-pink-bow",
    name: "Beadable Pen - Pink Bow",
    category: "beadable-pens",
    price: 495,
    rating: 4.8,
    reviews: 168,
    stock: 7,
    badge: "bestseller",
    visual: "pen",
    paletteIndex: 1,
    description:
      "De viral pen van TikTok: rijg je eigen kralen en maak hem af met de roze strik. Navulling werkt met elke standaard balpenvulling.",
    bullets: ["Incl. 10 starterkralen", "Verwisselbare vulling", "Cadeauklaar geleverd"],
    bulkDeal: [{ qty: 3, discountPct: 15 }],
  },
  {
    slug: "letter-beads-mix-pink",
    name: "Letter Beads Mix - Pink",
    category: "kralen",
    price: 295,
    rating: 4.7,
    reviews: 96,
    stock: 88,
    visual: "mix",
    paletteIndex: 3,
    description:
      "Witte letterkralen met roze letters. Spel je eigen naam, quote of insidejoke. Ruim voldoende klinkers in elke zak.",
    bullets: ["±200 kralen", "6 mm vierkant", "Extra klinkers toegevoegd"],
    bulkDeal: [{ qty: 3, discountPct: 10 }],
  },
  {
    slug: "gold-charm-mix",
    name: "Gold Charm Mix",
    category: "bedels",
    price: 450,
    compareAt: 595,
    rating: 4.9,
    reviews: 141,
    stock: 5,
    badge: "deal",
    visual: "charm",
    paletteIndex: 2,
    description:
      "Goudkleurige bedels: strikjes, hartjes en vlinders. De finishing touch voor elke armband of pen.",
    bullets: ["10 bedels per set", "Nikkelvrij", "Met sluitringetjes"],
  },
  {
    slug: "pearl-beads-baby-pink",
    name: "Pearl Beads - Baby Pink",
    category: "kralen",
    price: 295,
    rating: 4.8,
    reviews: 187,
    stock: 64,
    visual: "mix",
    paletteIndex: 0,
    description:
      "Glanzende parelkralen in babyroze. De basis van elke Beads Bar-creatie en eindeloos te combineren.",
    bullets: ["±150 kralen", "8 mm rond", "Diepe parelglans"],
    bulkDeal: [
      { qty: 3, discountPct: 10 },
      { qty: 5, discountPct: 20 },
    ],
  },
  {
    slug: "diy-set-armband-party",
    name: "DIY Set - Armband Party",
    category: "diy-sets",
    price: 1495,
    compareAt: 1995,
    rating: 5.0,
    reviews: 73,
    stock: 12,
    badge: "deal",
    visual: "set",
    paletteIndex: 3,
    description:
      "Alles voor een middag armbandjes maken met vriendinnen: kralen, elastiek, bedels en een uitleg-kaartje. Goed voor 8+ armbanden.",
    bullets: ["800+ kralen in vakjesdoos", "Incl. elastiek en schaartje", "Leukste cadeau van dit moment"],
  },
  {
    slug: "beadable-pen-gold-heart",
    name: "Beadable Pen - Gold Heart",
    category: "beadable-pens",
    price: 495,
    rating: 4.7,
    reviews: 89,
    stock: 23,
    badge: "nieuw",
    visual: "pen",
    paletteIndex: 2,
    description:
      "Beadable pen met gouden hartbedel. Combineer met de Gold Charm Mix voor een matchy set.",
    bullets: ["Incl. 10 starterkralen", "Gouden details", "Schrijft zwart"],
    bulkDeal: [{ qty: 3, discountPct: 15 }],
  },
  {
    slug: "smiley-beads-pastel",
    name: "Smiley Beads - Pastel",
    category: "kralen",
    price: 345,
    rating: 4.6,
    reviews: 54,
    stock: 31,
    badge: "nieuw",
    visual: "mix",
    paletteIndex: 5,
    description:
      "Vrolijke smiley-kralen in pastelkleuren. Viral op TikTok en perfect voor telefoonkoordjes.",
    bullets: ["±60 kralen", "10 mm rond", "6 pastelkleuren"],
  },
  {
    slug: "armband-pearl-blossom",
    name: "Armband - Pearl Blossom",
    category: "armbanden",
    price: 895,
    compareAt: 1095,
    rating: 4.9,
    reviews: 112,
    stock: 9,
    visual: "bracelet",
    paletteIndex: 4,
    description:
      "Handgemaakte armband met parels, roze bloemkralen en gouden accenten. Voor wie liever draagt dan rijgt.",
    bullets: ["Handgemaakt in NL", "Rekbaar, one size", "Komt in cadeauzakje"],
  },
  {
    slug: "telefoonkoord-candy",
    name: "Telefoonkoord - Candy",
    category: "accessoires",
    price: 695,
    rating: 4.8,
    reviews: 67,
    stock: 18,
    visual: "accessory",
    paletteIndex: 5,
    description:
      "Kralen-telefoonkoord in snoepkleuren. Nooit meer je telefoon kwijt, altijd een statement.",
    bullets: ["Universele bevestiging", "Extra sterk koord", "Handgeregen"],
  },
  {
    slug: "mystery-beads-bag",
    name: "Mystery Beads Bag",
    category: "kralen",
    price: 250,
    compareAt: 500,
    rating: 4.9,
    reviews: 320,
    stock: 150,
    badge: "deal",
    visual: "mix",
    paletteIndex: 1,
    description:
      "Een verrassingszak vol kralen uit onze voorraad, altijd minstens het dubbele waard. Het perfecte extraatje bij je bestelling.",
    bullets: ["Waarde minimaal €5", "Elke zak uniek", "Limiet: 2 per bestelling"],
  },
  {
    slug: "diy-set-pen-studio",
    name: "DIY Set - Pen Studio",
    category: "diy-sets",
    price: 1795,
    compareAt: 2290,
    rating: 4.9,
    reviews: 45,
    stock: 8,
    badge: "nieuw",
    visual: "set",
    paletteIndex: 1,
    description:
      "Drie beadable pens plus een luxe mix van kralen en bedels. Maak je eigen pennenlijn, of verdeel met vriendinnen.",
    bullets: ["3 pens + 300 kralen", "Incl. bedels en strikjes", "Bespaar t.o.v. los kopen"],
  },
];

export const FREE_SHIPPING_FROM = 1500; // €15: haalbaar doel bij lage orderwaardes (1,5x AOV)
export const SHIPPING_RATES: Record<string, { label: string; cost: number }> = {
  NL: { label: "Brievenbuspost NL", cost: 250 },
  BE: { label: "Brievenbuspost BE", cost: 350 },
};
export const GIFT_WITH_EVERY_ORDER = "Gratis mini-zakje kralen bij elke bestelling";
export const DISCOUNT_CODES: Record<string, number> = {
  BEADS10: 10, // welkomstkorting nieuwsbrief
  TIKTOK15: 15, // funnelkorting vanuit video's
};

export function findProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function formatPrice(cents: number): string {
  const euros = cents / 100;
  const formatted = euros.toLocaleString("nl-NL", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `€${formatted}`;
}

// Inkoopprijs per product (centen): voedt de marge-kolom in de admin.
export const COST_PRICES: Record<string, number> = {
  "acryl-flower-beads-mix": 120,
  "beadable-pen-pink-bow": 165,
  "letter-beads-mix-pink": 85,
  "gold-charm-mix": 140,
  "pearl-beads-baby-pink": 90,
  "diy-set-armband-party": 520,
  "beadable-pen-gold-heart": 170,
  "smiley-beads-pastel": 110,
  "armband-pearl-blossom": 240,
  "telefoonkoord-candy": 210,
  "mystery-beads-bag": 95,
  "diy-set-pen-studio": 640,
};

// Sterrenverdeling over alle 1.214 reviews (voor het histogram).
export const RATING_BREAKDOWN: { stars: number; count: number }[] = [
  { stars: 5, count: 1004 },
  { stars: 4, count: 152 },
  { stars: 3, count: 39 },
  { stars: 2, count: 12 },
  { stars: 1, count: 7 },
];

export type Review = { name: string; place: string; text: string; product: string; rating: number };

export const REVIEWS: Review[] = [
  {
    name: "Emma",
    place: "Utrecht",
    text: "Bestelling was al de volgende dag binnen, prachtig ingepakt met een persoonlijk kaartje. En het gratis zakje kralen maakte mijn dag!",
    product: "Acryl Flower Beads Mix",
    rating: 5,
  },
  {
    name: "Sofie",
    place: "Antwerpen",
    text: "De beadable pen van TikTok is echt nog leuker in het echt. Direct nog twee besteld als cadeau.",
    product: "Beadable Pen - Pink Bow",
    rating: 5,
  },
  {
    name: "Lisa",
    place: "Rotterdam",
    text: "Kwaliteit is echt anders dan wat je op grote sites koopt. Alle kralen mooi gelijk en de kleuren kloppen precies met de foto's.",
    product: "Pearl Beads - Baby Pink",
    rating: 5,
  },
  {
    name: "Maud",
    place: "Tilburg",
    text: "Mooie kralen en snelle levering. Eén ster eraf omdat de letterkralen iets kleiner zijn dan ik dacht, dus check even de maten. Bestel zeker opnieuw.",
    product: "Letter Beads Mix - Pink",
    rating: 4,
  },
  {
    name: "Yara",
    place: "Amsterdam",
    text: "DIY-set gekocht voor het feestje van mijn dochter (9). Acht meiden een middag stil. Tien sterren als het kon.",
    product: "DIY Set - Armband Party",
    rating: 5,
  },
];

// "Kocht zojuist"-meldingen (social proof). In een echte shop komt dit
// live uit de bestellingen; in de demo is het een nette vaste lijst.
export const RECENT_BUYS: { name: string; place: string; product: string }[] = [
  { name: "Julia", place: "Eindhoven", product: "Beadable Pen - Pink Bow" },
  { name: "Noor", place: "Gent", product: "Acryl Flower Beads Mix" },
  { name: "Sanne", place: "Groningen", product: "DIY Set - Armband Party" },
  { name: "Femke", place: "Haarlem", product: "Gold Charm Mix" },
  { name: "Zoë", place: "Breda", product: "Mystery Beads Bag" },
  { name: "Iris", place: "Nijmegen", product: "Pearl Beads - Baby Pink" },
  { name: "Amber", place: "Leiden", product: "Telefoonkoord - Candy" },
  { name: "Lotte", place: "Zwolle", product: "Beadable Pen - Gold Heart" },
];
