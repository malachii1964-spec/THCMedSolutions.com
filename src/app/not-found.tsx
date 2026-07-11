import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LightCycle } from "@/components/light-cycle";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-4 py-24 text-center sm:px-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-leaf">
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
        <Link
          href="/guides"
          className="mt-8 rounded bg-bloom px-6 py-3 text-sm font-semibold text-canopy transition hover:brightness-110"
        >
          Back to the guides
        </Link>
      </main>
      <SiteFooter />
    </>
  );
}
