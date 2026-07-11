import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { GuideCard } from "@/components/guide-card";
import { getAllGuides } from "@/lib/guides";
import { STAGES, type StageId } from "@/lib/stages";

export const metadata: Metadata = {
  title: "Grow Guides",
  description:
    "Stage-by-stage cannabis cultivation guides — germination, veg, flower, harvest, cure, and troubleshooting.",
};

export default async function GuidesPage({
  searchParams,
}: {
  searchParams: Promise<{ stage?: string; q?: string }>;
}) {
  const { stage, q } = await searchParams;
  const activeStage = STAGES.find((s) => s.id === stage)?.id as
    | StageId
    | undefined;
  const query = (q ?? "").trim().toLowerCase();

  let guides = getAllGuides();
  if (activeStage) guides = guides.filter((g) => g.stage === activeStage);
  if (query) {
    guides = guides.filter(
      (g) =>
        g.title.toLowerCase().includes(query) ||
        g.summary.toLowerCase().includes(query),
    );
  }

  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-12 sm:px-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-leaf">
          The almanac
        </p>
        <h1 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
          Grow guides
        </h1>

        <form method="get" action="/guides" className="mt-8 flex max-w-md gap-2">
          {activeStage ? (
            <input type="hidden" name="stage" value={activeStage} />
          ) : null}
          <label htmlFor="guide-search" className="sr-only">
            Search guides
          </label>
          <input
            id="guide-search"
            type="search"
            name="q"
            defaultValue={q ?? ""}
            placeholder="Search: trichomes, mites, pH…"
            className="w-full rounded border border-panel-edge bg-panel px-4 py-2.5 text-sm placeholder:text-frost-dim/60"
          />
          <button
            type="submit"
            className="rounded border border-panel-edge px-4 py-2.5 text-sm text-frost-dim transition hover:border-leaf/60 hover:text-frost"
          >
            Search
          </button>
        </form>

        <nav
          aria-label="Filter by stage"
          className="mt-6 flex flex-wrap gap-2"
        >
          <Link
            href="/guides"
            className={`rounded-full border px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] transition ${
              !activeStage
                ? "border-bloom bg-bloom/15 text-bloom"
                : "border-panel-edge text-frost-dim hover:border-leaf/60 hover:text-frost"
            }`}
          >
            All
          </Link>
          {STAGES.map((s) => (
            <Link
              key={s.id}
              href={`/guides?stage=${s.id}`}
              className={`rounded-full border px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] transition ${
                activeStage === s.id
                  ? "border-bloom bg-bloom/15 text-bloom"
                  : "border-panel-edge text-frost-dim hover:border-leaf/60 hover:text-frost"
              }`}
            >
              {s.shortName}
            </Link>
          ))}
        </nav>

        {guides.length === 0 ? (
          <div className="mt-12 rounded-lg border border-panel-edge bg-panel p-10 text-center">
            <p className="font-display text-xl font-semibold">
              Nothing matches that search.
            </p>
            <p className="mt-2 text-sm text-frost-dim">
              Try a broader term — or{" "}
              <Link href="/guides" className="text-bloom underline underline-offset-2">
                browse everything
              </Link>
              .
            </p>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {guides.map((g) => (
              <GuideCard key={g.slug} guide={g} />
            ))}
          </div>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
