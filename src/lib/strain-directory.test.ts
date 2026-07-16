import { describe, expect, it } from "vitest";
import { getDirectory, LITE_STRAINS } from "./strain-directory";
import { STRAINS } from "./strains";

describe("strain directory (Tier 2)", () => {
  const dir = getDirectory();

  it("is a big, sorted, deduped index", () => {
    expect(dir.length).toBeGreaterThanOrEqual(200);
    // sorted A–Z
    for (let i = 1; i < dir.length; i++) {
      expect(dir[i - 1].name.localeCompare(dir[i].name)).toBeLessThanOrEqual(0);
    }
    // no duplicate names
    const names = dir.map((d) => d.name.toLowerCase());
    expect(new Set(names).size).toBe(names.length);
  });

  it("includes every curated strain, each linked to its full profile", () => {
    for (const s of STRAINS) {
      const entry = dir.find((d) => d.slug === s.slug);
      expect(entry, `missing curated ${s.slug}`).toBeTruthy();
      expect(entry!.name).toBe(s.name);
    }
    const profiled = dir.filter((d) => d.slug);
    expect(profiled.length).toBe(STRAINS.length);
  });

  it("lite entries never collide with a curated strain (no thin dup pages)", () => {
    const norm = (n: string) =>
      n.toLowerCase().replace(/\(.*?\)/g, "").replace(/[^a-z0-9]/g, "");
    const curatedNorm = new Set(STRAINS.map((s) => norm(s.name)));
    const liteInDir = dir.filter((d) => !d.slug);
    for (const l of liteInDir) {
      expect(curatedNorm.has(norm(l.name)), `lite dup of curated: ${l.name}`).toBe(false);
    }
    // lite entries are well-formed
    for (const l of LITE_STRAINS) {
      expect(l.name).toBeTruthy();
      expect(["Indica", "Sativa", "Hybrid"]).toContain(l.type);
    }
  });
});
