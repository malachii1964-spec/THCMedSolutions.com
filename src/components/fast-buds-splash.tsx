"use client";

/**
 * Fast Buds drop splash — shown once on the landing page, after the age gate.
 *
 * Sequencing: the age gate owns the screen first. This waits for consent
 * (already present on arrival, or announced during this visit) and only then
 * takes over, so a visitor never sees two stacked dialogs.
 *
 * Restraint is what keeps this from reading as a popup ad:
 *   - once per drop, keyed on DROP_VERSION in localStorage
 *   - landing page only
 *   - dismissible by button, Esc, or backdrop click
 *   - the artwork does the selling; the code chips do the work
 *
 * It renders nothing on the server and nothing until consent, so it cannot
 * affect LCP or appear in the prerendered HTML.
 */

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { CopyCodeButton } from "@/components/copy-code-button";
import {
  AFFILIATE_DISCLOSURE,
  DROP_VERSION,
  latestDrops,
} from "@/lib/fast-buds";
import { hasAgeConsent, onAgeConsent } from "@/lib/age-consent";

const SEEN_KEY = `lec:fastbuds-splash:${DROP_VERSION}`;

/** localStorage can throw (private mode, blocked cookies). Never let it break the page. */
function alreadySeen(): boolean {
  try {
    return window.localStorage.getItem(SEEN_KEY) === "1";
  } catch {
    // If we cannot remember, do not nag: treat as seen.
    return true;
  }
}
function markSeen(): void {
  try {
    window.localStorage.setItem(SEEN_KEY, "1");
  } catch {
    /* nothing to do — dismissal simply will not persist */
  }
}

export function FastBudsSplash() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreFocusTo = useRef<Element | null>(null);

  const close = useCallback(() => {
    markSeen();
    setOpen(false);
    const el = restoreFocusTo.current;
    if (el instanceof HTMLElement) el.focus();
  }, []);

  // Open once consent exists and this drop has not been seen.
  useEffect(() => {
    if (alreadySeen()) return;
    let cancelled = false;
    const show = () => {
      if (cancelled || alreadySeen()) return;
      restoreFocusTo.current = document.activeElement;
      setOpen(true);
    };
    if (hasAgeConsent()) {
      // Let the landing page paint first; this is not the main content.
      const id = window.setTimeout(show, 600);
      return () => {
        cancelled = true;
        window.clearTimeout(id);
      };
    }
    const off = onAgeConsent(() => window.setTimeout(show, 350));
    return () => {
      cancelled = true;
      off();
    };
  }, []);

  // Scroll lock, Esc to close, and a focus trap while open.
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab") return;
      const panel = panelRef.current;
      if (!panel) return;
      const focusables = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close]);

  if (!open) return null;

  const drops = latestDrops(5);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="fb-splash-title"
      className="fixed inset-0 z-[60] flex items-center justify-center bg-void/92 p-3 backdrop-blur-sm sm:p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div
        ref={panelRef}
        className="glass iris-border fb-splash-in flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl"
      >
        {/* ------------------------------------------------------ header -- */}
        <div className="flex min-w-0 items-start justify-between gap-4 border-b border-white/10 p-5 sm:p-6">
          <div className="min-w-0">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
              Fast Buds × Lake Erie Cannabis
            </p>
            <h2
              id="fb-splash-title"
              className="mt-1.5 font-display text-2xl font-semibold sm:text-3xl"
            >
              The latest drops
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-frost-dim">
              Five active codes. Tap one to copy it, then grow it with the
              guides on this site.
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            aria-label="Close and continue to the site"
            className="shrink-0 rounded-full border border-white/15 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-frost-dim transition hover:border-white/35 hover:text-frost focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
          >
            Skip ✕
          </button>
        </div>

        {/* ------------------------------------------------------- cards -- */}
        <div className="min-h-0 flex-1 overflow-y-auto p-5 sm:p-6">
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {drops.map((d, i) => (
              <li key={d.code} className="flex min-w-0 flex-col">
                <a
                  href={d.href}
                  target="_blank"
                  rel="nofollow sponsored noopener noreferrer"
                  className="group block min-w-0 overflow-hidden rounded-xl bg-void-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
                >
                  <span className="relative block aspect-[1000/1583] w-full">
                    <Image
                      src={d.image}
                      alt={d.alt}
                      fill
                      // Only the first two are likely above the fold on desktop.
                      loading={i < 2 ? "eager" : "lazy"}
                      sizes="(min-width:1024px) 190px, (min-width:640px) 30vw, 44vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                  </span>
                </a>

                <p className="mt-2 truncate font-display text-sm font-semibold">
                  {d.strain}
                </p>
                <p className="truncate font-mono text-[9px] uppercase tracking-[0.14em] text-cyan">
                  {d.lane}
                </p>

                <div className="mt-2">
                  <CopyCodeButton code={d.code} label={d.strain} />
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* ------------------------------------------------------ footer -- */}
        <div className="min-w-0 border-t border-white/10 p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/fast-buds-codes"
              onClick={close}
              className="btn-iris rounded-full px-5 py-2.5 text-sm font-semibold"
            >
              See all codes &amp; details →
            </Link>
            <button
              type="button"
              onClick={close}
              className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-frost-dim transition hover:text-frost focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
            >
              Continue to the site
            </button>
          </div>
          <p className="mt-3 text-[11px] leading-relaxed text-frost-dim">
            {AFFILIATE_DISCLOSURE}
          </p>
        </div>
      </div>
    </div>
  );
}
