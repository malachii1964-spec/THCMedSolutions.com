import Link from "next/link";
import type { GuideMeta } from "@/lib/guides";
import { getStage } from "@/lib/stages";

export function GuideCard({ guide }: { guide: GuideMeta }) {
  const stage = getStage(guide.stage);
  return (
    <Link
      href={`/guides/${guide.slug}`}
      className="group flex flex-col rounded-lg border border-panel-edge bg-panel p-5 transition hover:border-leaf/60"
    >
      <div className="flex items-center justify-between gap-2 font-mono text-[11px] uppercase tracking-[0.14em]">
        <span className="text-leaf">
          {guide.week} · {stage?.shortName}
          {stage?.cycleLabel ? ` · ${stage.cycleLabel}` : ""}
        </span>
        {guide.membersOnly ? (
          <span className="rounded border border-amber/50 px-1.5 py-0.5 text-[10px] text-amber">
            Members
          </span>
        ) : null}
      </div>
      <h3 className="mt-3 font-display text-lg font-semibold leading-snug transition group-hover:text-bloom">
        {guide.title}
      </h3>
      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-frost-dim">
        {guide.summary}
      </p>
      <p className="mt-auto pt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-frost-dim/70">
        {guide.difficulty} · {guide.readMinutes} min read
      </p>
    </Link>
  );
}
