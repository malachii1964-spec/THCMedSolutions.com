import Link from "next/link";
import { LightCycle } from "@/components/light-cycle";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-panel-edge/60">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <LightCycle hoursOn={12} label="Lights out · 12/12" />
        <div className="mt-8 flex flex-col justify-between gap-6 sm:flex-row">
          <div>
            <p className="font-display text-lg font-semibold">
              Lake Erie{" "}
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-leaf">
                Cannabis
              </span>
            </p>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-frost-dim">
              The grower&apos;s almanac for home cannabis cultivation — indoor
              and outdoor. Educational content only.
            </p>
          </div>
          <nav className="flex flex-col gap-2 text-sm text-frost-dim">
            <Link href="/guides" className="transition hover:text-frost">
              Grow guides
            </Link>
            <Link href="/join" className="transition hover:text-frost">
              Join free
            </Link>
            <Link href="/legal" className="transition hover:text-frost">
              Legal notice
            </Link>
          </nav>
        </div>
        <p className="mt-8 text-[11px] leading-relaxed text-frost-dim">
          Cannabis cultivation is regulated and its legality varies by state
          and country. Nothing here is legal or medical advice. Know your
          local laws before you grow. 21+ only.
        </p>
      </div>
    </footer>
  );
}
