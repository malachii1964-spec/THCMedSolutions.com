import Link from "next/link";
import { OsHeader } from "@/components/os-header";
import { HyperBloom } from "@/components/hyper-bloom";
import { NiagaraSkyline } from "@/components/niagara-skyline";
import { GuideCard } from "@/components/guide-card";
import { getAllGuides } from "@/lib/guides";

const OS_MODULES = [
  {
    tag: "Live",
    name: "Grow Intelligence",
    body: "Stage-by-stage cultivation — germination to cure — written like a field manual with the real numbers.",
    href: "/guides?stage=vegetative",
    accent: "var(--cyan)",
  },
  {
    tag: "New",
    name: "Living-Soil Lab",
    body: "Super-soil recipes, amendments, and the microbiology that steers terpene and aroma profiles.",
    href: "/guides",
    accent: "var(--lime)",
  },
  {
    tag: "Live",
    name: "Wellness & Medical",
    body: "Effects, terpenes, and the New York medical pathway — evidence-aware, never hype.",
    href: "/guides?stage=troubleshooting",
    accent: "var(--violet)",
  },
  {
    tag: "Soon",
    name: "Plant Doctor",
    body: "Point, describe, diagnose. AI-guided help for deficiencies, pests, and plant stress.",
    href: "/join",
    accent: "var(--magenta)",
  },
  {
    tag: "Soon",
    name: "Strain & Terpene Oracle",
    body: "Profiles, effects, and lineage — search the plant by how you want to feel.",
    href: "/join",
    accent: "var(--gold)",
  },
  {
    tag: "WNY",
    name: "Local NY Hub",
    body: "Buffalo to Niagara: laws, licensed dispensaries, and community resources for Western New York.",
    href: "/legal",
    accent: "var(--cyan)",
  },
];

export default function HomePage() {
  const guides = getAllGuides();
  const featured = guides.filter((g) => !g.membersOnly).slice(0, 3);
  const memberCount = guides.filter((g) => g.membersOnly).length;

  const stats = [
    { n: `${guides.length}`, l: "Field Guides" },
    { n: "6", l: "Grow Stages" },
    { n: `${memberCount}`, l: "Member Deep-Dives" },
    { n: "WNY", l: "Buffalo → Niagara" },
  ];

  return (
    <div className="os-scope min-h-screen bg-void text-frost">
      <OsHeader />

      <main>
        {/* ───────────────────────── HERO ───────────────────────── */}
        <section className="grain relative overflow-hidden">
          {/* deep-space backdrop */}
          <div className="starfield pointer-events-none absolute inset-0 opacity-70" />
          <div
            aria-hidden
            className="aurora pointer-events-none absolute -top-32 left-1/2 h-[42rem] w-[52rem] -translate-x-1/2 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(ellipse at center, var(--violet) 0%, var(--magenta) 40%, transparent 68%)",
              opacity: 0.72,
            }}
          />
          <div
            aria-hidden
            className="aurora pointer-events-none absolute right-[-10%] top-24 h-[30rem] w-[30rem] rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle at center, var(--cyan) 0%, transparent 65%)",
              opacity: 0.35,
              animationDelay: "3s",
            }}
          />

          <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-6 px-4 pb-16 pt-28 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-4 lg:pb-24 lg:pt-36">
            {/* bloom — first on mobile, right on desktop */}
            <div className="rise order-first mx-auto w-full max-w-sm lg:order-last lg:max-w-none">
              <HyperBloom className="h-auto w-full drop-shadow-[0_0_60px_rgba(138,107,255,0.35)]" />
            </div>

            {/* copy */}
            <div className="rise text-center lg:text-left">
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-frost-dim">
                <span className="iris-text font-semibold">Malachi Syndicate</span>
                {"  ·  "}Western New York
              </p>
              <h1 className="mt-5 font-display text-[2.6rem] font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-[4.2rem]">
                The Cannabis
                <br />
                <span className="iris-text">Knowledge Sanctuary.</span>
              </h1>
              <p className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-frost-dim lg:mx-0">
                Grow intelligence, wellness guidance, and source-backed
                education for Buffalo, Niagara, and all of Western New York —
                one living, intelligent platform. Free to join.
              </p>

              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:items-start">
                <Link
                  href="/join"
                  className="btn-iris w-full rounded-full px-7 py-3.5 text-center text-sm font-semibold transition hover:brightness-110 sm:w-auto"
                >
                  Enter the Sanctuary
                </Link>
                <Link
                  href="/guides"
                  className="glass-hi w-full rounded-full px-7 py-3.5 text-center text-sm font-medium text-frost transition hover:brightness-125 sm:w-auto"
                >
                  Explore the Knowledge OS
                </Link>
              </div>

              <ul className="mt-8 flex flex-wrap justify-center gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.14em] text-frost-dim lg:justify-start">
                <li>◆ Science-informed</li>
                <li>◆ Evidence-aware</li>
                <li>◆ 21+ · WNY</li>
              </ul>
            </div>
          </div>

          {/* stats rail */}
          <div className="relative mx-auto max-w-6xl px-4 pb-24 sm:px-6">
            <dl className="glass iris-border grid grid-cols-2 gap-px overflow-hidden rounded-2xl sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.l} className="px-5 py-6 text-center sm:text-left">
                  <dt className="iris-text font-display text-3xl font-semibold">
                    {s.n}
                  </dt>
                  <dd className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-frost-dim">
                    {s.l}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* western NY horizon */}
          <NiagaraSkyline className="pointer-events-none absolute bottom-0 left-0 h-40 w-full opacity-90 sm:h-52" />
        </section>

        {/* ─────────────────── THE KNOWLEDGE OS ─────────────────── */}
        <section className="relative border-t border-white/5">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
            <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-cyan">
                  One platform · six modules
                </p>
                <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
                  The Knowledge <span className="iris-text">OS</span>
                </h2>
              </div>
              <p className="max-w-sm text-sm leading-relaxed text-frost-dim">
                Not a blog and not a dispensary — an intelligence layer for the
                whole plant, from seed to self.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {OS_MODULES.map((m) => (
                <Link
                  key={m.name}
                  href={m.href}
                  className="group glass relative overflow-hidden rounded-2xl p-6 transition hover:-translate-y-1"
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full blur-2xl transition group-hover:opacity-90"
                    style={{ background: m.accent, opacity: 0.25 }}
                  />
                  <div className="relative flex items-center justify-between">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{
                        background: m.accent,
                        boxShadow: `0 0 12px ${m.accent}`,
                      }}
                    />
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-frost-dim">
                      {m.tag}
                    </span>
                  </div>
                  <h3 className="relative mt-4 font-display text-xl font-semibold transition group-hover:text-frost">
                    {m.name}
                  </h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-frost-dim">
                    {m.body}
                  </p>
                  <span className="relative mt-4 inline-block font-mono text-[11px] uppercase tracking-[0.14em] text-frost transition group-hover:translate-x-1">
                    Open →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ─────────────────── FEATURED GUIDES ─────────────────── */}
        <section className="border-t border-white/5">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-lime">
                  Open to everyone
                </p>
                <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
                  Start reading — free, no account.
                </h2>
              </div>
              <Link
                href="/guides"
                className="font-mono text-[11px] uppercase tracking-[0.14em] text-cyan underline-offset-4 hover:underline"
              >
                All guides →
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((g) => (
                <GuideCard key={g.slug} guide={g} />
              ))}
            </div>
          </div>
        </section>

        {/* ─────────────────── MEMBERSHIP ─────────────────── */}
        <section className="border-t border-white/5">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
            <div className="glass iris-border grain relative overflow-hidden rounded-3xl px-6 py-14 text-center sm:px-12">
              <div
                aria-hidden
                className="aurora pointer-events-none absolute -bottom-28 left-1/2 h-72 w-[38rem] -translate-x-1/2 rounded-full blur-3xl"
                style={{
                  background:
                    "radial-gradient(ellipse at center, var(--magenta) 0%, var(--violet) 55%, transparent 75%)",
                  opacity: 0.35,
                }}
              />
              <p className="relative font-mono text-[11px] uppercase tracking-[0.24em] text-gold">
                Free membership
              </p>
              <h2 className="relative mx-auto mt-4 max-w-xl font-display text-3xl font-semibold leading-tight sm:text-4xl">
                Unlock the full{" "}
                <span className="iris-text">Sanctuary.</span>
              </h2>
              <p className="relative mx-auto mt-4 max-w-lg text-frost-dim">
                Training techniques, week-by-week flowering, living-soil recipes,
                and pest rescue — {memberCount} advanced deep-dives open the
                moment you create a free account. No card, no spam.
              </p>
              <Link
                href="/join"
                className="btn-iris relative mt-8 inline-block rounded-full px-8 py-3.5 text-sm font-semibold transition hover:brightness-110"
              >
                Create your free account
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* ─────────────────── FOOTER ─────────────────── */}
      <footer className="border-t border-white/5">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <div className="flex flex-col justify-between gap-8 sm:flex-row">
            <div className="max-w-sm">
              <p className="font-display text-lg font-semibold">
                THCMed<span className="iris-text">Solutions</span>
              </p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-frost-dim">
                A Malachi Syndicate platform
              </p>
              <p className="mt-4 text-sm leading-relaxed text-frost-dim">
                Built for education. Designed for wellness. Powered by
                intelligence. Serving Buffalo, Niagara, and Western New York.
              </p>
            </div>
            <nav className="flex flex-col gap-2.5 text-sm text-frost-dim">
              <Link href="/guides" className="transition hover:text-frost">
                Knowledge OS
              </Link>
              <Link href="/join" className="transition hover:text-frost">
                Join Free
              </Link>
              <Link href="/legal" className="transition hover:text-frost">
                Legal & Local NY
              </Link>
            </nav>
          </div>
          <p className="mt-10 text-[11px] leading-relaxed text-frost-dim">
            Educational content only — not legal or medical advice. Cannabis
            laws vary; know your local regulations. 21+ only. © THCMed
            Solutions / Malachi Syndicate.
          </p>
        </div>
      </footer>
    </div>
  );
}
