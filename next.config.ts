import type { NextConfig } from "next";

// PAGES=1 bouwt een statische export voor GitHub Pages
// (subpad /beads-bar, afbeeldingen zonder optimalisatie-server).
const forPages = process.env.PAGES === "1";

const nextConfig: NextConfig = {
  ...(forPages
    ? {
        output: "export" as const,
        basePath: "/beads-bar",
        images: { unoptimized: true },
      }
    : {}),
};

export default nextConfig;
