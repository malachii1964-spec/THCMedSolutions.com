import type { Metadata } from "next";
import Link from "next/link";
import { OsHeader } from "@/components/os-header";
import { StrainIndex } from "@/components/strain-index";
import { TERPENES, STRAINS } from "@/lib/strains";

export const metadata: Metadata = {
  title: "Strain & Terpene Database — Grow-Focused Profiles",
  description:
    "Searchable cannabis strain profiles with grow specs, terpenes, and effects — filter by type, effect, and grow difficulty. Plus a terpene reference.",
};

export default function StrainsPage() {
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
              opacity: 0.26,
            }}
          />
          <div className="relative mx-auto max-w-6xl px-4 pb-6 pt-28 text-center sm:px-6 lg:pt-32">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-gold">
              Strain & Terpene Database
            </p>
            <h1 className="display-xl mt-4">
              Know the plant <span className="iris-text">before you grow it.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-frost-dim">
              Grow-focused profiles — lineage, flower time, yield, height,
              difficulty, terpenes, and effects. Filter by what you want to
              grow and how you want to feel.
            </p>
          </div>
        </section>

        <section className="relative">
          <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
            <StrainIndex />
          </div>
        </section>

        {/* terpene reference */}
        <section className="border-t border-white/5">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-cyan">
              The aroma molecules
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
              Terpene <span className="iris-text">reference.</span>
            </h2>
            <p className="mt-3 max-w-2xl text-frost-dim">
              Terpenes are the aromatic compounds that give each strain its
              smell, flavor, and much of its character. These are the seven you
              will meet most.
            </p>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Object.values(TERPENES).map((t) => (
                <div key={t.name} className="glass rounded-2xl p-5">
                  <h3 className="font-display text-lg font-semibold text-cyan">
                    {t.name}
                  </h3>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-frost-dim">
                    {t.aroma}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-frost-dim">
                    {t.note}
                  </p>
                  <p className="mt-2 text-[11px] text-frost-dim/80">
                    Also in: {t.alsoIn}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-[11px] leading-relaxed text-frost-dim">
              Educational reference only — {STRAINS.length} profiles compiled
              from widely-published community and seed-bank information. THC,
              terpene, and effect data vary by phenotype and grow; nothing here
              is medical advice.
            </p>
          </div>
        </section>

        <section className="border-t border-white/5">
          <div className="mx-auto max-w-6xl px-4 py-14 text-center sm:px-6">
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">
              Found your strain? Grow it right.
            </h2>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/start"
                className="btn-iris rounded-full px-7 py-3 font-mono text-[12px] font-semibold uppercase tracking-[0.14em] transition hover:brightness-110"
              >
                Start the roadmap
              </Link>
              <Link
                href="/frostybuds-soil"
                className="glass-hi rounded-full px-7 py-3 font-mono text-[12px] uppercase tracking-[0.14em] text-frost transition hover:brightness-125"
              >
                Build your soil
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5">
        <div className="mx-auto max-w-6xl px-4 py-10 text-center sm:px-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-lime">
            Built for education. Designed for wellness. Powered by intelligence.
          </p>
          <p className="mt-3 text-[11px] text-frost-dim">
            © THCMed Solutions / Malachi Syndicate ·{" "}
            <Link href="/legal" className="underline underline-offset-2">
              Legal notice
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
