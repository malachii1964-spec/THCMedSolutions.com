import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { OsHeader } from "@/components/os-header";
import { OsFooter } from "@/components/os-footer";
import { type CodeCard, CODES } from "@/lib/fast-buds";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.lakeeriecannabis.com";

export const metadata: Metadata = {
  title: "Fast Buds Codes: DABOMB, LEC42, FROST42, MALACHI, MATTYJ",
  description:
    "Lake Erie Cannabis Fast Buds code vault with visual flower cards for DABOMB, LEC42, FROST42, MALACHI, and MATTYJ.",
  openGraph: {
    title: "Lake Erie Cannabis Fast Buds Code Vault",
    description:
      "Five Fast Buds code lanes with frost-forward visuals, new-release picks, and adult 21+ affiliate disclosure.",
    url: `${SITE}/fast-buds-codes`,
    images: [
      {
        url: "/fast-buds/fast-buds-mango-frost-auto-dabomb-card.png",
        width: 1024,
        height: 1536,
        alt: "Lake Erie Cannabis Fast Buds Mango Frost Auto DABOMB card",
      },
    ],
  },
  alternates: { canonical: `${SITE}/fast-buds-codes` },
};

export default function FastBudsCodesPage() {
  const featured = CODES.filter((c) => c.featured);
  const legacy = CODES.filter((c) => !c.featured);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Lake Erie Cannabis Fast Buds Code Vault",
    url: `${SITE}/fast-buds-codes`,
    description:
      "Affiliate code vault for Fast Buds genetics with adult 21+ educational context.",
    publisher: { "@type": "Organization", name: "Lake Erie Cannabis", url: SITE },
  };

  return (
    <div className="os-scope min-h-screen bg-void text-frost">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <OsHeader />

      <main>
        <section className="grain relative overflow-hidden border-b border-white/5">
          <div className="starfield pointer-events-none absolute inset-0 opacity-70" />
          <div
            aria-hidden
            className="aurora pointer-events-none absolute -top-40 left-1/2 h-[30rem] w-[48rem] -translate-x-1/2 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(ellipse at center, var(--cyan) 0%, var(--violet) 45%, var(--magenta) 62%, transparent 75%)",
              opacity: 0.24,
            }}
          />
          <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 pb-16 pt-28 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pt-36">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-lime">
                Lake Erie Cannabis x Fast Buds
              </p>
              <h1 className="display-xl mt-4">
                Fast Buds <span className="iris-text">Code Vault.</span>
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-frost-dim">
                Five active code lanes built for growers who want fast-cycle
                genetics, frost-forward flower, and a clean checkout code they
                can remember when it is time to lock in seeds.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#new-releases"
                  className="btn-iris rounded-full px-7 py-3.5 text-center font-mono text-[12px] font-semibold uppercase tracking-[0.14em] transition hover:brightness-110"
                >
                  New Releases
                </a>
                <a
                  href="#all-codes"
                  className="glass-hi rounded-full px-7 py-3.5 text-center font-mono text-[12px] uppercase tracking-[0.14em] text-frost transition hover:brightness-125"
                >
                  All Codes
                </a>
              </div>
              <p className="mt-5 max-w-xl text-[12px] leading-relaxed text-frost-dim">
                Affiliate disclosure: Lake Erie Cannabis may earn a commission
                if visitors use partner links or codes. Seed availability,
                discounts, shipping, and legality vary by location and partner
                terms.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {featured.map((card) => (
                <article key={card.code} className="glass iris-border overflow-hidden rounded-3xl">
                  <Image
                    src={card.image}
                    alt={card.alt}
                    width={1024}
                    height={1536}
                    priority
                    sizes="(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 100vw"
                    className="h-auto w-full"
                  />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="new-releases" className="border-b border-white/5">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
            <div className="mb-8 max-w-3xl">
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-cyan">
                New-release frost drop
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
                Mango Frost + Mendo Frost are the front line.
              </h2>
              <p className="mt-4 text-frost-dim">
                These are the two codes to splash first on social: one tropical
                and electric, one heavy and gassy. Same mission: put better
                autoflower genetics in front of serious adult growers.
              </p>
            </div>
            <div className="grid gap-5 lg:grid-cols-2">
              {featured.map((card) => (
                <CodePanel key={card.code} card={card} large />
              ))}
            </div>
          </div>
        </section>

        <section id="all-codes" className="border-b border-white/5">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
            <div className="mb-8 max-w-3xl">
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-lime">
                Full active vault
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
                Five codes. Five visual lanes.
              </h2>
              <p className="mt-4 text-frost-dim">
                The quick path: pick the card that matches the run you want,
                open the strain page, and use the code shown on the card at
                checkout if the offer is available in your location.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {legacy.map((card) => (
                <CodePanel key={card.code} card={card} />
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-white/5">
          <div className="mx-auto grid max-w-7xl gap-5 px-4 py-16 sm:px-6 lg:grid-cols-3">
            <div className="glass rounded-3xl p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan">
                Best first splash
              </p>
              <h3 className="mt-3 font-display text-2xl font-semibold">
                Start with DABOMB + LEC42.
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-frost-dim">
                Mango Frost Auto and Mendo Frost Auto make the cleanest social
                story: new releases, strong names, big visuals, and fresh codes.
              </p>
            </div>
            <div className="glass rounded-3xl p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-lime">
                Evergreen backup
              </p>
              <h3 className="mt-3 font-display text-2xl font-semibold">
                Keep FROST42 in rotation.
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-frost-dim">
                FROST42 is still the memorable anchor. Use it when the post is
                about frost, resin, trichomes, or the Lake Erie Cannabis brand
                itself.
              </p>
            </div>
            <div className="glass rounded-3xl p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
                Legal lane
              </p>
              <h3 className="mt-3 font-display text-2xl font-semibold">
                Adults 21+. Know local law.
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-frost-dim">
                This page is educational affiliate content. Lake Erie Cannabis
                does not sell cannabis, trade cannabis, or accept requests for
                cannabis through the site.
              </p>
            </div>
          </div>
        </section>

        <section>
          <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-cyan">
              Grow the code into knowledge
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
              Genetics are step one. The grow decides the finish.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-frost-dim">
              After choosing seeds, use Lake Erie Cannabis to build the room,
              diagnose problems, and keep the run stable from germination to
              cure.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/start"
                className="btn-iris rounded-full px-7 py-3.5 font-mono text-[12px] font-semibold uppercase tracking-[0.14em] transition hover:brightness-110"
              >
                Start grow roadmap
              </Link>
              <Link
                href="/plant-doctor"
                className="glass-hi rounded-full px-7 py-3.5 font-mono text-[12px] uppercase tracking-[0.14em] text-frost transition hover:brightness-125"
              >
                Ask Plant Doctor
              </Link>
            </div>
          </div>
        </section>
      </main>

      <OsFooter />
    </div>
  );
}

function CodePanel({ card, large = false }: { card: CodeCard; large?: boolean }) {
  return (
    <article
      className={`glass iris-border overflow-hidden rounded-3xl ${
        large ? "grid gap-0 md:grid-cols-[0.9fr_1.1fr]" : ""
      }`}
    >
      <Image
        src={card.image}
        alt={card.alt}
        width={1024}
        height={1536}
        sizes={large ? "(min-width: 1024px) 32vw, 100vw" : "(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 100vw"}
        className="h-full w-full object-cover"
      />
      <div className="p-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan">
          {card.lane}
        </p>
        <h3 className="mt-3 font-display text-2xl font-semibold">
          {card.strain}
        </h3>
        <div className="mt-4 inline-flex rounded-full border border-lime/30 bg-lime/10 px-4 py-2 font-mono text-[12px] font-semibold uppercase tracking-[0.18em] text-lime">
          Code: {card.code}
        </div>
        <p className="mt-4 text-sm font-semibold text-frost">{card.highlight}</p>
        <p className="mt-3 text-sm leading-relaxed text-frost-dim">{card.note}</p>
        <a
          href={card.href}
          target="_blank"
          rel="nofollow sponsored noreferrer"
          className="btn-iris mt-6 inline-flex rounded-full px-5 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] transition hover:brightness-110"
        >
          Open Fast Buds strain
        </a>
      </div>
    </article>
  );
}
