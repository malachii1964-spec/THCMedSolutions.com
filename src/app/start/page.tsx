import type { Metadata } from "next";
import Link from "next/link";
import { OsHeader } from "@/components/os-header";
import { OsFooter } from "@/components/os-footer";
import { LightCycle } from "@/components/light-cycle";
import { getAllGuides } from "@/lib/guides";
import { STAGES } from "@/lib/stages";

export const metadata: Metadata = {
  title: "Start Here — Your First Grow, Mapped",
  description:
    "The complete first-grow roadmap: gear, seeds, and every stage from germination to cure, with the exact guide to read at each step.",
};

const PHASE_NOTES: Record<string, string> = {
  germination:
    "Before anything sprouts: pick your gear, pick your seeds, pop them right.",
  seedling:
    "The fragile weeks. Master watering now and the whole grow gets easier.",
  vegetative:
    "Build the frame — light, climate, and training decide your final yield here.",
  flowering:
    "The flip, the stretch, and eight weeks of bud development.",
  "harvest-cure":
    "Where good grows become great. Patience pays double here.",
  troubleshooting:
    "Bookmark these for the 2 a.m. 'what is wrong with my plant' moments.",
};

export default function StartPage() {
  const guides = getAllGuides();

  return (
    <div className="os-scope min-h-screen bg-void text-frost">
      <OsHeader />

      <main>
        {/* hero */}
        <section className="grain relative overflow-hidden">
          <div className="starfield pointer-events-none absolute inset-0 opacity-60" />
          <div
            aria-hidden
            className="aurora pointer-events-none absolute -top-40 left-1/2 h-[30rem] w-[46rem] -translate-x-1/2 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(ellipse at center, var(--cyan) 0%, var(--violet) 50%, transparent 72%)",
              opacity: 0.32,
            }}
          />
          <div className="relative mx-auto max-w-4xl px-4 pb-12 pt-28 text-center sm:px-6 lg:pt-32">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-cyan">
              Start here · the first-grow roadmap
            </p>
            <h1 className="mx-auto mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
              Your first grow,{" "}
              <span className="iris-text">start to finish.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-frost-dim">
              Everything below is in grow order. Read the phase you&apos;re in,
              skim the one coming next, and keep the troubleshooting section
              bookmarked. That&apos;s the whole system — no forums required.
            </p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="#roadmap"
                className="btn-iris rounded-full px-7 py-3 font-mono text-[12px] font-semibold uppercase tracking-[0.14em] transition hover:brightness-110"
              >
                Show me the road
              </Link>
              <Link
                href="/frostybuds-soil"
                className="glass-hi rounded-full px-7 py-3 font-mono text-[12px] uppercase tracking-[0.14em] text-frost transition hover:brightness-125"
              >
                Pick my soil first
              </Link>
            </div>
          </div>
        </section>

        {/* roadmap */}
        <section id="roadmap" className="relative">
          <div className="mx-auto max-w-4xl px-4 pb-20 sm:px-6">
            <ol className="relative space-y-6 before:absolute before:bottom-6 before:left-[19px] before:top-6 before:w-px before:bg-gradient-to-b before:from-cyan/60 before:via-violet/40 before:to-magenta/30 sm:before:left-[23px]">
              {STAGES.map((stage, i) => {
                const stageGuides = guides.filter((g) => g.stage === stage.id);
                return (
                  <li key={stage.id} className="relative pl-14 sm:pl-16">
                    {/* node marker */}
                    <span
                      className="glass-hi absolute left-0 top-1 flex h-10 w-10 items-center justify-center rounded-full font-mono text-[13px] font-semibold text-cyan sm:h-12 sm:w-12"
                      aria-hidden
                    >
                      {i + 1}
                    </span>

                    <div className="glass rounded-2xl p-5 sm:p-6">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h2 className="font-display text-2xl font-semibold">
                          {stage.name}
                        </h2>
                        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-frost-dim">
                          {stage.weeks}
                          {stage.cycleLabel ? ` · lights ${stage.cycleLabel}` : ""}
                        </span>
                      </div>
                      <p className="mt-1.5 text-sm leading-relaxed text-frost-dim">
                        {PHASE_NOTES[stage.id]}
                      </p>
                      {stage.hoursOn !== null ? (
                        <LightCycle hoursOn={stage.hoursOn} className="mt-4 max-w-xs" />
                      ) : null}

                      <ul className="mt-4 space-y-2">
                        {stageGuides.map((g) => (
                          <li key={g.slug}>
                            <Link
                              href={`/guides/${g.slug}`}
                              className="group flex items-baseline justify-between gap-3 rounded-xl border border-white/5 px-4 py-3 transition hover:border-cyan/40"
                            >
                              <span className="text-sm font-medium text-frost transition group-hover:text-cyan">
                                {g.title}
                              </span>
                              <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.12em] text-frost-dim">
                                {g.readMinutes} min
                                {g.membersOnly ? (
                                  <span className="ml-2 rounded border border-gold/50 px-1.5 py-0.5 text-[9px] text-gold">
                                    Members
                                  </span>
                                ) : null}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-white/5">
          <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
            <h2 className="font-display text-3xl font-semibold">
              Ready when you are.
            </h2>
            <p className="mx-auto mt-3 max-w-md text-frost-dim">
              A free account unlocks the members-only deep-dives on the
              roadmap — training, week-by-week flowering, curing, pest rescue.
            </p>
            <Link
              href="/join"
              className="btn-iris mt-6 inline-block rounded-full px-8 py-3.5 font-mono text-[12px] font-semibold uppercase tracking-[0.14em] transition hover:brightness-110"
            >
              Join free
            </Link>
          </div>
        </section>
      </main>

      <OsFooter />
    </div>
  );
}
