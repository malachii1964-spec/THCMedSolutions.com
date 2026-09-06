"use client";

/**
 * Click-to-copy discount code.
 *
 * The promo artwork already shows the code, but text baked into an image cannot
 * be copied, read by a screen reader, or found by search. This renders it as
 * real text and makes taking it one tap — the interaction that decides whether
 * a code actually survives the trip to a checkout field.
 *
 * Clipboard access can be refused (insecure context, permissions policy, older
 * browsers). That path selects the code for manual copy and says so, rather
 * than showing a success state for something that did not happen.
 */

import { useEffect, useRef, useState } from "react";

type State = "idle" | "copied" | "manual";

export function CopyCodeButton({
  code,
  label,
  className = "",
}: {
  code: string;
  label?: string;
  className?: string;
}) {
  const [state, setState] = useState<State>("idle");
  const codeRef = useRef<HTMLElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  async function copy() {
    if (timer.current) clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(code);
      setState("copied");
    } catch {
      const el = codeRef.current;
      if (el) {
        const range = document.createRange();
        range.selectNodeContents(el);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
      }
      setState("manual");
    }
    timer.current = setTimeout(() => setState("idle"), 2600);
  }

  return (
    <>
      <button
        type="button"
        onClick={copy}
        aria-label={`Copy discount code ${code}${label ? ` for ${label}` : ""}`}
        className={`group flex min-w-0 items-center justify-between gap-3 rounded-xl border border-lime/35 bg-lime/[0.06] px-3 py-2 text-left transition hover:border-lime/60 hover:bg-lime/[0.12] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan ${className}`}
      >
        <span className="min-w-0">
          <span className="block font-mono text-[9px] uppercase tracking-[0.16em] text-frost-dim">
            Code
          </span>
          <code
            ref={codeRef}
            className="block truncate font-mono text-sm font-semibold tracking-[0.08em] text-lime"
          >
            {code}
          </code>
        </span>
        <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.12em] text-frost-dim transition group-hover:text-frost">
          {state === "copied" ? "Copied ✓" : state === "manual" ? "Selected" : "Copy"}
        </span>
      </button>

      <span aria-live="polite" className="sr-only">
        {state === "copied"
          ? `Code ${code} copied to clipboard`
          : state === "manual"
            ? `Code ${code} selected — press Control or Command C to copy`
            : ""}
      </span>
    </>
  );
}
