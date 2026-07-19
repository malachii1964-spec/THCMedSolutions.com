"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/lib/toc";

export type { TocItem };

export function GuideToc({ items }: { items: TocItem[] }) {
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

  if (items.length < 3) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="hidden xl:block sticky top-32 max-h-[calc(100vh-10rem)] overflow-y-auto"
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-frost-dim mb-3">
        On this page
      </p>
      <ul className="space-y-1 border-l border-white/10">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
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
    </nav>
  );
}
