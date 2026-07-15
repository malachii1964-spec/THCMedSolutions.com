"use client";

import { useMemo, useState } from "react";
import { GEAR, GEAR_COUNT, type GearItem } from "@/lib/gear";

type EnvFilter = "all" | "indoor" | "outdoor";
type TierFilter = "all" | "$" | "$$" | "$$$";

const TIER_LABEL: Record<string, string> = {
  $: "Budget",
  $$: "Mid",
  $$$: "Premium",
};

function matches(item: GearItem, env: EnvFilter, tier: TierFilter) {
  const envOk = env === "all" || item.envs.includes(env);
  const tierOk = tier === "all" || item.tier === tier;
  return envOk && tierOk;
}

export function GearIndex() {
  const [env, setEnv] = useState<EnvFilter>("all");
  const [tier, setTier] = useState<TierFilter>("all");
  const [q, setQ] = useState("");

  const query = q.trim().toLowerCase();
  const cats = useMemo(
    () =>
      GEAR.map((c) => ({
        ...c,
        items: c.items.filter(
          (it) =>
            matches(it, env, tier) &&
            (query === "" ||
              it.name.toLowerCase().includes(query) ||
              it.note.toLowerCase().includes(query)),
        ),
      })).filter((c) => c.items.length > 0),
    [env, tier, query],
  );

  const shown = cats.reduce((a, c) => a + c.items.length, 0);

  return (
    <div>
      {/* controls */}
      <div className="glass sticky top-20 z-10 flex flex-col gap-3 rounded-2xl p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-frost-dim">
            Setting
          </span>
          {(["all", "indoor", "outdoor"] as EnvFilter[]).map((e) => (
            <button
              key={e}
              onClick={() => setEnv(e)}
              className={`rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] transition ${
                env === e
                  ? "bg-gradient-to-r from-cyan/30 to-violet/30 text-frost"
                  : "border border-white/10 text-frost-dim hover:text-frost"
              }`}
            >
              {e}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-frost-dim">
            Budget
          </span>
          {(["all", "$", "$$", "$$$"] as TierFilter[]).map((t) => (
            <button
              key={t}
              onClick={() => setTier(t)}
              className={`rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] transition ${
                tier === t
                  ? "bg-gradient-to-r from-cyan/30 to-violet/30 text-frost"
                  : "border border-white/10 text-frost-dim hover:text-frost"
              }`}
            >
              {t === "all" ? "All" : `${t} ${TIER_LABEL[t]}`}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search gear — 'coco', 'pH', 'carbon filter'…"
          className="w-full max-w-sm rounded-full border border-white/10 bg-void-2 px-4 py-2.5 text-sm text-frost placeholder:text-frost-dim/60"
        />
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-frost-dim">
          Showing {shown} of {GEAR_COUNT}
        </span>
      </div>

      {/* categories */}
      <div className="mt-8 space-y-10">
        {cats.map((c) => (
          <section key={c.id}>
            <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-white/10 pb-3">
              <h2 className="font-display text-2xl font-semibold">{c.name}</h2>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-cyan">
                {c.items.length} pick{c.items.length > 1 ? "s" : ""}
              </span>
            </div>
            <p className="mt-2 text-sm text-frost-dim">{c.blurb}</p>
            <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {c.items.map((it) => (
                <li
                  key={it.name}
                  className="glass flex flex-col rounded-2xl p-4"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-semibold leading-snug text-frost">
                      {it.name}
                    </h3>
                    <span
                      className="shrink-0 rounded-md px-1.5 py-0.5 font-mono text-[10px] font-semibold"
                      style={{
                        color:
                          it.tier === "$"
                            ? "var(--lime)"
                            : it.tier === "$$"
                              ? "var(--cyan)"
                              : "var(--gold)",
                        border: `1px solid`,
                      }}
                    >
                      {it.tier}
                    </span>
                  </div>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-frost-dim">
                    {it.note}
                  </p>
                  <div className="mt-3 flex gap-1.5">
                    {it.envs.map((e) => (
                      <span
                        key={e}
                        className="rounded-full border border-white/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-frost-dim"
                      >
                        {e}
                      </span>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}

        {cats.length === 0 ? (
          <div className="glass rounded-2xl p-10 text-center">
            <p className="font-display text-xl font-semibold">
              Nothing matches those filters.
            </p>
            <button
              onClick={() => {
                setEnv("all");
                setTier("all");
                setQ("");
              }}
              className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-cyan underline-offset-4 hover:underline"
            >
              Reset filters
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
