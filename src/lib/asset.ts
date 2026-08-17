// Bij de GitHub Pages-build staat de site op /beads-bar; statische
// afbeeldingen hebben dat voorvoegsel nodig (next/image plakt het er
// bij een statische export niet zelf voor).
export function asset(path: string): string {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
}
