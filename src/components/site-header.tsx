"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";

/**
 * Client component on purpose: resolving the session client-side keeps
 * content pages fully static (performance budget) while the nav still
 * personalizes after hydration. Logged-out links render first as the
 * stable default; the member chip swaps in without layout shift.
 */
export function SiteHeader() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  return (
    <header className="sticky top-0 z-40 border-b border-panel-edge/60 bg-canopy/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="font-display text-xl font-semibold tracking-tight">
            THCMed
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-leaf">
            Solutions
          </span>
        </Link>
        <nav className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/guides"
            className="px-2 py-2 text-sm text-frost-dim transition hover:text-frost"
          >
            Grow guides
          </Link>
          {user ? (
            <Link
              href="/account"
              className="rounded border border-amber/50 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-amber transition hover:bg-amber/10"
            >
              My almanac
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden px-2 py-2 text-sm text-frost-dim transition hover:text-frost sm:block"
              >
                Log in
              </Link>
              <Link
                href="/join"
                className="rounded bg-bloom px-4 py-2 text-sm font-semibold text-canopy transition hover:brightness-110"
              >
                Join free
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
