/**
 * Build My Grow — turns a few answers into a concrete, personalized grow plan:
 * setup, plant count, a strain direction, an ordered guide roadmap, gear to
 * buy, and which of the "greats" to learn from. Pure and deterministic so the
 * whole thing is unit-testable; the UI is a thin shell over buildGrowPlan().
 */

export type GrowEnv = "indoor" | "outdoor";
export type GrowSpace =
  | "micro" // closet / 2x2
  | "small" // 2x4
  | "standard" // 4x4
  | "large" // 5x5+
  | "containers" // outdoor pots / patio
  | "ground"; // outdoor in-ground
export type GrowExp = "beginner" | "some" | "experienced";
export type GrowMedium = "soil" | "coco" | "hydro";
export type GrowBudget = "budget" | "mid" | "premium";
export type GrowGoal = "simple" | "quality" | "yield";

export type GrowInput = {
  env: GrowEnv;
  space: GrowSpace;
  experience: GrowExp;
  medium: GrowMedium;
  budget: GrowBudget;
  goal: GrowGoal;
};

export type GrowPlan = {
  headline: string;
  summary: string;
  setup: { label: string; value: string }[];
  plantCount: string;
  strainDirection: string;
  roadmap: string[]; // ordered guide slugs (validated by caller)
  gear: string[]; // gear categories to shop
  growerSlug: string; // Grow Like the Greats match
  tips: string[];
};

const LIGHT_BY_SPACE: Record<GrowSpace, string> = {
  micro: "~100–150W LED",
  small: "~200–300W LED",
  standard: "~400–500W LED",
  large: "~600W+ LED",
  containers: "Full sun (6+ hrs direct)",
  ground: "Full sun (6+ hrs direct)",
};

const TENT_BY_SPACE: Record<GrowSpace, string> = {
  micro: "2x2 tent (or a closet)",
  small: "2x4 tent",
  standard: "4x4 tent",
  large: "5x5 tent or larger",
  containers: "Fabric pots on a patio/balcony",
  ground: "Prepared bed or large fabric pots",
};

const PLANTS_BY_SPACE: Record<GrowSpace, string> = {
  micro: "1 plant",
  small: "1–2 plants",
  standard: "3–4 plants",
  large: "4–6 plants",
  containers: "1–3 plants",
  ground: "1–4 plants (space them out)",
};

const MEDIUM_LABEL: Record<GrowMedium, string> = {
  soil: "Living soil",
  coco: "Coco coir",
  hydro: "Hydroponics (DWC)",
};

export function buildGrowPlan(input: GrowInput): GrowPlan {
  const { env, space, experience, medium, budget, goal } = input;
  const outdoor = env === "outdoor";

  // ---- setup summary ----
  const setup: { label: string; value: string }[] = [
    { label: "Environment", value: outdoor ? "Outdoor" : "Indoor" },
    { label: outdoor ? "Where" : "Space", value: TENT_BY_SPACE[space] },
    { label: outdoor ? "Sunlight" : "Light", value: LIGHT_BY_SPACE[space] },
    { label: "Medium", value: MEDIUM_LABEL[medium] },
  ];
  if (!outdoor) {
    setup.push({
      label: "Airflow",
      value:
        budget === "budget"
          ? "Inline exhaust fan + carbon filter (size to tent)"
          : "EC/quiet inline fan + carbon filter + clip fans",
    });
  }

  // ---- roadmap (ordered guide slugs) ----
  const roadmap: string[] = ["setting-up-your-grow-space"];
  // seeds
  roadmap.push(
    goal === "simple" || experience === "beginner"
      ? "seeds-101-autos-vs-photos"
      : "germinate-cannabis-seeds",
  );
  roadmap.push("seedling-care-first-weeks");
  // environment for indoor
  if (!outdoor) roadmap.push("lighting-basics-ppfd");
  else roadmap.push("outdoor-grow-season");
  // medium-specific
  if (medium === "coco") roadmap.push("coco-coir-growing");
  else if (medium === "hydro") roadmap.push("hydroponics-dwc-101");
  else roadmap.push("watering-ph-fundamentals");
  // veg + training (skip heavy training if simple)
  roadmap.push("vegetative-stage-101");
  if (goal !== "simple") {
    roadmap.push(
      goal === "yield" && experience !== "beginner"
        ? "topping-fim-mainlining"
        : "low-stress-training-lst",
    );
  }
  // flip + finish
  roadmap.push("the-flip-12-12", "when-to-harvest-trichomes", "drying-and-curing");
  const roadmapUnique = [...new Set(roadmap)];

  // ---- strain direction ----
  let strainDirection: string;
  if (goal === "simple" || experience === "beginner") {
    strainDirection =
      "Start with a Beginner-difficulty, fast-flowering strain — filter Strains by 'Beginner' and sort by 'Fastest'.";
  } else if (goal === "yield") {
    strainDirection =
      "Look for High-yield, vigorous strains you can train — filter Strains by yield and sort by 'THC ↓' for potency.";
  } else {
    strainDirection =
      "Chase terps and frost — use the Terpene filter on Strains to match the flavors you love.";
  }
  if (outdoor)
    strainDirection +=
      " For outdoors, prioritize mold-resistant, on-time finishers for a Western NY season.";

  // ---- grower match ----
  let growerSlug: string;
  if (medium === "hydro" || (goal === "yield" && experience === "experienced")) {
    growerSlug = "bruce-bugbee"; // dial light + VPD with data
  } else if (medium === "soil" && goal === "quality") {
    growerSlug = experience === "experienced" ? "buildasoil" : "kyle-kushman";
  } else if (experience === "beginner" || goal === "simple") {
    growerSlug = "mr-canucks-grow";
  } else if (goal === "quality") {
    growerSlug = "basementganja";
  } else {
    growerSlug = "ed-rosenthal";
  }

  // ---- gear ----
  const gear: string[] = outdoor
    ? ["Fabric pots", "Quality soil / amendments", "Support stakes & ties", "Pest & mold control"]
    : ["Grow tent", "LED grow light", "Inline fan + carbon filter", "Thermo-hygrometer"];
  if (medium === "hydro") gear.push("DWC bucket + air pump", "pH & EC meters");
  if (medium === "coco") gear.push("Coco + perlite", "Cal-mag + base nutrients");
  if (!outdoor && budget !== "budget") gear.push("Environment controller");

  // ---- tips ----
  const tips: string[] = [];
  tips.push(
    outdoor
      ? "Get plants outside after your last frost; start seeds indoors a few weeks earlier."
      : "Run the empty tent for 24h first — confirm temps, humidity, and no light leaks before seeds go in.",
  );
  tips.push(
    medium === "hydro"
      ? "Hydro is fast but less forgiving — check pH/EC daily and keep res temps cool."
      : medium === "coco"
        ? "Treat coco like hydro-lite: feed with cal-mag every watering and don't let it fully dry out."
        : "Living soil rewards patience — water when the pot feels light and let the biology feed the plant.",
  );
  if (goal === "simple")
    tips.push("Keep it simple: one strain, minimal training, and don't chase every product.");
  if (goal === "yield")
    tips.push("Yield comes from light + training + a longer veg — fill the canopy before you flip.");
  if (goal === "quality")
    tips.push("Quality is made at the end: harvest on trichomes, dry slow, cure for weeks.");

  // ---- headline ----
  const goalWord =
    goal === "simple" ? "easy" : goal === "yield" ? "high-yield" : "top-shelf";
  const headline = `Your ${goalWord} ${outdoor ? "outdoor" : "indoor"} ${MEDIUM_LABEL[medium].toLowerCase()} grow`;
  const summary = `${PLANTS_BY_SPACE[space]} in ${TENT_BY_SPACE[space].toLowerCase()}, ${MEDIUM_LABEL[medium].toLowerCase()}, ${LIGHT_BY_SPACE[space].toLowerCase()}. Follow the roadmap below in order and you'll go from seed to cured jar.`;

  return {
    headline,
    summary,
    setup,
    plantCount: PLANTS_BY_SPACE[space],
    strainDirection,
    roadmap: roadmapUnique,
    gear,
    growerSlug,
    tips,
  };
}
