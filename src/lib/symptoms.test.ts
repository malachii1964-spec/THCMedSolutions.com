import { describe, expect, it } from "vitest";
import { SYMPTOMS, getSymptom, PART_LABEL } from "./symptoms";
import { getAllGuides } from "./guides";

describe("visual plant doctor symptoms", () => {
  it("has a healthy library with unique slugs and full content", () => {
    expect(SYMPTOMS.length).toBeGreaterThanOrEqual(12);
    const slugs = SYMPTOMS.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const s of SYMPTOMS) {
      expect(s.slug).toMatch(/^[a-z0-9-]+$/);
      expect(s.name).toBeTruthy();
      expect(PART_LABEL[s.part]).toBeTruthy();
      expect(s.causes.length).toBeGreaterThan(0);
      expect(s.quickFix.length).toBeGreaterThan(10);
      expect(s.dontDo.length).toBeGreaterThan(5);
      expect(s.prevent.length).toBeGreaterThan(5);
    }
  });

  it("covers every plant part", () => {
    for (const part of ["leaves", "buds", "stems", "whole"] as const) {
      expect(SYMPTOMS.some((s) => s.part === part), `no symptom for ${part}`).toBe(true);
    }
  });

  it("every cross-linked guide exists (no dead links)", () => {
    const guideSlugs = new Set(getAllGuides().map((g) => g.slug));
    for (const s of SYMPTOMS) {
      for (const g of s.guideSlugs) {
        expect(guideSlugs.has(g), `${s.slug} → missing guide ${g}`).toBe(true);
      }
    }
  });

  it("looks up by slug and rejects unknowns", () => {
    expect(getSymptom("bud-rot")?.name).toContain("mush");
    expect(getSymptom("nope")).toBeUndefined();
  });
});
