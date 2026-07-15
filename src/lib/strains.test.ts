import { describe, expect, it } from "vitest";
import {
  STRAINS,
  TERPENES,
  getStrain,
  relatedGuideSlugs,
  strainsForGuide,
  type Terp,
} from "./strains";
import { getAllGuides } from "./guides";

describe("strain database", () => {
  it("has a healthy library with unique slugs", () => {
    expect(STRAINS.length).toBeGreaterThanOrEqual(40);
    const slugs = STRAINS.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("every strain is well-formed", () => {
    for (const s of STRAINS) {
      expect(s.slug).toMatch(/^[a-z0-9-]+$/);
      expect(s.name).toBeTruthy();
      expect(["Indica", "Sativa", "Hybrid"]).toContain(s.type);
      expect(s.summary.length).toBeGreaterThan(20);
      expect(s.growNotes.length).toBeGreaterThan(20);
      expect(s.terpenes.length).toBeGreaterThan(0);
      // every listed terpene has a reference entry
      for (const t of s.terpenes) expect(TERPENES[t as Terp]).toBeTruthy();
      expect(s.effects.length).toBeGreaterThan(0);
      expect(s.flavors.length).toBeGreaterThan(0);
    }
  });

  it("looks up by slug and rejects unknowns", () => {
    expect(getStrain("blue-dream")?.name).toBe("Blue Dream");
    expect(getStrain("not-a-strain")).toBeUndefined();
  });
});

describe("strain → guide cross-linking", () => {
  const guideSlugs = new Set(getAllGuides().map((g) => g.slug));

  it("every related-guide slug resolves to a real guide (no dead links)", () => {
    for (const s of STRAINS) {
      for (const gslug of relatedGuideSlugs(s)) {
        expect(guideSlugs.has(gslug), `${s.slug} → missing guide ${gslug}`).toBe(
          true,
        );
      }
    }
  });

  it("returns a tight, deduped, non-empty set per strain", () => {
    for (const s of STRAINS) {
      const rel = relatedGuideSlugs(s);
      expect(rel.length).toBeGreaterThan(0);
      expect(rel.length).toBeLessThanOrEqual(6);
      expect(new Set(rel).size).toBe(rel.length);
      // always includes the setup and finish bookends of the grow arc
      expect(rel).toContain("setting-up-your-grow-space");
      expect(rel).toContain("drying-and-curing");
    }
  });

  it("tailors matches to strain attributes", () => {
    const outdoor = STRAINS.find((s) => s.climate === "Outdoor");
    if (outdoor) expect(relatedGuideSlugs(outdoor)).toContain("outdoor-grow-season");

    const tall = STRAINS.find((s) => s.height === "Tall");
    if (tall) expect(relatedGuideSlugs(tall)).toContain("topping-fim-mainlining");
  });
});

describe("guide → strain reverse links", () => {
  // The topical guides that carry a reverse strain list.
  const TOPICAL = [
    "outdoor-grow-season",
    "lighting-basics-ppfd",
    "indoor-vs-outdoor",
    "topping-fim-mainlining",
    "low-stress-training-lst",
    "pests-mites-gnats-mildew",
    "temp-humidity-vpd",
    "first-grow-equipment",
  ];

  it("returns [] for guides with no strain-selection rule", () => {
    expect(strainsForGuide("germinate-cannabis-seeds")).toEqual([]);
    expect(strainsForGuide("making-edibles-safely")).toEqual([]);
    expect(strainsForGuide("not-a-guide")).toEqual([]);
  });

  it("every topical guide surfaces at least one strain", () => {
    for (const g of TOPICAL) {
      expect(strainsForGuide(g).length, `no strains for ${g}`).toBeGreaterThan(0);
    }
  });

  it("forward and reverse never contradict (round-trip invariant)", () => {
    for (const g of TOPICAL) {
      const reverse = new Set(strainsForGuide(g).map((s) => s.slug));
      for (const s of STRAINS) {
        const forward = relatedGuideSlugs(s).includes(g);
        expect(
          reverse.has(s.slug),
          `${s.slug} ↔ ${g} disagree (forward=${forward})`,
        ).toBe(forward);
      }
    }
  });
});
