// Mock-cijfers voor het admin-dashboard. In een echte shop komt dit uit
// de database en de TikTok/Meta-koppelingen; de demo laat zien wat je
// dan te zien krijgt.

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

export type VideoFunnel = {
  id: string;
  title: string;
  posted: string;
  landing: string;
  views: number;
  clicks: number;
  addedToCart: number;
  checkouts: number;
  orders: number;
  revenue: number;
};

export const VIDEO_FUNNELS: VideoFunnel[] = [
  {
    id: "v1",
    title: "POV: je maakt je eigen pen ✨",
    posted: "13 aug",
    landing: "/t/pen-pov",
    views: 412000,
    clicks: 18540,
    addedToCart: 3120,
    checkouts: 1460,
    orders: 1189,
    revenue: 812400,
  },
  {
    id: "v2",
    title: "Restock ASMR: flower beads 🌸",
    posted: "9 aug",
    landing: "/t/flower-restock",
    views: 186000,
    clicks: 7920,
    addedToCart: 1340,
    checkouts: 610,
    orders: 502,
    revenue: 264800,
  },
  {
    id: "v3",
    title: "Armbandjes-party met m’n zusje",
    posted: "6 aug",
    landing: "/t/armband-party",
    views: 94000,
    clicks: 3110,
    addedToCart: 720,
    checkouts: 350,
    orders: 291,
    revenue: 468200,
  },
  {
    id: "v4",
    title: "Wat zit er in een Mystery Bag?",
    posted: "2 aug",
    landing: "/t/mystery",
    views: 58000,
    clicks: 2480,
    addedToCart: 890,
    checkouts: 410,
    orders: 366,
    revenue: 131500,
  },
];

export type RecentOrder = {
  id: string;
  customer: string;
  place: string;
  items: string;
  total: number;
  source: string;
  status: "nieuw" | "verzonden" | "afgeleverd";
  when: string;
};

export const RECENT_ORDERS: RecentOrder[] = [
  { id: "#1287", customer: "Julia M.", place: "Eindhoven", items: "Pen Pink Bow ×2, Gold Charm Mix", total: 1440, source: "TikTok · pen-pov", status: "nieuw", when: "8 min geleden" },
  { id: "#1286", customer: "Noor V.", place: "Gent", items: "Flower Beads ×3 (staffel -10%)", total: 1067, source: "TikTok · flower-restock", status: "nieuw", when: "22 min geleden" },
  { id: "#1285", customer: "Sanne K.", place: "Groningen", items: "DIY Set Armband Party + cadeauverpakking", total: 1690, source: "Instagram", status: "nieuw", when: "41 min geleden" },
  { id: "#1284", customer: "Femke d. B.", place: "Haarlem", items: "Pearl Beads ×5 (staffel -20%), Mystery Bag", total: 1430, source: "Direct", status: "verzonden", when: "1 uur geleden" },
  { id: "#1283", customer: "Zoë P.", place: "Breda", items: "Telefoonkoord Candy, Smiley Beads", total: 1040, source: "TikTok · pen-pov", status: "verzonden", when: "2 uur geleden" },
  { id: "#1282", customer: "Amber L.", place: "Leiden", items: "Pen Gold Heart ×3 (staffel -15%)", total: 1262, source: "TikTok · pen-pov", status: "afgeleverd", when: "3 uur geleden" },
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
