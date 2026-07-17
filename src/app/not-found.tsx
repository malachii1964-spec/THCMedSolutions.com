import Link from "next/link";
import { OsHeader } from "@/components/os-header";
import { LightCycle } from "@/components/light-cycle";

export default function NotFound() {
  return (
    <div className="os-scope min-h-screen bg-void text-frost">
      <OsHeader />
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-4 py-32 text-center sm:px-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-lime">
          404 · lights out
        </p>
        <h1 className="mt-4 font-display text-4xl font-semibold">
          This page didn&apos;t germinate.
        </h1>
        <p className="mt-3 max-w-md text-frost-dim">
          The link is dead or the page moved. The guides are all still where
          they should be.
        </p>
        <LightCycle hoursOn={0} className="mt-8 w-full max-w-xs" />
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/guides"
            className="btn-iris rounded-full px-6 py-3 font-mono text-[12px] font-semibold uppercase tracking-[0.14em] transition hover:brightness-110"
          >
            Back to the guides
          </Link>
          <Link
            href="/"
            className="glass-hi rounded-full px-6 py-3 font-mono text-[12px] uppercase tracking-[0.14em] text-frost transition hover:brightness-125"
          >
            Go home
          </Link>
        </div>
      </main>
    </div>
  );
}
