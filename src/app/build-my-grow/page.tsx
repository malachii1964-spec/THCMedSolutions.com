import type { Metadata } from "next";
import { OsHeader } from "@/components/os-header";
import { OsFooter } from "@/components/os-footer";
import { BuildMyGrow } from "@/components/build-my-grow";
import { getAllGuides } from "@/lib/guides";
import { GROWERS } from "@/lib/growers";

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.BETTER_AUTH_URL ??
  "https://lakeeriecannabis.com";

export const metadata: Metadata = {
  title: "Build My Grow — Your Personalized Grow Plan",
  description:
    "Answer six quick questions and get a personalized cannabis grow plan: setup, plant count, strain direction, a step-by-step guide roadmap, and the gear to line up.",
  openGraph: {
    title: "Build My Grow — Your Personalized Grow Plan",
    description:
      "Answer six quick questions and get a personalized cannabis grow plan: setup, plant count, strain direction, a step-by-step guide roadmap, and the gear to line up.",
    url: `${SITE}/build-my-grow`,
  },
  alternates: { canonical: `${SITE}/build-my-grow` },
};

export default function BuildMyGrowPage() {
  const guides = getAllGuides().map((g) => ({
    slug: g.slug,
    title: g.title,
    readMinutes: g.readMinutes,
    membersOnly: g.membersOnly,
  }));
  const growers = GROWERS.map((g) => ({ slug: g.slug, name: g.name }));

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
              Build My <span className="iris-text">Grow.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-frost-dim">
              Six quick questions. One personalized plan — your setup, your
              roadmap, your gear, and exactly what to do next.
            </p>
          </div>
        </section>

        <section className="relative">
          <div className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
            <BuildMyGrow guides={guides} growers={growers} />
          </div>
        </section>
      </main>
      <OsFooter />
    </div>
  );
}
