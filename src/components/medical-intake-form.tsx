"use client";

import { useState } from "react";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "ok" }
  | { kind: "error"; message: string };

export function MedicalIntakeForm({ phone }: { phone: string }) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [preferred, setPreferred] = useState<"phone" | "email">("phone");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus({ kind: "sending" });
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      preferredContact: preferred,
      message: String(fd.get("message") ?? ""),
      consent: fd.get("consent") === "on",
      company: String(fd.get("company") ?? ""), // honeypot
    };

    try {
      const res = await fetch("/api/medical-intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setStatus({ kind: "ok" });
        form.reset();
        return;
      }
      const data = await res.json().catch(() => ({}));
      setStatus({
        kind: "error",
        message: data.error ?? "Something went wrong. Please try again.",
      });
    } catch {
      setStatus({
        kind: "error",
        message: `We couldn't reach the server — please call ${phone}.`,
      });
    }
  }

  if (status.kind === "ok") {
    return (
      <div className="glass iris-border rounded-3xl p-8 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-lime">
          Request sent
        </p>
        <h3 className="mt-3 font-display text-2xl font-semibold">
          You&apos;re on the list.
        </h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-frost-dim">
          Your request went straight to the office. They&apos;ll reach out to
          set up your certification. If you don&apos;t hear back soon, call{" "}
          <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} className="text-cyan underline underline-offset-2">
            {phone}
          </a>
          .
        </p>
      </div>
    );
  }

  const field =
    "w-full rounded-xl border border-white/10 bg-void-2 px-4 py-3 text-sm text-frost placeholder:text-frost-dim/60 focus:border-cyan/60 focus:outline-none";
  const label =
    "font-mono text-[10px] uppercase tracking-[0.16em] text-frost-dim";

  return (
    <form onSubmit={onSubmit} className="glass iris-border rounded-3xl p-6 sm:p-8">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-gold">
        Request an appointment
      </p>
      <h3 className="mt-2 font-display text-2xl font-semibold">
        We&apos;ll send your request to the office.
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-frost-dim">
        Fill this out and it goes straight to Lakeside Medical Care. Please
        don&apos;t include detailed medical history here — this just sets up
        your visit.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="mi-name">
            Full name
          </label>
          <input id="mi-name" name="name" required autoComplete="name" className={`mt-1.5 ${field}`} />
        </div>
        <div>
          <label className={label} htmlFor="mi-phone">
            Phone
          </label>
          <input id="mi-phone" name="phone" required autoComplete="tel" inputMode="tel" className={`mt-1.5 ${field}`} />
        </div>
        <div className="sm:col-span-2">
          <label className={label} htmlFor="mi-email">
            Email
          </label>
          <input id="mi-email" name="email" type="email" required autoComplete="email" className={`mt-1.5 ${field}`} />
        </div>
      </div>

      <div className="mt-4">
        <span className={label}>Preferred contact</span>
        <div className="mt-1.5 flex gap-2">
          {(["phone", "email"] as const).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPreferred(p)}
              className={`rounded-full px-4 py-2 font-mono text-[10px] uppercase tracking-[0.12em] transition ${
                preferred === p
                  ? "bg-gradient-to-r from-cyan/30 to-violet/30 text-frost"
                  : "border border-white/10 text-frost-dim hover:text-frost"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <label className={label} htmlFor="mi-message">
          Anything you&apos;d like them to know (optional)
        </label>
        <textarea
          id="mi-message"
          name="message"
          rows={3}
          maxLength={1500}
          placeholder="e.g. best times to reach me, general questions…"
          className={`mt-1.5 ${field} resize-none`}
        />
      </div>

      {/* Honeypot — visually hidden, off-screen; bots fill it, humans don't. */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label>
          Company
          <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label className="mt-5 flex items-start gap-2.5 text-[13px] leading-relaxed text-frost-dim">
        <input type="checkbox" name="consent" required className="mt-1 h-4 w-4 shrink-0 accent-cyan" />
        <span>
          I&apos;m 21+ and I consent to Lakeside Medical Care contacting me
          about a medical cannabis certification. I understand this form is a
          request to be contacted, not medical advice.
        </span>
      </label>

      {status.kind === "error" ? (
        <p className="mt-4 rounded-xl border border-magenta/40 bg-magenta/10 px-4 py-3 text-sm text-frost">
          {status.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status.kind === "sending"}
        className="btn-iris mt-6 w-full rounded-full px-7 py-3.5 font-mono text-[12px] font-semibold uppercase tracking-[0.14em] transition hover:brightness-110 disabled:opacity-60"
      >
        {status.kind === "sending" ? "Sending…" : "Send my request"}
      </button>
      <p className="mt-3 text-center text-[11px] text-frost-dim">
        Prefer to call? Dial{" "}
        <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} className="text-cyan underline underline-offset-2">
          {phone}
        </a>
        .
      </p>
    </form>
  );
}
