import { describe, expect, it } from "vitest";
import { findStrains, scoreStrain, type FinderAnswers } from "./strain-finder";
import { STRAINS, getStrain } from "./strains";

const base: FinderAnswers = {
  vibe: "chill",
  where: "either",
  skill: "new",
  flavor: "fruity",
  priority: "easy",
};

describe("strain finder", () => {
  it("returns ranked, deduped matches from our own database", () => {
    const results = findStrains(base, 5);
    expect(results).toHaveLength(5);
    const slugs = results.map((r) => r.strain.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    // sorted descending by score
    for (let i = 1; i < results.length; i++) {
      expect(results[i - 1].score).toBeGreaterThanOrEqual(results[i].score);
    }
    // every result is a real library strain
    for (const r of results) expect(getStrain(r.strain.slug)).toBeTruthy();
  });

  it("beginner answers surface beginner-friendly strains first", () => {
    const results = findStrains(base, 5);
    expect(results[0].strain.difficulty).toBe("Beginner");
  });

  it("sleep vibe ranks a sleepy indica above an energetic sativa", () => {
    const a: FinderAnswers = { ...base, vibe: "sleep", skill: "pro", priority: "potency" };
    const indica = STRAINS.find((s) => s.slug === "granddaddy-purple")!;
    const sativa = STRAINS.find((s) => s.slug === "durban-poison")!;
    expect(scoreStrain(indica, a).score).toBeGreaterThan(scoreStrain(sativa, a).score);
  });

  it("outdoor answers punish indoor-only strains", () => {
    const a: FinderAnswers = { ...base, where: "outdoor" };
    const outdoor = STRAINS.find((s) => s.climate === "Outdoor");
    const indoor = STRAINS.find((s) => s.climate === "Indoor");
    if (outdoor && indoor) {
      expect(scoreStrain(outdoor, a).score).toBeGreaterThan(scoreStrain(indoor, a).score);
    }
  });

  it("potency priority rewards high-THC strains with a reason", () => {
    const a: FinderAnswers = { ...base, skill: "pro", priority: "potency" };
    const strong = STRAINS.find((s) => s.slug === "do-si-dos")!; // 25–30%
    const match = scoreStrain(strong, a);
    expect(match.reasons.some((r) => r.includes("Heavy hitter"))).toBe(true);
  });

  it("every match carries at least one human-readable reason in the top results", () => {
    const results = findStrains({ ...base, vibe: "energy", priority: "yield" }, 3);
    for (const r of results) expect(r.reasons.length).toBeGreaterThan(0);
  });
});
