import { describe, it, expect } from "vitest";
import {
  SEED_BANKS,
  getSeedBank,
  seedBanksByType,
} from "@/lib/seed-banks";

describe("seed-banks data", () => {
  it("every entry has required fields", () => {
    for (const b of SEED_BANKS) {
      expect(b.slug).toBeTruthy();
      expect(b.name).toBeTruthy();
      expect(["seed-bank", "breeder"]).toContain(b.type);
      expect(b.region).toBeTruthy();
      expect(b.ships).toBeTruthy();
      expect(b.note.length).toBeGreaterThan(10);
      expect(b.knownFor.length).toBeGreaterThan(0);
    }
  });

  it("no duplicate slugs", () => {
    const slugs = SEED_BANKS.map((b) => b.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("getSeedBank returns the right entry", () => {
    const fb = getSeedBank("fast-buds");
    expect(fb).toBeDefined();
    expect(fb!.name).toBe("Fast Buds");
    expect(fb!.type).toBe("breeder");
  });

  it("getSeedBank returns undefined for missing slug", () => {
    expect(getSeedBank("nonexistent")).toBeUndefined();
  });

  it("seedBanksByType filters correctly", () => {
    const banks = seedBanksByType("seed-bank");
    const breeders = seedBanksByType("breeder");
    expect(banks.length).toBeGreaterThan(0);
    expect(breeders.length).toBeGreaterThan(0);
    expect(banks.length + breeders.length).toBe(SEED_BANKS.length);
    for (const b of banks) expect(b.type).toBe("seed-bank");
    for (const b of breeders) expect(b.type).toBe("breeder");
  });
});
