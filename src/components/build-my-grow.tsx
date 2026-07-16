"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  buildGrowPlan,
  type GrowBudget,
  type GrowEnv,
  type GrowExp,
  type GrowGoal,
  type GrowMedium,
  type GrowSpace,
} from "@/lib/build-my-grow";

type GuideLite = { slug: string; title: string; readMinutes: number; membersOnly: boolean };
type GrowerLite = { slug: string; name: string };

const INDOOR_SPACES: { id: GrowSpace; label: string }[] = [
  { id: "micro", label: "Closet / 2x2" },
  { id: "small", label: "2x4 tent" },
  { id: "standard", label: "4x4 tent" },
  { id: "large", label: "5x5+ tent" },
];
const OUTDOOR_SPACES: { id: GrowSpace; label: string }[] = [
  { id: "containers", label: "Pots / patio" },
  { id: "ground", label: "In-ground" },
];

function Group<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { id: T; label: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-frost-dim">
        {label}
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o.id}
            type="button"
            onClick={() => onChange(o.id)}
            className={`rounded-full px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.1em] transition ${
              value === o.id
                ? "bg-gradient-to-r from-cyan/30 to-violet/30 text-frost"
                : "border border-white/10 text-frost-dim hover:text-frost"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function BuildMyGrow({
  guides,
  growers,
}: {
  guides: GuideLite[];
  growers: GrowerLite[];
}) {
  const [env, setEnv] = useState<GrowEnv>("indoor");
  const [space, setSpace] = useState<GrowSpace>("small");
  const [experience, setExperience] = useState<GrowExp>("beginner");
  const [medium, setMedium] = useState<GrowMedium>("soil");
  const [budget, setBudget] = useState<GrowBudget>("mid");
  const [goal, setGoal] = useState<GrowGoal>("simple");

  const spaces = env === "indoor" ? INDOOR_SPACES : OUTDOOR_SPACES;

  function chooseEnv(next: GrowEnv) {
    setEnv(next);
    // keep space valid for the environment
    if (next === "indoor" && !INDOOR_SPACES.some((s) => s.id === space)) setSpace("small");
    if (next === "outdoor" && !OUTDOOR_SPACES.some((s) => s.id === space)) setSpace("containers");
  }

  const plan = useMemo(
    () => buildGrowPlan({ env, space, experience, medium, budget, goal }),
    [env, space, experience, medium, budget, goal],
  );

  const guideById = useMemo(
    () => new Map(guides.map((g) => [g.slug, g])),
    [guides],
  );
  const grower = growers.find((g) => g.slug === plan.growerSlug);
  const roadmap = plan.roadmap
    .map((s) => guideById.get(s))
    .filter((g): g is GuideLite => Boolean(g));

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      {/* choices */}
      <div className="glass iris-border h-fit space-y-5 rounded-3xl p-6 lg:sticky lg:top-24">
        <Group
          label="Where are you growing?"
          value={env}
          onChange={chooseEnv}
          options={[
            { id: "indoor", label: "Indoor" },
            { id: "outdoor", label: "Outdoor" },
          ]}
        />
        <Group label="Space" value={space} onChange={setSpace} options={spaces} />
        <Group
          label="Experience"
          value={experience}
          onChange={setExperience}
          options={[
            { id: "beginner", label: "First grow" },
            { id: "some", label: "Some" },
            { id: "experienced", label: "Experienced" },
          ]}
        />
        <Group
          label="Growing style"
          value={medium}
          onChange={setMedium}
          options={[
            { id: "soil", label: "Living soil" },
            { id: "coco", label: "Coco" },
            { id: "hydro", label: "Hydro" },
          ]}
        />
        <Group
          label="Budget"
          value={budget}
          onChange={setBudget}
          options={[
            { id: "budget", label: "Budget" },
            { id: "mid", label: "Mid" },
            { id: "premium", label: "Premium" },
          ]}
        />
        <Group
          label="What matters most?"
          value={goal}
          onChange={setGoal}
          options={[
            { id: "simple", label: "Keep it easy" },
            { id: "quality", label: "Best quality" },
            { id: "yield", label: "Most yield" },
          ]}
        />
      </div>

      {/* plan */}
      <div className="space-y-5">
        <div className="glass iris-border rounded-3xl p-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-lime">
            Your grow plan
          </p>
          <h2 className="mt-2 font-display text-2xl font-semibold capitalize sm:text-3xl">
            {plan.headline}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-frost-dim">
            {plan.summary}
          </p>
          <dl className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10">
            {plan.setup.map((s) => (
              <div key={s.label} className="bg-white/[0.02] px-4 py-3">
                <dt className="font-mono text-[9px] uppercase tracking-[0.14em] text-frost-dim">
                  {s.label}
                </dt>
                <dd className="mt-0.5 text-sm font-semibold text-frost">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* roadmap */}
        <div className="glass rounded-3xl p-6">
          <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-cyan">
            Your roadmap — follow in order
          </h3>
          <ol className="mt-4 space-y-2">
            {roadmap.map((g, i) => (
              <li key={g.slug}>
                <Link
                  href={`/guides/${g.slug}`}
                  className="group flex items-center gap-3 rounded-xl px-2 py-2 transition hover:bg-white/[0.04]"
                >
                  <span className="iris-text w-5 shrink-0 text-center font-display text-base font-semibold">
                    {i + 1}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-sm text-frost transition group-hover:text-cyan">
                    {g.title}
                  </span>
                  <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.1em] text-frost-dim">
                    {g.readMinutes}m{g.membersOnly ? " · 🔒" : ""}
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>

        {/* strain + grower + gear */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="glass rounded-3xl p-6">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-cyan">
              Pick your genetics
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-frost-dim">
              {plan.strainDirection}
            </p>
            <Link
              href="/strains"
              className="btn-iris mt-4 inline-block rounded-full px-5 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] transition hover:brightness-110"
            >
              Browse strains →
            </Link>
          </div>
          <div className="glass rounded-3xl p-6">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold">
              Learn from a great
            </h3>
            {grower ? (
              <>
                <p className="mt-3 text-sm leading-relaxed text-frost-dim">
                  Your setup lines up with{" "}
                  <span className="font-semibold text-frost">{grower.name}</span>
                  &apos;s approach.
                </p>
                <Link
                  href={`/grow-like-the-greats/${grower.slug}`}
                  className="glass-hi mt-4 inline-block rounded-full px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-frost transition hover:brightness-125"
                >
                  Grow like {grower.name.split(" ")[0]} →
                </Link>
              </>
            ) : null}
          </div>
        </div>

        {/* gear + tips */}
        <div className="glass rounded-3xl p-6">
          <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-cyan">
            Gear to line up
          </h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {plan.gear.map((g) => (
              <span
                key={g}
                className="rounded-full border border-white/10 px-3 py-1.5 text-sm text-frost-dim"
              >
                {g}
              </span>
            ))}
          </div>
          <Link
            href="/gear"
            className="mt-4 inline-block font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-cyan underline-offset-4 hover:underline"
          >
            Open the Gear Index →
          </Link>

          <h3 className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-lime">
            Tips for your plan
          </h3>
          <ul className="mt-3 space-y-2">
            {plan.tips.map((t) => (
              <li key={t} className="flex items-start gap-2.5 text-sm text-frost-dim">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-lime" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
