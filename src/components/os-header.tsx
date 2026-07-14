"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const NAV = [
  { label: "Knowledge", href: "/guides" },
  { label: "Grow Intelligence", href: "/guides?stage=vegetative" },
  { label: "Wellness", href: "/guides?stage=troubleshooting" },
  { label: "Local NY", href: "/legal" },
];

function Emblem() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <svg width="30" height="30" viewBox="0 0 32 32" aria-hidden>
        <defs>
          <linearGradient id="hdr" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--cyan)" />
            <stop offset="55%" stopColor="var(--violet)" />
            <stop offset="100%" stopColor="var(--magenta)" />
          </linearGradient>
        </defs>
        <path
          d="M16 3 L19 13 L29 16 L19 19 L16 29 L13 19 L3 16 L13 13 Z"
          fill="url(#hdr)"
        />
        <circle cx="16" cy="16" r="2.4" fill="#fff" />
      </svg>
      <span className="font-display text-lg font-semibold tracking-tight text-frost">
        THCMed<span className="iris-text">Solutions</span>
      </span>
    </Link>
  );
}

export function OsHeader() {
  const [isMember, setIsMember] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const ctrl = new AbortController();
    fetch("/api/auth/get-session", { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then((s) => {
        if (s?.user) setIsMember(true);
      })
      .catch(() => {});
    return () => ctrl.abort();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-5 sm:pt-5">
      <div className="glass mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-2xl px-4 py-2.5 sm:px-6">
        <Emblem />

        {/* desktop nav */}
        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((n) => (
            <Link
              key={n.label}
              href={n.href}
              className="text-sm text-frost-dim transition hover:text-frost"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {isMember ? (
            <Link
              href="/account"
              className="iris-border rounded-full px-4 py-2 text-sm font-medium text-frost transition hover:brightness-110"
            >
              My Sanctuary
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm text-frost-dim transition hover:text-frost"
              >
                Sign in
              </Link>
              <Link
                href="/join"
                className="btn-iris rounded-full px-5 py-2 text-sm font-semibold transition hover:brightness-110"
              >
                Join Free
              </Link>
            </>
          )}
        </div>

        {/* mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-frost lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <div className="space-y-1.5">
            <span
              className={`block h-0.5 w-5 bg-current transition ${open ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`block h-0.5 w-5 bg-current transition ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 w-5 bg-current transition ${open ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </div>
        </button>
      </div>

      {/* mobile drawer */}
      {open ? (
        <div className="glass mx-auto mt-2 max-w-6xl rounded-2xl p-4 lg:hidden">
          <nav className="flex flex-col">
            {NAV.map((n) => (
              <Link
                key={n.label}
                href={n.href}
                onClick={() => setOpen(false)}
                className="border-b border-white/5 py-3 text-frost-dim transition hover:text-frost"
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 flex flex-col gap-3">
            {isMember ? (
              <Link
                href="/account"
                onClick={() => setOpen(false)}
                className="iris-border rounded-full px-4 py-3 text-center text-sm font-medium text-frost"
              >
                My Sanctuary
              </Link>
            ) : (
              <>
                <Link
                  href="/join"
                  onClick={() => setOpen(false)}
                  className="btn-iris rounded-full px-5 py-3 text-center text-sm font-semibold"
                >
                  Join Free
                </Link>
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="rounded-full border border-white/15 px-5 py-3 text-center text-sm text-frost"
                >
                  Sign in
                </Link>
              </>
            )}
          </div>
        </div>
      ) : null}
    </header>
  );
}
