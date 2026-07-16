import { describe, expect, it } from "vitest";
import { buildGrowPlan, type GrowInput } from "./build-my-grow";
import { getAllGuides } from "./guides";
import { GROWERS } from "./growers";

const base: GrowInput = {
  env: "indoor",
  space: "small",
  experience: "beginner",
  medium: "soil",
  budget: "mid",
  goal: "simple",
};

describe("build my grow", () => {
  const guideSlugs = new Set(getAllGuides().map((g) => g.slug));
  const growerSlugs = new Set(GROWERS.map((g) => g.slug));

  it("always produces a complete, ordered plan", () => {
    const plan = buildGrowPlan(base);
    expect(plan.headline).toBeTruthy();
    expect(plan.setup.length).toBeGreaterThanOrEqual(4);
    expect(plan.roadmap.length).toBeGreaterThan(4);
    expect(plan.gear.length).toBeGreaterThan(0);
    expect(plan.tips.length).toBeGreaterThan(0);
    // roadmap starts at setup and ends at the cure
    expect(plan.roadmap[0]).toBe("setting-up-your-grow-space");
    expect(plan.roadmap.at(-1)).toBe("drying-and-curing");
  });

  it("every roadmap slug is a real guide and every match is a real grower", () => {
    const envs = ["indoor", "outdoor"] as const;
    const spaces = ["micro", "small", "standard", "large", "containers", "ground"] as const;
    const exps = ["beginner", "some", "experienced"] as const;
    const mediums = ["soil", "coco", "hydro"] as const;
    const goals = ["simple", "quality", "yield"] as const;
    for (const env of envs)
      for (const space of spaces)
        for (const experience of exps)
          for (const medium of mediums)
            for (const goal of goals) {
              const plan = buildGrowPlan({ env, space, experience, medium, budget: "mid", goal });
              expect(new Set(plan.roadmap).size).toBe(plan.roadmap.length); // no dupes
              for (const s of plan.roadmap)
                expect(guideSlugs.has(s), `missing guide ${s}`).toBe(true);
              expect(growerSlugs.has(plan.growerSlug), `bad grower ${plan.growerSlug}`).toBe(
                true,
              );
            }
  });

  it("tailors the roadmap to the medium and goal", () => {
    expect(buildGrowPlan({ ...base, medium: "coco" }).roadmap).toContain("coco-coir-growing");
    expect(buildGrowPlan({ ...base, medium: "hydro" }).roadmap).toContain(
      "hydroponics-dwc-101",
    );
    // "simple" skips heavy training; "yield" for an experienced grower adds topping
    expect(buildGrowPlan({ ...base, goal: "simple" }).roadmap).not.toContain(
      "topping-fim-mainlining",
    );
    expect(
      buildGrowPlan({ ...base, goal: "yield", experience: "experienced" }).roadmap,
    ).toContain("topping-fim-mainlining");
  });

  it("routes outdoor grows to the outdoor season guide", () => {
    const plan = buildGrowPlan({ ...base, env: "outdoor", space: "containers" });
    expect(plan.roadmap).toContain("outdoor-grow-season");
    expect(plan.roadmap).not.toContain("lighting-basics-ppfd");
  });
});
