import Link from "next/link";
import type { GuideMeta } from "@/lib/guides";
import { getStage } from "@/lib/stages";

const DIFF_COLOR: Record<string, string> = {
  beginner: "text-lime",
  intermediate: "text-gold",
  advanced: "text-magenta",
};

export function GuideCard({ guide }: { guide: GuideMeta }) {
  const stage = getStage(guide.stage);
  return (
    <Link
      href={`/guides/${guide.slug}`}
      className="glass group flex flex-col rounded-2xl p-5 transition hover:brightness-125"
    >
      <div className="flex items-center justify-between gap-2 font-mono text-[11px] uppercase tracking-[0.14em]">
        <span className="text-lime">
          {guide.week} · {stage?.shortName}
          {stage?.cycleLabel ? ` · ${stage.cycleLabel}` : ""}
        </span>
        {guide.membersOnly ? (
          <span className="rounded border border-gold/50 px-1.5 py-0.5 text-[10px] text-gold">
            Members
          </span>
        ) : null}
      </div>
      <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-frost transition group-hover:iris-text">
        {guide.title}
      </h3>
      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-frost-dim">
        {guide.summary}
      </p>
      <p className="mt-auto pt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-frost-dim">
        <span className={DIFF_COLOR[guide.difficulty] ?? ""}>
          {guide.difficulty}
        </span>
        {" · "}
        {guide.readMinutes} min read
      </p>
    </Link>
  );
}
