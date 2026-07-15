import type { Metadata } from "next";
import Link from "next/link";
import { OsHeader } from "@/components/os-header";
import { GearIndex } from "@/components/gear-index";
import { GEAR_COUNT, GEAR_UPDATED } from "@/lib/gear";

export const metadata: Metadata = {
  title: "The Gear Index — Top Home-Grow Products",
  description:
    "The staple products of non-commercial home cannabis cultivation, indoor and outdoor — lights, tents, media, amendments, IPM, harvest gear. Filter by budget and setting.",
};

export default function GearPage() {
  return (
    <div className="os-scope min-h-screen bg-void text-frost">
      <OsHeader />

      <main>
        <section className="grain relative overflow-hidden">
          <div className="starfield pointer-events-none absolute inset-0 opacity-60" />
          <div
            aria-hidden
            className="aurora pointer-events-none absolute -top-40 left-1/2 h-[28rem] w-[46rem] -translate-x-1/2 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(ellipse at center, var(--gold) 0%, var(--magenta) 50%, transparent 72%)",
              opacity: 0.26,
            }}
          />
          <div className="relative mx-auto max-w-6xl px-4 pb-8 pt-28 text-center sm:px-6 lg:pt-32">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-gold">
              The Gear Index · updated {GEAR_UPDATED}
            </p>
            <h1 className="mx-auto mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
              The {GEAR_COUNT} things that{" "}
              <span className="iris-text">actually grow weed.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-frost-dim">
              The staple gear of home cannabis cultivation — indoor and
              outdoor, budget to premium. No hype, no fake wattage, no scams.
              Filter to your setup and build your cart with confidence.
            </p>
            <p className="mx-auto mt-4 max-w-xl text-[12px] leading-relaxed text-frost-dim">
              Community-consensus picks, not paid placements. We list products
              by tier instead of price so the list stays honest — always check
              the current model and reviews before you buy.
            </p>
          </div>
        </section>

        <section className="relative">
          <div className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
            <GearIndex />
          </div>
        </section>

        <section className="border-t border-white/5">
          <div className="mx-auto max-w-6xl px-4 py-14 text-center sm:px-6">
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">
              Got the gear? Now grow with it.
            </h2>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/start"
                className="btn-iris rounded-full px-7 py-3 font-mono text-[12px] font-semibold uppercase tracking-[0.14em] transition hover:brightness-110"
              >
                Start the first-grow roadmap
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
          <p className="mt-3 text-[11px] leading-relaxed text-frost-dim">
            Educational reference only — not sponsored, not medical or legal
            advice. 21+ only. © THCMed Solutions / Malachi Syndicate ·{" "}
            <Link href="/legal" className="underline underline-offset-2">
              Legal notice
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
