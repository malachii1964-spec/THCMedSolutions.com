import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { OsHeader } from "@/components/os-header";
import { OsFooter } from "@/components/os-footer";
import { LightCycle } from "@/components/light-cycle";
import { getAllGuides, getGuide, teaserOf } from "@/lib/guides";
import { strainsForGuide } from "@/lib/strains";
import { getStage } from "@/lib/stages";
import { getSessionUser } from "@/lib/session";
import { listBookmarks } from "@/lib/bookmarks";
import { BookmarkButton } from "@/components/bookmark-button";

export function generateStaticParams() {
  return getAllGuides().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  return { title: guide.title, description: guide.summary };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const user = await getSessionUser();
  const locked = guide.membersOnly && !user;
  const body = locked ? teaserOf(guide.content) : guide.content;
  const stage = getStage(guide.stage);
  const saved = user ? (await listBookmarks()).includes(guide.slug) : false;

  const suitedStrains = strainsForGuide(guide.slug);
  const shownStrains = suitedStrains.slice(0, 8);
  const moreStrains = suitedStrains.length - shownStrains.length;

  return (
    <div className="os-scope min-h-screen bg-void text-frost">
      <OsHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 pb-20 pt-28 sm:px-6 lg:pt-32">
        <nav className="font-mono text-[11px] uppercase tracking-[0.14em] text-frost-dim">
          <Link href="/guides" className="hover:text-frost">
            Guides
          </Link>{" "}
          /{" "}
          <Link
            href={`/guides?stage=${guide.stage}`}
            className="text-cyan hover:text-frost"
          >
            {stage?.name}
          </Link>
        </nav>

        <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-lime">
          <span className="whitespace-nowrap">
            {guide.week}
            {stage?.cycleLabel ? ` · ${stage.cycleLabel}` : ""}
          </span>
          <span className="whitespace-nowrap text-frost-dim">
            {guide.difficulty} · {guide.readMinutes} min
          </span>
          {guide.membersOnly ? (
            <span className="rounded border border-gold/50 px-1.5 py-0.5 text-[10px] text-gold">
              Members
            </span>
          ) : null}
        </div>

        <h1 className="mt-4 font-display text-3xl font-semibold leading-tight sm:text-4xl">
          {guide.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-frost-dim">
          {guide.summary}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-6">
          {stage?.hoursOn !== null && stage ? (
            <LightCycle hoursOn={stage.hoursOn} className="w-full max-w-xs" />
          ) : null}
          {user ? <BookmarkButton slug={guide.slug} saved={saved} /> : null}
        </div>

        <article className="prose-guide mt-10">
          <MDXRemote
            source={body}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
          />
        </article>

        {locked ? (
          <div className="relative mt-2">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-void"
            />
            <div className="glass iris-border rounded-2xl p-8 text-center">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-gold">
                Members only — membership is free
              </p>
              <h2 className="mt-3 font-display text-2xl font-semibold">
                The rest of this guide unlocks with a free account.
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-frost-dim">
                No card, no spam — just a name and email, and every advanced
                guide in the library opens up.
              </p>
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  href={`/join?next=/guides/${guide.slug}`}
                  className="btn-iris rounded-full px-6 py-3 font-mono text-[12px] font-semibold uppercase tracking-[0.14em] transition hover:brightness-110"
                >
                  Join free & keep reading
                </Link>
                <Link
                  href={`/login?next=/guides/${guide.slug}`}
                  className="glass-hi rounded-full px-6 py-3 font-mono text-[12px] uppercase tracking-[0.14em] text-frost transition hover:brightness-125"
                >
                  I have an account
                </Link>
              </div>
            </div>
          </div>
        ) : null}

        {shownStrains.length > 0 ? (
          <section className="mt-12 border-t border-white/5 pt-8">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-cyan">
              Strains this applies to
            </h2>
            <p className="mt-2 text-sm text-frost-dim">
              Cultivars in our database whose grow calls for this guide.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {shownStrains.map((s) => (
                <Link
                  key={s.slug}
                  href={`/strains/${s.slug}`}
                  className="glass rounded-full px-3.5 py-1.5 text-sm text-frost transition hover:brightness-125"
                >
                  {s.name}
                  <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.1em] text-frost-dim">
                    {s.type}
                  </span>
                </Link>
              ))}
              {moreStrains > 0 ? (
                <Link
                  href="/strains"
                  className="rounded-full px-3.5 py-1.5 text-sm text-cyan underline underline-offset-2 transition hover:text-frost"
                >
                  +{moreStrains} more
                </Link>
              ) : null}
            </div>
          </section>
        ) : null}

        <p className="mt-12 font-mono text-[11px] uppercase tracking-[0.14em] text-frost-dim">
          Updated {guide.updated} · Educational content only —{" "}
          <Link href="/legal" className="underline underline-offset-2">
            legal notice
          </Link>
        </p>
      </main>
      <OsFooter />
    </div>
  );
}
