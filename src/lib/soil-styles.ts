/**
 * FrostyBuds Soil Lab — grower-style soil systems.
 * Recipes reference publicly shared methods from well-known growers
 * (compiled in the project's Cannabis Soil Mix Cookbook). Educational
 * reference only; we are not affiliated with or endorsed by any of them.
 */

export type SoilStyle = {
  id: string;
  grower: string;
  handle: string; // how people know them
  system: string;
  vibe: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  waterOnly: boolean;
  philosophy: string;
  base: string[];
  recipe: { title: string; items: string[] }[];
  feeding: string;
  pros: string[];
  cons: string[];
  accent: string;
};

export const SOIL_STYLES: SoilStyle[] = [
  {
    id: "canucks-living",
    grower: "Mr. Canucks Grow",
    handle: "Canucks living soil",
    system: "Promix + Gaia Green dry amendments",
    vibe: "Simple 5-ingredient living soil — the water-only classic",
    difficulty: "Beginner",
    waterOnly: true,
    philosophy:
      "Build the nutrition into the soil up front with dry organic amendments and let microbes feed the plant. Water only (plus top-dress at flower) — no bottles, no pH pens.",
    base: [
      "Promix HP (peat base with perlite)",
      "Earthworm castings",
      "Gaia Green 4-4-4 (All Purpose)",
      "Gaia Green 2-8-4 (Power Bloom)",
      "Mykos (mycorrhizae) at every transplant",
    ],
    recipe: [
      {
        title: "Starter pot (1.5 gal)",
        items: [
          "1.125 gal Promix HP",
          "0.375 gal earthworm castings",
          "4.5 Tbsp Gaia Green 4-4-4",
          "Coat root ball + hole with Mykos",
        ],
      },
      {
        title: "Final pot (5 gal)",
        items: [
          "2.625 gal Promix HP",
          "0.875 gal worm castings",
          "5.25 Tbsp Gaia Green 4-4-4",
          "5.25 Tbsp Gaia Green 2-8-4",
          "Coat with Mykos at transplant",
        ],
      },
      {
        title: "Bloom top-dress (~day 30 from flip)",
        items: [
          "20 Tbsp worm castings",
          "5 Tbsp Gaia Green 2-8-4",
          "Scratch into the top inch, water in",
        ],
      },
    ],
    feeding:
      "Plain water the whole run. One bloom top-dress around day 30 of flower. That's the entire schedule.",
    pros: [
      "Cheapest ongoing cost — no bottled nutrients",
      "Very forgiving; hard to overfeed",
      "Microbe-driven flavor and aroma",
    ],
    cons: [
      "Slower to correct if a deficiency appears",
      "Mixing day takes effort up front",
    ],
    accent: "var(--lime)",
  },
  {
    id: "canucks-coco",
    grower: "Mr. Canucks Grow",
    handle: "Canucks coco autos",
    system: "70/30 coco-perlite + Gaia Green in the substrate",
    vibe: "The autoflower speed-run — coco drainage, organic dry feed",
    difficulty: "Beginner",
    waterOnly: true,
    philosophy:
      "Autoflowers hate transplant stress and heavy feeding. Mix mild dry organics straight into a coco/perlite base at seed, plant once, and just water.",
    base: [
      "Coco coir (buffered) — 70%",
      "Perlite — 30%",
      "Gaia Green 4-4-4 + 2-8-4 mixed in from seed",
      "Mykos in the planting hole",
    ],
    recipe: [
      {
        title: "Per final pot (3–5 gal, plant direct)",
        items: [
          "70/30 coco:perlite to fill",
          "~1 Tbsp Gaia Green 4-4-4 per gallon of mix",
          "~1 Tbsp Gaia Green 2-8-4 per gallon of mix",
          "Mykos dusted where the seed/seedling sits",
        ],
      },
    ],
    feeding:
      "Water only (coco likes frequent, smaller waterings — never bone dry). Optional light 2-8-4 top-dress in early flower.",
    pros: [
      "Perfect for autoflowers — zero transplanting",
      "Coco = fast growth and big root systems",
      "Still no bottles",
    ],
    cons: [
      "Coco dries fast — needs attention to watering rhythm",
      "Cal-Mag hunger can appear under LED; castings help",
    ],
    accent: "var(--cyan)",
  },
  {
    id: "kushman-veganic",
    grower: "Kyle Kushman (style)",
    handle: "Veganic",
    system: "Plant-and-mineral-only inputs — no animal byproducts",
    vibe: "The connoisseur's path — clean inputs, loud terpenes",
    difficulty: "Advanced",
    waterOnly: false,
    philosophy:
      "Veganic growing removes all animal byproducts (no blood/bone meal, no guano, no manure) and feeds the plant with plant-derived and mineral inputs plus active compost teas. Champions of this style credit it with exceptionally clean flavor and smooth smoke.",
    base: [
      "Plant-compost based potting soil (no manure)",
      "Aeration: perlite or pumice (~25%)",
      "Alfalfa meal (N + growth triggers)",
      "Kelp meal (K, micros, hormones)",
      "Neem or karanja meal (N + pest suppression)",
      "Rock dusts: basalt/azomite + soft rock phosphate (P)",
      "Gypsum + dolomite (Ca/Mg/S, pH buffer)",
      "Humic/fulvic acids + molasses-free microbe teas",
    ],
    recipe: [
      {
        title: "Per cubic foot of base mix",
        items: [
          "1/2 cup alfalfa meal",
          "1/2 cup kelp meal",
          "1/2 cup neem/karanja meal",
          "1/2 cup soft rock phosphate",
          "1 cup basalt or azomite rock dust",
          "1/4 cup gypsum + 1/4 cup dolomite lime",
        ],
      },
      {
        title: "Through the run",
        items: [
          "Aerated compost teas (plant compost + castings-free) every 1–2 weeks",
          "Kelp/alfalfa top-dress at flip",
          "Plain pH'd water otherwise",
        ],
      },
    ],
    feeding:
      "Compost teas and plant-based boosters on a schedule; the soil carries the rest. The most hands-on style here — and the one that rewards it.",
    pros: [
      "Cleanest-input flower; famously smooth",
      "No manure smells indoors",
      "Terpene-forward results",
    ],
    cons: [
      "Most expensive and most involved",
      "N from plant sources releases slower — plan ahead",
    ],
    accent: "var(--violet)",
  },
  {
    id: "subcool-super",
    grower: "SubCool / BuildASoil",
    handle: "Super Soil",
    system: "Heavily-amended hot base under a mild top layer",
    vibe: "The legendary batch-brew — mix hot, cook, then coast",
    difficulty: "Intermediate",
    waterOnly: true,
    philosophy:
      "Brew one intense batch of 'hot' soil, let it cook for 30–60 days, then load it in the bottom third of the pot with mild soil on top. Roots grow down into the buffet exactly when flowering demand peaks.",
    base: [
      "8 large bags high-quality base soil",
      "25–50 lbs earthworm castings",
      "5 lbs each: bone meal, bat guano, blood meal",
      "3 lbs rock phosphate",
      "3/4 cup Epsom salt · 1 cup dolomite lime · 1/2 cup azomite",
    ],
    recipe: [
      {
        title: "The batch (makes a full run's worth)",
        items: [
          "Mix everything on a tarp, moisten lightly",
          "Cover and 'cook' 30–60 days, turning weekly",
          "Fill bottom 1/3 of final pots with super soil",
          "Top 2/3 with plain base soil; plant into the mild layer",
        ],
      },
    ],
    feeding:
      "Water only. The cook does the feeding — seedlings never touch the hot layer until they're ready for it.",
    pros: [
      "Water-only through harvest",
      "Battle-tested for 20+ years",
      "Scales beautifully for multiple plants",
    ],
    cons: [
      "Needs lead time (the cook) and storage space",
      "Hot layer can burn plants if mixed wrong",
    ],
    accent: "var(--gold)",
  },
  {
    id: "dte-guano",
    grower: "420 Scene / Down To Earth",
    handle: "Guano blend",
    system: "Bat guano + crab & fish meals, top-dressed per stage",
    vibe: "The flavor-chaser's amendment stack",
    difficulty: "Intermediate",
    waterOnly: true,
    philosophy:
      "Layer targeted organic meals per pot size and stage: high-N guano early, high-P guano and fish bone meal for flower, crab meal for chitin and micro-life.",
    base: [
      "Quality organic base soil",
      "Bat guano (high N, e.g. 42-18-6 style for veg use)",
      "Crab meal 6-4.5-0",
      "Fish bone meal 6-18-0",
      "Kelp meal",
    ],
    recipe: [
      {
        title: "Starter pot (~1 gal)",
        items: [
          "~2 Tbsp each: bat guano, crab meal, fish bone meal",
          "1/2 Tbsp kelp meal",
        ],
      },
      {
        title: "Final pot (5 gal)",
        items: [
          "6 Tbsp bat guano",
          "6 Tbsp crab meal",
          "6 Tbsp fish bone meal",
          "1.5 Tbsp kelp meal",
          "Re-amend as top-dress at the flip",
        ],
      },
    ],
    feeding:
      "Mostly water; top-dress the same stack (bloom-leaning) at flower flip. Teas optional for a mid-flower push.",
    pros: [
      "Terpene-heavy results growers swear by",
      "Feeds micro-life (chitin from crab meal)",
      "Flexible — amend per stage",
    ],
    cons: [
      "Guano dust needs careful handling (wear a mask)",
      "More measuring than one-bag mixes",
    ],
    accent: "var(--magenta)",
  },
];

export const SOIL_SCIENCE = [
  {
    title: "Aeration is non-negotiable",
    body: "Roots breathe. 20–30% perlite, pumice, or rice hulls keeps oxygen in the root zone — most 'overwatering' is really under-aeration.",
  },
  {
    title: "Worm castings are the microbe engine",
    body: "Beyond gentle NPK, castings inoculate soil with the biology that cycles nutrients. Nearly every great recipe leans on them.",
  },
  {
    title: "Match N, P, K sources to the stage",
    body: "Veg wants nitrogen (alfalfa, blood meal, high-N guano). Flower wants phosphorus and potassium (bone/fish bone meal, rock phosphate, kelp, langbeinite).",
  },
  {
    title: "Calcium & magnesium prevent lockouts",
    body: "Dolomite lime buffers pH and feeds Ca/Mg; gypsum adds Ca and S without moving pH. Under LEDs, Cal-Mag hunger is the #1 mystery ailment.",
  },
  {
    title: "Microbes are the flavor secret",
    body: "Mycorrhizae extend roots; diverse soil biology is linked to richer terpene and aroma profiles. Feed the microbes (humics, teas) and they feed the plant.",
  },
  {
    title: "Organic vs. synthetic is a real fork",
    body: "Salts grow fast but demand pH/EC discipline and can mute subtle flavors. Living soil is slower to steer but self-regulating — and most flavor-chasers land there.",
  },
];
