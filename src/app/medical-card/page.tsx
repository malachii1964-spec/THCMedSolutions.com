import type { Metadata } from "next";
import { OsHeader } from "@/components/os-header";
import { OsFooter } from "@/components/os-footer";
import { MedicalIntakeForm } from "@/components/medical-intake-form";
import { MEDICAL_PROVIDER } from "@/lib/site";

export const metadata: Metadata = {
  title: "Get Your NY Medical Card — Connect With a Local Doctor",
  description:
    "How New York's medical cannabis program works and how to get certified — connect with a trusted Western New York provider.",
};

const STEPS = [
  {
    n: "01",
    t: "See if you qualify",
    d: "New York certifies patients with a qualifying condition. A licensed provider makes that call — many common conditions qualify, and the visit is quick.",
  },
  {
    n: "02",
    t: "Get certified by a provider",
    d: "A registered practitioner evaluates you (often via a short telehealth or in-person visit) and issues your certification if appropriate.",
  },
  {
    n: "03",
    t: "Register with the state",
    d: "Use your certification to register with New York's Medical Cannabis Program and receive your registry ID.",
  },
  {
    n: "04",
    t: "Get your medicine",
    d: "With your ID, purchase from licensed New York dispensaries — and if you qualify, register for home cultivation under state rules.",
  },
];

const BENEFITS = [
  "Access to licensed medical dispensaries and higher purchase/possession limits than adult-use",
  "Provider guidance on products, formats, and starting points for your condition",
  "Potential tax advantages vs. adult-use purchases",
  "Home-cultivation eligibility under New York's medical program rules",
];

export default function MedicalCardPage() {
  const p = MEDICAL_PROVIDER;

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
              New York medical program · Western NY
            </p>
            <h1 className="display-xl mt-4">
              Get your <span className="iris-text">medical card.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-frost-dim">
              We connect Western New York patients with a trusted local doctor
              to get certified for the state&apos;s medical cannabis program —
              the straightforward way.
            </p>
          </div>
        </section>

        {/* provider card */}
        <section className="relative">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <div className="glass iris-border rounded-3xl p-8 text-center">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-gold">
                Our trusted local provider
              </p>
              {p.confirmed ? (
                <>
                  <h2 className="mt-3 font-display text-2xl font-semibold">
                    {p.name}
                  </h2>
                  <p className="mt-1 text-sm text-frost-dim">
                    {p.practice} · {p.location}
                  </p>
                  {"address" in p && p.address ? (
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-frost-dim">
                      {p.address}
                    </p>
                  ) : null}
                  <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-frost-dim">
                    {p.blurb}
                  </p>
                  <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                    {p.bookingUrl ? (
                      <a
                        href={p.bookingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-iris rounded-full px-7 py-3 font-mono text-[12px] font-semibold uppercase tracking-[0.14em] transition hover:brightness-110"
                      >
                        Book a certification visit
                      </a>
                    ) : null}
                    {p.phone && p.phone[0] !== "[" ? (
                      <a
                        href={`tel:${p.phone.replace(/[^\d+]/g, "")}`}
                        className="glass-hi rounded-full px-7 py-3 font-mono text-[12px] uppercase tracking-[0.14em] text-frost transition hover:brightness-125"
                      >
                        Call {p.phone}
                      </a>
                    ) : null}
                  </div>
                </>
              ) : (
                <>
                  <h2 className="mt-3 font-display text-2xl font-semibold">
                    Provider details coming soon
                  </h2>
                  <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-frost-dim">
                    We&apos;re finalizing our local provider partnership. Check
                    back shortly to get connected — or start with the steps
                    below to see how New York&apos;s program works.
                  </p>
                </>
              )}
            </div>
          </div>
        </section>

        {/* request an appointment (emails the office) */}
        {p.confirmed ? (
          <section className="relative">
            <div className="mx-auto mt-8 max-w-3xl px-4 sm:px-6">
              <MedicalIntakeForm phone={p.phone} />
            </div>
          </section>
        ) : null}

        {/* how it works */}
        <section className="relative">
          <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
            <h2 className="font-display text-3xl font-semibold sm:text-4xl">
              How it works
            </h2>
            <ol className="mt-8 space-y-4">
              {STEPS.map((s) => (
                <li key={s.n} className="glass flex gap-4 rounded-2xl p-5">
                  <span className="iris-text font-display text-2xl font-semibold">
                    {s.n}
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

            <h2 className="mt-14 font-display text-2xl font-semibold">
              Why get certified
            </h2>
            <ul className="mt-4 space-y-2">
              {BENEFITS.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-sm text-frost-dim">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-lime" />
                  {b}
                </li>
              ))}
            </ul>

            <div className="mt-10 rounded-2xl border border-gold/30 bg-gold/5 p-5">
              <p className="text-[13px] leading-relaxed text-frost-dim">
                <span className="font-semibold text-gold">Important:</span>{" "}
                This page is educational and helps connect you with a licensed
                provider. It is not medical advice, and certification is always
                at the discretion of the licensed practitioner. Program rules,
                qualifying conditions, and cultivation limits are set by New
                York State and can change — verify current requirements with
                the state and your provider.
              </p>
            </div>
          </div>
        </section>
      </main>

      <OsFooter />
    </div>
  );
}
