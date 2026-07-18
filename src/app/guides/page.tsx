import type { Metadata } from "next";
import Link from "next/link";
import { OsHeader } from "@/components/os-header";
import { OsFooter } from "@/components/os-footer";
import { GuideCard } from "@/components/guide-card";
import { getAllGuides } from "@/lib/guides";
import { STAGES, type StageId } from "@/lib/stages";

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.BETTER_AUTH_URL ??
  "https://lakeeriecannabis.com";

export const metadata: Metadata = {
  title: "Grow Guides",
  description:
    "Stage-by-stage cannabis cultivation guides — germination, veg, flower, harvest, cure, and troubleshooting.",
  openGraph: {
    title: "Grow Guides",
    description:
      "Stage-by-stage cannabis cultivation guides — germination, veg, flower, harvest, cure, and troubleshooting.",
    url: `${SITE}/guides`,
  },
  alternates: { canonical: `${SITE}/guides` },
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
    <div className="os-scope min-h-screen bg-void text-frost">
      <OsHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-20 pt-28 sm:px-6 lg:pt-32">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-cyan">
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
            className="glass w-full rounded-full px-4 py-2.5 text-sm text-frost placeholder:text-frost-dim/60"
          />
          <button
            type="submit"
            className="glass-hi rounded-full px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.12em] text-frost-dim transition hover:text-frost"
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
                ? "border-cyan bg-cyan/15 text-cyan"
                : "border-white/10 text-frost-dim hover:border-white/25 hover:text-frost"
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
                  ? "border-cyan bg-cyan/15 text-cyan"
                  : "border-white/10 text-frost-dim hover:border-white/25 hover:text-frost"
              }`}
            >
              {s.shortName}
            </Link>
          ))}
        </nav>

        {guides.length === 0 ? (
          <div className="glass iris-border mt-12 rounded-2xl p-10 text-center">
            <p className="font-display text-xl font-semibold">
              Nothing matches that search.
            </p>
            <p className="mt-2 text-sm text-frost-dim">
              Try a broader term — or{" "}
              <Link href="/guides" className="text-cyan underline underline-offset-2">
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
      <OsFooter />
    </div>
  );
}
