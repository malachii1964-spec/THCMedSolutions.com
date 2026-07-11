import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LightCycle } from "@/components/light-cycle";
import { GuideCard } from "@/components/guide-card";
import { getAllGuides } from "@/lib/guides";
import { STAGES } from "@/lib/stages";

export default function HomePage() {
  const guides = getAllGuides();
  const featured = guides.filter((g) => !g.membersOnly).slice(0, 3);
  const memberCount = guides.filter((g) => g.membersOnly).length;

  return (
    <>
      <SiteHeader />
      <main>
        {/* Hero — the grow room at night */}
        <section className="relative overflow-hidden">
          <div
            aria-hidden
            className="glow-drift pointer-events-none absolute -top-40 left-1/2 h-[34rem] w-[60rem] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
            style={{
              background:
                "radial-gradient(ellipse at center, var(--bloom) 0%, var(--spectrum) 45%, transparent 70%)",
            }}
          />
          <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-24">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-leaf">
              The grower&apos;s almanac · germination to cure
            </p>
            <h1 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
              Grow medicine you can trust,{" "}
              <em className="not-italic text-bloom">one week at a time.</em>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-frost-dim">
              Stage-by-stage cannabis cultivation guides written like a field
              manual — the numbers, the schedules, and the fixes. No forums to
              dig through, no products to sell you.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/join"
                className="rounded bg-bloom px-6 py-3.5 text-center text-sm font-semibold text-canopy transition hover:brightness-110"
              >
                Join free — unlock the full library
              </Link>
              <Link
                href="/guides"
                className="rounded border border-panel-edge px-6 py-3.5 text-center text-sm text-frost transition hover:border-leaf/60"
              >
                Browse the guides
              </Link>
            </div>
            <LightCycle
              hoursOn={18}
              label="Veg room · lights on 18/6"
              className="mt-14 max-w-md"
            />
          </div>
        </section>

        {/* The almanac: six stages */}
        <section className="border-t border-panel-edge/60">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">
              Every stage, mapped.
            </h2>
            <p className="mt-2 max-w-lg text-frost-dim">
              The whole grow, organized the way it actually happens. Start
              where your plant is.
            </p>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {STAGES.map((stage) => {
                const count = guides.filter(
                  (g) => g.stage === stage.id,
                ).length;
                return (
                  <Link
                    key={stage.id}
                    href={`/guides?stage=${stage.id}`}
                    className="group rounded-lg border border-panel-edge bg-panel p-5 transition hover:border-leaf/60"
                  >
                    <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-[0.14em] text-leaf">
                      <span>{stage.weeks}</span>
                      <span>
                        {count} guide{count === 1 ? "" : "s"}
                      </span>
                    </div>
                    <h3 className="mt-3 font-display text-xl font-semibold transition group-hover:text-bloom">
                      {stage.name}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-frost-dim">
                      {stage.blurb}
                    </p>
                    {stage.hoursOn !== null ? (
                      <LightCycle
                        hoursOn={stage.hoursOn}
                        className="mt-4"
                        label={`Lights ${stage.cycleLabel}`}
                      />
                    ) : (
                      <p className="mt-4 pt-[6px] font-mono text-[11px] uppercase tracking-[0.14em] text-frost-dim">
                        All stages · diagnose first
                      </p>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Featured free guides */}
        <section className="border-t border-panel-edge/60">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="font-display text-2xl font-semibold sm:text-3xl">
                  Start reading — free, no account.
                </h2>
                <p className="mt-2 text-frost-dim">
                  The fundamentals are open to everyone.
                </p>
              </div>
              <Link
                href="/guides"
                className="font-mono text-[11px] uppercase tracking-[0.14em] text-bloom underline-offset-4 hover:underline"
              >
                All guides →
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((g) => (
                <GuideCard key={g.slug} guide={g} />
              ))}
            </div>
          </div>
        </section>

        {/* Membership band */}
        <section className="border-t border-panel-edge/60">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <div className="relative overflow-hidden rounded-lg border border-panel-edge bg-panel px-6 py-12 text-center sm:px-12">
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full opacity-20 blur-3xl"
                style={{
                  background:
                    "radial-gradient(ellipse at center, var(--amber) 0%, var(--bloom) 60%, transparent 75%)",
                }}
              />
              <p className="relative font-mono text-[11px] uppercase tracking-[0.22em] text-amber">
                Free membership
              </p>
              <h2 className="relative mx-auto mt-4 max-w-xl font-display text-3xl font-semibold leading-tight">
                The deep-dive guides are free too. They just need a name.
              </h2>
              <p className="relative mx-auto mt-4 max-w-lg text-frost-dim">
                Training techniques, week-by-week flowering, drying and curing,
                pest control — {memberCount} advanced guides unlock the moment
                you create a free account. No card, no spam.
              </p>
              <Link
                href="/join"
                className="relative mt-8 inline-block rounded bg-bloom px-8 py-3.5 text-sm font-semibold text-canopy transition hover:brightness-110"
              >
                Create your free account
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
