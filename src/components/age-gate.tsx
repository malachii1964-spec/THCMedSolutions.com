"use client";

import { useEffect, useState } from "react";

const COOKIE = "thcms_age_ok";

function hasConsent() {
  return document.cookie.split("; ").some((c) => c === `${COOKIE}=1`);
}

/**
 * 21+ interstitial. Renders nothing on the server and until mounted, so
 * content stays crawlable; the overlay covers the page for unverified
 * visitors and persists consent in a cookie for one year.
 */
export function AgeGate() {
  const [open, setOpen] = useState(false);
  const [refused, setRefused] = useState(false);

  useEffect(() => {
    if (hasConsent()) return;
    // Deferred a tick: avoids a synchronous setState cascade on mount.
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-canopy/95 p-4 backdrop-blur-sm"
    >
      <div className="w-full max-w-md rounded-lg border border-panel-edge bg-panel p-8 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-leaf">
          Age verification
        </p>
        <h2
          id="age-gate-title"
          className="mt-3 font-display text-2xl font-semibold"
        >
          Are you 21 or older?
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-frost-dim">
          THCMed Solutions publishes cannabis cultivation education. You must
          be of legal age in your jurisdiction to enter.
        </p>
        {refused ? (
          <p className="mt-4 rounded border border-amber/40 bg-amber/10 p-3 text-sm text-amber">
            You must be 21+ to use this site. Come back when you are.
          </p>
        ) : null}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={confirm}
            className="rounded bg-bloom px-6 py-3 text-sm font-semibold text-canopy transition hover:brightness-110"
          >
            Yes, I&apos;m 21 or older
          </button>
          <button
            onClick={() => setRefused(true)}
            className="rounded border border-panel-edge px-6 py-3 text-sm text-frost-dim transition hover:border-frost-dim"
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
