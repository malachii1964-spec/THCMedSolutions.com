"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  findStrains,
  type FinderAnswers,
  type Flavor,
  type Priority,
  type SkillLevel,
  type Vibe,
  type Where,
} from "@/lib/strain-finder";

const TYPE_COLOR: Record<string, string> = {
  Indica: "var(--violet)",
  Sativa: "var(--lime)",
  Hybrid: "var(--cyan)",
};

type Q<T extends string> = {
  key: keyof FinderAnswers;
  question: string;
  options: { id: T; label: string; sub?: string }[];
};

const QUESTIONS = [
  {
    key: "vibe",
    question: "How do you want to feel?",
    options: [
      { id: "chill", label: "Chilled out", sub: "melt into the couch" },
      { id: "social", label: "Happy & social", sub: "good times, giggles" },
      { id: "energy", label: "Energized", sub: "daytime, creative, active" },
      { id: "focus", label: "Focused", sub: "clear-headed, productive" },
      { id: "sleep", label: "Sleepy", sub: "knock me out gently" },
    ],
  } as Q<Vibe>,
  {
    key: "where",
    question: "Where will it grow?",
    options: [
      { id: "indoor", label: "Indoor", sub: "tent / room" },
      { id: "outdoor", label: "Outdoor", sub: "sun-grown" },
      { id: "either", label: "Either", sub: "show me everything" },
    ],
  } as Q<Where>,
  {
    key: "skill",
    question: "How experienced are you?",
    options: [
      { id: "new", label: "First grow", sub: "keep it forgiving" },
      { id: "some", label: "A few grows", sub: "comfortable with basics" },
      { id: "pro", label: "Experienced", sub: "bring the challenge" },
    ],
  } as Q<SkillLevel>,
  {
    key: "flavor",
    question: "What flavors call to you?",
    options: [
      { id: "fruity", label: "Fruity & berry" },
      { id: "citrus", label: "Citrus & zesty" },
      { id: "earthy", label: "Earthy & pine" },
      { id: "sweet", label: "Sweet & dessert" },
      { id: "gas", label: "Gas & diesel" },
    ],
  } as Q<Flavor>,
  {
    key: "priority",
    question: "What matters most?",
    options: [
      { id: "easy", label: "Easy grow" },
      { id: "fast", label: "Fast harvest" },
      { id: "yield", label: "Big yield" },
      { id: "potency", label: "Max potency" },
    ],
  } as Q<Priority>,
] as const;

export function StrainFinder() {
  const [answers, setAnswers] = useState<Partial<FinderAnswers>>({});
  const [step, setStep] = useState(0);

  const done = step >= QUESTIONS.length;
  const results = useMemo(
    () => (done ? findStrains(answers as FinderAnswers, 5) : []),
    [done, answers],
  );

  if (done) {
    return (
      <div>
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-display text-2xl font-semibold">
            Your top matches
          </h2>
          <button
            onClick={() => {
              setAnswers({});
              setStep(0);
            }}
            className="font-mono text-[11px] uppercase tracking-[0.14em] text-cyan underline-offset-4 hover:underline"
          >
            Retake quiz
          </button>
        </div>
        <div className="mt-5 grid gap-4">
          {results.map((m, i) => (
            <Link
              key={m.strain.slug}
              href={`/strains/${m.strain.slug}`}
              className={`group glass flex flex-col gap-3 rounded-2xl p-5 transition hover:-translate-y-0.5 hover:brightness-110 sm:flex-row sm:items-center ${
                i === 0 ? "iris-border" : ""
              }`}
            >
              <span className="iris-text font-display text-3xl font-semibold sm:w-12">
                #{i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-display text-xl font-semibold transition group-hover:text-cyan">
                    {m.strain.name}
                  </h3>
                  <span
                    className="rounded-full px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em]"
                    style={{
                      color: TYPE_COLOR[m.strain.type],
                      border: `1px solid ${TYPE_COLOR[m.strain.type]}`,
                    }}
                  >
                    {m.strain.type}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-frost-dim">
                    THC {m.strain.thc} · {m.strain.flowerWeeks}
                  </span>
                </div>
                {m.reasons.length > 0 ? (
                  <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                    {m.reasons.slice(0, 3).map((r) => (
                      <li
                        key={r}
                        className="flex items-center gap-1.5 text-[13px] text-frost-dim"
                      >
                        <span className="h-1 w-1 rounded-full bg-lime" />
                        {r}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
              <span className="iris-text shrink-0 font-mono text-sm">
                View →
              </span>
            </Link>
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-frost-dim">
          Want to browse everything instead?{" "}
          <Link href="/strains" className="text-cyan underline underline-offset-2">
            Open the full strain database
          </Link>
        </p>
      </div>
    );
  }

  const q = QUESTIONS[step];
  return (
    <div className="glass iris-border mx-auto max-w-xl rounded-3xl p-6 sm:p-8">
      <div className="flex items-center justify-between">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-frost-dim">
          Question {step + 1} of {QUESTIONS.length}
        </p>
        {step > 0 ? (
          <button
            onClick={() => setStep(step - 1)}
            className="font-mono text-[10px] uppercase tracking-[0.14em] text-frost-dim hover:text-frost"
          >
            ← Back
          </button>
        ) : null}
      </div>
      {/* progress */}
      <div className="mt-3 flex gap-1.5">
        {QUESTIONS.map((_, i) => (
          <span
            key={i}
            className={`h-1 flex-1 rounded-full ${
              i <= step ? "bg-gradient-to-r from-cyan to-violet" : "bg-white/10"
            }`}
          />
        ))}
      </div>

      <h2 className="mt-6 font-display text-2xl font-semibold">{q.question}</h2>
      <div className="mt-5 grid gap-2.5">
        {q.options.map((o) => (
          <button
            key={o.id}
            onClick={() => {
              setAnswers((prev) => ({ ...prev, [q.key]: o.id }));
              setStep(step + 1);
            }}
            className="glass-hi flex items-baseline justify-between gap-3 rounded-2xl px-5 py-4 text-left transition hover:brightness-125"
          >
            <span className="font-display text-base font-semibold text-frost">
              {o.label}
            </span>
            {"sub" in o && o.sub ? (
              <span className="text-[12px] text-frost-dim">{o.sub}</span>
            ) : null}
          </button>
        ))}
      </div>
    </div>
  );
}
