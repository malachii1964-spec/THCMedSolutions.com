import { describe, expect, it } from "vitest";
import {
  AFFILIATE_DISCLOSURE,
  CODES,
  DROP_VERSION,
  latestDrops,
} from "@/lib/fast-buds";

describe("fast buds code vault", () => {
  it("has unique codes and unique strains", () => {
    expect(new Set(CODES.map((c) => c.code)).size).toBe(CODES.length);
    expect(new Set(CODES.map((c) => c.strain)).size).toBe(CODES.length);
  });

  it("uses codes that are safe to display and retype", () => {
    for (const c of CODES) {
      expect(c.code).toMatch(/^[A-Z0-9]+$/);
      expect(c.code.length).toBeGreaterThanOrEqual(4);
    }
  });

  it("points every card at an image that exists in public/fast-buds", () => {
    for (const c of CODES) {
      expect(c.image).toMatch(/^\/fast-buds\/[a-z0-9-]+\.png$/);
    }
  });

  it("carries the coupon and affiliate attribution in every outbound link", () => {
    for (const c of CODES) {
      expect(c.href).toContain("2fast4buds.com");
      // The coupon must match the card it sits on — a mismatch here sends the
      // buyer to checkout with the wrong code.
      expect(c.href).toContain(`coupon=${c.code}`);
      expect(c.href).toContain("utm_medium=affiliate");
      expect(c.href).toContain("utm_source=lakeeriecannabis");
    }
  });

  it("gives every card real alt text naming its code and strain", () => {
    for (const c of CODES) {
      expect(c.alt.length).toBeGreaterThan(30);
      expect(c.alt).toContain(c.code);
      expect(c.alt.toLowerCase()).not.toContain("image of");
    }
  });

  it("writes copy without a hardcoded discount percentage", () => {
    // The artwork carries the percentage. Duplicating it into copy means it
    // becomes a false claim the day the offer changes.
    for (const c of CODES) {
      expect(`${c.note} ${c.highlight}`).not.toMatch(/\d+\s?%/);
    }
  });
});

describe("latestDrops", () => {
  it("returns the newest-first slice used by the splash", () => {
    expect(latestDrops(5)).toEqual(CODES.slice(0, 5));
    expect(latestDrops(2)).toEqual(CODES.slice(0, 2));
  });

  it("never returns more than exist, and never a negative slice", () => {
    expect(latestDrops(99).length).toBe(CODES.length);
    expect(latestDrops(0)).toEqual([]);
    expect(latestDrops(-3)).toEqual([]);
  });

  it("leads with the featured new releases", () => {
    expect(latestDrops(2).every((c) => c.featured)).toBe(true);
  });
});

describe("drop version", () => {
  it("is a non-empty string the splash can key dismissal on", () => {
    expect(typeof DROP_VERSION).toBe("string");
    expect(DROP_VERSION.length).toBeGreaterThan(4);
  });
});

describe("disclosure", () => {
  it("states the affiliate relationship, the cost to the reader, and 21+", () => {
    const d = AFFILIATE_DISCLOSURE.toLowerCase();
    expect(d).toContain("affiliate");
    expect(d).toContain("commission");
    expect(d).toContain("no extra cost");
    expect(d).toContain("21+");
  });
});
