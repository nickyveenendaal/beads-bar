// Mock-cijfers voor het admin-dashboard. Eén consistente dataset:
// de dagcijfers zijn de bron, funnels en bestellingen passen daarbinnen.
// (14 dagen: 533 bestellingen, €4.979 omzet, AOV ±€9,34; funnels zijn
// samen 363 bestellingen = 68% via TikTok.)

export type DayStat = { day: string; revenue: number; orders: number; visitors: number };

export const LAST_14_DAYS: DayStat[] = [
  { day: "4 aug", revenue: 18450, orders: 21, visitors: 1180 },
  { day: "5 aug", revenue: 22300, orders: 26, visitors: 1420 },
  { day: "6 aug", revenue: 19800, orders: 23, visitors: 1350 },
  { day: "7 aug", revenue: 31200, orders: 35, visitors: 2100 },
  { day: "8 aug", revenue: 28750, orders: 31, visitors: 1890 },
  { day: "9 aug", revenue: 41200, orders: 44, visitors: 2950 },
  { day: "10 aug", revenue: 38900, orders: 41, visitors: 2680 },
  { day: "11 aug", revenue: 27600, orders: 30, visitors: 1760 },
  { day: "12 aug", revenue: 33400, orders: 36, visitors: 2240 },
  { day: "13 aug", revenue: 52800, orders: 55, visitors: 3820 },
  { day: "14 aug", revenue: 61250, orders: 63, visitors: 4400 },
  { day: "15 aug", revenue: 48300, orders: 50, visitors: 3350 },
  { day: "16 aug", revenue: 44100, orders: 46, visitors: 3010 },
  { day: "17 aug", revenue: 29850, orders: 32, visitors: 1980 },
];

export const PERIOD = LAST_14_DAYS.reduce(
  (acc, d) => ({
    revenue: acc.revenue + d.revenue,
    orders: acc.orders + d.orders,
    visitors: acc.visitors + d.visitors,
  }),
  { revenue: 0, orders: 0, visitors: 0 }
);

// Verkeersbronnen binnen dezelfde 14 dagen (orders telt op naar 533).
export const SOURCES = [
  { source: "TikTok-funnels", orders: 363, revenue: 360500 },
  { source: "Instagram", orders: 64, revenue: 61400 },
  { source: "Direct / overig", orders: 106, revenue: 76000 },
];

export type VideoFunnel = {
  id: string;
  title: string;
  posted: string;
  landing: string;
  code: string;
  views: number;
  clicks: number;
  addedToCart: number;
  checkouts: number;
  orders: number;
  revenue: number;
};

// Per video: views -> kliks -> mandje -> checkout -> besteld.
// Samen 363 bestellingen / €3.605 (zie SOURCES).
export const VIDEO_FUNNELS: VideoFunnel[] = [
  {
    id: "v1",
    title: "POV: je maakt je eigen pen ✨",
    posted: "13 aug",
    landing: "/t/pen-pov",
    code: "TIKTOK15",
    views: 82000,
    clicks: 3690,
    addedToCart: 830,
    checkouts: 405,
    orders: 168,
    revenue: 161000,
  },
  {
    id: "v2",
    title: "Restock ASMR: flower beads 🌸",
    posted: "9 aug",
    landing: "/t/flower-restock",
    code: "TIKTOK15",
    views: 41000,
    clicks: 1760,
    addedToCart: 390,
    checkouts: 200,
    orders: 92,
    revenue: 90500,
  },
  {
    id: "v3",
    title: "Armbandjes-party met m’n zusje",
    posted: "6 aug",
    landing: "/t/armband-party",
    code: "TIKTOK15",
    views: 23000,
    clicks: 780,
    addedToCart: 195,
    checkouts: 98,
    orders: 48,
    revenue: 78000,
  },
  {
    id: "v4",
    title: "Wat zit er in een Mystery Bag?",
    posted: "2 aug",
    landing: "/t/mystery",
    code: "TIKTOK15",
    views: 18000,
    clicks: 940,
    addedToCart: 310,
    checkouts: 120,
    orders: 55,
    revenue: 31000,
  },
];

export type OrderLine = { name: string; qty: number; price: number };

export type AdminOrder = {
  id: string;
  customer: string;
  email: string;
  place: string;
  country: "NL" | "BE";
  lines: OrderLine[];
  discount?: { code: string; amount: number };
  shipping: number;
  total: number;
  payment: "iDEAL" | "Klarna" | "PayPal" | "Apple Pay";
  source: string;
  status: "nieuw" | "verpakt" | "verzonden" | "afgeleverd";
  trackTrace?: string;
  when: string;
};

export const ADMIN_ORDERS: AdminOrder[] = [
  {
    id: "#1287",
    customer: "Julia M.",
    email: "julia.m@demo.nl",
    place: "Eindhoven",
    country: "NL",
    lines: [
      { name: "Beadable Pen - Pink Bow", qty: 2, price: 990 },
      { name: "Gold Charm Mix", qty: 1, price: 450 },
    ],
    discount: { code: "TIKTOK15", amount: 216 },
    shipping: 0,
    total: 1224,
    payment: "Apple Pay",
    source: "TikTok · pen-pov",
    status: "nieuw",
    when: "8 min geleden",
  },
  {
    id: "#1286",
    customer: "Noor V.",
    email: "noorv@demo.be",
    place: "Gent",
    country: "BE",
    lines: [{ name: "Acryl Flower Beads Mix ×3 (staffel -10%)", qty: 1, price: 1067 }],
    shipping: 350,
    total: 1417,
    payment: "iDEAL",
    source: "TikTok · flower-restock",
    status: "nieuw",
    when: "22 min geleden",
  },
  {
    id: "#1285",
    customer: "Sanne K.",
    email: "sannek@demo.nl",
    place: "Groningen",
    country: "NL",
    lines: [
      { name: "DIY Set - Armband Party", qty: 1, price: 1495 },
      { name: "Cadeauverpakking", qty: 1, price: 195 },
    ],
    shipping: 0,
    total: 1690,
    payment: "Klarna",
    source: "Instagram",
    status: "nieuw",
    when: "41 min geleden",
  },
  {
    id: "#1284",
    customer: "Femke d. B.",
    email: "femkedb@demo.nl",
    place: "Haarlem",
    country: "NL",
    lines: [
      { name: "Pearl Beads ×5 (staffel -20%)", qty: 1, price: 1180 },
      { name: "Mystery Beads Bag", qty: 1, price: 250 },
    ],
    shipping: 0,
    total: 1430,
    payment: "iDEAL",
    source: "Direct",
    status: "verpakt",
    when: "1 uur geleden",
  },
  {
    id: "#1283",
    customer: "Zoë P.",
    email: "zoep@demo.nl",
    place: "Breda",
    country: "NL",
    lines: [
      { name: "Telefoonkoord - Candy", qty: 1, price: 695 },
      { name: "Smiley Beads - Pastel", qty: 1, price: 345 },
    ],
    shipping: 250,
    total: 1290,
    payment: "iDEAL",
    source: "TikTok · pen-pov",
    status: "verzonden",
    trackTrace: "3SBEAD8834712",
    when: "2 uur geleden",
  },
  {
    id: "#1282",
    customer: "Amber L.",
    email: "amberl@demo.nl",
    place: "Leiden",
    country: "NL",
    lines: [{ name: "Beadable Pen - Gold Heart ×3 (staffel -15%)", qty: 1, price: 1262 }],
    shipping: 0,
    total: 1262,
    payment: "PayPal",
    source: "TikTok · pen-pov",
    status: "verzonden",
    trackTrace: "3SBEAD8834655",
    when: "3 uur geleden",
  },
  {
    id: "#1281",
    customer: "Lotte W.",
    email: "lottew@demo.nl",
    place: "Zwolle",
    country: "NL",
    lines: [
      { name: "Letter Beads Mix - Pink", qty: 2, price: 590 },
      { name: "Gold Charm Mix", qty: 1, price: 450 },
    ],
    shipping: 250,
    total: 1290,
    payment: "iDEAL",
    source: "TikTok · mystery",
    status: "afgeleverd",
    trackTrace: "3SBEAD8834520",
    when: "gisteren 21:14",
  },
  {
    id: "#1280",
    customer: "Esmee J.",
    email: "esmeej@demo.be",
    place: "Antwerpen",
    country: "BE",
    lines: [{ name: "Mystery Beads Bag", qty: 2, price: 500 }],
    discount: { code: "TIKTOK15", amount: 75 },
    shipping: 350,
    total: 775,
    payment: "iDEAL",
    source: "TikTok · mystery",
    status: "afgeleverd",
    trackTrace: "3SBEAD8834488",
    when: "gisteren 19:02",
  },
];

export type AdminCustomer = {
  name: string;
  email: string;
  place: string;
  orders: number;
  spent: number;
  lastOrder: string;
  tag: "nieuw" | "terugkerend" | "VIP";
  consent: boolean;
};

export const ADMIN_CUSTOMERS: AdminCustomer[] = [
  { name: "Julia M.", email: "julia.m@demo.nl", place: "Eindhoven", orders: 1, spent: 1224, lastOrder: "vandaag", tag: "nieuw", consent: true },
  { name: "Sanne K.", email: "sannek@demo.nl", place: "Groningen", orders: 4, spent: 5820, lastOrder: "vandaag", tag: "VIP", consent: true },
  { name: "Noor V.", email: "noorv@demo.be", place: "Gent", orders: 2, spent: 2540, lastOrder: "vandaag", tag: "terugkerend", consent: true },
  { name: "Femke d. B.", email: "femkedb@demo.nl", place: "Haarlem", orders: 3, spent: 3980, lastOrder: "vandaag", tag: "terugkerend", consent: false },
  { name: "Zoë P.", email: "zoep@demo.nl", place: "Breda", orders: 1, spent: 1290, lastOrder: "vandaag", tag: "nieuw", consent: true },
  { name: "Amber L.", email: "amberl@demo.nl", place: "Leiden", orders: 5, spent: 6140, lastOrder: "vandaag", tag: "VIP", consent: true },
  { name: "Lotte W.", email: "lottew@demo.nl", place: "Zwolle", orders: 2, spent: 2310, lastOrder: "gisteren", tag: "terugkerend", consent: true },
  { name: "Esmee J.", email: "esmeej@demo.be", place: "Antwerpen", orders: 1, spent: 775, lastOrder: "gisteren", tag: "nieuw", consent: false },
];

export type AdminDiscount = {
  code: string;
  type: "percentage" | "vast" | "gratis verzending";
  value: number;
  minOrder: number;
  used: number;
  limit?: number;
  revenue: number;
  stackable: false;
  linkedFunnel?: string;
  active: boolean;
  ends?: string;
};

export const ADMIN_DISCOUNTS: AdminDiscount[] = [
  { code: "TIKTOK15", type: "percentage", value: 15, minOrder: 0, used: 363, revenue: 360500, stackable: false, linkedFunnel: "alle funnels", active: true },
  { code: "BEADS10", type: "percentage", value: 10, minOrder: 500, used: 87, revenue: 84300, stackable: false, active: true },
  { code: "CLUB5", type: "vast", value: 500, minOrder: 2000, used: 12, revenue: 31800, stackable: false, active: true, ends: "31 aug" },
  { code: "ZOMER", type: "gratis verzending", value: 0, minOrder: 1000, used: 45, revenue: 52200, stackable: false, active: false, ends: "verlopen 10 aug" },
];

export type MailFlow = {
  name: string;
  trigger: string;
  emails: number;
  sent: number;
  openPct: number;
  clickPct: number;
  revenue: number;
  active: boolean;
};

export const MAIL_FLOWS: MailFlow[] = [
  { name: "Welkom + 10% (BEADS10)", trigger: "Nieuwsbrief-aanmelding", emails: 1, sent: 428, openPct: 62, clickPct: 24, revenue: 84300, active: true },
  { name: "Verlaten mandje", trigger: "Mandje 1 uur inactief", emails: 2, sent: 512, openPct: 48, clickPct: 18, revenue: 96400, active: true },
  { name: "Review-verzoek", trigger: "5 dagen na levering", emails: 1, sent: 389, openPct: 55, clickPct: 12, revenue: 18700, active: true },
  { name: "Restock-alert", trigger: "Product weer op voorraad", emails: 1, sent: 204, openPct: 71, clickPct: 34, revenue: 41200, active: false },
];

export const LOW_STOCK = [
  { product: "Gold Charm Mix", stock: 5, daysLeft: 2 },
  { product: "Beadable Pen - Pink Bow", stock: 7, daysLeft: 3 },
  { product: "DIY Set - Pen Studio", stock: 8, daysLeft: 5 },
  { product: "Armband - Pearl Blossom", stock: 9, daysLeft: 6 },
];

export function pct(part: number, whole: number): string {
  return `${((part / whole) * 100).toLocaleString("nl-NL", { maximumFractionDigits: 1 })}%`;
}

export function compact(n: number): string {
  if (n >= 1000000) return `${(n / 1000000).toLocaleString("nl-NL", { maximumFractionDigits: 1 })}M`;
  if (n >= 1000) return `${(n / 1000).toLocaleString("nl-NL", { maximumFractionDigits: 1 })}k`;
  return `${n}`;
}
