/**
 * Strain Directory (Tier 2) — a broad, searchable "lite" index of well-known
 * cultivars for breadth. Deliberately NOT one page per strain (that would be
 * thin-content SEO poison); it's a single search surface. Strains that also
 * have a full curated grow-profile link straight to it.
 *
 * Lite entries carry only widely-documented basics (name, type, lineage). The
 * deep grow data lives in strains.ts. Merge + dedupe happens in getDirectory().
 */

import { STRAINS } from "@/lib/strains";

export type StrainCat = "Indica" | "Sativa" | "Hybrid";
export type LiteStrain = { name: string; type: StrainCat; lineage?: string };

// Well-known strains NOT already deeply profiled in strains.ts. Basics only.
export const LITE_STRAINS: LiteStrain[] = [
  // Haze / sativa lineage
  { name: "Neville's Haze", type: "Sativa", lineage: "Haze × Northern Lights #5" },
  { name: "Ghost Train Haze", type: "Sativa", lineage: "Ghost OG × Neville's Wreck" },
  { name: "Kali Mist", type: "Sativa" },
  { name: "Purple Haze", type: "Sativa" },
  { name: "Lemon Haze", type: "Sativa", lineage: "Lemon Skunk × Silver Haze" },
  { name: "Golden Goat", type: "Sativa" },
  { name: "Red Congolese", type: "Sativa" },
  { name: "Green Crack (Sativa)", type: "Sativa", lineage: "Skunk #1 phenotype" },
  { name: "Willie Nelson", type: "Sativa" },
  { name: "Dr. Grinspoon", type: "Sativa" },
  { name: "Chocolate Thai", type: "Sativa", lineage: "Thai landrace" },
  { name: "Malawi", type: "Sativa", lineage: "African landrace" },
  { name: "Kilimanjaro", type: "Sativa", lineage: "African landrace" },
  { name: "Agent Orange", type: "Hybrid", lineage: "Orange Velvet × Jack the Ripper" },
  { name: "Clementine", type: "Sativa", lineage: "Tangie × Lemon Skunk" },
  { name: "Sour Tangie", type: "Sativa", lineage: "Sour Diesel × Tangie" },
  { name: "Green Haze", type: "Sativa" },
  { name: "Jack Frost", type: "Hybrid", lineage: "Jack Herer × White Widow × Northern Lights #5" },
  { name: "Cinderella 99", type: "Hybrid", lineage: "Jack Herer × Shiva Skunk" },
  // OG / Kush family
  { name: "SFV OG", type: "Hybrid", lineage: "OG Kush cut" },
  { name: "Larry OG", type: "Hybrid", lineage: "OG Kush × SFV OG" },
  { name: "Fire OG", type: "Hybrid", lineage: "OG Kush × SFV OG Kush" },
  { name: "Tahoe OG", type: "Hybrid", lineage: "OG Kush cut" },
  { name: "Ghost OG", type: "Hybrid", lineage: "OG Kush cut" },
  { name: "Triangle Kush", type: "Indica", lineage: "Florida OG cut" },
  { name: "Death Star", type: "Indica", lineage: "Sensi Star × Sour Diesel" },
  { name: "Headband", type: "Hybrid", lineage: "OG Kush × Sour Diesel" },
  { name: "Kosher Kush", type: "Indica", lineage: "OG Kush cut" },
  { name: "Godfather OG", type: "Indica", lineage: "XXX OG × Alpha OG" },
  { name: "King Louis XIII", type: "Indica", lineage: "OG Kush × LA Confidential" },
  { name: "Banana OG", type: "Indica", lineage: "OG Kush × Banana" },
  { name: "Alien OG", type: "Hybrid", lineage: "Tahoe OG × Alien Kush" },
  { name: "Platinum OG", type: "Indica" },
  { name: "True OG", type: "Indica", lineage: "OG Kush cut" },
  { name: "Face Off OG", type: "Indica", lineage: "OG Kush cut" },
  { name: "Stardawg", type: "Hybrid", lineage: "Chemdawg 4 × Tres Dawg" },
  { name: "Afghan Kush", type: "Indica", lineage: "Hindu Kush landrace" },
  { name: "Vanilla Kush", type: "Indica", lineage: "Afghani × Kashmir" },
  { name: "Cotton Candy Kush", type: "Hybrid", lineage: "Lavender × Power Plant" },
  // Cookies / Gelato / Runtz era
  { name: "Thin Mint GSC", type: "Hybrid", lineage: "Girl Scout Cookies phenotype" },
  { name: "Platinum GSC", type: "Hybrid", lineage: "GSC × unknown" },
  { name: "Gelato #33", type: "Hybrid", lineage: "Sunset Sherbet × Thin Mint GSC" },
  { name: "Gelato #41", type: "Hybrid", lineage: "Sunset Sherbet × Thin Mint GSC" },
  { name: "Sherbert", type: "Hybrid", lineage: "GSC × Pink Panties" },
  { name: "Kush Mints", type: "Hybrid", lineage: "Bubba Kush × Animal Mints" },
  { name: "Animal Mints", type: "Hybrid", lineage: "Animal Cookies × SinMint Cookies" },
  { name: "London Pound Cake", type: "Indica", lineage: "Sunset Sherbet × unknown" },
  { name: "Georgia Pie", type: "Hybrid", lineage: "Gelatti × Kush Mints" },
  { name: "Pink Runtz", type: "Hybrid", lineage: "Runtz phenotype" },
  { name: "Rainbow Runtz", type: "Hybrid" },
  { name: "Fruity Pebbles OG (FPOG)", type: "Hybrid", lineage: "Green Ribbon × Granddaddy Purple × Tahoe OG" },
  { name: "Sundae Driver", type: "Hybrid", lineage: "Fruity Pebbles × Grape Pie" },
  { name: "Oreoz", type: "Hybrid", lineage: "Cookies & Cream × Secret Weapon" },
  { name: "Cookies and Cream", type: "Hybrid", lineage: "Starfighter × GSC" },
  { name: "Zoap", type: "Hybrid", lineage: "Pink Guava × unknown" },
  { name: "Oreo Blizzard", type: "Hybrid" },
  { name: "Melonade", type: "Sativa", lineage: "Watermelon Zkittlez × Lemon Tree" },
  { name: "Cap Junky", type: "Hybrid", lineage: "Alien Cookies × Kush Mints" },
  { name: "Gastro Pop", type: "Hybrid", lineage: "Apples & Bananas × Grape Gas" },
  { name: "Apples and Bananas", type: "Hybrid", lineage: "Platinum Cookies × Granddaddy Purp × Blue Power × Gelatti" },
  { name: "Superboof", type: "Hybrid", lineage: "Black Cherry Punch × Tropicana Cookies" },
  { name: "Jokerz", type: "Hybrid", lineage: "White Runtz × Purple Punch" },
  // Diesel / Chem
  { name: "NYC Diesel", type: "Sativa", lineage: "Sour Diesel × Afghani" },
  { name: "Strawberry Diesel", type: "Hybrid", lineage: "Strawberry Cough × NYC Diesel" },
  { name: "Chem D", type: "Hybrid", lineage: "Chemdawg cut" },
  { name: "Chem 91", type: "Hybrid", lineage: "Chemdawg cut" },
  { name: "Sour Dubble", type: "Hybrid", lineage: "Sour Diesel × Sour Bubble" },
  { name: "Motorbreath", type: "Indica", lineage: "Chemdawg × SFV OG Kush" },
  { name: "i-95", type: "Indica", lineage: "Triangle Kush × Legend OG × Stardawg" },
  // Purple / berry indicas
  { name: "Purple Urkle", type: "Indica" },
  { name: "Mendo Purps", type: "Indica" },
  { name: "Grape Pie", type: "Hybrid", lineage: "Cherry Pie × Granddaddy Purple" },
  { name: "Grape Stomper", type: "Hybrid", lineage: "Purple Elephant × Chocolate Diesel" },
  { name: "Blackberry Kush", type: "Indica", lineage: "Afghani × Blackberry" },
  { name: "Black Domina", type: "Indica", lineage: "Northern Lights × Ortega × Hash Plant × Afghani" },
  { name: "Forbidden Fruit", type: "Indica", lineage: "Cherry Pie × Tangie" },
  { name: "Querkle", type: "Indica", lineage: "Purple Urkle × Space Queen" },
  { name: "Black Cherry Soda", type: "Hybrid" },
  { name: "Purple Hindu Kush", type: "Indica", lineage: "Purple Afghani × Hindu Kush" },
  { name: "Berry White", type: "Indica", lineage: "Blueberry × White Widow" },
  // Fruity / dessert
  { name: "Papaya", type: "Indica", lineage: "Citral #13 × Ice #2" },
  { name: "Mango Kush", type: "Hybrid", lineage: "Mango × Hindu Kush" },
  { name: "Watermelon Zkittlez", type: "Indica", lineage: "Zkittlez × Watermelon" },
  { name: "Blueberry Muffin", type: "Hybrid", lineage: "Blueberry × Purple Panty Dropper" },
  { name: "Bubblegum", type: "Hybrid", lineage: "Indiana Bubblegum" },
  { name: "Cake Batter", type: "Hybrid", lineage: "Wedding Cake phenotype" },
  { name: "Pancakes", type: "Indica", lineage: "London Pound Cake × Kush Mints" },
  { name: "Guava Cake", type: "Hybrid" },
  { name: "Cheetah Piss", type: "Hybrid", lineage: "Lemonnade × Gelato 42 × London Poundcake 97" },
  { name: "Tropicana Cherry", type: "Hybrid", lineage: "Tropicana Cookies × Cherry Cookies" },
  { name: "Strawberry Guava", type: "Hybrid" },
  // Classic / old-school
  { name: "Skunk #1", type: "Hybrid", lineage: "Afghani × Acapulco Gold × Colombian Gold" },
  { name: "Super Skunk", type: "Indica", lineage: "Skunk #1 × Afghani" },
  { name: "Island Sweet Skunk", type: "Sativa" },
  { name: "G13", type: "Indica" },
  { name: "G13 Haze", type: "Hybrid", lineage: "G13 × Hawaiian Sativa" },
  { name: "Sensi Star", type: "Indica" },
  { name: "Hash Plant", type: "Indica", lineage: "Northern Lights × Afghani" },
  { name: "Big Bud", type: "Indica", lineage: "Afghani × Skunk × Northern Lights" },
  { name: "White Rhino", type: "Indica", lineage: "White Widow × North American Indica" },
  { name: "White Fire OG (WiFi)", type: "Hybrid", lineage: "Fire OG × The White" },
  { name: "The White", type: "Hybrid" },
  { name: "Aurora Indica", type: "Indica", lineage: "Afghan × Northern Lights" },
  { name: "Shiva Skunk", type: "Indica", lineage: "Northern Lights #5 × Skunk #1" },
  { name: "Early Girl", type: "Indica" },
  { name: "Swiss Cheese", type: "Hybrid", lineage: "Skunk × St. Bernard" },
  { name: "Exodus Cheese", type: "Hybrid", lineage: "Skunk #1 phenotype" },
  { name: "Juicy Fruit", type: "Hybrid", lineage: "Afghani × Thai" },
  { name: "Sweet Tooth", type: "Indica", lineage: "Afghani × Nepali × Hawaiian" },
  { name: "THC Bomb", type: "Hybrid" },
  { name: "Pineapple Chunk", type: "Indica", lineage: "Pineapple × Skunk #1 × Cheese" },
  { name: "Cannalope Haze", type: "Sativa", lineage: "Haze Brothers × Mexican" },
  // Wellness / balanced
  { name: "Pennywise", type: "Indica", lineage: "Harlequin × Jack the Ripper" },
  { name: "Ringo's Gift", type: "Hybrid", lineage: "Harle-Tsu × ACDC" },
  { name: "Harle-Tsu", type: "Hybrid", lineage: "Harlequin × Sour Tsunami" },
  { name: "Sour Tsunami", type: "Hybrid", lineage: "Sour Diesel × NYC Diesel" },
  { name: "Stephen Hawking Kush", type: "Indica", lineage: "Harle-Tsu × Sin City Kush" },
  { name: "CBD Critical Mass", type: "Indica", lineage: "Critical Mass × high-CBD line" },
  // Modern hype / exotics
  { name: "Zkittlez Cake", type: "Indica", lineage: "Zkittlez × Wedding Cake" },
  { name: "Gelonade", type: "Hybrid", lineage: "Lemon Tree × Gelato #41" },
  { name: "Modified Grapes", type: "Hybrid", lineage: "GMO × Purple Punch" },
  { name: "Gelatti", type: "Hybrid", lineage: "Gelato × Biscotti" },
  { name: "Han Solo Burger", type: "Indica", lineage: "GMO × Larry OG" },
  { name: "Kush Mints #11", type: "Hybrid", lineage: "Kush Mints phenotype" },
  { name: "Baklava", type: "Hybrid", lineage: "Gelato #41 × Kosher Kush" },
  { name: "Sherbanger", type: "Hybrid", lineage: "Sunset Sherbet × Headbanger" },
  { name: "Biskante", type: "Hybrid", lineage: "Biscotti × unknown" },
  { name: "Pave", type: "Hybrid", lineage: "Cookies line" },
  { name: "Blue Zushi", type: "Indica", lineage: "Zkittlez × Kush Mints" },
  { name: "Red Velvet", type: "Hybrid", lineage: "LPC75 × Pancakes" },
  { name: "Grandi", type: "Hybrid" },
  { name: "Runtz Muffin", type: "Indica", lineage: "Zkittlez × Gelato × Orange Punch" },
  { name: "Purple Runtz", type: "Hybrid", lineage: "Runtz phenotype" },
  { name: "Obama Runtz", type: "Hybrid", lineage: "Afghani × Grape Pie × unknown" },
  { name: "Kmintz", type: "Hybrid", lineage: "Kush Mints × unknown" },
  { name: "Lemon Cherry Push Pop", type: "Hybrid" },
  { name: "Members Only", type: "Hybrid" },
  { name: "Guava Gelato", type: "Hybrid" },
  { name: "Rainbow Belts", type: "Hybrid", lineage: "Zkittlez × Moonbow" },
  { name: "Moonbow", type: "Hybrid", lineage: "Zkittlez × Do-Si-Dos" },
  { name: "Garlic Breath", type: "Indica", lineage: "GMO × Mendo Breath" },
  { name: "Mendo Breath", type: "Indica", lineage: "OGKB × Mendo Montage" },
  { name: "Wedding Pie", type: "Hybrid", lineage: "Wedding Cake × Grape Pie" },
  { name: "Divorce Cake", type: "Hybrid", lineage: "Wedding Cake × Papaya" },
  { name: "Frosted Cake", type: "Indica" },
  { name: "Alien Rock Candy", type: "Indica", lineage: "Sour Dubble × Tahoe Alien" },
  { name: "Purple Punch × Gelato (Purple Gelato)", type: "Indica", lineage: "Purple Punch × Gelato" },
];

export type DirectoryEntry = {
  name: string;
  type: StrainCat;
  lineage?: string;
  slug?: string; // present when a full curated profile exists
};

function norm(n: string): string {
  return n.toLowerCase().replace(/\(.*?\)/g, "").replace(/[^a-z0-9]/g, "");
}

/** Curated profiles + lite entries, deduped by normalized name, sorted A–Z. */
export function getDirectory(): DirectoryEntry[] {
  const curated: DirectoryEntry[] = STRAINS.map((s) => ({
    name: s.name,
    type: s.type,
    lineage: s.lineage,
    slug: s.slug,
  }));
  const seen = new Set(curated.map((c) => norm(c.name)));
  const lite: DirectoryEntry[] = [];
  for (const l of LITE_STRAINS) {
    const key = norm(l.name);
    if (seen.has(key)) continue; // dedupe vs curated AND vs earlier lite entries
    seen.add(key);
    lite.push({ name: l.name, type: l.type, lineage: l.lineage });
  }
  return [...curated, ...lite].sort((a, b) => a.name.localeCompare(b.name));
}
