/**
 * Grow Tools — pure horticulture calculators. Deterministic and unit-tested;
 * the UI is a thin shell. Educational estimates, not lab guarantees.
 */

export type Stage = "seedling" | "veg" | "flower";

export const STAGE_LABEL: Record<Stage, string> = {
  seedling: "Seedling / clone",
  veg: "Vegetative",
  flower: "Flowering",
};

/* ---------------------------------------------------------------- VPD ---- */

export function cToF(c: number): number {
  return (c * 9) / 5 + 32;
}
export function fToC(f: number): number {
  return ((f - 32) * 5) / 9;
}

/** Saturation vapor pressure (kPa) at temperature °C — Tetens equation. */
export function svpKpa(tempC: number): number {
  return 0.61078 * Math.exp((17.27 * tempC) / (tempC + 237.3));
}

/**
 * Leaf-to-air VPD (kPa). Leaf sits a couple degrees cooler than air, which is
 * what actually drives transpiration. tempF in °F, rh in %.
 */
export function calcVpd(tempF: number, rh: number, leafOffsetF = 2): number {
  const airC = fToC(tempF);
  const leafC = fToC(tempF - leafOffsetF);
  const vpd = svpKpa(leafC) - (svpKpa(airC) * rh) / 100;
  return Math.max(0, Math.round(vpd * 100) / 100);
}

export const VPD_TARGET: Record<Stage, [number, number]> = {
  seedling: [0.4, 0.8],
  veg: [0.8, 1.2],
  flower: [1.2, 1.6],
};

export type Verdict = "low" | "good" | "high";

export function vpdVerdict(vpd: number, stage: Stage): Verdict {
  const [lo, hi] = VPD_TARGET[stage];
  if (vpd < lo) return "low";
  if (vpd > hi) return "high";
  return "good";
}

/* ---------------------------------------------------------------- DLI ---- */

/** Daily Light Integral (mol/m²/day) from PPFD (µmol/m²/s) over N hours. */
export function calcDli(ppfd: number, hours: number): number {
  return Math.round(((ppfd * hours * 3600) / 1_000_000) * 10) / 10;
}

export const DLI_TARGET: Record<Stage, [number, number]> = {
  seedling: [10, 15],
  veg: [20, 30],
  flower: [30, 45],
};

export function dliVerdict(dli: number, stage: Stage): Verdict {
  const [lo, hi] = DLI_TARGET[stage];
  if (dli < lo) return "low";
  if (dli > hi) return "high";
  return "good";
}

/* -------------------------------------------------------------- yield ---- */

export type Experience = "beginner" | "some" | "experienced";

// grams of dried flower per watt of quality LED (rough, community consensus).
const GPW: Record<Experience, [number, number]> = {
  beginner: [0.3, 0.5],
  some: [0.5, 0.8],
  experienced: [0.8, 1.1],
};

/** Rough dried-yield estimate (grams) from real LED wattage + experience. */
export function estimateYield(
  watts: number,
  experience: Experience,
): { low: number; high: number } {
  const [lo, hi] = GPW[experience];
  return {
    low: Math.round(watts * lo),
    high: Math.round(watts * hi),
  };
}

export function gramsToOz(g: number): number {
  return Math.round((g / 28.35) * 10) / 10;
}
