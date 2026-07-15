import type { Metadata } from "next";
import Link from "next/link";
import { OsHeader } from "@/components/os-header";
import { FaqAccordion } from "@/components/faq-accordion";
import { FAQ } from "@/lib/faq";

export const metadata: Metadata = {
  title: "FAQ — Answers for New Growers",
  description:
    "Straight answers about growing cannabis and using the platform: getting started, costs, yellow leaves, harvest timing, legality, and more.",
};

// FAQ structured data for search engines
function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.flatMap((g) =>
      g.items.map((it) => ({
        "@type": "Question",
        name: it.q,
        acceptedAnswer: { "@type": "Answer", text: it.a },
      })),
    ),
  };
}

export default function FaqPage() {
  return (
    <div className="os-scope min-h-screen bg-void text-frost">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd()) }}
      />
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
              opacity: 0.28,
            }}
          />
          <div className="relative mx-auto max-w-3xl px-4 pb-8 pt-28 text-center sm:px-6 lg:pt-32">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-cyan">
              Questions & answers
            </p>
            <h1 className="display-xl mt-4">
              Straight <span className="iris-text">answers.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-frost-dim">
              The questions new growers actually ask — about the plant and about
              the platform. Can&apos;t find yours? The Plant Doctor is on call.
            </p>
          </div>
        </section>

        <section className="relative">
          <div className="mx-auto max-w-3xl px-4 pb-20 sm:px-6">
            <FaqAccordion groups={FAQ} />

            <div className="glass iris-border mt-12 rounded-3xl p-8 text-center">
              <h2 className="font-display text-2xl font-semibold">
                Still stuck on your grow?
              </h2>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-frost-dim">
                Describe what you&apos;re seeing and the Plant Doctor will work
                the case with you — free for members.
              </p>
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  href="/plant-doctor"
                  className="btn-iris rounded-full px-7 py-3 font-mono text-[12px] font-semibold uppercase tracking-[0.14em] transition hover:brightness-110"
                >
                  Ask the Plant Doctor
                </Link>
                <Link
                  href="/start"
                  className="glass-hi rounded-full px-7 py-3 font-mono text-[12px] uppercase tracking-[0.14em] text-frost transition hover:brightness-125"
                >
                  Start the roadmap
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5">
        <div className="mx-auto max-w-3xl px-4 py-10 text-center sm:px-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-lime">
            Built for education. Designed for wellness. Powered by intelligence.
          </p>
          <p className="mt-3 text-[11px] text-frost-dim">
            © Lake Erie Cannabis ·{" "}
            <Link href="/legal" className="underline underline-offset-2">
              Legal notice
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
