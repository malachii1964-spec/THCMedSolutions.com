import type { Metadata } from "next";
import Link from "next/link";
import { OsHeader } from "@/components/os-header";
import { OsFooter } from "@/components/os-footer";
import { SymptomChecker } from "@/components/symptom-checker";
import { SYMPTOMS } from "@/lib/symptoms";
import { getAllGuides } from "@/lib/guides";

export const metadata: Metadata = {
  title: "Visual Plant Doctor — Diagnose Your Cannabis Plant",
  description:
    "Click your plant's symptom — yellowing leaves, burnt tips, spots, bugs, bud rot — and get the likely cause, the quick fix, what NOT to do, and how to prevent it.",
};

export default function DiagnosePage() {
  const guides = getAllGuides();
  const slugs = new Set(SYMPTOMS.flatMap((s) => s.guideSlugs));
  const guideTitles: Record<string, string> = {};
  for (const g of guides) if (slugs.has(g.slug)) guideTitles[g.slug] = g.title;

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
                "radial-gradient(ellipse at center, var(--lime) 0%, var(--cyan) 50%, transparent 72%)",
              opacity: 0.2,
            }}
          />
          <div className="relative mx-auto max-w-3xl px-4 pb-6 pt-28 text-center sm:px-6 lg:pt-32">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-lime">
              Visual Plant Doctor
            </p>
            <h1 className="display-xl mt-4">
              What&apos;s wrong with <span className="iris-text">my plant?</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-frost-dim">
              Find the symptom, get the answer. Likely cause, the quick fix, what NOT
              to do, and how to stop it happening again — in plain English.
            </p>
          </div>
        </section>

        <section className="relative">
          <div className="mx-auto max-w-5xl px-4 pb-20 sm:px-6">
            <SymptomChecker guideTitles={guideTitles} />
            <p className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-[13px] leading-relaxed text-frost-dim">
              Educational guidance for home growers — a starting point, not a
              guarantee. Many symptoms share causes (pH is behind a lot of them). When
              in doubt, ask the{" "}
              <Link href="/plant-doctor" className="text-cyan underline underline-offset-2">
                AI Plant Doctor
              </Link>{" "}
              or cross-check a guide.
            </p>
          </div>
        </section>
      </main>
      <OsFooter />
    </div>
  );
}
