import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Legal Notice",
  description:
    "Legal and medical disclaimer for Lake Erie Cannabis educational content.",
};

export default function LegalPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 sm:px-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-leaf">
          The fine print
        </p>
        <h1 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
          Legal notice
        </h1>
        <div className="prose-guide mt-8">
          <h2>Educational purpose</h2>
          <p>
            Lake Erie Cannabis publishes educational content about cannabis
            cultivation. Nothing on this site is an encouragement to break
            the law, and nothing here is legal advice or medical advice.
          </p>
          <h2>Know your local laws</h2>
          <p>
            The legality of growing cannabis varies dramatically by country,
            state, and even municipality — from fully legal home cultivation
            with plant limits, to medical-only programs requiring
            registration, to complete prohibition. <strong>It is your
            responsibility to know and follow the laws where you live before
            acting on anything you read here.</strong>
          </p>
          <h2>Medical disclaimer</h2>
          <p>
            Content on this site is not a substitute for professional medical
            advice, diagnosis, or treatment. If you use cannabis medically,
            work with a qualified healthcare provider. Never disregard
            professional medical advice because of something you read here.
          </p>
          <h2>Age restriction</h2>
          <p>
            This site is intended for adults aged 21 and over (or the legal
            age in your jurisdiction, whichever is higher).
          </p>
          <h2>No warranties</h2>
          <p>
            Guides are provided in good faith and kept as accurate as we can
            make them, but growing conditions vary and results are not
            guaranteed. Use your judgment.
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
