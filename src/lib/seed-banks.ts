/**
 * Seed bank & breeder reference — reputable sources for home-grow genetics.
 * Educational, not affiliated (yet). When affiliate programs are joined,
 * add `affiliateUrl` to each entry and render it in the component.
 */

export type SeedBank = {
  slug: string;
  name: string;
  type: "seed-bank" | "breeder";
  region: string;
  ships: string;
  note: string;
  knownFor: string[];
  website?: string;
};

export const SEED_BANKS: SeedBank[] = [
  {
    slug: "north-atlantic-seed",
    name: "North Atlantic Seed Co.",
    type: "seed-bank",
    region: "Maine, USA",
    ships: "USA (fast, free shipping)",
    note: "The community favorite US retailer — wide catalog, fast shipping, freebies with every order. Carries most major breeders.",
    knownFor: ["Fast shipping", "Huge selection", "Freebies", "US-based"],
  },
  {
    slug: "multiverse-beans",
    name: "Multiverse Beans",
    type: "seed-bank",
    region: "USA",
    ships: "USA",
    note: "Growing fast in the community — strong customer service, competitive prices, generous freebie program.",
    knownFor: ["Customer service", "Freebies", "Competitive prices"],
  },
  {
    slug: "seedsman",
    name: "Seedsman",
    type: "seed-bank",
    region: "Spain / UK",
    ships: "Worldwide",
    note: "One of the largest seed banks globally. Huge catalog of breeders and their own genetics line. International shipping, though US orders can take longer.",
    knownFor: ["Massive catalog", "International", "Own genetics line"],
  },
  {
    slug: "hembra-genetics",
    name: "Hembra Genetics",
    type: "seed-bank",
    region: "USA",
    ships: "USA",
    note: "Premium US seed bank focused on quality genetics and customer experience. Strong breeder partnerships.",
    knownFor: ["Premium genetics", "US-based", "Curated catalog"],
  },
  {
    slug: "neptune-seed-bank",
    name: "Neptune Seed Bank",
    type: "seed-bank",
    region: "USA",
    ships: "USA",
    note: "Veteran US seed bank with a deep catalog of craft breeders and hard-to-find cuts.",
    knownFor: ["Craft breeders", "Rare genetics", "US shipping"],
  },
  {
    slug: "fast-buds",
    name: "Fast Buds",
    type: "breeder",
    region: "USA / Spain",
    ships: "Worldwide",
    note: "The autoflower specialists — their strains consistently finish in 8–10 weeks seed-to-harvest. Community favorite for first-time growers and perpetual harvests.",
    knownFor: ["Autoflowers", "Fast harvests", "Beginner-friendly", "Consistent genetics"],
  },
  {
    slug: "mephisto-genetics",
    name: "Mephisto Genetics",
    type: "breeder",
    region: "UK / USA",
    ships: "Worldwide (drops)",
    note: "The cult-followed autoflower breeder — limited drops sell out in minutes. Known for potent, frosty autos that rival photos.",
    knownFor: ["Premium autoflowers", "Limited drops", "Cult following", "Frosty genetics"],
  },
  {
    slug: "ethos-genetics",
    name: "Ethos Genetics",
    type: "breeder",
    region: "Colorado, USA",
    ships: "Worldwide via retailers",
    note: "Colin Gordon's breeding program — known for vigorous, high-yielding photoperiod strains with heavy resin production.",
    knownFor: ["High yields", "Resin production", "Photoperiods", "Modern crosses"],
  },
  {
    slug: "barney-farm",
    name: "Barney's Farm",
    type: "breeder",
    region: "Amsterdam, Netherlands",
    ships: "Worldwide via retailers",
    note: "Amsterdam institution since 1986 — multiple Cannabis Cup winners. Known for stable, proven genetics.",
    knownFor: ["Cannabis Cup winners", "Stable genetics", "Amsterdam legacy"],
  },
  {
    slug: "royal-queen-seeds",
    name: "Royal Queen Seeds",
    type: "breeder",
    region: "Spain / Netherlands",
    ships: "Worldwide",
    note: "One of Europe's largest breeders with a massive catalog spanning photoperiods, autos, and CBD varieties.",
    knownFor: ["Huge catalog", "European quality", "Auto + photo lines"],
  },
  {
    slug: "in-house-genetics",
    name: "In House Genetics",
    type: "breeder",
    region: "USA",
    ships: "Via retailers",
    note: "Premium breeder behind many modern exotic crosses — Slurricane, Pancakes, Platinum lineages.",
    knownFor: ["Exotic crosses", "Premium genetics", "Modern cultivars"],
  },
  {
    slug: "twenty20-mendocino",
    name: "Twenty20 Mendocino",
    type: "breeder",
    region: "California, USA",
    ships: "Via retailers",
    note: "Craft breeder from the Emerald Triangle — known for terpene-heavy, flavorful strains.",
    knownFor: ["Terpene focus", "Emerald Triangle", "Craft breeding"],
  },
  {
    slug: "dutch-passion",
    name: "Dutch Passion",
    type: "breeder",
    region: "Amsterdam, Netherlands",
    ships: "Worldwide",
    note: "Pioneers of feminized seeds (1990s). Over 30 years of proven genetics. Their classics still outperform.",
    knownFor: ["Feminized seed pioneers", "Classic genetics", "30+ years"],
  },
  {
    slug: "night-owl-seeds",
    name: "Night Owl Seeds",
    type: "breeder",
    region: "USA",
    ships: "Limited drops",
    note: "Daz's autoflower breeding program — Mephisto-adjacent quality with unique terpene profiles. Drops sell out fast.",
    knownFor: ["Artisan autos", "Unique terps", "Limited drops"],
  },
];

export const SEED_BANK_COUNT = SEED_BANKS.length;

export function getSeedBank(slug: string): SeedBank | undefined {
  return SEED_BANKS.find((b) => b.slug === slug);
}

export function seedBanksByType(type: "seed-bank" | "breeder"): SeedBank[] {
  return SEED_BANKS.filter((b) => b.type === type);
}
