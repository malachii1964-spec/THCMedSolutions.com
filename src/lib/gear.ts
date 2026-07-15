/**
 * The Gear Index — the ~100 staple products of non-commercial home cannabis
 * cultivation, indoor and outdoor. Curated from long-running community
 * consensus (these brands/products have anchored home growing for years).
 * No prices — tiers instead ($ budget, $$ mid, $$$ premium) so the list
 * stays honest as prices move. Verify current models before buying.
 */

export type GearItem = {
  name: string;
  tier: "$" | "$$" | "$$$";
  envs: ("indoor" | "outdoor")[];
  note: string;
};

export type GearCategory = {
  id: string;
  name: string;
  blurb: string;
  items: GearItem[];
};

export const GEAR_UPDATED = "July 2026";

export const GEAR: GearCategory[] = [
  {
    id: "lights",
    name: "Grow Lights",
    blurb: "The yield-maker. 30–40 real watts per square foot of canopy.",
    items: [
      { name: "Spider Farmer SF1000 (100W)", tier: "$", envs: ["indoor"], note: "The default first light for a 2x2 — Samsung diodes, dimmable." },
      { name: "Mars Hydro TS1000 (150W)", tier: "$", envs: ["indoor"], note: "Budget classic; runs a 2x2 to 2.5x2.5 honestly." },
      { name: "Spider Farmer SF2000 (200W)", tier: "$$", envs: ["indoor"], note: "The 2x4 workhorse; bar-adjacent board layout." },
      { name: "Mars Hydro FC-E3000 (300W)", tier: "$$", envs: ["indoor"], note: "Bar-style spread for even 3x3 coverage." },
      { name: "AC Infinity IONBOARD S24 (240W)", tier: "$$", envs: ["indoor"], note: "Integrates with their controller ecosystem." },
      { name: "AC Infinity IONFRAME EVO4 (300W)", tier: "$$$", envs: ["indoor"], note: "Bar light with app dimming/scheduling built in." },
      { name: "HLG 260W XL QB Kit", tier: "$$$", envs: ["indoor"], note: "US-built kit; the quantum-board original, buy-once quality." },
      { name: "Vivosun VS1000 (100W)", tier: "$", envs: ["indoor"], note: "Frequent-sale alternative to the SF1000." },
      { name: "Photontek X2 250W PRO", tier: "$$$", envs: ["indoor"], note: "High-efficiency bar fixture for serious 2x4/3x3 runs." },
    ],
  },
  {
    id: "tents",
    name: "Tents & Space",
    blurb: "Cheap tents are fine — spend the savings on the light.",
    items: [
      { name: "AC Infinity CLOUDLAB 422 (2x2)", tier: "$$", envs: ["indoor"], note: "Thick poles, quality zippers; the premium small tent." },
      { name: "AC Infinity CLOUDLAB 642 (2x4)", tier: "$$", envs: ["indoor"], note: "The sweet-spot size for 2 plants." },
      { name: "Vivosun 2x4x60 tent", tier: "$", envs: ["indoor"], note: "The budget default; millions grown in these." },
      { name: "Mars Hydro 4x4 tent", tier: "$", envs: ["indoor"], note: "Solid value at the 4-plant size." },
      { name: "Spider Farmer 2x2 tent", tier: "$", envs: ["indoor"], note: "Often bundled with the SF1000 at a discount." },
      { name: "Gorilla Grow Tent 4x4", tier: "$$$", envs: ["indoor"], note: "Tank-grade canvas + height extension kits." },
      { name: "AC Infinity CLOUDLAB 899 (4x8)", tier: "$$$", envs: ["indoor"], note: "When one tent becomes a perpetual harvest setup." },
    ],
  },
  {
    id: "climate",
    name: "Airflow & Climate",
    blurb: "Move air out, keep air moving inside, and watch the numbers.",
    items: [
      { name: "AC Infinity CLOUDLINE T4 (4\")", tier: "$$", envs: ["indoor"], note: "The exhaust fan — quiet EC motor, thermostat control." },
      { name: "AC Infinity CLOUDLINE T6 (6\")", tier: "$$", envs: ["indoor"], note: "For 4x4s and hot attics/basements." },
      { name: "AC Infinity Controller 69 PRO", tier: "$$", envs: ["indoor"], note: "Runs fans/lights/humidifier off temp+RH targets automatically." },
      { name: "AC Infinity 4\" carbon filter", tier: "$", envs: ["indoor"], note: "Australian charcoal; kills smell for a full grow+." },
      { name: "Phresh Filter 4\"", tier: "$$", envs: ["indoor"], note: "The long-running premium scrubber." },
      { name: "6\" clip-on fan (x2)", tier: "$", envs: ["indoor"], note: "Gentle leaf dance 24/7 — buy two, aim above and below canopy." },
      { name: "Vivosun 6\" oscillating tent fan", tier: "$", envs: ["indoor"], note: "Pole-mount oscillation for bigger tents." },
      { name: "Levoit 6L humidifier", tier: "$", envs: ["indoor"], note: "Seedling/veg RH; top-fill, runs days." },
      { name: "hOmeLabs 22-pint dehumidifier", tier: "$$", envs: ["indoor"], note: "Late-flower insurance — WNY summers demand one." },
      { name: "Inkbird ITC-308 outlet thermostat", tier: "$", envs: ["indoor"], note: "Cheap automation for heaters/heat mats." },
    ],
  },
  {
    id: "media",
    name: "Media & Containers",
    blurb: "The root zone: soil or coco, and fabric over plastic.",
    items: [
      { name: "Premier Pro-Mix HP", tier: "$$", envs: ["indoor", "outdoor"], note: "The peat+perlite canvas for amended/living mixes." },
      { name: "Fox Farm Ocean Forest", tier: "$$", envs: ["indoor", "outdoor"], note: "Hot out of the bag — feeds ~4 weeks; skip for seedlings." },
      { name: "Fox Farm Happy Frog", tier: "$", envs: ["indoor", "outdoor"], note: "Milder FF; good seedling and transplant soil." },
      { name: "Build A Soil 3.0 (Coots mix)", tier: "$$$", envs: ["indoor", "outdoor"], note: "The living-soil gold standard, shipped." },
      { name: "Canna Coco brick / bag", tier: "$", envs: ["indoor"], note: "Buffered coco that made the 70/30 mix famous." },
      { name: "Mother Earth perlite (#3)", tier: "$", envs: ["indoor", "outdoor"], note: "Aeration for everything; 20–30% of any mix." },
      { name: "Vivosun 5-gal fabric pots (5-pack)", tier: "$", envs: ["indoor", "outdoor"], note: "Air-pruned roots; nearly impossible to overwater badly." },
      { name: "Rain Science grow bags", tier: "$$", envs: ["indoor"], note: "Mesh bags loved by coco growers for dry-back speed." },
      { name: "Smart Pot 15–30 gal", tier: "$$", envs: ["outdoor"], note: "Outdoor beds that move — deck, patio, backyard." },
      { name: "1020 trays + inserts", tier: "$", envs: ["indoor"], note: "Seed starting and clone staging." },
    ],
  },
  {
    id: "amendments",
    name: "Organic Amendments",
    blurb: "The Soil Lab shopping list — the recipes' actual ingredients.",
    items: [
      { name: "Gaia Green All Purpose 4-4-4", tier: "$", envs: ["indoor", "outdoor"], note: "The veg half of the Canucks system." },
      { name: "Gaia Green Power Bloom 2-8-4", tier: "$", envs: ["indoor", "outdoor"], note: "The flower half; top-dress at day 30 of bloom." },
      { name: "Wiggle Worm castings 15lb", tier: "$", envs: ["indoor", "outdoor"], note: "The microbe engine of every recipe on this site." },
      { name: "Xtreme Gardening Mykos", tier: "$", envs: ["indoor", "outdoor"], note: "Mycorrhizae at every transplant — roots' best friend." },
      { name: "Xtreme Gardening Azos", tier: "$", envs: ["indoor", "outdoor"], note: "N-fixing bacteria; pairs with Mykos." },
      { name: "Down To Earth kelp meal", tier: "$", envs: ["indoor", "outdoor"], note: "K + micros + growth hormones; in every veganic mix." },
      { name: "Down To Earth alfalfa meal", tier: "$", envs: ["indoor", "outdoor"], note: "Plant-based N with triacontanol kick." },
      { name: "Down To Earth neem seed meal", tier: "$", envs: ["indoor", "outdoor"], note: "Feeds soil AND suppresses gnats/mites." },
      { name: "Down To Earth crab meal", tier: "$", envs: ["indoor", "outdoor"], note: "Chitin feeds the micro-herd; the guano-stack staple." },
      { name: "Down To Earth fish bone meal", tier: "$", envs: ["indoor", "outdoor"], note: "Bloom phosphorus, organic-style." },
      { name: "BuildASoil basalt rock dust", tier: "$", envs: ["indoor", "outdoor"], note: "Trace minerals; veganic and no-till staple." },
      { name: "Espoma garden gypsum + dolomite lime", tier: "$", envs: ["indoor", "outdoor"], note: "Ca/Mg/S and pH buffering for peat mixes." },
    ],
  },
  {
    id: "nutrients",
    name: "Bottled & Salt Nutrients",
    blurb: "For coco/hydro runs or anyone skipping amended soil.",
    items: [
      { name: "Jack's 321 (Part A+B+Epsom)", tier: "$", envs: ["indoor", "outdoor"], note: "Absurdly cheap per gallon; the salt-feed community default." },
      { name: "General Hydroponics Flora Trio", tier: "$$", envs: ["indoor"], note: "The 30-year classic 3-part." },
      { name: "Fox Farm Trio (Grow Big/Tiger/Big Bloom)", tier: "$$", envs: ["indoor", "outdoor"], note: "Soil-friendly bottles; follow at half strength." },
      { name: "Botanicare Cal-Mag Plus", tier: "$", envs: ["indoor"], note: "THE fix for LED-era rusty-spot hunger, esp. in coco." },
      { name: "Silica supplement (Armor Si / mono-silicic)", tier: "$$", envs: ["indoor", "outdoor"], note: "Stronger stems and better heat resilience." },
      { name: "Real Growers Recharge", tier: "$$", envs: ["indoor", "outdoor"], note: "Microbe shot that revives tired root zones." },
      { name: "MegaCrop one-part", tier: "$", envs: ["indoor"], note: "One scoop simplicity for salt feeders." },
      { name: "Emerald Harvest Cali Pro A/B", tier: "$$$", envs: ["indoor"], note: "Premium 2-part for dialed rooms." },
    ],
  },
  {
    id: "water",
    name: "Water & pH",
    blurb: "A $15 pen prevents 80% of 'mystery' problems.",
    items: [
      { name: "Apera PH20 pH pen", tier: "$$", envs: ["indoor", "outdoor"], note: "Accurate, calibratable, survives years — the upgrade pick." },
      { name: "Vivosun pH pen + buffer packets", tier: "$", envs: ["indoor", "outdoor"], note: "The functional budget pen; calibrate monthly." },
      { name: "GH pH Up/Down kit", tier: "$", envs: ["indoor", "outdoor"], note: "A bottle lasts a year of adjustments." },
      { name: "TDS/EC pen (HM Digital or Apera)", tier: "$", envs: ["indoor"], note: "Know your feed strength and runoff." },
      { name: "2-gal watering can w/ fine rose", tier: "$", envs: ["indoor", "outdoor"], note: "Gentle showers, no crater-blasting seedlings." },
      { name: "1-gal pump sprayer", tier: "$", envs: ["indoor", "outdoor"], note: "Foliar feeds and IPM applications." },
      { name: "RO Buddie 50GPD RO system", tier: "$$", envs: ["indoor"], note: "For hard-water homes; add Cal-Mag back." },
      { name: "Air pump + stone + 5-gal bucket", tier: "$", envs: ["indoor", "outdoor"], note: "Bubble compost teas and de-chlorinate tap water." },
    ],
  },
  {
    id: "monitoring",
    name: "Meters & Monitoring",
    blurb: "The problems happen at 4 a.m. — log everything.",
    items: [
      { name: "Govee WiFi hygrometer (2-pack)", tier: "$", envs: ["indoor"], note: "Phone alerts + min/max history; canopy and lung room." },
      { name: "60x jeweler's loupe", tier: "$", envs: ["indoor", "outdoor"], note: "The trichome harvest-timing tool. Non-negotiable." },
      { name: "USB microscope (Plugable/Carson)", tier: "$", envs: ["indoor", "outdoor"], note: "Trichome close-ups + pest ID on a big screen." },
      { name: "Infrared temp gun", tier: "$", envs: ["indoor"], note: "Leaf-surface temps — the number VPD actually cares about." },
      { name: "Photone app + diffuser cap", tier: "$", envs: ["indoor"], note: "Phone PPFD readings close enough for home grows." },
      { name: "BN-LINK mechanical timers (2-pack)", tier: "$", envs: ["indoor"], note: "Lights on schedule, zero thinking." },
      { name: "Soil moisture meter (3-in-1)", tier: "$", envs: ["outdoor"], note: "Rough but useful for beds; indoors, lift the pot instead." },
    ],
  },
  {
    id: "ipm",
    name: "Pest & Disease (IPM)",
    blurb: "Treat the day you find them — every bug compounds weekly.",
    items: [
      { name: "Yellow sticky traps (20-pack)", tier: "$", envs: ["indoor", "outdoor"], note: "Early-warning radar from day one, not a cure." },
      { name: "Mosquito Bits (BTI)", tier: "$", envs: ["indoor", "outdoor"], note: "Fungus gnat larvae killer; safe through flower." },
      { name: "Captain Jack's Deadbug (spinosad)", tier: "$", envs: ["indoor", "outdoor"], note: "Thrips/caterpillars; veg + early flower only." },
      { name: "Safer insecticidal soap", tier: "$", envs: ["indoor", "outdoor"], note: "Contact killer for soft-bodied pests; veg use." },
      { name: "Lost Coast Plant Therapy", tier: "$$", envs: ["indoor", "outdoor"], note: "Gentle mite/PM suppression the community swears by." },
      { name: "MilStop / potassium bicarbonate", tier: "$$", envs: ["indoor", "outdoor"], note: "Powdery mildew on leaves; early flower ok, never on buds." },
      { name: "Predatory mites (P. persimilis)", tier: "$$", envs: ["indoor"], note: "The only spider-mite play left in late flower." },
      { name: "Diatomaceous earth (food grade)", tier: "$", envs: ["outdoor"], note: "Soil-surface crawler barrier; reapply after rain." },
      { name: "Sluggo (iron phosphate)", tier: "$", envs: ["outdoor"], note: "Slugs/snails on outdoor seedlings, pet-safe." },
    ],
  },
  {
    id: "training",
    name: "Training & Propagation",
    blurb: "Ten dollars of ties outperforms $100 of gadgets.",
    items: [
      { name: "Soft plant ties (twist roll)", tier: "$", envs: ["indoor", "outdoor"], note: "The whole LST toolkit, honestly." },
      { name: "Plant yoyos (8-pack)", tier: "$", envs: ["indoor", "outdoor"], note: "Support heavy late-flower colas." },
      { name: "Trellis netting 4x8", tier: "$", envs: ["indoor", "outdoor"], note: "SCROG screens and outdoor support." },
      { name: "Fiskars micro-tip snips", tier: "$", envs: ["indoor", "outdoor"], note: "Clean cuts for topping and defoliation." },
      { name: "Clonex rooting gel", tier: "$", envs: ["indoor"], note: "The cloning standard since forever." },
      { name: "Rapid Rooter plugs (50)", tier: "$", envs: ["indoor"], note: "Seeds and clones both root happily in these." },
      { name: "Heat mat + Inkbird thermostat", tier: "$", envs: ["indoor"], note: "Germination and winter clones; thermostat is mandatory." },
      { name: "Humidity dome + 1020 tray", tier: "$", envs: ["indoor"], note: "Clone humidity without a misting schedule." },
      { name: "Plant labels + garden pencil", tier: "$", envs: ["indoor", "outdoor"], note: "Future-you forgets which pheno is which. Always." },
    ],
  },
  {
    id: "harvest",
    name: "Harvest, Dry & Cure",
    blurb: "A month of patience here decides the final quality.",
    items: [
      { name: "Hanging mesh drying rack", tier: "$", envs: ["indoor", "outdoor"], note: "Collapsible tiers; dry whole branches, not trays, when possible." },
      { name: "Chikamasa B-500SRF scissors", tier: "$$", envs: ["indoor", "outdoor"], note: "The trim-room legend; fingers thank you after hour two." },
      { name: "Harvest More Trim Bin", tier: "$$", envs: ["indoor", "outdoor"], note: "Catch every gram of kief while you trim." },
      { name: "Wide-mouth mason jars (qt, 12)", tier: "$", envs: ["indoor", "outdoor"], note: "The classic cure vessel." },
      { name: "Grove Bags TerpLoc (qt/gal)", tier: "$$", envs: ["indoor", "outdoor"], note: "Cure without burping — the modern alternative growers love." },
      { name: "Boveda 62% packs (12-pack)", tier: "$", envs: ["indoor", "outdoor"], note: "Locks jars at perfect cure RH; rescues over-dried bud." },
      { name: "Caliber IV mini hygrometers (x4)", tier: "$", envs: ["indoor", "outdoor"], note: "One in each jar removes all guesswork." },
      { name: "AWS 0.01g pocket scale", tier: "$", envs: ["indoor", "outdoor"], note: "Track dry weights and portions." },
      { name: "CVault stainless container", tier: "$$$", envs: ["indoor", "outdoor"], note: "Long-term storage with built-in Boveda holder." },
    ],
  },
  {
    id: "outdoor",
    name: "Outdoor & Season Extension",
    blurb: "WNY reality: late frosts, humid Augusts, and hungry critters.",
    items: [
      { name: "30-gal fabric beds", tier: "$", envs: ["outdoor"], note: "Big roots, big plants, still movable before storms." },
      { name: "Neptune's Harvest fish + seaweed", tier: "$", envs: ["outdoor"], note: "The outdoor organic feed workhorse." },
      { name: "Organza bud bags / insect netting", tier: "$", envs: ["outdoor"], note: "Caterpillar + bird defense in flower." },
      { name: "Floating row cover (frost blanket)", tier: "$", envs: ["outdoor"], note: "May and late-September WNY nights forgive nothing." },
      { name: "30% shade cloth", tier: "$", envs: ["outdoor"], note: "July heat-wave protection for potted plants." },
      { name: "Tomato cages / heavy stakes", tier: "$", envs: ["outdoor"], note: "Wind is the outdoor trainer you didn't hire." },
      { name: "Straw mulch bale", tier: "$", envs: ["outdoor"], note: "Moisture retention + soil-life blanket." },
      { name: "Hoop greenhouse kit (portable)", tier: "$$", envs: ["outdoor"], note: "Stretches the WNY season on both ends." },
      { name: "Physical critter fence ring", tier: "$$", envs: ["outdoor"], note: "Deer and rabbits love your veg stage more than you do." },
      { name: "Rain gauge", tier: "$", envs: ["outdoor"], note: "Know when nature already watered for you." },
    ],
  },
];

export const GEAR_COUNT = GEAR.reduce((a, c) => a + c.items.length, 0);
