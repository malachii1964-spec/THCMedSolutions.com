import { describe, expect, it } from "vitest";
import { GROWERS, getGrower } from "./growers";
import { getAllGuides } from "./guides";

describe("grow like the greats", () => {
  it("has starter profiles with unique slugs and full content", () => {
    expect(GROWERS.length).toBeGreaterThanOrEqual(6);
    const slugs = GROWERS.map((g) => g.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const g of GROWERS) {
      expect(g.slug).toMatch(/^[a-z0-9-]+$/);
      expect(g.name).toBeTruthy();
      expect(g.method.length).toBeGreaterThan(40);
      expect(g.lessons.length).toBeGreaterThanOrEqual(3);
      expect(g.steps.length).toBeGreaterThanOrEqual(3);
      expect(g.knownFor.length).toBeGreaterThan(0);
    }
  });

  it("looks up by slug and rejects unknowns", () => {
    expect(getGrower("ed-rosenthal")?.name).toBe("Ed Rosenthal");
    expect(getGrower("nobody")).toBeUndefined();
  });

  it("every cross-linked guide exists (no dead links)", () => {
    const guideSlugs = new Set(getAllGuides().map((g) => g.slug));
    for (const g of GROWERS) {
      expect(g.guideSlugs.length).toBeGreaterThan(0);
      for (const s of g.guideSlugs) {
        expect(guideSlugs.has(s), `${g.slug} → missing guide ${s}`).toBe(true);
      }
    }
  });
});
