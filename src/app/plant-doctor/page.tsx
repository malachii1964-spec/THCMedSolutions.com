import type { Metadata } from "next";
import Link from "next/link";
import { OsHeader } from "@/components/os-header";
import { DoctorChat } from "@/components/doctor-chat";
import { getSessionUser } from "@/lib/session";

export const metadata: Metadata = {
  title: "AI Plant Doctor — Diagnose Your Grow",
  description:
    "Describe your plant's symptoms and get master-grower diagnosis: deficiencies, pests, watering, light stress — free for members.",
};

export default async function PlantDoctorPage() {
  const user = await getSessionUser();
  const online = Boolean(process.env.ANTHROPIC_API_KEY);

  return (
    <div className="os-scope min-h-screen bg-void text-frost">
      <OsHeader />

      <main>
        <section className="grain relative overflow-hidden">
          <div className="starfield pointer-events-none absolute inset-0 opacity-60" />
          <div
            aria-hidden
            className="aurora pointer-events-none absolute -top-40 left-1/2 h-[28rem] w-[44rem] -translate-x-1/2 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(ellipse at center, var(--magenta) 0%, var(--violet) 50%, transparent 72%)",
              opacity: 0.3,
            }}
          />
          <div className="relative mx-auto max-w-3xl px-4 pb-8 pt-28 text-center sm:px-6 lg:pt-32">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-magenta">
              AI Plant Doctor
              <span
                className={`ml-3 inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[9px] ${
                  online
                    ? "border-lime/40 text-lime"
                    : "border-gold/40 text-gold"
                }`}
              >
                <i
                  className={`h-1.5 w-1.5 rounded-full ${online ? "bg-lime shadow-[0_0_6px_var(--lime)]" : "bg-gold shadow-[0_0_6px_var(--gold)]"}`}
                />
                {online ? "Online" : "Waking up"}
              </span>
            </p>
            <h1 className="mx-auto mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
              Point. Describe. <span className="iris-text">Diagnose.</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-frost-dim">
              A master grower on call — deficiencies, pests, watering, light
              stress, training questions. Tell it your stage, medium, and
              symptoms; it works the case like a pro.
            </p>
          </div>
        </section>

        <section className="relative">
          <div className="mx-auto max-w-3xl px-4 pb-16 sm:px-6">
            {user ? (
              online ? (
                <DoctorChat />
              ) : (
                <div className="glass iris-border rounded-3xl p-10 text-center">
                  <h2 className="font-display text-2xl font-semibold">
                    The Doctor is waking up.
                  </h2>
                  <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-frost-dim">
                    This feature is switching on shortly. In the meantime, the
                    troubleshooting guides cover the most common cases —
                    deficiencies, pests, and rescue plans.
                  </p>
                  <Link
                    href="/guides?stage=troubleshooting"
                    className="btn-iris mt-6 inline-block rounded-full px-7 py-3 font-mono text-[12px] font-semibold uppercase tracking-[0.14em]"
                  >
                    Open troubleshooting guides
                  </Link>
                </div>
              )
            ) : (
              <div className="glass iris-border rounded-3xl p-10 text-center">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-gold">
                  Members only — membership is free
                </p>
                <h2 className="mt-3 font-display text-2xl font-semibold">
                  The Doctor sees members for free.
                </h2>
                <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-frost-dim">
                  Create a free account and get unlimited consults — plus every
                  members-only deep-dive in the library.
                </p>
                <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                  <Link
                    href="/join?next=/plant-doctor"
                    className="btn-iris rounded-full px-7 py-3 font-mono text-[12px] font-semibold uppercase tracking-[0.14em]"
                  >
                    Join free & ask the Doctor
                  </Link>
                  <Link
                    href="/login?next=/plant-doctor"
                    className="glass-hi rounded-full px-7 py-3 font-mono text-[12px] uppercase tracking-[0.14em] text-frost"
                  >
                    I have an account
                  </Link>
                </div>
              </div>
            )}

            <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.14em] leading-relaxed text-frost-dim">
              Educational guidance only · not medical or legal advice · verify
              against your own conditions · 21+
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5">
        <div className="mx-auto max-w-3xl px-4 py-10 text-center sm:px-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-lime">
            Built for education. Designed for wellness. Powered by intelligence.
          </p>
          <p className="mt-3 text-[11px] text-frost-dim">
            © THCMed Solutions / Malachi Syndicate ·{" "}
            <Link href="/legal" className="underline underline-offset-2">
              Legal notice
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
