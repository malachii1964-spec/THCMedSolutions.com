"use client";

import { useTransition } from "react";
import { toggleBookmark } from "@/lib/bookmarks";

export function BookmarkButton({
  slug,
  saved,
}: {
  slug: string;
  saved: boolean;
}) {
  const [pending, startTransition] = useTransition();
  return (
    <button
      onClick={() => startTransition(() => toggleBookmark(slug))}
      disabled={pending}
      aria-pressed={saved}
      className={`rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] transition disabled:opacity-60 ${
        saved
          ? "border-gold/60 bg-gold/10 text-gold"
          : "glass text-frost-dim hover:border-gold/60 hover:text-gold"
      }`}
    >
      {pending ? "Saving…" : saved ? "★ Saved" : "☆ Save to my almanac"}
    </button>
  );
}
