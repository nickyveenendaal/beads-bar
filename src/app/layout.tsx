import type { Metadata } from "next";
import { Great_Vibes, Playfair_Display, Quicksand } from "next/font/google";
import { CartProvider } from "@/lib/cart";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
});

const script = Great_Vibes({
  variable: "--font-script-var",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: "The Beads Bar · Handcrafted Elegance",
    template: "%s · The Beads Bar",
  },
  description:
    "Premium kralen, beadable pens en DIY-sets. Voor 15:00 besteld, zelfde werkdag verzonden. Cadeautje bij elke bestelling.",
  robots: { index: false, follow: false }, // demo: niet vindbaar in Google
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body className={`${playfair.variable} ${quicksand.variable} ${script.variable} antialiased`}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
