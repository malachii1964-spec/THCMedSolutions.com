import type { Metadata } from "next";
import { OsHeader } from "@/components/os-header";
import { StrainFinder } from "@/components/strain-finder";

export const metadata: Metadata = {
  title: "Strain Finder — Find Your Perfect Cannabis Strain",
  description:
    "Answer five quick questions — how you want to feel, where you'll grow, your experience, and your flavor — and get your best-matched strains with the reasons why.",
};

export default function StrainFinderPage() {
  return (
    <div className="os-scope min-h-screen bg-void text-frost">
      <OsHeader />
      <main>
        <section className="grain relative overflow-hidden">
          <div className="starfield pointer-events-none absolute inset-0 opacity-60" />
          <div
            aria-hidden
            className="aurora pointer-events-none absolute -top-40 left-1/2 h-[26rem] w-[42rem] -translate-x-1/2 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(ellipse at center, var(--magenta) 0%, var(--violet) 50%, transparent 72%)",
              opacity: 0.24,
            }}
          />
          <div className="relative mx-auto max-w-3xl px-4 pb-6 pt-28 text-center sm:px-6 lg:pt-32">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-magenta">
              Strain Finder
            </p>
            <h1 className="display-xl mt-4">
              Find <span className="iris-text">your strain.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-frost-dim">
              Five questions. Your perfect matches — by feel, flavor, and how
              you grow — with the reasons why.
            </p>
          </div>
        </section>

        <section className="relative">
          <div className="mx-auto max-w-4xl px-4 pb-20 sm:px-6">
            <StrainFinder />
          </div>
        </section>
      </main>
    </div>
  );
}
