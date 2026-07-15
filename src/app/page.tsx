import Link from "next/link";
import { OsHeader } from "@/components/os-header";
import { CrystalPlant } from "@/components/crystal-plant";
import { NiagaraSkyline } from "@/components/niagara-skyline";
import { GuideCard } from "@/components/guide-card";
import { WeatherChip, SystemStatus, PlantDoctorCard } from "@/components/hud";
import {
  GalaxySpiral,
  MiniSprout,
  LotusFigure,
  SoilStrata,
  GemCluster,
  NYMap,
} from "@/components/os-visuals";
import { getAllGuides } from "@/lib/guides";

const TRUST_CHIPS = [
  "Science-informed education",
  "Privacy respected",
  "Local NY resource hub",
  "Evidence-aware guidance",
];

const MODULES = [
  {
    name: "Knowledge OS",
    body: "Explore the cannabis knowledge universe — topics, guides, and research in one map.",
    cta: "Explore now",
    href: "/guides",
    visual: GalaxySpiral,
  },
  {
    name: "Grow Intelligence",
    body: "Stage-by-stage grow insights, plant-health diagnostics, and cultivation guidance.",
    cta: "Optimize your grow",
    href: "/guides?stage=vegetative",
    visual: MiniSprout,
  },
  {
    name: "Wellness Guidance",
    body: "Cannabis wellness education for body, mind, and lifestyle balance.",
    cta: "Wellness paths",
    href: "/guides?stage=troubleshooting",
    visual: LotusFigure,
  },
  {
    name: "FrostyBuds Soil Lab",
    body: "Grow like your favorite grower — pick a style and get the exact soil recipe and feeding rhythm.",
    cta: "Build your soil",
    href: "/frostybuds-soil",
    visual: SoilStrata,
  },
  {
    name: "The Gear Index",
    body: "The staple products of home growing — indoor and outdoor, budget to premium, filterable to your setup.",
    cta: "Shop the setup",
    href: "/gear",
    visual: GemCluster,
  },
  {
    name: "Local NY Hub",
    body: "Buffalo to Niagara: laws, licensed dispensaries, and community resources.",
    cta: "View local resources",
    href: "/legal",
    visual: NYMap,
  },
];

function StatIcon({ kind }: { kind: "leaf" | "path" | "gem" | "ny" }) {
  const stroke = "url(#statG)";
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
      <defs>
        <linearGradient id="statG" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--cyan)" />
          <stop offset="100%" stopColor="var(--violet)" />
        </linearGradient>
      </defs>
      {kind === "leaf" && (
        <path
          d="M12 21 C11 15 11 9 12 3 C13 9 13 15 12 21 Z M12 18 C7.5 16 5 12.5 4 8 C8.5 10 11 13.5 12 18 Z M12 18 C16.5 16 19 12.5 20 8 C15.5 10 13 13.5 12 18 Z"
          fill={stroke}
        />
      )}
      {kind === "path" && (
        <g fill="none" stroke={stroke} strokeWidth="1.6" strokeLinecap="round">
          <circle cx="5" cy="19" r="2.2" />
          <circle cx="12" cy="8" r="2.2" />
          <circle cx="19" cy="16" r="2.2" />
          <path d="M6.5 17.2 L10.5 10 M13.8 9.4 L17.4 14.5" />
        </g>
      )}
      {kind === "gem" && (
        <path
          d="M12 3 L18 9 L12 21 L6 9 Z M6 9 L18 9"
          fill="none"
          stroke={stroke}
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      )}
      {kind === "ny" && (
        <path
          d="M3 8 L10 6.5 L13 7 L14.5 5 L16.5 5.5 L17 8 L21 8.8 L21 12 L19 14 L19.6 16 L17 15.4 L20 18 L22 17.6 L22.4 19 L18.6 20 L14 18.4 L12 16 L8 15 L3 12.5 L4.4 10 Z"
          fill="none"
          stroke={stroke}
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

export default function HomePage() {
  const guides = getAllGuides();
  const featured = guides.filter((g) => !g.membersOnly).slice(0, 3);
  const memberCount = guides.filter((g) => g.membersOnly).length;
  const doctorOnline = Boolean(process.env.ANTHROPIC_API_KEY);

  const stats = [
    { icon: "leaf" as const, n: `${guides.length}`, l: "Field guides", s: "Growing weekly" },
    { icon: "path" as const, n: "6", l: "Knowledge pathways", s: "Seed to cure" },
    { icon: "gem" as const, n: `${memberCount}`, l: "Member deep-dives", s: "Free to unlock" },
    { icon: "ny" as const, n: "WNY", l: "Focused", s: "Buffalo → Niagara" },
  ];

  return (
    <div className="os-scope min-h-screen bg-void text-frost">
      <OsHeader />

      <main>
        {/* ─────────────────────────── HERO ─────────────────────────── */}
        <section className="grain relative overflow-hidden">
          <div className="starfield pointer-events-none absolute inset-0 opacity-70" />
          <div
            aria-hidden
            className="aurora pointer-events-none absolute -top-40 left-1/2 h-[46rem] w-[56rem] -translate-x-1/2 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(ellipse at center, var(--violet) 0%, var(--magenta) 42%, transparent 70%)",
              opacity: 0.5,
            }}
          />
          <div
            aria-hidden
            className="aurora pointer-events-none absolute right-[-12%] top-40 h-[30rem] w-[30rem] rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle at center, var(--lime) 0%, transparent 62%)",
              opacity: 0.22,
              animationDelay: "4s",
            }}
          />

          <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-24 sm:px-6 lg:pt-28">
            {/* eyebrow badge + weather row */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-frost-dim">
                <i className="h-1.5 w-1.5 rounded-full bg-lime shadow-[0_0_8px_var(--lime)]" />
                Western New York&apos;s cannabis knowledge platform
              </p>
              <WeatherChip className="hidden sm:flex" />
            </div>

            {/* 3-zone hero */}
            <div className="mt-6 grid grid-cols-1 items-center gap-8 lg:grid-cols-[1.05fr_1.2fr_0.85fr] lg:gap-4">
              {/* copy — left */}
              <div className="rise order-2 text-center lg:order-1 lg:text-left">
                <h1 className="font-display text-[2.5rem] font-semibold leading-[1.04] tracking-tight sm:text-5xl xl:text-[3.6rem]">
                  Enter the Cannabis
                  <br />
                  <span className="iris-text">Knowledge Sanctuary.</span>
                </h1>
                <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-frost-dim sm:text-lg lg:mx-0">
                  Grow intelligence, wellness guidance, and source-backed
                  education — one living, intelligent platform built for
                  Buffalo, Niagara, and all of Western New York.
                </p>
                <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row lg:items-start">
                  <Link
                    href="/join"
                    className="btn-iris w-full rounded-full px-7 py-3.5 text-center font-mono text-[12px] font-semibold uppercase tracking-[0.14em] transition hover:brightness-110 sm:w-auto"
                  >
                    Enter the Sanctuary →
                  </Link>
                  <Link
                    href="/start"
                    className="glass-hi w-full rounded-full px-7 py-3.5 text-center font-mono text-[12px] uppercase tracking-[0.14em] text-frost transition hover:brightness-125 sm:w-auto"
                  >
                    Start your first grow
                  </Link>
                </div>
                {/* trust chips */}
                <ul className="mt-7 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {TRUST_CHIPS.map((c) => (
                    <li
                      key={c}
                      className="glass flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-left font-mono text-[10px] uppercase tracking-[0.12em] text-frost-dim"
                    >
                      <svg viewBox="0 0 12 12" className="h-3 w-3 shrink-0" aria-hidden>
                        <path
                          d="M2 6.5 L5 9 L10 3"
                          fill="none"
                          stroke="var(--lime)"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                        />
                      </svg>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>

              {/* crystal plant — center */}
              <div className="rise order-1 mx-auto w-full max-w-[26rem] lg:order-2 lg:max-w-none">
                <CrystalPlant className="h-auto w-full drop-shadow-[0_0_70px_rgba(53,240,208,0.25)]" />
              </div>

              {/* HUD — right */}
              <div className="rise order-3 mx-auto flex w-full max-w-sm flex-col gap-4 lg:max-w-none">
                <WeatherChip className="flex sm:hidden" />
                <SystemStatus doctorOnline={doctorOnline} />
                <PlantDoctorCard online={doctorOnline} />
              </div>
            </div>
          </div>

          {/* stats bar */}
          <div className="relative mx-auto max-w-7xl px-4 pb-28 sm:px-6">
            <dl className="glass iris-border grid grid-cols-2 divide-white/5 overflow-hidden rounded-2xl lg:grid-cols-4 lg:divide-x">
              {stats.map((s) => (
                <div key={s.l} className="flex items-center gap-4 px-5 py-5">
                  <StatIcon kind={s.icon} />
                  <div>
                    <dt className="font-display text-2xl font-semibold leading-none text-frost">
                      {s.n}{" "}
                      <span className="font-mono text-[10px] font-normal uppercase tracking-[0.14em] text-frost-dim">
                        {s.l}
                      </span>
                    </dt>
                    <dd className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-cyan">
                      {s.s}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>

          {/* western NY horizon */}
          <NiagaraSkyline className="pointer-events-none absolute bottom-0 left-0 h-36 w-full opacity-90 sm:h-48" />
        </section>

        {/* ──────────────────── MODULE CARDS ──────────────────── */}
        <section className="relative border-t border-white/5">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {MODULES.map((m) => {
                const V = m.visual;
                return (
                  <Link
                    key={m.name}
                    href={m.href}
                    className="group glass relative overflow-hidden rounded-2xl p-5 transition hover:-translate-y-1 hover:brightness-110"
                  >
                    <V className="h-24 w-full" />
                    <h3 className="mt-3 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-cyan">
                      {m.name}
                    </h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-frost-dim">
                      {m.body}
                    </p>
                    <span className="mt-3 inline-block font-mono text-[10px] uppercase tracking-[0.14em] text-frost transition group-hover:translate-x-1">
                      {m.cta} →
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ──────────────────── FEATURED GUIDES ──────────────────── */}
        <section className="border-t border-white/5">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
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

        {/* ──────────────────── MEMBERSHIP ──────────────────── */}
        <section className="border-t border-white/5">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
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
                Unlock the full <span className="iris-text">Sanctuary.</span>
              </h2>
              <p className="relative mx-auto mt-4 max-w-lg text-frost-dim">
                Training techniques, week-by-week flowering, living-soil
                recipes, and pest rescue — {memberCount} advanced deep-dives
                open the moment you create a free account. No card, no spam.
              </p>
              <Link
                href="/join"
                className="btn-iris relative mt-8 inline-block rounded-full px-8 py-3.5 font-mono text-[12px] font-semibold uppercase tracking-[0.14em] transition hover:brightness-110"
              >
                Create your free account
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* ──────────────────── FOOTER ──────────────────── */}
      <footer className="border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <p className="text-center font-mono text-[11px] uppercase tracking-[0.3em] leading-relaxed text-lime">
            Built for education. Designed for wellness. Powered by
            intelligence.
          </p>
          <p className="mt-3 text-center text-[12px] text-frost-dim">
            THCMedSolutions.com is an educational platform and resource hub. We
            do not sell cannabis or provide medical advice.
          </p>
          <div className="mt-10 flex flex-col items-center justify-between gap-6 border-t border-white/5 pt-8 sm:flex-row">
            <div>
              <p className="font-display text-lg font-semibold">
                THCMed<span className="iris-text">Solutions</span>
              </p>
              <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-frost-dim">
                A Malachi Syndicate platform · Buffalo → Niagara
              </p>
            </div>
            <nav className="flex gap-6 text-sm text-frost-dim">
              <Link href="/guides" className="transition hover:text-frost">
                Knowledge OS
              </Link>
              <Link href="/join" className="transition hover:text-frost">
                Join free
              </Link>
              <Link href="/legal" className="transition hover:text-frost">
                Legal & Local NY
              </Link>
            </nav>
          </div>
          <p className="mt-8 text-center text-[10px] leading-relaxed text-frost-dim sm:text-left">
            Educational content only — not legal or medical advice. Cannabis
            laws vary; know your local regulations. 21+ only. © THCMed
            Solutions / Malachi Syndicate.
          </p>
        </div>
      </footer>
    </div>
  );
}
