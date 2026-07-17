/**
 * Terpene hub data — enriches the base TERPENES map (in strains.ts) with
 * effect/benefit notes and cross-links every terpene to the curated strains
 * that feature it. Pure + testable.
 */

import { STRAINS, TERPENES, type Strain, type Terp } from "@/lib/strains";

export const TERP_ORDER: Terp[] = [
  "myrcene",
  "limonene",
  "caryophyllene",
  "pinene",
  "terpinolene",
  "linalool",
  "humulene",
];

export const TERP_DETAIL: Record<
  Terp,
  { effects: string; benefit: string; accent: string }
> = {
  myrcene: {
    effects: "Relaxing, sedating — the classic heavy 'couch-lock' feel",
    benefit:
      "The most abundant cannabis terpene; often tied to the calming body side of a strain.",
    accent: "var(--violet)",
  },
  limonene: {
    effects: "Uplifting, mood-brightening, stress-melting",
    benefit:
      "Bright citrus aroma associated with an elevated, anti-stress head feel.",
    accent: "var(--lime)",
  },
  caryophyllene: {
    effects: "Warming, calming, soothing",
    benefit:
      "The only terpene that also binds a cannabinoid receptor (CB2) — peppery and grounding.",
    accent: "var(--gold)",
  },
  pinene: {
    effects: "Alert, clear-headed, focused",
    benefit:
      "Fresh-forest pine aroma linked to mental clarity and easier breathing.",
    accent: "var(--cyan)",
  },
  terpinolene: {
    effects: "Energetic, heady, creative",
    benefit:
      "Complex herbal-floral-citrus note common in bright, uplifting sativas.",
    accent: "var(--magenta)",
  },
  linalool: {
    effects: "Calming, floral, deeply relaxing",
    benefit:
      "The lavender molecule — associated with soothing, wind-down, evening character.",
    accent: "var(--violet)",
  },
  humulene: {
    effects: "Grounding, earthy, mellow",
    benefit:
      "Shares its source with hops; hoppy-earthy and often tied to a settled, easy feel.",
    accent: "var(--gold)",
  },
};

/** Curated strains that list this terpene among their dominant terpenes. */
export function strainsWithTerpene(t: Terp): Strain[] {
  return STRAINS.filter((s) => s.terpenes.includes(t));
}

/** How many curated strains feature each terpene (for the hub overview). */
export function terpeneCounts(): Record<Terp, number> {
  const out = {} as Record<Terp, number>;
  for (const t of TERP_ORDER) out[t] = strainsWithTerpene(t).length;
  return out;
}

export { TERPENES };
