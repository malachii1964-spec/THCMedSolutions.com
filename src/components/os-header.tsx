"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const NAV = [
  { label: "Start Here", href: "/start" },
  { label: "Knowledge OS", href: "/guides" },
  { label: "Strains", href: "/strains" },
  { label: "Plant Doctor", href: "/plant-doctor" },
  { label: "Soil Lab", href: "/frostybuds-soil" },
  { label: "Gear Index", href: "/gear" },
  { label: "Local NY", href: "/local-ny" },
  { label: "Medical Card", href: "/medical-card" },
];

function Emblem() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <svg width="36" height="36" viewBox="0 0 40 40" aria-hidden>
        <defs>
          <linearGradient id="hdrHex" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--lime)" />
            <stop offset="55%" stopColor="var(--cyan)" />
            <stop offset="100%" stopColor="var(--violet)" />
          </linearGradient>
        </defs>
        <polygon
          points="20,3 35,11.5 35,28.5 20,37 5,28.5 5,11.5"
          fill="none"
          stroke="url(#hdrHex)"
          strokeWidth="1.6"
        />
        {/* leaf glyph */}
        <g fill="url(#hdrHex)">
          <path d="M20 29 C19 22 19 16 20 9 C21 16 21 22 20 29 Z" />
          <path d="M20 26 C15 24 12 20 11 15 C16 17 19 21 20 26 Z" />
          <path d="M20 26 C25 24 28 20 29 15 C24 17 21 21 20 26 Z" />
          <path d="M20 22 C16.5 19.5 15 16 15 12 C18.5 14.5 20 18 20 22 Z" opacity="0.8" />
          <path d="M20 22 C23.5 19.5 25 16 25 12 C21.5 14.5 20 18 20 22 Z" opacity="0.8" />
        </g>
      </svg>
      <span className="leading-tight">
        <span className="block font-display text-lg font-semibold tracking-tight text-frost">
          Lake Erie <span className="iris-text">Cannabis</span>
        </span>
        <span className="block font-mono text-[8px] uppercase tracking-[0.22em] text-frost-dim">
          Premium quality · Rooted in excellence
        </span>
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
    <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-5 sm:pt-4">
      <div className="glass mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-full px-4 py-2 sm:px-6">
        <Emblem />

        {/* desktop nav */}
        <nav className="hidden items-center gap-6 xl:flex">
          {NAV.map((n) => (
            <Link
              key={n.label}
              href={n.href}
              className="font-mono text-[11px] uppercase tracking-[0.12em] text-frost-dim transition hover:text-frost"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          {isMember ? (
            <Link
              href="/account"
              className="iris-border rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-frost transition hover:brightness-110"
            >
              My Sanctuary
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="font-mono text-[11px] uppercase tracking-[0.12em] text-frost-dim transition hover:text-frost"
              >
                Sign in
              </Link>
              <Link
                href="/join"
                className="btn-iris rounded-full px-5 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] transition hover:brightness-110"
              >
                Join now
              </Link>
            </>
          )}
        </div>

        {/* mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-frost xl:hidden"
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
        <div className="glass mx-auto mt-2 max-w-7xl rounded-2xl p-4 xl:hidden">
          <nav className="flex flex-col">
            {NAV.map((n) => (
              <Link
                key={n.label}
                href={n.href}
                onClick={() => setOpen(false)}
                className="border-b border-white/5 py-3 font-mono text-[12px] uppercase tracking-[0.12em] text-frost-dim transition hover:text-frost"
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
                className="iris-border rounded-full px-4 py-3 text-center font-mono text-[11px] uppercase tracking-[0.12em] text-frost"
              >
                My Sanctuary
              </Link>
            ) : (
              <>
                <Link
                  href="/join"
                  onClick={() => setOpen(false)}
                  className="btn-iris rounded-full px-5 py-3 text-center font-mono text-[11px] font-semibold uppercase tracking-[0.12em]"
                >
                  Join now
                </Link>
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="rounded-full border border-white/15 px-5 py-3 text-center font-mono text-[11px] uppercase tracking-[0.12em] text-frost"
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
