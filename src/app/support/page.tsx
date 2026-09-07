import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { OsHeader } from "@/components/os-header";
import { OsFooter } from "@/components/os-footer";
import {
  KOFI_URL,
  SUPPORT_DISCLOSURE,
  SUPPORT_HEADLINE,
  SUPPORT_INTRO,
  SUPPORT_WHERE_IT_GOES,
  supportEnabled,
} from "@/lib/support";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.lakeeriecannabis.com";

const DESCRIPTION =
  "Lake Erie Cannabis is built by one person. Support keeps the grow guides free, funds real testing, and buys more time on the platform.";

export const metadata: Metadata = {
  title: "Support the build",
  description: DESCRIPTION,
  openGraph: {
    title: "Support the build — Lake Erie Cannabis",
    description: DESCRIPTION,
    url: `${SITE}/support`,
  },
  alternates: { canonical: `${SITE}/support` },
};

export default function SupportPage() {
  // No Ko-fi handle configured yet: 404 rather than ship a page with a dead
  // donate button on it.
  if (!supportEnabled()) notFound();

  return (
    <div className="os-scope min-h-screen bg-void text-frost">
      <OsHeader />

      <main className="mx-auto w-full max-w-3xl px-4 pb-28 pt-28 sm:px-6 lg:pt-32">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-gold">
          Support the build
        </p>
        <h1 className="display-xl mt-3">{SUPPORT_HEADLINE}</h1>

        <div className="mt-6 space-y-4">
          {SUPPORT_INTRO.map((p) => (
            <p key={p.slice(0, 24)} className="text-lg leading-relaxed text-frost-dim">
              {p}
            </p>
          ))}
        </div>

        <a
          href={KOFI_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-iris mt-8 inline-flex rounded-full px-6 py-3 text-base font-semibold"
        >
          Support on Ko-fi →
        </a>
        <p className="mt-2.5 font-mono text-[10px] uppercase tracking-[0.12em] text-frost-dim">
          One-time or monthly · leaves this site
        </p>

        {/* ------------------------------------------------ where it goes -- */}
        <section className="mt-14">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-cyan">
            Where it actually goes
          </h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {SUPPORT_WHERE_IT_GOES.map((x) => (
              <div key={x.t} className="glass min-w-0 rounded-2xl p-5">
                <h3 className="font-display text-lg font-semibold">{x.t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-frost-dim">
                  {x.d}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------ free anyway --- */}
        <section className="glass iris-border mt-12 rounded-3xl p-6">
          <h2 className="font-display text-2xl font-semibold">
            Can&apos;t give? Nothing changes.
          </h2>
          <p className="mt-3 leading-relaxed text-frost-dim">
            The guides stay free. Support never unlocks content and never will —
            that would make this a store, and it isn&apos;t one. If money is
            tight, grow something great and tell one person where you learned
            it. That helps more than you think.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/start"
              className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-frost transition hover:brightness-125"
            >
              Start my first grow →
            </Link>
            <Link
              href="/guides"
              className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-frost transition hover:brightness-125"
            >
              Read the guides →
            </Link>
          </div>
        </section>

        <p className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-[12px] leading-relaxed text-frost-dim">
          {SUPPORT_DISCLOSURE}
        </p>
      </main>

      <OsFooter />
    </div>
  );
}
