"use client";

import { useEffect, useState } from "react";

const COOKIE = "thcms_age_ok";

function hasConsent() {
  return document.cookie.split("; ").some((c) => c === `${COOKIE}=1`);
}

export function AgeGate() {
  const [open, setOpen] = useState(false);
  const [refused, setRefused] = useState(false);

  useEffect(() => {
    if (hasConsent()) return;
    const id = window.setTimeout(() => setOpen(true), 0);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  function confirm() {
    document.cookie = `${COOKIE}=1; path=/; max-age=31536000; samesite=lax`;
    setOpen(false);
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-gate-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-void/95 p-4 backdrop-blur-sm"
    >
      <div className="glass iris-border w-full max-w-md rounded-2xl p-8 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-cyan">
          Age verification
        </p>
        <h2
          id="age-gate-title"
          className="mt-3 font-display text-2xl font-semibold"
        >
          Are you 21 or older?
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-frost-dim">
          Lake Erie Cannabis publishes cannabis cultivation education. You must
          be of legal age in your jurisdiction to enter.
        </p>
        {refused ? (
          <p className="mt-4 rounded-xl border border-gold/40 bg-gold/10 p-3 text-sm text-gold">
            You must be 21+ to use this site. Come back when you are.
          </p>
        ) : null}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={confirm}
            className="btn-iris rounded-full px-6 py-3 font-mono text-[12px] font-semibold uppercase tracking-[0.14em] transition hover:brightness-110"
          >
            Yes, I&apos;m 21 or older
          </button>
          <button
            onClick={() => setRefused(true)}
            className="glass-hi rounded-full px-6 py-3 font-mono text-[12px] uppercase tracking-[0.14em] text-frost-dim transition hover:text-frost"
          >
            No, I&apos;m not
          </button>
        </div>
        <p className="mt-5 text-[11px] leading-relaxed text-frost-dim">
          Cannabis cultivation laws vary by state and country. Educational
          content only — see our{" "}
          <a href="/legal" className="underline underline-offset-2">
            legal notice
          </a>
          .
        </p>
      </div>
    </div>
  );
}
