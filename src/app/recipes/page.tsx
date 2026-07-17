import type { Metadata } from "next";
import Link from "next/link";
import { OsHeader } from "@/components/os-header";
import { OsFooter } from "@/components/os-footer";
import { getAllGuides } from "@/lib/guides";

export const metadata: Metadata = {
  title: "Recipes & Preparations — Edibles, Tinctures, Topicals & Concentrates",
  description:
    "Turn your harvest into edibles, tinctures, topicals, and concentrates. Step-by-step cannabis recipes with dosing math, safety, and storage.",
};

const RECIPE_SLUGS = [
  "making-edibles-safely",
  "cannabutter-and-infused-oils",
  "cannabis-tinctures",
  "cannabis-topicals",
  "pressing-rosin-at-home",
];

const CATEGORY_MAP: Record<string, { label: string; color: string }> = {
  "making-edibles-safely": { label: "Edibles", color: "var(--gold)" },
  "cannabutter-and-infused-oils": {
    label: "Infusions",
    color: "var(--lime)",
  },
  "cannabis-tinctures": { label: "Tinctures", color: "var(--cyan)" },
  "cannabis-topicals": { label: "Topicals", color: "var(--violet)" },
  "pressing-rosin-at-home": { label: "Concentrates", color: "var(--magenta)" },
};

export default function RecipesPage() {
  const allGuides = getAllGuides();
  const recipes = RECIPE_SLUGS.map((slug) =>
    allGuides.find((g) => g.slug === slug),
  ).filter((g): g is NonNullable<typeof g> => Boolean(g));

  return (
    <div className="os-scope min-h-screen bg-void text-frost">
      <OsHeader />

      <main>
        {/* hero */}
        <section className="grain relative overflow-hidden">
          <div className="starfield pointer-events-none absolute inset-0 opacity-60" />
          <div
            aria-hidden
            className="aurora pointer-events-none absolute -top-40 left-1/2 h-[26rem] w-[44rem] -translate-x-1/2 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(ellipse at center, var(--gold) 0%, var(--violet) 50%, transparent 72%)",
              opacity: 0.22,
            }}
          />
          <div className="relative mx-auto max-w-6xl px-4 pb-8 pt-28 text-center sm:px-6 lg:pt-32">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-gold">
              Recipes & Preparations
            </p>
            <h1 className="display-xl mt-4">
              Turn your harvest into{" "}
              <span className="iris-text">something amazing.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-frost-dim">
              Edibles, tinctures, topicals, and solventless concentrates — every
              preparation method a home grower needs, with real dosing math and
              safety notes.
            </p>
          </div>
        </section>

        {/* recipe grid */}
        <section className="relative">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {recipes.map((g) => {
                const cat = CATEGORY_MAP[g.slug];
                return (
                  <Link
                    key={g.slug}
                    href={`/guides/${g.slug}`}
                    className="glass iris-border group flex flex-col rounded-2xl p-6 transition hover:brightness-125"
                  >
                    <span
                      className="inline-block w-fit rounded-full px-3 py-1 font-mono text-[9px] uppercase tracking-[0.14em]"
                      style={{
                        color: cat?.color ?? "var(--frost)",
                        border: `1px solid ${cat?.color ?? "var(--frost)"}`,
                      }}
                    >
                      {cat?.label ?? "Recipe"}
                    </span>
                    <h3 className="mt-4 font-display text-xl font-semibold text-frost">
                      {g.title}
                    </h3>
                    <p className="mt-2 grow text-sm leading-relaxed text-frost-dim">
                      {g.summary}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-frost-dim">
                        {g.readMinutes} min · {g.difficulty}
                      </span>
                      <span className="iris-text font-mono text-sm">→</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* safety callout */}
        <section className="border-t border-white/5">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
            <div className="glass iris-border rounded-3xl p-8">
              <h2 className="font-display text-2xl font-semibold sm:text-3xl">
                Safety <span className="iris-text">first.</span>
              </h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    title: "Always decarb",
                    text: "Raw cannabis contains THCA, not THC. Without decarboxylation (240 °F, 40–45 min), your edibles won't work.",
                    color: "var(--gold)",
                  },
                  {
                    title: "Dose low, wait long",
                    text: "Start at 5 mg THC. Wait a full 2 hours before re-dosing. Edibles hit harder and last longer than smoking.",
                    color: "var(--lime)",
                  },
                  {
                    title: "Label everything",
                    text: "Date, strain, ratio, estimated mg per serving. Future you (and anyone in your household) needs to know.",
                    color: "var(--cyan)",
                  },
                  {
                    title: "No solvents at home",
                    text: "Butane/propane extraction is dangerous in enclosed spaces. Stick to rosin (heat + pressure) or alcohol tinctures.",
                    color: "var(--magenta)",
                  },
                  {
                    title: "Ventilate alcohol work",
                    text: "Evaporating ethanol produces flammable vapor. Always work outdoors or with strong ventilation. Never use open flame.",
                    color: "var(--violet)",
                  },
                  {
                    title: "Store safely",
                    text: "Edibles look like regular food. Keep them clearly labeled and out of reach of children and pets.",
                    color: "var(--gold)",
                  },
                ].map((tip) => (
                  <div key={tip.title}>
                    <h3
                      className="font-display text-base font-semibold"
                      style={{ color: tip.color }}
                    >
                      {tip.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-frost-dim">
                      {tip.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* cross-links */}
        <section className="border-t border-white/5">
          <div className="mx-auto max-w-6xl px-4 py-14 text-center sm:px-6">
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">
              Need flower to cook with?
            </h2>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/strains"
                className="btn-iris rounded-full px-7 py-3 font-mono text-[12px] font-semibold uppercase tracking-[0.14em] transition hover:brightness-110"
              >
                Find a strain
              </Link>
              <Link
                href="/terpenes"
                className="glass-hi rounded-full px-7 py-3 font-mono text-[12px] uppercase tracking-[0.14em] text-frost transition hover:brightness-125"
              >
                Learn about terpenes
              </Link>
              <Link
                href="/start"
                className="glass-hi rounded-full px-7 py-3 font-mono text-[12px] uppercase tracking-[0.14em] text-frost transition hover:brightness-125"
              >
                Grow your own
              </Link>
            </div>
          </div>
        </section>
      </main>

      <OsFooter />
    </div>
  );
}
