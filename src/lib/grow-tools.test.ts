import { describe, expect, it } from "vitest";
import {
  calcVpd,
  vpdVerdict,
  calcDli,
  dliVerdict,
  estimateYield,
  svpKpa,
  cToF,
  fToC,
  gramsToOz,
} from "./grow-tools";

describe("temperature + SVP", () => {
  it("converts F and C round-trip", () => {
    expect(Math.round(cToF(25))).toBe(77);
    expect(Math.round(fToC(77))).toBe(25);
  });
  it("SVP at 25°C is ~3.17 kPa", () => {
    expect(svpKpa(25)).toBeCloseTo(3.17, 1);
  });
});

describe("VPD", () => {
  it("is higher when drier, lower when humid", () => {
    const dry = calcVpd(78, 40);
    const humid = calcVpd(78, 80);
    expect(dry).toBeGreaterThan(humid);
    expect(dry).toBeGreaterThan(0);
  });
  it("lands in the veg range at a sane room (78°F / 55%)", () => {
    const vpd = calcVpd(78, 55);
    expect(vpd).toBeGreaterThan(0.8);
    expect(vpd).toBeLessThan(1.4);
  });
  it("verdicts low/good/high against the stage target", () => {
    expect(vpdVerdict(0.5, "veg")).toBe("low");
    expect(vpdVerdict(1.0, "veg")).toBe("good");
    expect(vpdVerdict(1.5, "veg")).toBe("high");
  });
});

describe("DLI", () => {
  it("computes mol/m²/day from PPFD and hours", () => {
    // 600 µmol * 18h = 38.88 mol
    expect(calcDli(600, 18)).toBeCloseTo(38.9, 1);
    expect(calcDli(0, 18)).toBe(0);
  });
  it("verdicts against the stage target", () => {
    expect(dliVerdict(12, "seedling")).toBe("good");
    expect(dliVerdict(5, "veg")).toBe("low");
    expect(dliVerdict(50, "flower")).toBe("high");
  });
});

describe("yield estimate", () => {
  it("scales with watts and experience, low <= high", () => {
    const beg = estimateYield(240, "beginner");
    const exp = estimateYield(240, "experienced");
    expect(beg.low).toBeLessThanOrEqual(beg.high);
    expect(exp.high).toBeGreaterThan(beg.high);
    expect(estimateYield(0, "some")).toEqual({ low: 0, high: 0 });
  });
  it("converts grams to ounces", () => {
    expect(gramsToOz(28.35)).toBeCloseTo(1, 1);
  });
});
