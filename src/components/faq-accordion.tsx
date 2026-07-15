"use client";

import { useState } from "react";
import type { FaqGroup } from "@/lib/faq";

export function FaqAccordion({ groups }: { groups: FaqGroup[] }) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="space-y-12">
      {groups.map((group) => (
        <section key={group.id}>
          <h2 className="font-mono text-[11px] uppercase tracking-[0.24em] text-cyan">
            {group.name}
          </h2>
          <div className="mt-4 space-y-3">
            {group.items.map((item) => {
              const id = `${group.id}-${item.q}`;
              const isOpen = open === id;
              return (
                <div key={id} className="glass overflow-hidden rounded-2xl">
                  <button
                    onClick={() => setOpen(isOpen ? null : id)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="font-display text-lg font-semibold text-frost">
                      {item.q}
                    </span>
                    <span
                      className={`shrink-0 text-cyan transition-transform ${isOpen ? "rotate-45" : ""}`}
                      aria-hidden
                    >
                      <svg width="18" height="18" viewBox="0 0 18 18">
                        <path
                          d="M9 3v12M3 9h12"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                    style={{ transitionTimingFunction: "var(--ease-premium)" }}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-[15px] leading-relaxed text-frost-dim">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
