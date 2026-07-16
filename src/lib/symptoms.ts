/**
 * Visual Plant Doctor — a click-a-symptom → get-a-diagnosis library. Factual,
 * horticulture-grounded; pairs with the AI Plant Doctor chat for deeper cases.
 * Each symptom cross-links to the guides that fix it (validated by tests).
 */

export type PlantPart = "leaves" | "buds" | "stems" | "whole";
export type Severity = "good" | "watch" | "act" | "urgent";

export type Symptom = {
  slug: string;
  name: string;
  part: PlantPart;
  where: string;
  severity: Severity;
  causes: string[];
  quickFix: string;
  dontDo: string;
  prevent: string;
  guideSlugs: string[];
};

export const PART_LABEL: Record<PlantPart, string> = {
  leaves: "Leaves",
  buds: "Buds",
  stems: "Stems",
  whole: "Whole plant",
};

export const SEVERITY_LABEL: Record<Severity, string> = {
  good: "Healthy",
  watch: "Keep an eye on it",
  act: "Act soon",
  urgent: "Act now",
};

export const SYMPTOMS: Symptom[] = [
  {
    slug: "yellow-lower-leaves",
    name: "Yellowing lower leaves",
    part: "leaves",
    where: "Older / bottom leaves",
    severity: "watch",
    causes: ["Nitrogen deficiency (in veg)", "Natural fade (late flower)", "pH lockout"],
    quickFix:
      "In veg, feed nitrogen and check your pH. In the last weeks of flower, some lower-leaf yellowing is normal — leave it.",
    dontDo: "Don't pump nutrients into a plant that's just finishing flower.",
    prevent: "Feed to the stage and keep pH ~6.0–6.5 in soil, 5.5–6.0 in coco/hydro.",
    guideSlugs: ["nutrient-deficiency-chart", "watering-ph-fundamentals"],
  },
  {
    slug: "yellow-between-veins",
    name: "Yellow between green veins",
    part: "leaves",
    where: "Older leaves",
    severity: "act",
    causes: ["Magnesium deficiency", "pH lockout"],
    quickFix: "Apply cal-mag and correct your pH so the plant can absorb it.",
    dontDo: "Don't ignore pH — it's the usual reason magnesium isn't getting in.",
    prevent: "Use cal-mag with soft water or in coco; keep pH in range.",
    guideSlugs: ["nutrient-deficiency-chart", "watering-ph-fundamentals"],
  },
  {
    slug: "burnt-leaf-tips",
    name: "Burnt / brown leaf tips",
    part: "leaves",
    where: "Leaf tips, often upper canopy",
    severity: "act",
    causes: ["Nutrient burn (overfeeding)", "Light too hot/close"],
    quickFix: "Cut nutrient strength; flush with pH'd water if it's spreading fast.",
    dontDo: "Don't keep feeding at full strength hoping it recovers.",
    prevent: "Start nutrients low and work up; watch your runoff strength (EC).",
    guideSlugs: ["nutrient-deficiency-chart", "watering-ph-fundamentals"],
  },
  {
    slug: "clawing-leaves",
    name: "Clawing / curling-down leaves",
    part: "leaves",
    where: "Upper leaves",
    severity: "watch",
    causes: ["Nitrogen toxicity", "Overwatering"],
    quickFix: "Ease off the nitrogen and let the medium dry more between waterings.",
    dontDo: "Don't water on a fixed schedule regardless of how wet the pot is.",
    prevent: "Feed to need and water by pot weight, not by the calendar.",
    guideSlugs: ["watering-ph-fundamentals", "nutrient-deficiency-chart"],
  },
  {
    slug: "rusty-spots",
    name: "Rusty brown spots",
    part: "leaves",
    where: "Any leaves, often older",
    severity: "act",
    causes: ["Calcium deficiency", "pH issue", "Possible pests"],
    quickFix: "Add cal-mag, correct pH, and inspect leaf undersides for bugs.",
    dontDo: "Don't assume it's only nutrients — rule out pests too.",
    prevent: "Steady cal-mag + stable pH + basic pest checks.",
    guideSlugs: ["nutrient-deficiency-chart", "pests-mites-gnats-mildew"],
  },
  {
    slug: "white-powder",
    name: "White powder on leaves",
    part: "leaves",
    where: "Upper leaf surfaces",
    severity: "urgent",
    causes: ["Powdery mildew"],
    quickFix:
      "Improve airflow, drop the humidity, remove the worst leaves, and treat the plant.",
    dontDo: "Don't let humidity sit high — especially in flower.",
    prevent: "Good airflow, spacing between plants, and controlled humidity.",
    guideSlugs: ["pests-mites-gnats-mildew", "temp-humidity-vpd"],
  },
  {
    slug: "spider-mites",
    name: "Tiny webbing + speckled leaves",
    part: "leaves",
    where: "Leaf undersides",
    severity: "urgent",
    causes: ["Spider mites"],
    quickFix: "Treat immediately, isolate the plant, and repeat treatments on schedule.",
    dontDo: "Don't wait — mite populations explode in days.",
    prevent: "Quarantine new plants and keep the space clean.",
    guideSlugs: ["pests-mites-gnats-mildew"],
  },
  {
    slug: "fungus-gnats",
    name: "Small flies around the soil",
    part: "whole",
    where: "Soil surface and air",
    severity: "act",
    causes: ["Fungus gnats (from wet topsoil)"],
    quickFix: "Let the topsoil dry out, add yellow sticky traps, and treat with BTi.",
    dontDo: "Don't overwater — constantly moist topsoil is what breeds them.",
    prevent: "Dry-back between waterings; consider bottom-watering.",
    guideSlugs: ["pests-mites-gnats-mildew", "watering-ph-fundamentals"],
  },
  {
    slug: "bud-rot",
    name: "Gray/brown mush inside buds",
    part: "buds",
    where: "Inside dense colas",
    severity: "urgent",
    causes: ["Bud rot (botrytis)"],
    quickFix:
      "Remove affected buds right away, drop the humidity, and boost airflow around the canopy.",
    dontDo: "Don't leave it — rot spreads through a whole cola fast.",
    prevent: "Airflow, defoliate dense spots, and keep flowering humidity low.",
    guideSlugs: ["pests-mites-gnats-mildew", "temp-humidity-vpd"],
  },
  {
    slug: "drooping",
    name: "Drooping leaves",
    part: "leaves",
    where: "Whole plant",
    severity: "watch",
    causes: ["Overwatering", "Underwatering"],
    quickFix: "Check the medium: soaked → let it dry out; bone-dry → water thoroughly.",
    dontDo: "Don't keep adding water to a pot that's already heavy and wet.",
    prevent: "Water by lifting the pot to feel its weight, not on a timer.",
    guideSlugs: ["watering-ph-fundamentals"],
  },
  {
    slug: "taco-leaves",
    name: "Leaf edges curling up (taco)",
    part: "leaves",
    where: "Upper canopy",
    severity: "act",
    causes: ["Heat stress", "Light too close/intense"],
    quickFix: "Lower the temperature and raise or dim the light.",
    dontDo: "Don't run the light too close to a stressed canopy.",
    prevent: "Keep canopy temp and PPFD in the right range for the stage.",
    guideSlugs: ["temp-humidity-vpd", "setting-up-your-grow-space"],
  },
  {
    slug: "purple-stems",
    name: "Purple / red stems",
    part: "stems",
    where: "Main stem and leaf petioles",
    severity: "watch",
    causes: ["Often genetics or cold nights", "Sometimes phosphorus"],
    quickFix:
      "Usually nothing — it's often cosmetic. If it comes with other symptoms, check phosphorus and night temps.",
    dontDo: "Don't over-correct a harmless genetic trait.",
    prevent: "Keep night temperatures stable.",
    guideSlugs: ["nutrient-deficiency-chart"],
  },
  {
    slug: "praying-leaves",
    name: "Leaves reaching up (praying)",
    part: "leaves",
    where: "Upper canopy",
    severity: "good",
    causes: ["A happy plant loving its light — this is a good sign!"],
    quickFix: "Nothing to fix — keep doing exactly what you're doing.",
    dontDo: "Don't change anything on a thriving plant.",
    prevent: "Maintain your dialed environment.",
    guideSlugs: ["setting-up-your-grow-space"],
  },
  {
    slug: "slow-pale-growth",
    name: "Slow, pale, stunted growth",
    part: "whole",
    where: "New growth",
    severity: "act",
    causes: ["pH lockout", "Root problems", "Too cold"],
    quickFix: "Check and correct pH first, then inspect roots and raise temps if cold.",
    dontDo: "Don't add more nutrients into a pH lockout — it makes it worse.",
    prevent: "Right pH, healthy roots, and a warm-enough room.",
    guideSlugs: ["watering-ph-fundamentals", "nutrient-deficiency-chart"],
  },
  {
    slug: "seedling-flop",
    name: "Seedling flopped / thin stretchy stem",
    part: "whole",
    where: "Seedling stage",
    severity: "act",
    causes: ["Damping off", "Not enough light (stretch)", "Overwatering"],
    quickFix:
      "Add gentle airflow, ease off water, bring the light a bit closer, and support the stem.",
    dontDo: "Don't keep the medium soggy — seedlings hate wet feet.",
    prevent: "Sterile start, gentle breeze, adequate light, and careful watering.",
    guideSlugs: ["seedling-care-first-weeks", "setting-up-your-grow-space"],
  },
  {
    slug: "airy-foxtail-buds",
    name: "Airy or foxtailing buds",
    part: "buds",
    where: "Colas late in flower",
    severity: "watch",
    causes: ["Heat/light stress (foxtailing)", "Too little light (airy)"],
    quickFix: "Cool the room and keep the light at the right distance for flowering.",
    dontDo: "Don't cook the tops with a light that's too close or too hot.",
    prevent: "Manage heat and light intensity through late flower.",
    guideSlugs: ["temp-humidity-vpd", "when-to-harvest-trichomes"],
  },
];

export function getSymptom(slug: string): Symptom | undefined {
  return SYMPTOMS.find((s) => s.slug === slug);
}
