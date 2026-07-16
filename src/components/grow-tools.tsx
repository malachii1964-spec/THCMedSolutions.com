"use client";

import { useState } from "react";
import {
  STAGE_LABEL,
  VPD_TARGET,
  DLI_TARGET,
  calcVpd,
  vpdVerdict,
  calcDli,
  dliVerdict,
  estimateYield,
  gramsToOz,
  type Experience,
  type Stage,
  type Verdict,
} from "@/lib/grow-tools";

const STAGES: Stage[] = ["seedling", "veg", "flower"];
const VERDICT_STYLE: Record<Verdict, { label: string; cls: string }> = {
  low: { label: "Too low", cls: "text-cyan" },
  good: { label: "Dialed in", cls: "text-lime" },
  high: { label: "Too high", cls: "text-magenta" },
};

function Card({ children }: { children: React.ReactNode }) {
  return <div className="glass iris-border rounded-3xl p-6">{children}</div>;
}
function Verdict({ v }: { v: Verdict }) {
  const s = VERDICT_STYLE[v];
  return (
    <span className={`font-mono text-[11px] font-semibold uppercase tracking-[0.14em] ${s.cls}`}>
      {s.label}
    </span>
  );
}
function StageTabs({ stage, setStage }: { stage: Stage; setStage: (s: Stage) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {STAGES.map((s) => (
        <button
          key={s}
          onClick={() => setStage(s)}
          className={`rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.1em] transition ${
            stage === s
              ? "bg-gradient-to-r from-cyan/30 to-violet/30 text-frost"
              : "border border-white/10 text-frost-dim hover:text-frost"
          }`}
        >
          {STAGE_LABEL[s]}
        </button>
      ))}
    </div>
  );
}
const numField =
  "w-24 rounded-xl border border-white/10 bg-void-2 px-3 py-2 text-sm text-frost focus:border-cyan/60 focus:outline-none";
const label = "font-mono text-[10px] uppercase tracking-[0.16em] text-frost-dim";

export function GrowTools() {
  // VPD
  const [temp, setTemp] = useState(78);
  const [rh, setRh] = useState(55);
  const [vpdStage, setVpdStage] = useState<Stage>("veg");
  const vpd = calcVpd(temp, rh);
  const [vLo, vHi] = VPD_TARGET[vpdStage];

  // DLI
  const [ppfd, setPpfd] = useState(600);
  const [hours, setHours] = useState(18);
  const [dliStage, setDliStage] = useState<Stage>("veg");
  const dli = calcDli(ppfd, hours);
  const [dLo, dHi] = DLI_TARGET[dliStage];

  // Yield
  const [watts, setWatts] = useState(240);
  const [exp, setExp] = useState<Experience>("some");
  const y = estimateYield(watts, exp);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* VPD */}
      <Card>
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="font-display text-xl font-semibold">VPD Calculator</h2>
          <Verdict v={vpdVerdict(vpd, vpdStage)} />
        </div>
        <p className="mt-1 text-sm leading-relaxed text-frost-dim">
          Vapor Pressure Deficit — the temp + humidity sweet spot that controls how
          your plant drinks and grows.
        </p>
        <div className="mt-4 flex flex-wrap items-end gap-4">
          <label className="block">
            <span className={label}>Leaf temp °F</span>
            <input type="number" value={temp} onChange={(e) => setTemp(+e.target.value)} className={`mt-1 block ${numField}`} />
          </label>
          <label className="block">
            <span className={label}>Humidity %</span>
            <input type="number" value={rh} min={0} max={100} onChange={(e) => setRh(+e.target.value)} className={`mt-1 block ${numField}`} />
          </label>
        </div>
        <div className="mt-4"><StageTabs stage={vpdStage} setStage={setVpdStage} /></div>
        <div className="mt-5 flex items-end justify-between rounded-2xl bg-white/[0.03] px-5 py-4">
          <div>
            <p className="font-display text-4xl font-semibold text-frost">{vpd.toFixed(2)}</p>
            <p className={label}>kPa</p>
          </div>
          <p className="text-right text-sm text-frost-dim">
            Target for {STAGE_LABEL[vpdStage].toLowerCase()}:<br />
            <span className="text-frost">{vLo}–{vHi} kPa</span>
          </p>
        </div>
        <p className="mt-3 text-[12px] leading-relaxed text-frost-dim">
          Tip: raise VPD by warming or drying the air; lower it by cooling or adding
          humidity. Leaf temp usually runs a couple degrees below air temp.
        </p>
      </Card>

      {/* DLI */}
      <Card>
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="font-display text-xl font-semibold">DLI / Light Calculator</h2>
          <Verdict v={dliVerdict(dli, dliStage)} />
        </div>
        <p className="mt-1 text-sm leading-relaxed text-frost-dim">
          Daily Light Integral — the total light your plants get per day. Match it to
          the stage instead of guessing.
        </p>
        <div className="mt-4 flex flex-wrap items-end gap-4">
          <label className="block">
            <span className={label}>PPFD µmol</span>
            <input type="number" value={ppfd} onChange={(e) => setPpfd(+e.target.value)} className={`mt-1 block ${numField}`} />
          </label>
          <label className="block">
            <span className={label}>Hours on</span>
            <input type="number" value={hours} min={0} max={24} onChange={(e) => setHours(+e.target.value)} className={`mt-1 block ${numField}`} />
          </label>
        </div>
        <div className="mt-4"><StageTabs stage={dliStage} setStage={setDliStage} /></div>
        <div className="mt-5 flex items-end justify-between rounded-2xl bg-white/[0.03] px-5 py-4">
          <div>
            <p className="font-display text-4xl font-semibold text-frost">{dli.toFixed(1)}</p>
            <p className={label}>mol/m²/day</p>
          </div>
          <p className="text-right text-sm text-frost-dim">
            Target for {STAGE_LABEL[dliStage].toLowerCase()}:<br />
            <span className="text-frost">{dLo}–{dHi}</span>
          </p>
        </div>
        <p className="mt-3 text-[12px] leading-relaxed text-frost-dim">
          Measure PPFD with a meter or app at canopy height. Too high wastes power and
          bleaches; too low means airy buds.
        </p>
      </Card>

      {/* Yield */}
      <Card>
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="font-display text-xl font-semibold">Yield Estimator</h2>
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-gold">Rough guide</span>
        </div>
        <p className="mt-1 text-sm leading-relaxed text-frost-dim">
          A ballpark dried-flower estimate from your real light wattage and experience.
          Genetics and technique swing this a lot.
        </p>
        <div className="mt-4 flex flex-wrap items-end gap-4">
          <label className="block">
            <span className={label}>LED watts</span>
            <input type="number" value={watts} onChange={(e) => setWatts(+e.target.value)} className={`mt-1 block ${numField}`} />
          </label>
          <div>
            <span className={label}>Experience</span>
            <div className="mt-1 flex gap-2">
              {(["beginner", "some", "experienced"] as Experience[]).map((e) => (
                <button
                  key={e}
                  onClick={() => setExp(e)}
                  className={`rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.1em] transition ${
                    exp === e
                      ? "bg-gradient-to-r from-cyan/30 to-violet/30 text-frost"
                      : "border border-white/10 text-frost-dim hover:text-frost"
                  }`}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-5 rounded-2xl bg-white/[0.03] px-5 py-4">
          <p className="font-display text-4xl font-semibold text-frost">
            {y.low}–{y.high} <span className="text-lg text-frost-dim">g</span>
          </p>
          <p className={label}>
            ≈ {gramsToOz(y.low)}–{gramsToOz(y.high)} oz dried
          </p>
        </div>
        <p className="mt-3 text-[12px] leading-relaxed text-frost-dim">
          Based on grams-per-watt of quality LED. A dialed room, training, and strong
          genetics push you toward the top of the range.
        </p>
      </Card>

      {/* note */}
      <Card>
        <h2 className="font-display text-xl font-semibold">More tools coming</h2>
        <p className="mt-2 text-sm leading-relaxed text-frost-dim">
          Feeding-schedule builder, pot-size guide, and a harvest-window checker are on
          the way. Meanwhile, the{" "}
          <a href="/build-my-grow" className="text-cyan underline underline-offset-2">
            Build My Grow
          </a>{" "}
          tool turns your setup into a full plan, and the{" "}
          <a href="/plant-doctor" className="text-cyan underline underline-offset-2">
            AI Plant Doctor
          </a>{" "}
          answers anything these numbers can&apos;t.
        </p>
      </Card>
    </div>
  );
}
