import type { Metadata } from "next";
import { OsHeader } from "@/components/os-header";
import { OsFooter } from "@/components/os-footer";
import { GrowTools } from "@/components/grow-tools";

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.BETTER_AUTH_URL ??
  "https://lakeeriecannabis.com";

export const metadata: Metadata = {
  title: "Grow Tools — VPD, DLI & Yield Calculators",
  description:
    "Free cannabis grow calculators: VPD (temp + humidity sweet spot), DLI / light target by stage, and a dried-yield estimator. Dial your room with numbers, not guesses.",
  openGraph: {
    title: "Grow Tools — VPD, DLI & Yield Calculators",
    description:
      "Free cannabis grow calculators: VPD (temp + humidity sweet spot), DLI / light target by stage, and a dried-yield estimator. Dial your room with numbers, not guesses.",
    url: `${SITE}/tools`,
  },
  alternates: { canonical: `${SITE}/tools` },
};

export default function ToolsPage() {
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
                "radial-gradient(ellipse at center, var(--cyan) 0%, var(--violet) 50%, transparent 72%)",
              opacity: 0.26,
            }}
          />
          <div className="relative mx-auto max-w-3xl px-4 pb-6 pt-28 text-center sm:px-6 lg:pt-32">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-cyan">
              Grow Tools
            </p>
            <h1 className="display-xl mt-4">
              Dial it in with <span className="iris-text">numbers.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-frost-dim">
              Stop guessing. Calculate your VPD, your daily light, and your likely
              yield — matched to each stage of the grow.
            </p>
          </div>
        </section>

        <section className="relative">
          <div className="mx-auto max-w-5xl px-4 pb-20 sm:px-6">
            <GrowTools />
            <p className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-[13px] leading-relaxed text-frost-dim">
              Educational estimates for home growers — targets are typical ranges, not
              hard rules. Your genetics, environment, and technique always have the
              final say.
            </p>
          </div>
        </section>
      </main>
      <OsFooter />
    </div>
  );
}
