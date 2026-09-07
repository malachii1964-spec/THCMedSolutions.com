"use client";

/**
 * Site-wide support banner.
 *
 * A slim bar pinned to the bottom rather than a modal, for three reasons: the
 * site already interrupts twice (age gate, then the drop splash) and a third
 * blocking dialog is where a site starts feeling hostile; fixed position shifts
 * no layout, so it cannot hurt CLS; and it stays available on every page
 * instead of being seen once and gone.
 *
 * Dismissal lives in localStorage and is read through useSyncExternalStore, so
 * the server snapshot is "dismissed" — the banner is absent from prerendered
 * HTML and appears only once the client confirms it has not been closed. That
 * is hydration-safe by construction and needs no state synced in an effect.
 */

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { BANNER_CTA, BANNER_LINE, supportEnabled } from "@/lib/support";

const KEY = "lec:support-banner-dismissed";

const store = {
  listeners: new Set<() => void>(),
  subscribe(fn: () => void) {
    store.listeners.add(fn);
    window.addEventListener("storage", fn);
    return () => {
      store.listeners.delete(fn);
      window.removeEventListener("storage", fn);
    };
  },
  emit() {
    for (const fn of store.listeners) fn();
  },
  /** "1" when dismissed. Storage can throw; treat failure as dismissed. */
  get(): string {
    try {
      return window.localStorage.getItem(KEY) === "1" ? "1" : "0";
    } catch {
      return "1";
    }
  },
  getServer(): string {
    return "1";
  },
  dismiss() {
    try {
      window.localStorage.setItem(KEY, "1");
    } catch {
      /* dismissal simply will not persist */
    }
    store.emit();
  },
};

export function SupportBanner() {
  const dismissed = useSyncExternalStore(
    store.subscribe,
    store.get,
    store.getServer,
  );

  if (!supportEnabled() || dismissed === "1") return null;

  return (
    <div
      role="complementary"
      aria-label="Support Lake Erie Cannabis"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-void/95 backdrop-blur-sm"
    >
      <div className="mx-auto flex w-full min-w-0 max-w-6xl items-center gap-3 px-4 py-2.5 sm:px-6">
        <p className="min-w-0 flex-1 text-[13px] leading-snug text-frost">
          {BANNER_LINE}
        </p>

        <Link
          href="/support"
          className="btn-iris shrink-0 rounded-full px-4 py-1.5 text-[12px] font-semibold"
        >
          {BANNER_CTA}
        </Link>

        <button
          type="button"
          onClick={() => store.dismiss()}
          aria-label="Dismiss support banner"
          className="shrink-0 rounded-full border border-white/15 px-2.5 py-1.5 font-mono text-[11px] text-frost-dim transition hover:border-white/35 hover:text-frost focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
