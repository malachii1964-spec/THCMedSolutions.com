"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  STRAINS,
  TERPENES,
  sortStrains,
  type Effect,
  type StrainSort,
  type Terp,
} from "@/lib/strains";

const TYPES = ["All", "Indica", "Sativa", "Hybrid"] as const;
const EFFECTS: Effect[] = [
  "relaxed",
  "energetic",
  "euphoric",
  "focused",
  "creative",
  "sleepy",
  "happy",
  "uplifted",
  "hungry",
];
const DIFFS = ["All", "Beginner", "Intermediate", "Advanced"] as const;
const TERPS = Object.keys(TERPENES) as Terp[];
const SORTS: { id: StrainSort; label: string }[] = [
  { id: "featured", label: "Featured" },
  { id: "thc-desc", label: "THC ↓" },
  { id: "flower-asc", label: "Fastest" },
  { id: "name-asc", label: "A–Z" },
];

const TYPE_COLOR: Record<string, string> = {
  Indica: "var(--violet)",
  Sativa: "var(--lime)",
  Hybrid: "var(--cyan)",
};

export function StrainIndex() {
  const [type, setType] = useState<(typeof TYPES)[number]>("All");
  const [effect, setEffect] = useState<Effect | "any">("any");
  const [diff, setDiff] = useState<(typeof DIFFS)[number]>("All");
  const [terp, setTerp] = useState<Terp | "any">("any");
  const [sort, setSort] = useState<StrainSort>("featured");
  const [q, setQ] = useState("");

  const query = q.trim().toLowerCase();
  const results = useMemo(() => {
    const filtered = STRAINS.filter((s) => {
      if (type !== "All" && s.type !== type) return false;
      if (diff !== "All" && s.difficulty !== diff) return false;
      if (effect !== "any" && !s.effects.includes(effect)) return false;
      if (terp !== "any" && !s.terpenes.includes(terp)) return false;
      if (
        query &&
        !s.name.toLowerCase().includes(query) &&
        !s.flavors.join(" ").toLowerCase().includes(query) &&
        !s.lineage.toLowerCase().includes(query) &&
        !s.summary.toLowerCase().includes(query)
      )
        return false;
      return true;
    });
    return sortStrains(filtered, sort);
  }, [type, effect, diff, terp, sort, query]);

  const chip = (active: boolean) =>
    `rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] transition ${
      active
        ? "bg-gradient-to-r from-cyan/30 to-violet/30 text-frost"
        : "border border-white/10 text-frost-dim hover:text-frost"
    }`;

  return (
    <div>
      <div className="glass sticky top-20 z-10 space-y-3 rounded-2xl p-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-frost-dim">
            Type
          </span>
          {TYPES.map((t) => (
            <button key={t} onClick={() => setType(t)} className={chip(type === t)}>
              {t}
            </button>
          ))}
          <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.16em] text-frost-dim">
            Grow
          </span>
          {DIFFS.map((d) => (
            <button key={d} onClick={() => setDiff(d)} className={chip(diff === d)}>
              {d}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-frost-dim">
            Effect
          </span>
          <button onClick={() => setEffect("any")} className={chip(effect === "any")}>
            Any
          </button>
          {EFFECTS.map((e) => (
            <button key={e} onClick={() => setEffect(e)} className={chip(effect === e)}>
              {e}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-frost-dim">
            Terpene
          </span>
          <button onClick={() => setTerp("any")} className={chip(terp === "any")}>
            Any
          </button>
          {TERPS.map((t) => (
            <button key={t} onClick={() => setTerp(t)} className={chip(terp === t)}>
              {TERPENES[t].name}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2 border-t border-white/5 pt-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-frost-dim">
            Sort
          </span>
          {SORTS.map((so) => (
            <button
              key={so.id}
              onClick={() => setSort(so.id)}
              className={chip(sort === so.id)}
            >
              {so.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search strains, flavors, lineage…"
          className="w-full max-w-sm rounded-full border border-white/10 bg-void-2 px-4 py-2.5 text-sm text-frost placeholder:text-frost-dim/60"
        />
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-frost-dim">
          {results.length} of {STRAINS.length} strains
        </span>
      </div>

      {results.length === 0 ? (
        <div className="glass mt-8 rounded-2xl p-10 text-center">
          <p className="font-display text-xl font-semibold">No matches.</p>
          <button
            onClick={() => {
              setType("All");
              setEffect("any");
              setDiff("All");
              setTerp("any");
              setSort("featured");
              setQ("");
            }}
            className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-cyan underline-offset-4 hover:underline"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((s) => (
            <Link
              key={s.slug}
              href={`/strains/${s.slug}`}
              className="group glass relative overflow-hidden rounded-2xl p-5 transition hover:-translate-y-1 hover:brightness-110"
            >
              <div className="flex items-center justify-between">
                <span
                  className="rounded-full px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em]"
                  style={{
                    color: TYPE_COLOR[s.type],
                    border: `1px solid ${TYPE_COLOR[s.type]}`,
                  }}
                >
                  {s.type}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-frost-dim">
                  {s.difficulty} · {s.flowerWeeks}
                </span>
              </div>
              <h3 className="mt-3 font-display text-xl font-semibold transition group-hover:text-cyan">
                {s.name}
                {s.landrace ? (
                  <span className="ml-2 align-middle font-mono text-[8px] uppercase tracking-[0.14em] text-gold">
                    Landrace
                  </span>
                ) : null}
              </h3>
              <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-frost-dim">
                THC {s.thc}
              </p>
              <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-frost-dim">
                {s.summary}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {s.effects.slice(0, 3).map((e) => (
                  <span
                    key={e}
                    className="rounded-full border border-white/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.1em] text-frost-dim"
                  >
                    {e}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
