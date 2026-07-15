/**
 * Strain & Terpene knowledge base — grower-focused.
 * Educational, general reference compiled from widely-published community
 * and seed-bank information. THC ranges and effects vary by phenotype,
 * grow, and individual; nothing here is medical advice.
 */

export type Terp =
  | "myrcene"
  | "limonene"
  | "caryophyllene"
  | "pinene"
  | "terpinolene"
  | "linalool"
  | "humulene";

export type Effect =
  | "relaxed"
  | "euphoric"
  | "uplifted"
  | "energetic"
  | "focused"
  | "creative"
  | "sleepy"
  | "hungry"
  | "happy";

export type Strain = {
  slug: string;
  name: string;
  type: "Indica" | "Sativa" | "Hybrid";
  lineage: string;
  thc: string;
  cbd: string;
  terpenes: Terp[];
  effects: Effect[];
  flavors: string[];
  flowerWeeks: string;
  yield: "Low" | "Moderate" | "High";
  height: "Short" | "Medium" | "Tall";
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  climate: "Indoor" | "Outdoor" | "Both";
  landrace?: boolean;
  summary: string;
  growNotes: string;
};

export const TERPENES: Record<
  Terp,
  { name: string; aroma: string; note: string; alsoIn: string }
> = {
  myrcene: {
    name: "Myrcene",
    aroma: "Earthy, musky, ripe fruit",
    note: "The most common cannabis terpene; associated with relaxing, heavy 'couch' character.",
    alsoIn: "Mango, hops, thyme",
  },
  limonene: {
    name: "Limonene",
    aroma: "Bright citrus, lemon, orange",
    note: "Associated with uplifted, stress-relieving character.",
    alsoIn: "Citrus rind, juniper",
  },
  caryophyllene: {
    name: "Caryophyllene",
    aroma: "Black pepper, spice, wood",
    note: "The only terpene that also binds cannabinoid receptors; peppery and warming.",
    alsoIn: "Black pepper, cloves, cinnamon",
  },
  pinene: {
    name: "Pinene",
    aroma: "Pine, rosemary, fresh forest",
    note: "Associated with alertness and clear-headedness.",
    alsoIn: "Pine needles, basil, rosemary",
  },
  terpinolene: {
    name: "Terpinolene",
    aroma: "Herbal, floral, citrus, complex",
    note: "Common in energetic sativa-leaning cultivars.",
    alsoIn: "Apples, cumin, lilac",
  },
  linalool: {
    name: "Linalool",
    aroma: "Floral, lavender, soft spice",
    note: "Associated with calming, soothing character.",
    alsoIn: "Lavender, mint",
  },
  humulene: {
    name: "Humulene",
    aroma: "Hoppy, earthy, woody",
    note: "Shares a source with hops; earthy and grounding.",
    alsoIn: "Hops, coriander, cloves",
  },
};

export const STRAINS: Strain[] = [
  {
    slug: "northern-lights",
    name: "Northern Lights",
    type: "Indica",
    lineage: "Afghani × Thai",
    thc: "16–21%",
    cbd: "<1%",
    terpenes: ["myrcene", "caryophyllene", "pinene"],
    effects: ["relaxed", "sleepy", "happy", "euphoric"],
    flavors: ["Earthy", "Sweet", "Pine"],
    flowerWeeks: "7–8 wks",
    yield: "Moderate",
    height: "Short",
    difficulty: "Beginner",
    climate: "Both",
    summary:
      "A legendary, near-indestructible indica — compact, fast, resinous, and famously forgiving. One of the best first-grow strains ever bred.",
    growNotes:
      "Short and bushy with tight internodes; handles beginner mistakes and cool climates well. Fast 7–8 week flower makes it great for the short Northeast season. Minimal training needed.",
  },
  {
    slug: "blue-dream",
    name: "Blue Dream",
    type: "Hybrid",
    lineage: "Blueberry × Haze",
    thc: "17–24%",
    cbd: "<1%",
    terpenes: ["myrcene", "pinene", "caryophyllene"],
    effects: ["euphoric", "uplifted", "creative", "relaxed"],
    flavors: ["Blueberry", "Sweet", "Herbal"],
    flowerWeeks: "9–10 wks",
    yield: "High",
    height: "Tall",
    difficulty: "Beginner",
    climate: "Both",
    summary:
      "The quintessential balanced hybrid — a gentle, berry-sweet head-and-body effect that made it one of the most popular strains in America.",
    growNotes:
      "Vigorous and high-yielding but stretches a lot — top and train it, and give it room or start flower early. Loves light and feeding. Beginner-friendly aside from managing its size.",
  },
  {
    slug: "og-kush",
    name: "OG Kush",
    type: "Hybrid",
    lineage: "Chemdawg × Hindu Kush (disputed)",
    thc: "19–26%",
    cbd: "<1%",
    terpenes: ["limonene", "myrcene", "caryophyllene"],
    effects: ["relaxed", "euphoric", "happy", "hungry"],
    flavors: ["Lemon", "Fuel", "Pine", "Earthy"],
    flowerWeeks: "8–9 wks",
    yield: "Moderate",
    height: "Medium",
    difficulty: "Intermediate",
    climate: "Indoor",
    summary:
      "The West Coast icon and parent to countless modern strains — a pungent lemon-fuel classic with a heavy, euphoric punch.",
    growNotes:
      "Can be finicky about nutrients and humidity; likes a stable indoor climate and responds well to topping/SCROG. Watch for mildew in dense colas — keep airflow up.",
  },
  {
    slug: "girl-scout-cookies",
    name: "Girl Scout Cookies (GSC)",
    type: "Hybrid",
    lineage: "OG Kush × Durban Poison",
    thc: "19–28%",
    cbd: "<1%",
    terpenes: ["caryophyllene", "limonene", "humulene"],
    effects: ["euphoric", "happy", "relaxed", "creative"],
    flavors: ["Sweet", "Mint", "Earthy", "Spice"],
    flowerWeeks: "9–10 wks",
    yield: "Moderate",
    height: "Medium",
    difficulty: "Intermediate",
    climate: "Both",
    summary:
      "A modern powerhouse and prolific parent (Wedding Cake, Gelato) — dessert-sweet with a potent, long-lasting high.",
    growNotes:
      "Purples up in cooler finishing temps. Moderate feeder; benefits from defoliation for airflow. Potency rewards good trichome-timed harvests.",
  },
  {
    slug: "sour-diesel",
    name: "Sour Diesel",
    type: "Sativa",
    lineage: "Chemdawg × Super Skunk",
    thc: "19–25%",
    cbd: "<1%",
    terpenes: ["limonene", "caryophyllene", "myrcene"],
    effects: ["energetic", "uplifted", "focused", "creative"],
    flavors: ["Diesel", "Citrus", "Skunk"],
    flowerWeeks: "10–11 wks",
    yield: "Moderate",
    height: "Tall",
    difficulty: "Advanced",
    climate: "Indoor",
    summary:
      "The pungent, fast-acting sativa that defined 'diesel' — energizing, cerebral, and famously loud.",
    growNotes:
      "Long flowering and very stretchy — needs height, training, and patience. Strong odor; a good carbon filter is mandatory. Best for growers with a run or two of experience.",
  },
  {
    slug: "granddaddy-purple",
    name: "Granddaddy Purple",
    type: "Indica",
    lineage: "Purple Urkle × Big Bud",
    thc: "17–23%",
    cbd: "<1%",
    terpenes: ["myrcene", "linalool", "caryophyllene"],
    effects: ["relaxed", "sleepy", "happy", "hungry"],
    flavors: ["Grape", "Berry", "Sweet"],
    flowerWeeks: "8–9 wks",
    yield: "High",
    height: "Medium",
    difficulty: "Intermediate",
    climate: "Both",
    summary:
      "The famous purple indica — grape-candy aroma, dense colas, and a deeply relaxing nighttime effect.",
    growNotes:
      "Develops vivid purple in cooler late-flower nights. Big, heavy buds need support (stakes/yoyos) and good airflow to avoid rot. Rewards a proper cure.",
  },
  {
    slug: "white-widow",
    name: "White Widow",
    type: "Hybrid",
    lineage: "Brazilian Sativa × South Indian Indica",
    thc: "18–25%",
    cbd: "<1%",
    terpenes: ["myrcene", "caryophyllene", "pinene"],
    effects: ["euphoric", "uplifted", "happy", "relaxed"],
    flavors: ["Earthy", "Woody", "Spice"],
    flowerWeeks: "8–9 wks",
    yield: "High",
    height: "Medium",
    difficulty: "Beginner",
    climate: "Both",
    summary:
      "A frosty 90s Dutch classic — resin-drenched, balanced, resilient, and beginner-forgiving.",
    growNotes:
      "Extremely resinous and mold/pest resistant, which makes it forgiving indoors and out. Handles cooler climates; a reliable, high-yielding staple.",
  },
  {
    slug: "jack-herer",
    name: "Jack Herer",
    type: "Sativa",
    lineage: "Haze × (Northern Lights #5 × Shiva Skunk)",
    thc: "18–24%",
    cbd: "<1%",
    terpenes: ["terpinolene", "pinene", "caryophyllene"],
    effects: ["energetic", "focused", "creative", "uplifted"],
    flavors: ["Pine", "Citrus", "Spice"],
    flowerWeeks: "9–10 wks",
    yield: "Moderate",
    height: "Tall",
    difficulty: "Intermediate",
    climate: "Both",
    summary:
      "A spicy-pine sativa named for the cannabis activist — clear, functional, creative energy.",
    growNotes:
      "Multiple phenotypes exist; select for the one you like. Stretchy and vigorous — train early. A rewarding, aromatic daytime strain.",
  },
  {
    slug: "gorilla-glue-4",
    name: "Gorilla Glue #4 (GG4)",
    type: "Hybrid",
    lineage: "Chem's Sister × Sour Dubb × Chocolate Diesel",
    thc: "23–28%",
    cbd: "<1%",
    terpenes: ["caryophyllene", "limonene", "myrcene"],
    effects: ["relaxed", "euphoric", "happy", "sleepy"],
    flavors: ["Fuel", "Chocolate", "Pine", "Sour"],
    flowerWeeks: "8–9 wks",
    yield: "High",
    height: "Medium",
    difficulty: "Beginner",
    climate: "Both",
    summary:
      "An ultra-sticky, hard-hitting modern hybrid — trichome-caked buds and a heavy, gluing effect.",
    growNotes:
      "Resin so thick it 'glues' your scissors. Vigorous and high-yielding with good structure; forgiving enough for confident beginners. Great for hash/rosin lovers.",
  },
  {
    slug: "green-crack",
    name: "Green Crack",
    type: "Sativa",
    lineage: "Skunk #1 phenotype",
    thc: "16–22%",
    cbd: "<1%",
    terpenes: ["myrcene", "caryophyllene", "pinene"],
    effects: ["energetic", "focused", "uplifted", "happy"],
    flavors: ["Mango", "Citrus", "Earthy"],
    flowerWeeks: "7–9 wks",
    yield: "High",
    height: "Medium",
    difficulty: "Beginner",
    climate: "Both",
    summary:
      "A sharp, daytime energy sativa (also called Green Crush) — tangy mango aroma and an alert, focused buzz.",
    growNotes:
      "Fast-flowering for a sativa and high-yielding — a good sativa choice for the shorter season. Easy to grow; benefits from light training.",
  },
  {
    slug: "durban-poison",
    name: "Durban Poison",
    type: "Sativa",
    lineage: "South African landrace",
    thc: "17–24%",
    cbd: "<1%",
    terpenes: ["terpinolene", "limonene", "myrcene"],
    effects: ["energetic", "focused", "creative", "uplifted"],
    flavors: ["Anise", "Sweet", "Pine"],
    flowerWeeks: "8–9 wks",
    yield: "Moderate",
    height: "Tall",
    difficulty: "Intermediate",
    climate: "Both",
    landrace: true,
    summary:
      "A pure African landrace sativa — clear, buzzy, 'espresso of cannabis' energy and a distinctive sweet-anise aroma.",
    growNotes:
      "Vigorous and resinous for a landrace, with chunky buds unusual for a sativa. Finishes faster than most sativas — viable outdoors in cooler climates. A parent of GSC.",
  },
  {
    slug: "afghani",
    name: "Afghani",
    type: "Indica",
    lineage: "Afghanistan landrace",
    thc: "16–21%",
    cbd: "1–4%",
    terpenes: ["myrcene", "caryophyllene", "linalool"],
    effects: ["relaxed", "sleepy", "happy", "hungry"],
    flavors: ["Earthy", "Hash", "Sweet"],
    flowerWeeks: "7–8 wks",
    yield: "High",
    height: "Short",
    difficulty: "Beginner",
    climate: "Both",
    landrace: true,
    summary:
      "A foundational hash-plant landrace behind countless modern indicas — resinous, sturdy, and deeply relaxing.",
    growNotes:
      "The genetic bedrock of indica breeding. Short, sturdy, fast, and heavy-resin — excellent for hash and for cool, short seasons. Very beginner-friendly.",
  },
  {
    slug: "wedding-cake",
    name: "Wedding Cake",
    type: "Hybrid",
    lineage: "Triangle Kush × Animal Mints",
    thc: "22–27%",
    cbd: "<1%",
    terpenes: ["caryophyllene", "limonene", "myrcene"],
    effects: ["relaxed", "euphoric", "happy", "hungry"],
    flavors: ["Vanilla", "Sweet", "Earthy", "Pepper"],
    flowerWeeks: "8–9 wks",
    yield: "Moderate",
    height: "Medium",
    difficulty: "Intermediate",
    climate: "Indoor",
    summary:
      "A rich, tangy-sweet modern indica-leaning hybrid — potent, relaxing, and dessert-flavored.",
    growNotes:
      "Dense, frosty buds want strong airflow and defoliation to avoid rot. Moderate feeder; rewards careful humidity control in flower. High potency.",
  },
  {
    slug: "gelato",
    name: "Gelato",
    type: "Hybrid",
    lineage: "Sunset Sherbet × Thin Mint GSC",
    thc: "20–26%",
    cbd: "<1%",
    terpenes: ["caryophyllene", "limonene", "linalool"],
    effects: ["euphoric", "relaxed", "happy", "creative"],
    flavors: ["Sweet", "Berry", "Citrus", "Cream"],
    flowerWeeks: "8–9 wks",
    yield: "Moderate",
    height: "Medium",
    difficulty: "Advanced",
    climate: "Indoor",
    summary:
      "A dessert-line superstar — creamy, fruity, colorful, and potent, and the parent of countless 'za' strains.",
    growNotes:
      "Beautiful color and bag appeal but can be demanding — precise feeding and a stable indoor climate bring out the best. Not the most forgiving; best after a grow or two.",
  },
];

export function getStrain(slug: string): Strain | undefined {
  return STRAINS.find((s) => s.slug === slug);
}
