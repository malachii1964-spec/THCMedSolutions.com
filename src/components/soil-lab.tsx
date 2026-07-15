"use client";

import { useState } from "react";
import { SOIL_STYLES, MIX_SPECS } from "@/lib/soil-styles";

const POT_SIZES = [1, 2, 3, 5, 7, 10, 15, 20];
const PLANT_COUNTS = [1, 2, 3, 4, 5, 6, 8, 10, 12];

/** Render tablespoons as cups+Tbsp when large (1 cup = 16 Tbsp). */
function fmtTbsp(total: number): string {
  const rounded = Math.round(total * 4) / 4;
  if (rounded < 16) return `${rounded} Tbsp`;
  const cups = Math.floor(rounded / 16);
  const rem = Math.round((rounded - cups * 16) * 4) / 4;
  return rem > 0
    ? `${cups} cup${cups > 1 ? "s" : ""} + ${rem} Tbsp`
    : `${cups} cup${cups > 1 ? "s" : ""}`;
}

/** Render gallons, dropping to quarts for sub-gallon volumes (1 gal = 4 qt). */
function fmtGal(gal: number): string {
  const rounded = Math.round(gal * 100) / 100;
  if (rounded >= 1) return `${rounded} gal`;
  return `${Math.round(rounded * 16) / 4} qt`;
}

function Calculator({ styleId, accent }: { styleId: string; accent: string }) {
  const [pot, setPot] = useState(5);
  const [plants, setPlants] = useState(1);
  const spec = MIX_SPECS.find((m) => m.styleId === styleId);
  if (!spec) return null;

  const mixGal = pot * spec.fillFraction * plants;

  return (
    <div className="mt-8 rounded-2xl border border-white/10 p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h4 className="font-mono text-[11px] uppercase tracking-[0.2em] text-frost">
          Frosty-Soil Calculator
        </h4>
        <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-frost-dim">
          Rounded to ¼ Tbsp · sanity-check big batches
        </span>
      </div>

      <div className="mt-4 flex flex-wrap items-end gap-4">
        <label className="block">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-frost-dim">
            Pot size
          </span>
          <select
            value={pot}
            onChange={(e) => setPot(Number(e.target.value))}
            className="mt-1.5 block rounded-xl border border-white/15 bg-void-2 px-4 py-2.5 text-sm text-frost"
          >
            {POT_SIZES.map((p) => (
              <option key={p} value={p}>
                {p} gallon
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-frost-dim">
            Plants
          </span>
          <select
            value={plants}
            onChange={(e) => setPlants(Number(e.target.value))}
            className="mt-1.5 block rounded-xl border border-white/15 bg-void-2 px-4 py-2.5 text-sm text-frost"
          >
            {PLANT_COUNTS.map((n) => (
              <option key={n} value={n}>
                {n} plant{n > 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </label>
        <p
          className="pb-2 font-mono text-[11px] uppercase tracking-[0.12em]"
          style={{ color: accent }}
        >
          → mix {fmtGal(mixGal)} total · {spec.fillLabel}
        </p>
      </div>

      <table className="mt-4 w-full text-sm">
        <thead>
          <tr className="border-b border-white/10 text-left font-mono text-[10px] uppercase tracking-[0.14em] text-frost-dim">
            <th className="py-2 pr-3 font-normal">Ingredient</th>
            <th className="py-2 font-normal">Your batch</th>
          </tr>
        </thead>
        <tbody>
          {spec.ingredients.map((ing) => (
            <tr key={ing.name} className="border-b border-white/5">
              <td className="py-2.5 pr-3 text-frost">{ing.name}</td>
              <td className="py-2.5 font-medium" style={{ color: accent }}>
                {ing.unit === "pct"
                  ? fmtGal((mixGal * ing.rate) / 100)
                  : fmtTbsp(mixGal * ing.rate)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {spec.extras ? (
        <ul className="mt-4 space-y-1.5">
          {spec.extras.map((e) => (
            <li
              key={e}
              className="flex items-start gap-2 text-[12.5px] leading-relaxed text-frost-dim"
            >
              <span className="mt-0.5" style={{ color: accent }}>
                ✦
              </span>
              {e}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

/**
 * The Soil Lab selector — pick the grower whose style you want to grow like,
 * get their soil system: base mix, exact recipe, feeding rhythm, trade-offs —
 * plus the Frosty-Soil Calculator scaled to your pots and plant count.
 */
export function SoilLab() {
  const [id, setId] = useState(SOIL_STYLES[0].id);
  const style = SOIL_STYLES.find((s) => s.id === id) ?? SOIL_STYLES[0];

  return (
    <div>
      {/* grower selector */}
      <div
        role="tablist"
        aria-label="Choose a grower style"
        className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5"
      >
        {SOIL_STYLES.map((s) => {
          const active = s.id === id;
          return (
            <button
              key={s.id}
              role="tab"
              aria-selected={active}
              onClick={() => setId(s.id)}
              className={`rounded-2xl p-4 text-left transition ${
                active ? "glass-hi iris-border" : "glass hover:brightness-125"
              }`}
            >
              <span
                className="block h-1.5 w-8 rounded-full"
                style={{ background: s.accent, boxShadow: `0 0 10px ${s.accent}` }}
              />
              <span className="mt-3 block font-mono text-[10px] uppercase tracking-[0.16em] text-frost-dim">
                {s.grower}
              </span>
              <span className="mt-1 block font-display text-lg font-semibold leading-snug text-frost">
                {s.handle}
              </span>
              <span className="mt-1 block text-[12px] leading-relaxed text-frost-dim">
                {s.system}
              </span>
            </button>
          );
        })}
      </div>

      {/* detail panel */}
      <div className="glass iris-border mt-6 rounded-3xl p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className="rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-void"
            style={{ background: style.accent }}
          >
            {style.difficulty}
          </span>
          {style.waterOnly ? (
            <span className="rounded-full border border-cyan/40 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-cyan">
              Water-only feeding
            </span>
          ) : (
            <span className="rounded-full border border-violet/40 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-violet">
              Tea / schedule feeding
            </span>
          )}
        </div>

        <h3 className="mt-4 font-display text-2xl font-semibold sm:text-3xl">
          {style.vibe}
        </h3>
        <p className="mt-3 max-w-2xl leading-relaxed text-frost-dim">
          {style.philosophy}
        </p>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.2fr]">
          {/* base ingredients */}
          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-[0.2em] text-cyan">
              The shopping list
            </h4>
            <ul className="mt-3 space-y-2">
              {style.base.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-sm text-frost">
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: style.accent }}
                  />
                  {b}
                </li>
              ))}
            </ul>

            <h4 className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-cyan">
              Feeding rhythm
            </h4>
            <p className="mt-3 text-sm leading-relaxed text-frost-dim">
              {style.feeding}
            </p>
          </div>

          {/* recipe blocks */}
          <div className="space-y-4">
            {style.recipe.map((r) => (
              <div key={r.title} className="rounded-2xl border border-white/10 p-5">
                <h4 className="font-mono text-[11px] uppercase tracking-[0.16em] text-frost">
                  {r.title}
                </h4>
                <ul className="mt-3 space-y-1.5">
                  {r.items.map((it) => (
                    <li key={it} className="flex items-start gap-2.5 text-sm text-frost-dim">
                      <span className="mt-0.5 font-mono text-[11px]" style={{ color: style.accent }}>
                        ▸
                      </span>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* the calculator */}
        <Calculator styleId={style.id} accent={style.accent} />

        {/* pros / cons */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-lime/5 p-5">
            <h4 className="font-mono text-[11px] uppercase tracking-[0.16em] text-lime">
              Why growers love it
            </h4>
            <ul className="mt-3 space-y-1.5 text-sm text-frost-dim">
              {style.pros.map((p) => (
                <li key={p}>+ {p}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-magenta/5 p-5">
            <h4 className="font-mono text-[11px] uppercase tracking-[0.16em] text-magenta">
              Eyes open
            </h4>
            <ul className="mt-3 space-y-1.5 text-sm text-frost-dim">
              {style.cons.map((c) => (
                <li key={c}>– {c}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-frost-dim">
        Styles reference publicly shared methods from these growers · not
        affiliated or endorsed · always verify against your own conditions
      </p>
    </div>
  );
}
