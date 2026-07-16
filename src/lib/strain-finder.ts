/**
 * Strain Finder — quiz answers → ranked strain matches from OUR database
 * (not a generic list), each with human-readable reasons. Pure + testable.
 * Complements Build My Grow: that tool plans the GROW, this picks the STRAIN.
 */

import { STRAINS, type Effect, type Strain, type Terp } from "@/lib/strains";

export type Vibe = "chill" | "social" | "energy" | "focus" | "sleep";
export type Where = "indoor" | "outdoor" | "either";
export type SkillLevel = "new" | "some" | "pro";
export type Flavor = "fruity" | "citrus" | "earthy" | "sweet" | "gas";
export type Priority = "easy" | "fast" | "yield" | "potency";

export type FinderAnswers = {
  vibe: Vibe;
  where: Where;
  skill: SkillLevel;
  flavor: Flavor;
  priority: Priority;
};

export type StrainMatch = {
  strain: Strain;
  score: number;
  reasons: string[];
};

const VIBE_EFFECTS: Record<Vibe, Effect[]> = {
  chill: ["relaxed", "happy"],
  social: ["euphoric", "happy", "uplifted"],
  energy: ["energetic", "uplifted", "creative"],
  focus: ["focused", "creative"],
  sleep: ["sleepy", "relaxed"],
};

const FLAVOR_TERPS: Record<Flavor, Terp[]> = {
  fruity: ["myrcene", "terpinolene"],
  citrus: ["limonene", "terpinolene"],
  earthy: ["myrcene", "humulene", "pinene"],
  sweet: ["linalool", "caryophyllene"],
  gas: ["caryophyllene", "myrcene"],
};

const FLAVOR_WORDS: Record<Flavor, string[]> = {
  fruity: ["berry", "grape", "tropical", "pineapple", "strawberry", "cherry", "mango", "fruity", "blueberry"],
  citrus: ["citrus", "lemon", "orange", "tangerine", "lime", "zesty"],
  earthy: ["earthy", "pine", "wood", "sandalwood", "hash", "herbal", "spicy"],
  sweet: ["sweet", "vanilla", "creamy", "cake", "candy", "cookie", "mint", "floral"],
  gas: ["diesel", "gas", "fuel", "chem", "skunk", "pungent", "sour"],
};

function flowerWeeksMinLocal(s: Strain): number {
  const nums = s.flowerWeeks.match(/\d+/g)?.map(Number);
  return nums && nums.length ? Math.min(...nums) : 99;
}
function thcCeilingLocal(s: Strain): number {
  const nums = s.thc.match(/\d+/g)?.map(Number);
  return nums && nums.length ? Math.max(...nums) : 0;
}

/** Score one strain against the answers; returns score + reasons. */
export function scoreStrain(s: Strain, a: FinderAnswers): StrainMatch {
  let score = 0;
  const reasons: string[] = [];

  // vibe → effects (up to 3 pts, the biggest signal)
  const wanted = VIBE_EFFECTS[a.vibe];
  const hits = wanted.filter((e) => s.effects.includes(e));
  score += hits.length * 1.5;
  if (hits.length >= 2) reasons.push(`Matches your vibe: ${hits.join(", ")}`);

  // where → climate (2 pts, hard filterish)
  if (a.where === "either" || s.climate === "Both") {
    score += 1;
  } else if (
    (a.where === "indoor" && s.climate === "Indoor") ||
    (a.where === "outdoor" && s.climate === "Outdoor")
  ) {
    score += 2;
    reasons.push(`Suited to ${a.where} growing`);
  } else {
    score -= 2; // climate mismatch
  }

  // skill → difficulty (2 pts)
  if (a.skill === "new") {
    if (s.difficulty === "Beginner") {
      score += 2;
      reasons.push("Beginner-friendly to grow");
    } else if (s.difficulty === "Advanced") score -= 2;
  } else if (a.skill === "some") {
    if (s.difficulty !== "Advanced") score += 1;
  } else {
    score += 0.5; // pros can grow anything
  }

  // flavor → terpenes + flavor words (up to 2 pts)
  const terpHits = FLAVOR_TERPS[a.flavor].filter((t) => s.terpenes.includes(t));
  score += terpHits.length * 0.5;
  const flavorText = s.flavors.join(" ").toLowerCase();
  if (FLAVOR_WORDS[a.flavor].some((w) => flavorText.includes(w))) {
    score += 1;
    reasons.push(`Flavor profile: ${s.flavors.slice(0, 3).join(", ")}`);
  }

  // priority (2 pts)
  switch (a.priority) {
    case "easy":
      if (s.difficulty === "Beginner") {
        score += 2;
        if (!reasons.includes("Beginner-friendly to grow"))
          reasons.push("One of the easiest grows in the library");
      }
      break;
    case "fast":
      if (flowerWeeksMinLocal(s) <= 8) {
        score += 2;
        reasons.push(`Fast finisher (${s.flowerWeeks})`);
      }
      break;
    case "yield":
      if (s.yield === "High") {
        score += 2;
        reasons.push("High yielder");
      }
      break;
    case "potency":
      if (thcCeilingLocal(s) >= 24) {
        score += 2;
        reasons.push(`Heavy hitter (THC ${s.thc})`);
      }
      break;
  }

  return { strain: s, score: Math.round(score * 10) / 10, reasons };
}

/** Rank the library against the answers; top N with at least one reason. */
export function findStrains(a: FinderAnswers, limit = 5): StrainMatch[] {
  return STRAINS.map((s) => scoreStrain(s, a))
    .sort(
      (x, y) =>
        y.score - x.score || x.strain.name.localeCompare(y.strain.name),
    )
    .slice(0, limit);
}
