import type { Metadata } from "next";
import Link from "next/link";
import { OsHeader } from "@/components/os-header";
import { OsFooter } from "@/components/os-footer";

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.BETTER_AUTH_URL ??
  "https://lakeeriecannabis.com";

export const metadata: Metadata = {
  title: "Local NY Hub — Buffalo to Niagara Cannabis Laws & Resources",
  description:
    "Western New York's plain-English guide to adult-use cannabis: possession limits, home-grow rules, how to find a licensed dispensary, and local resources — with links to official state sources.",
  openGraph: {
    title: "Local NY Hub — Buffalo to Niagara Cannabis Laws & Resources",
    description:
      "Western New York's plain-English guide to adult-use cannabis: possession limits, home-grow rules, how to find a licensed dispensary, and local resources — with links to official state sources.",
    url: `${SITE}/local-ny`,
  },
  alternates: { canonical: `${SITE}/local-ny` },
};

const LAW_CARDS = [
  {
    label: "Legal since 2021",
    title: "Adult-use is legal in New York",
    body: "The Marijuana Regulation and Taxation Act (MRTA) legalized adult-use cannabis for people 21 and older across the state, including here in Western New York.",
  },
  {
    label: "21+",
    title: "Possession limits",
    body: "Adults 21+ may possess up to 3 ounces of cannabis flower and 24 grams of concentrate outside the home. Keeping more at home is allowed within state storage rules.",
  },
  {
    label: "Home grow",
    title: "You can grow your own",
    body: "State law allows adults 21+ to cultivate up to 6 plants (3 mature + 3 immature) per person, capped at 12 plants per household. Rules on registration and timing are set by the state — confirm current requirements before you start.",
  },
  {
    label: "Where",
    title: "Where you can consume",
    body: "Generally you may consume where tobacco smoking is allowed — but never in a vehicle, on school grounds, or in most workplaces and public indoor spaces. Landlords and municipalities can add restrictions.",
  },
];

const DISPENSARY_STEPS = [
  {
    t: "Use the state's verification tool",
    d: "New York's Office of Cannabis Management (OCM) publishes an official list and map of every licensed adult-use dispensary. If a shop isn't on it, it isn't legal.",
  },
  {
    t: "Watch for unlicensed shops",
    d: "Many storefronts sell cannabis without a license. Unlicensed products aren't lab-tested and buying from them isn't protected. Verify first — a licensed dispensary displays its OCM license and a verification QR code.",
  },
  {
    t: "Know Western NY is served",
    d: "Buffalo, Niagara Falls, and the broader WNY region have licensed adult-use dispensaries open and operating. Use the OCM map to find the closest verified store to you.",
  },
];

const RESOURCES = [
  {
    name: "NY Office of Cannabis Management",
    desc: "The state regulator — laws, licensing, the official dispensary locator, and consumer safety guidance.",
    href: "https://cannabis.ny.gov/",
    cta: "cannabis.ny.gov",
  },
  {
    name: "Dispensary Verification Tool",
    desc: "Confirm a shop is a licensed adult-use dispensary before you buy.",
    href: "https://cannabis.ny.gov/dispensary-location-verification",
    cta: "Verify a dispensary",
  },
  {
    name: "NY Medical Cannabis Program",
    desc: "Certified patients get higher limits, provider guidance, and home-cultivation eligibility.",
    href: "/medical-card",
    cta: "Get your medical card",
    internal: true,
  },
];

export default function LocalNYPage() {
  return (
    <div className="os-scope min-h-screen bg-void text-frost">
      <OsHeader />

      <main>
        {/* hero */}
        <section className="grain relative overflow-hidden">
          <div className="starfield pointer-events-none absolute inset-0 opacity-60" />
          <div
            aria-hidden
            className="aurora pointer-events-none absolute -top-40 left-1/2 h-[26rem] w-[42rem] -translate-x-1/2 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(ellipse at center, var(--cyan) 0%, var(--violet) 50%, transparent 72%)",
              opacity: 0.28,
            }}
          />
          <div className="relative mx-auto max-w-3xl px-4 pb-8 pt-28 text-center sm:px-6 lg:pt-32">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-cyan">
              Buffalo · Niagara · Western New York
            </p>
            <h1 className="display-xl mt-4">
              Your <span className="iris-text">local NY hub.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-frost-dim">
              What&apos;s legal, how to grow at home, and how to find a real
              licensed dispensary — for Western New York, in plain English, with
              links straight to the official sources.
            </p>
          </div>
        </section>

        {/* know the law */}
        <section className="relative">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="font-display text-3xl font-semibold sm:text-4xl">
              Know the law
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {LAW_CARDS.map((c) => (
                <div key={c.title} className="glass iris-border rounded-2xl p-6">
                  <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-gold">
                    {c.label}
                  </p>
                  <h3 className="mt-2 font-display text-lg font-semibold">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-frost-dim">
                    {c.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* find a dispensary */}
        <section className="relative">
          <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
            <h2 className="font-display text-3xl font-semibold sm:text-4xl">
              Find a licensed dispensary
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-frost-dim">
              Legal cannabis in New York is sold only through OCM-licensed
              dispensaries. Here&apos;s how to buy safely.
            </p>
            <ol className="mt-8 space-y-4">
              {DISPENSARY_STEPS.map((s, i) => (
                <li key={s.t} className="glass flex gap-4 rounded-2xl p-5">
                  <span className="iris-text font-display text-2xl font-semibold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold">
                      {s.t}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-frost-dim">
                      {s.d}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* resources */}
        <section className="relative">
          <div className="mx-auto max-w-3xl px-4 pb-16 sm:px-6">
            <h2 className="font-display text-2xl font-semibold">
              Official & local resources
            </h2>
            <div className="mt-6 space-y-3">
              {RESOURCES.map((r) =>
                r.internal ? (
                  <Link
                    key={r.name}
                    href={r.href}
                    className="glass-hi group flex items-center justify-between gap-4 rounded-2xl p-5 transition hover:brightness-125"
                  >
                    <div>
                      <h3 className="font-display text-base font-semibold">
                        {r.name}
                      </h3>
                      <p className="mt-1 text-sm text-frost-dim">{r.desc}</p>
                    </div>
                    <span className="iris-text shrink-0 font-mono text-[11px] font-semibold uppercase tracking-[0.14em]">
                      {r.cta} →
                    </span>
                  </Link>
                ) : (
                  <a
                    key={r.name}
                    href={r.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glass-hi group flex items-center justify-between gap-4 rounded-2xl p-5 transition hover:brightness-125"
                  >
                    <div>
                      <h3 className="font-display text-base font-semibold">
                        {r.name}
                      </h3>
                      <p className="mt-1 text-sm text-frost-dim">{r.desc}</p>
                    </div>
                    <span className="iris-text shrink-0 font-mono text-[11px] font-semibold uppercase tracking-[0.14em]">
                      {r.cta} →
                    </span>
                  </a>
                ),
              )}
            </div>

            <div className="mt-10 rounded-2xl border border-gold/30 bg-gold/5 p-5">
              <p className="text-[13px] leading-relaxed text-frost-dim">
                <span className="font-semibold text-gold">Important:</span>{" "}
                Cannabis laws change, and the details above are a plain-English
                summary — not legal advice. Possession limits, home-grow rules,
                and licensing are set by New York State and can be updated at any
                time. Always confirm current requirements with the{" "}
                <a
                  href="https://cannabis.ny.gov/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-frost"
                >
                  Office of Cannabis Management
                </a>{" "}
                before you act. Cannabis remains federally illegal.
              </p>
            </div>
          </div>
        </section>
      </main>

      <OsFooter />
    </div>
  );
}
