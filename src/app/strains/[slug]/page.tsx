import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { OsHeader } from "@/components/os-header";
import { OsFooter } from "@/components/os-footer";
import { STRAINS, getStrain, relatedGuideSlugs, TERPENES } from "@/lib/strains";
import { getAllGuides } from "@/lib/guides";

export function generateStaticParams() {
  return STRAINS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = getStrain(slug);
  if (!s) return {};
  return {
    title: `${s.name} — Grow Profile, Terpenes & Effects`,
    description: s.summary,
  };
}

const TYPE_COLOR: Record<string, string> = {
  Indica: "var(--violet)",
  Sativa: "var(--lime)",
  Hybrid: "var(--cyan)",
};

export default async function StrainPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = getStrain(slug);
  if (!s) notFound();

  const allGuides = getAllGuides();
  const relatedGuides = relatedGuideSlugs(s)
    .map((gslug) => allGuides.find((g) => g.slug === gslug))
    .filter((g): g is NonNullable<typeof g> => Boolean(g));

  const specs = [
    { l: "Type", v: s.type },
    { l: "Lineage", v: s.lineage },
    { l: "THC", v: s.thc },
    { l: "CBD", v: s.cbd },
    { l: "Flower time", v: s.flowerWeeks },
    { l: "Yield", v: s.yield },
    { l: "Height", v: s.height },
    { l: "Grow difficulty", v: s.difficulty },
    { l: "Climate", v: s.climate },
  ];

  return (
    <div className="os-scope min-h-screen bg-void text-frost">
      <OsHeader />
      <main className="mx-auto w-full max-w-3xl px-4 pb-20 pt-28 sm:px-6 lg:pt-32">
        <nav className="font-mono text-[11px] uppercase tracking-[0.14em] text-frost-dim">
          <Link href="/strains" className="hover:text-frost">
            Strains
          </Link>{" "}
          / <span style={{ color: TYPE_COLOR[s.type] }}>{s.type}</span>
        </nav>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <span
            className="rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em]"
            style={{ color: TYPE_COLOR[s.type], border: `1px solid ${TYPE_COLOR[s.type]}` }}
          >
            {s.type}
          </span>
          {s.landrace ? (
            <span className="rounded-full border border-gold/50 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-gold">
              Landrace
            </span>
          ) : null}
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-frost-dim">
            {s.difficulty} to grow
          </span>
        </div>

        <h1 className="display-xl mt-4">{s.name}</h1>
        <p className="mt-4 text-lg leading-relaxed text-frost-dim">{s.summary}</p>

        {/* spec grid */}
        <dl className="glass iris-border mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl sm:grid-cols-3">
          {specs.map((sp) => (
            <div key={sp.l} className="px-4 py-4">
              <dt className="font-mono text-[9px] uppercase tracking-[0.16em] text-frost-dim">
                {sp.l}
              </dt>
              <dd className="mt-1 font-display text-lg font-semibold text-frost">
                {sp.v}
              </dd>
            </div>
          ))}
        </dl>

        {/* effects + flavors */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-cyan">
              Effects
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {s.effects.map((e) => (
                <span
                  key={e}
                  className="rounded-full bg-gradient-to-r from-cyan/15 to-violet/15 px-3 py-1.5 text-sm text-frost"
                >
                  {e}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-cyan">
              Flavors & aroma
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {s.flavors.map((f) => (
                <span
                  key={f}
                  className="rounded-full border border-white/10 px-3 py-1.5 text-sm text-frost-dim"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* terpenes */}
        <h2 className="mt-10 font-mono text-[11px] uppercase tracking-[0.2em] text-cyan">
          Dominant terpenes
        </h2>
        <div className="mt-3 space-y-3">
          {s.terpenes.map((t) => {
            const info = TERPENES[t];
            return (
              <div key={t} className="glass rounded-2xl p-4">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-lg font-semibold">{info.name}</h3>
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-frost-dim">
                    {info.aroma}
                  </span>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-frost-dim">
                  {info.note}
                </p>
              </div>
            );
          })}
        </div>

        {/* grow notes */}
        <div className="glass iris-border mt-10 rounded-3xl p-6">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-lime">
            Grower&apos;s notes
          </h2>
          <p className="mt-3 leading-relaxed text-frost-dim">{s.growNotes}</p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/start"
              className="btn-iris rounded-full px-6 py-3 text-center font-mono text-[12px] font-semibold uppercase tracking-[0.14em] transition hover:brightness-110"
            >
              Grow it — start the roadmap
            </Link>
            <Link
              href="/frostybuds-soil"
              className="glass-hi rounded-full px-6 py-3 text-center font-mono text-[12px] uppercase tracking-[0.14em] text-frost transition hover:brightness-125"
            >
              Pick a soil
            </Link>
          </div>
        </div>

        {/* grow guides for this strain (auto-matched) */}
        {relatedGuides.length > 0 ? (
          <section className="mt-12">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-cyan">
              Grow guides for {s.name}
            </h2>
            <p className="mt-2 text-sm text-frost-dim">
              Matched to this strain&apos;s {s.difficulty.toLowerCase()}{" "}
              difficulty, {s.climate.toLowerCase()} climate, and {s.height.toLowerCase()}{" "}
              structure.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {relatedGuides.map((g) => (
                <Link
                  key={g.slug}
                  href={`/guides/${g.slug}`}
                  className="glass group flex items-center justify-between gap-3 rounded-2xl p-4 transition hover:brightness-125"
                >
                  <div className="min-w-0">
                    <h3 className="truncate font-display text-base font-semibold">
                      {g.title}
                    </h3>
                    <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-frost-dim">
                      {g.readMinutes} min read
                      {g.membersOnly ? " · members" : ""}
                    </p>
                  </div>
                  <span className="iris-text shrink-0 font-mono text-sm">→</span>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.14em] text-frost-dim">
          Educational profile · data varies by phenotype & grow · not medical
          advice ·{" "}
          <Link href="/strains" className="underline underline-offset-2">
            all strains
          </Link>
        </p>
      </main>
      <OsFooter />
    </div>
  );
}
