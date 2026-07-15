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
  {
    slug: "runtz",
    name: "Runtz",
    type: "Hybrid",
    lineage: "Zkittlez × Gelato",
    thc: "19–29%",
    cbd: "<1%",
    terpenes: ["limonene", "caryophyllene", "linalool"],
    effects: ["euphoric", "happy", "relaxed", "uplifted"],
    flavors: ["Candy", "Fruit", "Sweet", "Tropical"],
    flowerWeeks: "8–9 wks",
    yield: "Moderate",
    height: "Medium",
    difficulty: "Advanced",
    climate: "Indoor",
    summary:
      "The candy-sweet modern hype strain — fruity, colorful, potent, and beautifully frosted.",
    growNotes:
      "High bag appeal with rainbow colors in cool finishes, but a fussy feeder that rewards a stable, dialed indoor room. Defoliate for airflow; best for experienced growers chasing looks and terps.",
  },
  {
    slug: "zkittlez",
    name: "Zkittlez",
    type: "Hybrid",
    lineage: "Grape Ape × Grapefruit",
    thc: "16–23%",
    cbd: "<1%",
    terpenes: ["caryophyllene", "humulene", "linalool"],
    effects: ["relaxed", "happy", "euphoric", "focused"],
    flavors: ["Tropical", "Berry", "Grape", "Candy"],
    flowerWeeks: "8–9 wks",
    yield: "Moderate",
    height: "Short",
    difficulty: "Intermediate",
    climate: "Both",
    summary:
      "An award-winning candy-fruit indica-leaner — calm, clear, and bursting with sweet flavor.",
    growNotes:
      "Short and bushy with dense, colorful buds; manageable size suits small tents. Good mold resistance for its density, but keep airflow up. A parent of Runtz.",
  },
  {
    slug: "purple-punch",
    name: "Purple Punch",
    type: "Indica",
    lineage: "Larry OG × Granddaddy Purple",
    thc: "18–25%",
    cbd: "<1%",
    terpenes: ["caryophyllene", "myrcene", "pinene"],
    effects: ["relaxed", "sleepy", "happy", "hungry"],
    flavors: ["Grape", "Blueberry", "Candy", "Vanilla"],
    flowerWeeks: "7–8 wks",
    yield: "Moderate",
    height: "Short",
    difficulty: "Beginner",
    climate: "Both",
    summary:
      "A dessert indica — grape-candy and blueberry-muffin sweetness with a heavy, sleepy finish.",
    growNotes:
      "Fast, short, and colorful — purples hard in cool late flower. Sturdy and beginner-friendly; big dense colas want support and airflow to avoid rot.",
  },
  {
    slug: "bruce-banner",
    name: "Bruce Banner",
    type: "Hybrid",
    lineage: "OG Kush × Strawberry Diesel",
    thc: "24–29%",
    cbd: "<1%",
    terpenes: ["myrcene", "caryophyllene", "limonene"],
    effects: ["euphoric", "energetic", "creative", "happy"],
    flavors: ["Diesel", "Strawberry", "Earthy"],
    flowerWeeks: "9–10 wks",
    yield: "High",
    height: "Tall",
    difficulty: "Intermediate",
    climate: "Both",
    summary:
      "One of the most potent hybrids ever tested — a fast, euphoric, sativa-leaning rush named for the Hulk.",
    growNotes:
      "Vigorous and high-yielding but stretchy — top and trellis it. Heavy feeder that rewards strong light. Big producer for confident growers.",
  },
  {
    slug: "pineapple-express",
    name: "Pineapple Express",
    type: "Hybrid",
    lineage: "Trainwreck × Hawaiian",
    thc: "18–25%",
    cbd: "<1%",
    terpenes: ["caryophyllene", "limonene", "pinene"],
    effects: ["energetic", "uplifted", "creative", "happy"],
    flavors: ["Pineapple", "Tropical", "Pine", "Citrus"],
    flowerWeeks: "8–9 wks",
    yield: "Moderate",
    height: "Medium",
    difficulty: "Beginner",
    climate: "Both",
    summary:
      "The famous tropical daytime hybrid — bright pineapple aroma and an active, social buzz.",
    growNotes:
      "Approachable and resilient with a manageable size. Good mold resistance; a solid, flavorful choice for newer growers who want an uplifting result.",
  },
  {
    slug: "bubba-kush",
    name: "Bubba Kush",
    type: "Indica",
    lineage: "OG Kush × (Northern Lights-related)",
    thc: "15–22%",
    cbd: "<1%",
    terpenes: ["caryophyllene", "myrcene", "limonene"],
    effects: ["relaxed", "sleepy", "hungry", "happy"],
    flavors: ["Coffee", "Chocolate", "Earthy", "Hash"],
    flowerWeeks: "8–9 wks",
    yield: "Moderate",
    height: "Short",
    difficulty: "Beginner",
    climate: "Both",
    summary:
      "A classic heavy indica — coffee-and-cocoa aroma with a deeply tranquilizing, nighttime effect.",
    growNotes:
      "Short, stocky, and bushy with chunky buds — ideal for small spaces and beginners. Slow, squat structure needs little training. Great for cool climates.",
  },
  {
    slug: "chemdawg",
    name: "Chemdawg",
    type: "Hybrid",
    lineage: "Unknown (legendary, ~Nepali/Thai)",
    thc: "18–25%",
    cbd: "<1%",
    terpenes: ["caryophyllene", "myrcene", "limonene"],
    effects: ["euphoric", "relaxed", "creative", "happy"],
    flavors: ["Diesel", "Chemical", "Pine", "Earthy"],
    flowerWeeks: "9–10 wks",
    yield: "Moderate",
    height: "Tall",
    difficulty: "Advanced",
    climate: "Indoor",
    summary:
      "The pungent, mysterious parent of Sour Diesel and OG Kush — sharp diesel-chem aroma and a potent, balanced high.",
    growNotes:
      "Loud odor demands a strong carbon filter. Stretchy and a bit finicky — a stable indoor room and training bring out its best. A true genetic cornerstone.",
  },
  {
    slug: "ak-47",
    name: "AK-47",
    type: "Hybrid",
    lineage: "Colombian × Mexican × Thai × Afghani",
    thc: "16–22%",
    cbd: "<1%",
    terpenes: ["myrcene", "caryophyllene", "pinene"],
    effects: ["uplifted", "relaxed", "happy", "creative"],
    flavors: ["Earthy", "Floral", "Sour", "Sandalwood"],
    flowerWeeks: "8–9 wks",
    yield: "High",
    height: "Medium",
    difficulty: "Beginner",
    climate: "Both",
    summary:
      "A long-running multi-award winner — a mellow, steady, one-hit-wonder buzz from four-continent landrace genetics.",
    growNotes:
      "Easy, vigorous, and high-yielding with strong resistance — a genuine beginner favorite. Strong smell in flower despite the gentle name; scrub the air.",
  },
  {
    slug: "amnesia-haze",
    name: "Amnesia Haze",
    type: "Sativa",
    lineage: "Cambodian × Laotian × Jamaican × Afghani/Hawaiian",
    thc: "20–25%",
    cbd: "<1%",
    terpenes: ["terpinolene", "limonene", "myrcene"],
    effects: ["uplifted", "energetic", "euphoric", "creative"],
    flavors: ["Citrus", "Lemon", "Earthy", "Spicy"],
    flowerWeeks: "10–11 wks",
    yield: "High",
    height: "Tall",
    difficulty: "Intermediate",
    climate: "Both",
    summary:
      "A soaring, cerebral haze that's a coffeeshop legend — bright citrus energy and a long, buzzy head high.",
    growNotes:
      "Long flower and big sativa stretch — give it warmth, height, and training. Rewards patience with heavy yields; not for the impatient first-timer.",
  },
  {
    slug: "super-silver-haze",
    name: "Super Silver Haze",
    type: "Sativa",
    lineage: "Skunk × Northern Lights × Haze",
    thc: "18–23%",
    cbd: "<1%",
    terpenes: ["terpinolene", "limonene", "myrcene"],
    effects: ["energetic", "uplifted", "creative", "happy"],
    flavors: ["Citrus", "Skunk", "Herbal", "Sweet"],
    flowerWeeks: "10–11 wks",
    yield: "High",
    height: "Tall",
    difficulty: "Intermediate",
    climate: "Both",
    summary:
      "A multi-Cup-winning haze that balances skunky body with a bright, energizing sativa lift.",
    growNotes:
      "Vigorous and tall with a long flower — manage height early and keep the room warm. Big yields for the space if you train the canopy flat.",
  },
  {
    slug: "trainwreck",
    name: "Trainwreck",
    type: "Hybrid",
    lineage: "Mexican × Thai × Afghani",
    thc: "18–25%",
    cbd: "<1%",
    terpenes: ["terpinolene", "pinene", "myrcene"],
    effects: ["euphoric", "uplifted", "creative", "happy"],
    flavors: ["Lemon", "Pine", "Spicy", "Earthy"],
    flowerWeeks: "8–10 wks",
    yield: "High",
    height: "Tall",
    difficulty: "Intermediate",
    climate: "Both",
    summary:
      "A fast-hitting, sativa-leaning hybrid — a rush of lemon-pine euphoria that comes on like its namesake.",
    growNotes:
      "Fast, vigorous, and forgiving of heat. Stretches hard in early flower; top and train to keep the colas even. Strong yields indoors or out.",
  },
  {
    slug: "skywalker-og",
    name: "Skywalker OG",
    type: "Indica",
    lineage: "Skywalker × OG Kush",
    thc: "20–25%",
    cbd: "<1%",
    terpenes: ["myrcene", "caryophyllene", "limonene"],
    effects: ["relaxed", "sleepy", "happy", "euphoric"],
    flavors: ["Diesel", "Spicy", "Herbal", "Blueberry"],
    flowerWeeks: "8–9 wks",
    yield: "Moderate",
    height: "Medium",
    difficulty: "Intermediate",
    climate: "Both",
    summary:
      "A heavy, dreamy OG cross — spicy diesel up front, a deeply relaxing body-and-mind sedation to finish.",
    growNotes:
      "Classic OG structure: give it airflow and a strong filter for the diesel funk. Responds well to topping and a light defoliation for penetration.",
  },
  {
    slug: "do-si-dos",
    name: "Do-Si-Dos",
    type: "Indica",
    lineage: "Girl Scout Cookies × Face Off OG",
    thc: "25–30%",
    cbd: "<1%",
    terpenes: ["limonene", "caryophyllene", "linalool"],
    effects: ["relaxed", "sleepy", "euphoric", "happy"],
    flavors: ["Sweet", "Earthy", "Floral", "Mint"],
    flowerWeeks: "9–10 wks",
    yield: "Moderate",
    height: "Medium",
    difficulty: "Intermediate",
    climate: "Both",
    summary:
      "A cookies-descended powerhouse — very high potency with a floral-sweet nose and a couch-locking finish.",
    growNotes:
      "Frosty and resin-heavy — great for solventless. Feeds heavy; watch for nute burn. Dense buds need airflow late to avoid bud rot.",
  },
  {
    slug: "mimosa",
    name: "Mimosa",
    type: "Hybrid",
    lineage: "Clementine × Purple Punch",
    thc: "19–27%",
    cbd: "<1%",
    terpenes: ["limonene", "myrcene", "pinene"],
    effects: ["uplifted", "energetic", "happy", "focused"],
    flavors: ["Citrus", "Orange", "Tropical", "Sweet"],
    flowerWeeks: "8–9 wks",
    yield: "Moderate",
    height: "Medium",
    difficulty: "Intermediate",
    climate: "Both",
    summary:
      "A bright, orange-forward daytime hybrid — uplifting and clear, like the brunch cocktail it's named for.",
    growNotes:
      "Loves light and a longer veg. Some phenos throw color in the cold. Keep humidity moderate in flower to protect the citrus terps.",
  },
  {
    slug: "tangie",
    name: "Tangie",
    type: "Sativa",
    lineage: "California Orange × Skunk",
    thc: "19–22%",
    cbd: "<1%",
    terpenes: ["limonene", "myrcene", "pinene"],
    effects: ["uplifted", "energetic", "creative", "happy"],
    flavors: ["Orange", "Tangerine", "Citrus", "Sweet"],
    flowerWeeks: "9–10 wks",
    yield: "Moderate",
    height: "Tall",
    difficulty: "Intermediate",
    climate: "Both",
    summary:
      "The tangerine terp bomb — an intensely citrus sativa that spawned a generation of orange-flavored crosses.",
    growNotes:
      "Tall and stretchy — top early and train. That famous orange nose is loud, so run a filter. Rewards a warm, bright room.",
  },
  {
    slug: "strawberry-cough",
    name: "Strawberry Cough",
    type: "Sativa",
    lineage: "Strawberry Fields × Haze (disputed)",
    thc: "15–20%",
    cbd: "<1%",
    terpenes: ["myrcene", "pinene", "caryophyllene"],
    effects: ["uplifted", "happy", "euphoric", "focused"],
    flavors: ["Strawberry", "Berry", "Sweet", "Earthy"],
    flowerWeeks: "9–10 wks",
    yield: "Moderate",
    height: "Tall",
    difficulty: "Beginner",
    climate: "Both",
    summary:
      "A sweet strawberry sativa with a smooth, social, clear-headed lift — famous for its berry-candy smoke.",
    growNotes:
      "Forgiving and mold-resistant for a sativa — a friendly step up from indicas. Give it height; the sweet berry nose is a joy to grow.",
  },
  {
    slug: "cheese",
    name: "Cheese",
    type: "Hybrid",
    lineage: "Skunk #1 phenotype (UK)",
    thc: "15–20%",
    cbd: "<1%",
    terpenes: ["myrcene", "caryophyllene", "humulene"],
    effects: ["relaxed", "happy", "euphoric", "hungry"],
    flavors: ["Cheese", "Pungent", "Earthy", "Sour"],
    flowerWeeks: "8–9 wks",
    yield: "High",
    height: "Medium",
    difficulty: "Beginner",
    climate: "Both",
    summary:
      "The unmistakable UK Cheese — a sharp, savory, tangy funk over a balanced, mellow body high.",
    growNotes:
      "Loud, funky odor — a carbon filter is non-negotiable. Otherwise easy, stable, and high-yielding; a great forgiving grow.",
  },
  {
    slug: "grape-ape",
    name: "Grape Ape",
    type: "Indica",
    lineage: "Mendocino Purps × Skunk × Afghani",
    thc: "18–23%",
    cbd: "<1%",
    terpenes: ["myrcene", "caryophyllene", "linalool"],
    effects: ["relaxed", "sleepy", "happy", "euphoric"],
    flavors: ["Grape", "Berry", "Sweet", "Earthy"],
    flowerWeeks: "7–8 wks",
    yield: "Moderate",
    height: "Short",
    difficulty: "Beginner",
    climate: "Both",
    summary:
      "A grape-candy indica that often finishes deep purple — heavy, calming, and great for winding down.",
    growNotes:
      "Short and manageable — good for tents and closets. Cooler nights in late flower coax out the purple. Fast finisher.",
  },
  {
    slug: "la-confidential",
    name: "LA Confidential",
    type: "Indica",
    lineage: "OG LA Affie × Afghani",
    thc: "18–24%",
    cbd: "<1%",
    terpenes: ["myrcene", "pinene", "limonene"],
    effects: ["relaxed", "sleepy", "euphoric", "happy"],
    flavors: ["Pine", "Earthy", "Skunk", "Spicy"],
    flowerWeeks: "8 wks",
    yield: "High",
    height: "Short",
    difficulty: "Beginner",
    climate: "Both",
    summary:
      "A pure-indica classic — fast, compact, and heavy-hitting with a piney-skunk nose and strong yields.",
    growNotes:
      "Short, fast, and high-yielding — an ideal indoor indica. Very beginner-friendly; just keep late-flower airflow up on the dense colas.",
  },
  {
    slug: "maui-wowie",
    name: "Maui Wowie",
    type: "Sativa",
    lineage: "Hawaiian landrace heritage",
    thc: "15–20%",
    cbd: "<1%",
    terpenes: ["myrcene", "limonene", "pinene"],
    effects: ["uplifted", "energetic", "creative", "happy"],
    flavors: ["Pineapple", "Tropical", "Citrus", "Earthy"],
    flowerWeeks: "9–11 wks",
    yield: "Moderate",
    height: "Tall",
    difficulty: "Intermediate",
    climate: "Outdoor",
    summary:
      "The classic island sativa — a tropical, pineapple-sweet high that's light, creative, and endlessly sunny.",
    growNotes:
      "Loves heat, sun, and room to stretch — a natural outdoor plant in warm climates. Long flower; give it a full season or a warm, tall tent.",
  },
  {
    slug: "hindu-kush",
    name: "Hindu Kush",
    type: "Indica",
    lineage: "Hindu Kush mountains landrace",
    thc: "15–20%",
    cbd: "<1%",
    terpenes: ["myrcene", "caryophyllene", "limonene"],
    effects: ["relaxed", "sleepy", "happy"],
    flavors: ["Earthy", "Sandalwood", "Sweet", "Hash"],
    flowerWeeks: "7–8 wks",
    yield: "Moderate",
    height: "Short",
    difficulty: "Beginner",
    climate: "Both",
    landrace: true,
    summary:
      "A foundational pure-indica landrace from the mountains between Afghanistan and Pakistan — the genetic root of countless hash plants.",
    growNotes:
      "Bred for harsh mountains: hardy, compact, mold- and cold-resistant, and fast. Thick resin makes it a hash and rosin favorite. Beginner-proof.",
  },
  {
    slug: "acapulco-gold",
    name: "Acapulco Gold",
    type: "Sativa",
    lineage: "Mexican landrace (Acapulco)",
    thc: "15–23%",
    cbd: "<1%",
    terpenes: ["caryophyllene", "pinene", "myrcene"],
    effects: ["uplifted", "energetic", "euphoric", "happy"],
    flavors: ["Toffee", "Earthy", "Citrus", "Coffee"],
    flowerWeeks: "10–11 wks",
    yield: "Moderate",
    height: "Tall",
    difficulty: "Advanced",
    climate: "Outdoor",
    landrace: true,
    summary:
      "A legendary Mexican landrace — the gold-flecked, toffee-sweet sativa that defined connoisseur cannabis in the 1960s–70s.",
    growNotes:
      "A true equatorial sativa: very long flower, big stretch, and heat-loving. Hard to tame indoors — best given a long warm outdoor season and lots of room.",
  },
  {
    slug: "cherry-pie",
    name: "Cherry Pie",
    type: "Hybrid",
    lineage: "Granddaddy Purple × Durban Poison",
    thc: "16–24%",
    cbd: "<1%",
    terpenes: ["caryophyllene", "myrcene", "limonene"],
    effects: ["relaxed", "happy", "euphoric", "uplifted"],
    flavors: ["Cherry", "Sweet", "Berry", "Earthy"],
    flowerWeeks: "8–9 wks",
    yield: "Moderate",
    height: "Medium",
    difficulty: "Intermediate",
    climate: "Both",
    summary:
      "A sweet-and-sour cherry hybrid — balanced, mellow, and mood-lifting, with a dessert nose and easygoing body.",
    growNotes:
      "Balanced structure and a moderate stretch. Cool finishing nights can push cherry-purple hues. A solid, versatile grow indoors or out.",
  },
  {
    slug: "sunset-sherbet",
    name: "Sunset Sherbet",
    type: "Hybrid",
    lineage: "Girl Scout Cookies × Pink Panties",
    thc: "18–24%",
    cbd: "<1%",
    terpenes: ["caryophyllene", "limonene", "linalool"],
    effects: ["relaxed", "happy", "euphoric", "uplifted"],
    flavors: ["Sweet", "Berry", "Citrus", "Creamy"],
    flowerWeeks: "8–9 wks",
    yield: "Moderate",
    height: "Medium",
    difficulty: "Intermediate",
    climate: "Both",
    summary:
      "A cookies-family dessert hybrid — creamy, sweet, and colorful, with a relaxed-but-happy balanced high.",
    growNotes:
      "Frosty and colorful with cool nights. A parent of Gelato and Sherb crosses — feeds moderately and rewards a clean canopy.",
  },
  {
    slug: "blue-cheese",
    name: "Blue Cheese",
    type: "Indica",
    lineage: "Blueberry × UK Cheese",
    thc: "15–20%",
    cbd: "<1%",
    terpenes: ["myrcene", "caryophyllene", "humulene"],
    effects: ["relaxed", "happy", "sleepy", "hungry"],
    flavors: ["Blueberry", "Cheese", "Sweet", "Earthy"],
    flowerWeeks: "8–9 wks",
    yield: "High",
    height: "Medium",
    difficulty: "Beginner",
    climate: "Both",
    summary:
      "A savory-sweet oddball that just works — blueberry meets funky cheese over a mellow, comforting indica body.",
    growNotes:
      "Hardy and high-yielding with real mold resistance from the Blueberry side. Pungent — run a filter. A very forgiving beginner indica.",
  },
  {
    slug: "super-lemon-haze",
    name: "Super Lemon Haze",
    type: "Sativa",
    lineage: "Lemon Skunk × Super Silver Haze",
    thc: "18–25%",
    cbd: "<1%",
    terpenes: ["limonene", "terpinolene", "caryophyllene"],
    effects: ["energetic", "uplifted", "creative", "happy"],
    flavors: ["Lemon", "Citrus", "Zesty", "Sweet"],
    flowerWeeks: "9–10 wks",
    yield: "High",
    height: "Tall",
    difficulty: "Intermediate",
    climate: "Both",
    summary:
      "A zesty, electric lemon sativa — a two-time Cannabis Cup winner with a bright, giggly, energetic buzz.",
    growNotes:
      "Tall and hungry with a long flower — train the canopy and feed steadily. Loud lemon terps mean a filter is a must in flower.",
  },
  {
    slug: "ice-cream-cake",
    name: "Ice Cream Cake",
    type: "Indica",
    lineage: "Wedding Cake × Gelato #33",
    thc: "20–25%",
    cbd: "<1%",
    terpenes: ["caryophyllene", "limonene", "linalool"],
    effects: ["relaxed", "sleepy", "happy", "euphoric"],
    flavors: ["Vanilla", "Creamy", "Sweet", "Nutty"],
    flowerWeeks: "8–9 wks",
    yield: "Moderate",
    height: "Short",
    difficulty: "Intermediate",
    climate: "Both",
    summary:
      "A rich, creamy dessert indica — vanilla-cake sweetness over a heavy, sedating, deeply relaxing body high.",
    growNotes:
      "Short and bushy with dense, frosty buds — keep late-flower airflow high to prevent rot. Excellent resin for rosin. Feeds moderately.",
  },
  {
    slug: "gushers",
    name: "Gushers",
    type: "Hybrid",
    lineage: "Gelato #41 × Triangle Kush",
    thc: "18–25%",
    cbd: "<1%",
    terpenes: ["caryophyllene", "limonene", "humulene"],
    effects: ["relaxed", "happy", "euphoric", "hungry"],
    flavors: ["Tropical", "Fruity", "Sweet", "Sour"],
    flowerWeeks: "8–9 wks",
    yield: "Moderate",
    height: "Medium",
    difficulty: "Intermediate",
    climate: "Both",
    summary:
      "A fruity, candy-sweet cookies-family hybrid — a mellow, giggly, indica-leaning balance with a tropical nose.",
    growNotes:
      "Colorful and frosty with cool nights. Moderate feeder with dense buds; keep humidity in check late. Great flavor for solventless.",
  },
];

export function getStrain(slug: string): Strain | undefined {
  return STRAINS.find((s) => s.slug === slug);
}

export type StrainSort = "featured" | "thc-desc" | "flower-asc" | "name-asc";

/** Upper bound of a THC range like "16–22%" or "<1%" → number for sorting. */
export function thcCeiling(s: Strain): number {
  const nums = s.thc.match(/\d+/g)?.map(Number);
  return nums && nums.length ? Math.max(...nums) : 0;
}

/** Fastest week of a flower range like "8–9 wks" or "10–11 wks" → number. */
export function flowerWeeksMin(s: Strain): number {
  const nums = s.flowerWeeks.match(/\d+/g)?.map(Number);
  return nums && nums.length ? Math.min(...nums) : Number.POSITIVE_INFINITY;
}

/** Non-mutating sort. "featured" preserves the curated array order. */
export function sortStrains(list: Strain[], sort: StrainSort): Strain[] {
  const out = [...list];
  switch (sort) {
    case "thc-desc":
      return out.sort(
        (a, b) => thcCeiling(b) - thcCeiling(a) || a.name.localeCompare(b.name),
      );
    case "flower-asc":
      return out.sort(
        (a, b) =>
          flowerWeeksMin(a) - flowerWeeksMin(b) || a.name.localeCompare(b.name),
      );
    case "name-asc":
      return out.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return out;
  }
}

/**
 * The single source of truth for strain↔guide relevance. Each rule answers
 * one question — "does this guide suit this strain?" — and is used in BOTH
 * directions, so the forward links (on a strain page) and the reverse links
 * (on a guide page) can never contradict each other. Rules are topical: one
 * per grow dimension (climate, structure, difficulty), mutually exclusive
 * within a dimension. The universal setup/harvest/cure guides are bookends
 * added only to the forward view — they'd match all 42 strains in reverse,
 * which isn't a useful "strains for this guide" list.
 */
const GUIDE_RULES: { slug: string; suits: (s: Strain) => boolean }[] = [
  { slug: "outdoor-grow-season", suits: (s) => s.climate === "Outdoor" },
  { slug: "lighting-basics-ppfd", suits: (s) => s.climate === "Indoor" },
  { slug: "indoor-vs-outdoor", suits: (s) => s.climate === "Both" },
  { slug: "topping-fim-mainlining", suits: (s) => s.height === "Tall" },
  { slug: "low-stress-training-lst", suits: (s) => s.height !== "Tall" },
  { slug: "pests-mites-gnats-mildew", suits: (s) => s.difficulty === "Advanced" },
  { slug: "temp-humidity-vpd", suits: (s) => s.difficulty === "Intermediate" },
  { slug: "first-grow-equipment", suits: (s) => s.difficulty === "Beginner" },
];

/**
 * Grow guides most relevant to a given strain, ordered along the grow arc
 * (setup → environment → training → risk → harvest → cure). No per-strain
 * curation — it scales as the guide library grows. The caller resolves these
 * slugs to real guides and drops any that don't exist.
 */
export function relatedGuideSlugs(s: Strain): string[] {
  const topical = GUIDE_RULES.filter((r) => r.suits(s)).map((r) => r.slug);
  return [
    "setting-up-your-grow-space",
    ...topical,
    "when-to-harvest-trichomes",
    "drying-and-curing",
  ];
}

/**
 * Reverse of {@link relatedGuideSlugs}: the strains a given guide is most
 * relevant to. Returns [] for guides with no topical rule (e.g. germination
 * or edibles guides, which aren't strain-selection topics).
 */
export function strainsForGuide(guideSlug: string): Strain[] {
  const rule = GUIDE_RULES.find((r) => r.slug === guideSlug);
  if (!rule) return [];
  return STRAINS.filter((s) => rule.suits(s));
}
