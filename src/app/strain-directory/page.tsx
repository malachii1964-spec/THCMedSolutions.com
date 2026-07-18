import type { Metadata } from "next";
import Link from "next/link";
import { OsHeader } from "@/components/os-header";
import { OsFooter } from "@/components/os-footer";
import { StrainDirectory } from "@/components/strain-directory";
import { getDirectory } from "@/lib/strain-directory";

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.BETTER_AUTH_URL ??
  "https://lakeeriecannabis.com";

const entries = getDirectory();

export const metadata: Metadata = {
  title: `Strain Directory — ${entries.length}+ Cannabis Strains`,
  description:
    "Search the Lake Erie Cannabis strain directory — hundreds of cultivars by name, type, and lineage, with full grow profiles for the ones you'll actually grow.",
  openGraph: {
    title: `Strain Directory — ${entries.length}+ Cannabis Strains`,
    description:
      "Search the Lake Erie Cannabis strain directory — hundreds of cultivars by name, type, and lineage, with full grow profiles for the ones you'll actually grow.",
    url: `${SITE}/strain-directory`,
  },
  alternates: { canonical: `${SITE}/strain-directory` },
};

export default function StrainDirectoryPage() {
  return (
    <div className="os-scope min-h-screen bg-void text-frost">
      <OsHeader />
      <main>
        <section className="grain relative overflow-hidden">
          <div className="starfield pointer-events-none absolute inset-0 opacity-60" />
          <div
            aria-hidden
            className="aurora pointer-events-none absolute -top-40 left-1/2 h-[26rem] w-[44rem] -translate-x-1/2 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(ellipse at center, var(--gold) 0%, var(--magenta) 50%, transparent 72%)",
              opacity: 0.24,
            }}
          />
          <div className="relative mx-auto max-w-3xl px-4 pb-6 pt-28 text-center sm:px-6 lg:pt-32">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-gold">
              Strain Directory
            </p>
            <h1 className="display-xl mt-4">
              Every strain, <span className="iris-text">one search.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-frost-dim">
              {entries.length}+ cultivars by name, type, and lineage. The ones marked{" "}
              <span className="text-gold">★</span> have a full Lake Erie grow profile —
              the rest are here so you can always find what you&apos;re looking for.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/strains"
                className="glass-hi rounded-full px-6 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-frost transition hover:brightness-125"
              >
                Full grow profiles →
              </Link>
              <Link
                href="/strain-finder"
                className="btn-iris rounded-full px-6 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] transition hover:brightness-110"
              >
                Find my strain →
              </Link>
            </div>
          </div>
        </section>

        <section className="relative">
          <div className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
            <StrainDirectory entries={entries} />
            <p className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-[13px] leading-relaxed text-frost-dim">
              A growing reference of well-known cultivars — names, types, and lineage
              compiled from widely-published community and breeder information. We add
              full grow profiles for the strains people actually grow; want one
              profiled?{" "}
              <Link href="/plant-doctor" className="text-cyan underline underline-offset-2">
                Ask the Plant Doctor
              </Link>
              .
            </p>
          </div>
        </section>
      </main>
      <OsFooter />
    </div>
  );
}
