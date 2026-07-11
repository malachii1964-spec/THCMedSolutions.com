import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { GuideCard } from "@/components/guide-card";
import { SignOutButton } from "@/components/sign-out-button";
import { getSessionUser } from "@/lib/session";
import { listBookmarks } from "@/lib/bookmarks";
import { getAllGuides } from "@/lib/guides";

export const metadata: Metadata = {
  title: "My Almanac",
  description: "Your saved guides and membership.",
};

export default async function AccountPage() {
  const user = await getSessionUser();
  if (!user) redirect("/login?next=/account");

  const saved = await listBookmarks();
  const savedGuides = getAllGuides().filter((g) => saved.includes(g.slug));

  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-12 sm:px-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-amber">
              Member · full library unlocked
            </p>
            <h1 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
              {user.name}&apos;s almanac
            </h1>
            <p className="mt-2 text-sm text-frost-dim">{user.email}</p>
          </div>
          <SignOutButton />
        </div>

        <h2 className="mt-12 font-display text-2xl font-semibold">
          Saved guides
        </h2>
        {savedGuides.length === 0 ? (
          <div className="mt-6 rounded-lg border border-panel-edge bg-panel p-10 text-center">
            <p className="font-display text-xl font-semibold">
              Nothing saved yet.
            </p>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-frost-dim">
              Hit &ldquo;Save to my almanac&rdquo; on any guide and it&apos;ll
              be waiting here — handy mid-grow when your hands are dirty.
            </p>
            <Link
              href="/guides"
              className="mt-6 inline-block rounded bg-bloom px-6 py-3 text-sm font-semibold text-canopy transition hover:brightness-110"
            >
              Browse the guides
            </Link>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {savedGuides.map((g) => (
              <GuideCard key={g.slug} guide={g} />
            ))}
          </div>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
