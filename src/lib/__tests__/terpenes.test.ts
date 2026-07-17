import { describe, it, expect } from "vitest";
import {
  TERP_ORDER,
  TERP_DETAIL,
  TERPENES,
  strainsWithTerpene,
  terpeneCounts,
} from "@/lib/terpenes";
import { STRAINS, type Terp } from "@/lib/strains";

describe("terpenes hub data", () => {
  it("TERP_ORDER covers every terpene key", () => {
    const terpKeys = Object.keys(TERPENES) as Terp[];
    expect(new Set(TERP_ORDER)).toEqual(new Set(terpKeys));
  });

  it("TERP_DETAIL has an entry for every ordered terpene", () => {
    for (const t of TERP_ORDER) {
      expect(TERP_DETAIL[t]).toBeDefined();
      expect(TERP_DETAIL[t].effects.length).toBeGreaterThan(0);
      expect(TERP_DETAIL[t].benefit.length).toBeGreaterThan(0);
      expect(TERP_DETAIL[t].accent).toMatch(/^var\(--/);
    }
  });

  it("strainsWithTerpene returns only strains that list the terpene", () => {
    for (const t of TERP_ORDER) {
      const result = strainsWithTerpene(t);
      for (const s of result) {
        expect(s.terpenes).toContain(t);
      }
    }
  });

  it("every curated strain appears in at least one terpene bucket", () => {
    for (const s of STRAINS) {
      const found = TERP_ORDER.some((t) =>
        strainsWithTerpene(t).some((x) => x.slug === s.slug),
      );
      expect(found).toBe(true);
    }
  });

  it("terpeneCounts matches strainsWithTerpene().length", () => {
    const counts = terpeneCounts();
    for (const t of TERP_ORDER) {
      expect(counts[t]).toBe(strainsWithTerpene(t).length);
    }
  });

  it("no terpene has zero strains", () => {
    const counts = terpeneCounts();
    for (const t of TERP_ORDER) {
      expect(counts[t]).toBeGreaterThan(0);
    }
  });
});
