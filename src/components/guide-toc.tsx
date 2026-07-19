"use client";

import { useEffect, useState, useCallback } from "react";
import type { TocItem } from "@/lib/toc";

export type { TocItem };

function useActiveHeading(items: TocItem[]) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const headings = items
      .map((i) => document.getElementById(i.id))
      .filter(Boolean) as HTMLElement[];
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 },
    );

    for (const el of headings) observer.observe(el);
    return () => observer.disconnect();
  }, [items]);

  return activeId;
}

function TocList({
  items,
  activeId,
  onNavigate,
}: {
  items: TocItem[];
  activeId: string;
  onNavigate?: () => void;
}) {
  return (
    <ul className="space-y-1 border-l border-white/10">
      {items.map((item) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            onClick={onNavigate}
            className={`block py-1 text-[13px] leading-snug transition-colors ${
              item.level === 3 ? "pl-6" : "pl-3"
            } ${
              activeId === item.id
                ? "border-l-2 border-cyan text-cyan -ml-px"
                : "text-frost-dim/70 hover:text-frost"
            }`}
          >
            {item.text}
          </a>
        </li>
      ))}
    </ul>
  );
}

export function GuideToc({ items }: { items: TocItem[] }) {
  const activeId = useActiveHeading(items);

  if (items.length < 3) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="hidden xl:block sticky top-32 max-h-[calc(100vh-10rem)] overflow-y-auto"
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-frost-dim mb-3">
        On this page
      </p>
      <TocList items={items} activeId={activeId} />
    </nav>
  );
}

export function GuideTocMobile({ items }: { items: TocItem[] }) {
  const activeId = useActiveHeading(items);
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  if (items.length < 3) return null;

  return (
    <div className="xl:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open table of contents"
        className="glass fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full text-cyan shadow-lg transition hover:brightness-125"
      >
        <svg viewBox="0 0 20 20" className="h-5 w-5" fill="currentColor" aria-hidden>
          <path d="M3 4h14v1.5H3V4zm0 5h10v1.5H3V9zm0 5h14v1.5H3V14z" />
        </svg>
      </button>

      {open ? (
        <>
          <div
            className="fixed inset-0 z-40 bg-void/70 backdrop-blur-sm"
            onClick={close}
            aria-hidden
          />
          <nav
            aria-label="Table of contents"
            className="fixed bottom-0 left-0 right-0 z-50 max-h-[70vh] overflow-y-auto rounded-t-2xl bg-[#0c0f14] p-6 shadow-2xl"
          >
            <div className="mb-4 flex items-center justify-between">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-frost-dim">
                On this page
              </p>
              <button
                type="button"
                onClick={close}
                aria-label="Close table of contents"
                className="text-frost-dim transition hover:text-frost"
              >
                <svg viewBox="0 0 20 20" className="h-5 w-5" fill="currentColor" aria-hidden>
                  <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                </svg>
              </button>
            </div>
            <TocList items={items} activeId={activeId} onNavigate={close} />
          </nav>
        </>
      ) : null}
    </div>
  );
}
