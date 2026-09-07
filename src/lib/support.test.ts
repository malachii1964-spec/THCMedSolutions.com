import { describe, expect, it } from "vitest";
import {
  BANNER_CTA,
  BANNER_LINE,
  KOFI_URL,
  KOFI_USERNAME,
  SUPPORT_DISCLOSURE,
  SUPPORT_HEADLINE,
  SUPPORT_INTRO,
  SUPPORT_WHERE_IT_GOES,
  supportEnabled,
} from "@/lib/support";

describe("support configuration", () => {
  it("stays switched off until a handle is set", () => {
    // A dead donate button costs more trust than no button, so both the banner
    // and the page must be inert while the handle is empty.
    if (KOFI_USERNAME === "") {
      expect(supportEnabled()).toBe(false);
      expect(KOFI_URL).toBe("");
    } else {
      expect(supportEnabled()).toBe(true);
    }
  });

  it("builds a ko-fi.com URL from a bare handle, never a pasted URL", () => {
    // Guards the most likely mistake: pasting "https://ko-fi.com/name" into the
    // handle, which would produce a doubled, broken URL.
    expect(KOFI_USERNAME).not.toContain("/");
    expect(KOFI_USERNAME).not.toContain("http");
    if (KOFI_USERNAME) {
      expect(KOFI_URL).toBe(`https://ko-fi.com/${KOFI_USERNAME}`);
    }
  });
});

describe("banner copy", () => {
  it("is short enough to read at a glance in a slim bar", () => {
    expect(BANNER_LINE.length).toBeLessThanOrEqual(90);
    expect(BANNER_CTA.length).toBeLessThanOrEqual(20);
  });

  it("says what it is rather than shouting", () => {
    expect(BANNER_LINE).not.toMatch(/!{2,}/);
    expect(BANNER_LINE).not.toMatch(/\b[A-Z]{5,}\b/);
  });
});

describe("support page copy", () => {
  it("has a headline and real intro paragraphs", () => {
    expect(SUPPORT_HEADLINE.length).toBeGreaterThan(20);
    expect(SUPPORT_INTRO.length).toBeGreaterThanOrEqual(2);
    for (const p of SUPPORT_INTRO) expect(p.length).toBeGreaterThan(80);
  });

  it("explains where money goes in concrete terms", () => {
    expect(SUPPORT_WHERE_IT_GOES.length).toBeGreaterThanOrEqual(3);
    for (const x of SUPPORT_WHERE_IT_GOES) {
      expect(x.t.length).toBeGreaterThan(3);
      expect(x.d.length).toBeGreaterThan(40);
    }
  });

  it("promises no reward, tier, or unlocked content", () => {
    // Promising anything in return turns a donation into a sale, which is
    // exactly the processor risk this design avoids.
    const all = [
      SUPPORT_HEADLINE,
      ...SUPPORT_INTRO,
      ...SUPPORT_WHERE_IT_GOES.map((x) => `${x.t} ${x.d}`),
    ]
      .join(" ")
      .toLowerCase();
    for (const word of ["unlock", "exclusive access", "perk", "reward tier", "members-only for supporters"]) {
      expect(all).not.toContain(word);
    }
  });
});

describe("disclosure", () => {
  it("states it is a donation, not a purchase, and not deductible", () => {
    const d = SUPPORT_DISCLOSURE.toLowerCase();
    expect(d).toContain("donation");
    expect(d).toContain("not a purchase");
    expect(d).toContain("not tax-deductible");
    expect(d).toContain("21+");
  });

  it("states support never unlocks content", () => {
    expect(SUPPORT_DISCLOSURE.toLowerCase()).toContain("never unlocks");
  });
});
