import { describe, expect, it } from "vitest";
import {
  getAllGuides,
  getAdjacentGuides,
  getGuide,
  getGuidesByStage,
  teaserOf,
} from "./guides";
import { STAGES, getStage } from "./stages";
import { safeNext } from "./safe-next";

describe("guide library", () => {
  it("loads every guide with valid frontmatter", () => {
    const guides = getAllGuides();
    expect(guides.length).toBeGreaterThanOrEqual(10);
    for (const g of guides) {
      expect(g.title).toBeTruthy();
      expect(STAGES.some((s) => s.id === g.stage)).toBe(true);
    }
  });

  it("has at least one guide in every stage", () => {
    for (const stage of STAGES) {
      expect(
        getGuidesByStage(stage.id).length,
        `stage ${stage.id} has no guides`,
      ).toBeGreaterThan(0);
    }
  });

  it("includes both free and members-only guides", () => {
    const guides = getAllGuides();
    expect(guides.some((g) => g.membersOnly)).toBe(true);
    expect(guides.some((g) => !g.membersOnly)).toBe(true);
  });

  it("returns full guide content by slug", () => {
    const guide = getGuide("germinate-cannabis-seeds");
    expect(guide?.title).toMatch(/Germination/);
    expect(guide?.content.length).toBeGreaterThan(500);
  });

  it("rejects path-traversal and unknown slugs", () => {
    expect(getGuide("../../etc/passwd")).toBeNull();
    expect(getGuide("..%2F..%2Fsecrets")).toBeNull();
    expect(getGuide("does-not-exist")).toBeNull();
    expect(getGuide("UPPER_case!")).toBeNull();
  });

  it("getAdjacentGuides returns same-stage neighbors", () => {
    const all = getAllGuides();
    const stage = all[0].stage;
    const stageGuides = all.filter((g) => g.stage === stage);
    expect(stageGuides.length).toBeGreaterThanOrEqual(2);

    const first = getAdjacentGuides(stageGuides[0].slug);
    expect(first.prev).toBeNull();
    expect(first.next?.slug).toBe(stageGuides[1].slug);

    const last = getAdjacentGuides(stageGuides[stageGuides.length - 1].slug);
    expect(last.prev?.slug).toBe(stageGuides[stageGuides.length - 2].slug);
    expect(last.next).toBeNull();
  });

  it("getAdjacentGuides returns null for unknown slugs", () => {
    const result = getAdjacentGuides("nonexistent-slug");
    expect(result.prev).toBeNull();
    expect(result.next).toBeNull();
  });

  it("teaser is a strict prefix and meaningfully shorter", () => {
    const guide = getGuide("drying-and-curing");
    expect(guide).not.toBeNull();
    const teaser = teaserOf(guide!.content);
    expect(guide!.content.startsWith(teaser)).toBe(true);
    expect(teaser.length).toBeLessThan(guide!.content.length * 0.6);
    expect(teaser.length).toBeGreaterThan(0);
  });
});

describe("stage taxonomy", () => {
  it("photoperiods are honest (0–24 hours or none)", () => {
    for (const s of STAGES) {
      if (s.hoursOn !== null) {
        expect(s.hoursOn).toBeGreaterThanOrEqual(0);
        expect(s.hoursOn).toBeLessThanOrEqual(24);
        expect(s.cycleLabel).toBe(`${s.hoursOn}/${24 - s.hoursOn}`);
      } else {
        expect(s.cycleLabel).toBeNull();
      }
    }
  });

  it("looks up stages by id and rejects unknowns", () => {
    expect(getStage("flowering")?.hoursOn).toBe(12);
    expect(getStage("nope")).toBeUndefined();
  });
});

describe("safeNext redirect guard", () => {
  it("allows same-site relative paths", () => {
    expect(safeNext("/guides/drying-and-curing")).toBe(
      "/guides/drying-and-curing",
    );
  });
  it("falls back on absolute, protocol-relative, or missing values", () => {
    expect(safeNext("https://evil.example")).toBe("/account");
    expect(safeNext("//evil.example")).toBe("/account");
    expect(safeNext(null)).toBe("/account");
    expect(safeNext("")).toBe("/account");
  });
  it("rejects backslash variants browsers normalize to //", () => {
    expect(safeNext("/\\evil.example")).toBe("/account");
    expect(safeNext("/\\/evil.example")).toBe("/account");
    expect(safeNext("/guides\\..")).toBe("/account");
  });
});
