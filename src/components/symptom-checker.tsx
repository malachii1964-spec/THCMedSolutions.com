"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  SYMPTOMS,
  PART_LABEL,
  SEVERITY_LABEL,
  type PlantPart,
  type Severity,
} from "@/lib/symptoms";

const PARTS: (PlantPart | "all")[] = ["all", "leaves", "buds", "stems", "whole"];
const SEV_STYLE: Record<Severity, string> = {
  good: "text-lime border-lime/40",
  watch: "text-cyan border-cyan/40",
  act: "text-gold border-gold/40",
  urgent: "text-magenta border-magenta/40",
};

export function SymptomChecker({
  guideTitles,
}: {
  guideTitles: Record<string, string>;
}) {
  const [part, setPart] = useState<PlantPart | "all">("all");
  const [selected, setSelected] = useState(SYMPTOMS[0].slug);

  const list = useMemo(
    () => (part === "all" ? SYMPTOMS : SYMPTOMS.filter((s) => s.part === part)),
    [part],
  );
  const current = SYMPTOMS.find((s) => s.slug === selected) ?? list[0];

  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      {/* symptom picker */}
      <div>
        <div className="flex flex-wrap gap-2">
          {PARTS.map((p) => (
            <button
              key={p}
              onClick={() => setPart(p)}
              className={`rounded-full px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.1em] transition ${
                part === p
                  ? "bg-gradient-to-r from-cyan/30 to-violet/30 text-frost"
                  : "border border-white/10 text-frost-dim hover:text-frost"
              }`}
            >
              {p === "all" ? "All" : PART_LABEL[p]}
            </button>
          ))}
        </div>

        <div className="mt-4 grid gap-2">
          {list.map((s) => (
            <button
              key={s.slug}
              onClick={() => setSelected(s.slug)}
              className={`glass flex items-center justify-between gap-3 rounded-2xl p-4 text-left transition hover:brightness-125 ${
                current.slug === s.slug ? "iris-border" : ""
              }`}
            >
              <div className="min-w-0">
                <p className="truncate font-display text-base font-semibold">{s.name}</p>
                <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-frost-dim">
                  {s.where}
                </p>
              </div>
              <span
                className={`shrink-0 rounded-full border px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.1em] ${SEV_STYLE[s.severity]}`}
              >
                {SEVERITY_LABEL[s.severity]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* diagnosis */}
      <div className="lg:sticky lg:top-24 lg:h-fit">
        <div className="glass iris-border rounded-3xl p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-cyan">
                {PART_LABEL[current.part]} · {current.where}
              </p>
              <h2 className="mt-1 font-display text-2xl font-semibold">{current.name}</h2>
            </div>
            <span
              className={`shrink-0 rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.1em] ${SEV_STYLE[current.severity]}`}
            >
              {SEVERITY_LABEL[current.severity]}
            </span>
          </div>

          <h3 className="mt-5 font-mono text-[11px] uppercase tracking-[0.2em] text-frost-dim">
            Likely causes
          </h3>
          <ul className="mt-2 space-y-1.5">
            {current.causes.map((c) => (
              <li key={c} className="flex items-start gap-2.5 text-sm text-frost">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" />
                {c}
              </li>
            ))}
          </ul>

          <div className="mt-5 rounded-2xl bg-lime/5 p-4">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-lime">
              Quick fix
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-frost">{current.quickFix}</p>
          </div>

          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-magenta/25 bg-magenta/5 p-4">
              <h3 className="font-mono text-[10px] uppercase tracking-[0.16em] text-magenta">
                Don&apos;t do this
              </h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-frost-dim">
                {current.dontDo}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 p-4">
              <h3 className="font-mono text-[10px] uppercase tracking-[0.16em] text-frost-dim">
                Prevent it next time
              </h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-frost-dim">
                {current.prevent}
              </p>
            </div>
          </div>

          {current.guideSlugs.length > 0 ? (
            <>
              <h3 className="mt-5 font-mono text-[11px] uppercase tracking-[0.2em] text-cyan">
                Read more
              </h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {current.guideSlugs.map((slug) =>
                  guideTitles[slug] ? (
                    <Link
                      key={slug}
                      href={`/guides/${slug}`}
                      className="glass-hi rounded-full px-3.5 py-1.5 text-sm text-frost transition hover:brightness-125"
                    >
                      {guideTitles[slug]} →
                    </Link>
                  ) : null,
                )}
              </div>
            </>
          ) : null}

          <div className="mt-6 rounded-2xl border border-cyan/25 bg-cyan/5 p-4">
            <p className="text-sm leading-relaxed text-frost-dim">
              Still not sure? The{" "}
              <Link href="/plant-doctor" className="font-semibold text-cyan underline underline-offset-2">
                AI Plant Doctor
              </Link>{" "}
              can look at your exact situation and give a step-by-step plan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
