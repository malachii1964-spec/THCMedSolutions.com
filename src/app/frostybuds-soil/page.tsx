import type { Metadata } from "next";
import Link from "next/link";
import { OsHeader } from "@/components/os-header";
import { OsFooter } from "@/components/os-footer";
import { SoilLab } from "@/components/soil-lab";
import { MiniSprout } from "@/components/os-visuals";
import { SOIL_SCIENCE } from "@/lib/soil-styles";

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.BETTER_AUTH_URL ??
  "https://lakeeriecannabis.com";

export const metadata: Metadata = {
  title: "FrostyBuds Soil Lab — Grow Like Your Favorite Grower",
  description:
    "Pick a grower style — Mr. Canucks living soil, coco autos, veganic, super soil, guano blends — and get the exact base mix, recipe, and feeding rhythm.",
  openGraph: {
    title: "FrostyBuds Soil Lab — Grow Like Your Favorite Grower",
    description:
      "Pick a grower style — Mr. Canucks living soil, coco autos, veganic, super soil, guano blends — and get the exact base mix, recipe, and feeding rhythm.",
    url: `${SITE}/frostybuds-soil`,
  },
  alternates: { canonical: `${SITE}/frostybuds-soil` },
};

export default function FrostyBudsSoilPage() {
  return (
    <div className="os-scope min-h-screen bg-void text-frost">
      <OsHeader />

      <main>
        {/* hero strip */}
        <section className="grain relative overflow-hidden">
          <div className="starfield pointer-events-none absolute inset-0 opacity-60" />
          <div
            aria-hidden
            className="aurora pointer-events-none absolute -top-40 left-1/2 h-[30rem] w-[44rem] -translate-x-1/2 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(ellipse at center, var(--lime) 0%, var(--cyan) 45%, transparent 70%)",
              opacity: 0.3,
            }}
          />
          <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-28 text-center sm:px-6 lg:pt-32">
            <MiniSprout className="mx-auto h-24 w-28" />
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.28em] text-lime">
              FrostyBuds Soil Lab
            </p>
            <h1 className="mx-auto mt-4 max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
              Grow like the growers{" "}
              <span className="iris-text">you already trust.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-frost-dim">
              Pick a style below — living soil, coco autos, veganic, super
              soil, guano blends — and get that grower&apos;s system: the base
              mix, the exact recipe with measurements, and the feeding rhythm.
            </p>
          </div>
        </section>

        {/* the lab */}
        <section className="relative">
          <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
            <SoilLab />
          </div>
        </section>

        {/* soil science */}
        <section className="border-t border-white/5">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-cyan">
              What actually drives growth
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
              Soil science, <span className="iris-text">decoded.</span>
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {SOIL_SCIENCE.map((s) => (
                <div key={s.title} className="glass rounded-2xl p-5">
                  <h3 className="font-display text-lg font-semibold">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-frost-dim">
                    {s.body}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <p className="text-frost-dim">
                Want the full stage-by-stage grow system around your soil?
              </p>
              <div className="mt-4 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/guides"
                  className="btn-iris rounded-full px-7 py-3 font-mono text-[12px] font-semibold uppercase tracking-[0.14em] transition hover:brightness-110"
                >
                  Open the grow guides
                </Link>
                <Link
                  href="/join"
                  className="glass-hi rounded-full px-7 py-3 font-mono text-[12px] uppercase tracking-[0.14em] text-frost transition hover:brightness-125"
                >
                  Join free — unlock deep-dives
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <OsFooter />
    </div>
  );
}
