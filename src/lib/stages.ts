/**
 * The grow-stage taxonomy. `hoursOn` is the real photoperiod for the stage
 * (drives the light-cycle signature); null means the stage has no photoperiod
 * (troubleshooting spans all stages), so no bar is shown — structure only
 * encodes true information.
 */
export type StageId =
  | "germination"
  | "seedling"
  | "vegetative"
  | "flowering"
  | "harvest-cure"
  | "troubleshooting";

export type Stage = {
  id: StageId;
  name: string;
  shortName: string;
  hoursOn: number | null;
  cycleLabel: string | null;
  weeks: string;
  blurb: string;
};

export const STAGES: Stage[] = [
  {
    id: "germination",
    name: "Germination",
    shortName: "Germ",
    hoursOn: 24,
    cycleLabel: "24/0",
    weeks: "Week 0–1",
    blurb: "Wake the seed. Moisture, warmth, darkness — then a taproot.",
  },
  {
    id: "seedling",
    name: "Seedling",
    shortName: "Seedling",
    hoursOn: 18,
    cycleLabel: "18/6",
    weeks: "Week 1–3",
    blurb: "Fragile first leaves. Gentle light, light hand on water.",
  },
  {
    id: "vegetative",
    name: "Vegetative",
    shortName: "Veg",
    hoursOn: 18,
    cycleLabel: "18/6",
    weeks: "Week 3–8",
    blurb: "Build the frame. Training, feeding, and canopy management.",
  },
  {
    id: "flowering",
    name: "Flowering",
    shortName: "Flower",
    hoursOn: 12,
    cycleLabel: "12/12",
    weeks: "Week 8–16",
    blurb: "Flip to 12/12 and steer bud development to ripeness.",
  },
  {
    id: "harvest-cure",
    name: "Harvest & Cure",
    shortName: "Harvest",
    hoursOn: 0,
    cycleLabel: "0/24",
    weeks: "Week 16+",
    blurb: "Chop, dry slow, cure right. Where good grows become great.",
  },
  {
    id: "troubleshooting",
    name: "Troubleshooting",
    shortName: "Rescue",
    hoursOn: null,
    cycleLabel: null,
    weeks: "Any week",
    blurb: "Deficiencies, pests, stress. Diagnose it before it spreads.",
  },
];

export function getStage(id: string): Stage | undefined {
  return STAGES.find((s) => s.id === id);
}
