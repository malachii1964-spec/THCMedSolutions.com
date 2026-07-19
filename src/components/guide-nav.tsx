import Link from "next/link";
import type { GuideMeta } from "@/lib/guides";

export function GuideNav({
  prev,
  next,
}: {
  prev: GuideMeta | null;
  next: GuideMeta | null;
}) {
  if (!prev && !next) return null;

  return (
    <nav
      aria-label="Previous and next guides"
      className="mt-12 grid gap-3 border-t border-white/5 pt-8 sm:grid-cols-2"
    >
      {prev ? (
        <Link
          href={`/guides/${prev.slug}`}
          className="glass group rounded-xl px-5 py-4 transition hover:brightness-125"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-frost-dim">
            Previous
          </span>
          <span className="mt-1 block text-sm font-medium leading-snug text-frost group-hover:text-cyan">
            {prev.title}
          </span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          href={`/guides/${next.slug}`}
          className="glass group rounded-xl px-5 py-4 text-right transition hover:brightness-125"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-frost-dim">
            Next
          </span>
          <span className="mt-1 block text-sm font-medium leading-snug text-frost group-hover:text-cyan">
            {next.title}
          </span>
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
