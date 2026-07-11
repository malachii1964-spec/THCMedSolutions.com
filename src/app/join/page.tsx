import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AuthForm } from "@/components/auth-form";
import { getSessionUser } from "@/lib/session";

export const metadata: Metadata = {
  title: "Join Free",
  description:
    "Create a free THCMed Solutions account and unlock the full grow-guide library.",
};

export default async function JoinPage() {
  if (await getSessionUser()) redirect("/account");
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-md flex-1 px-4 py-16 sm:px-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-amber">
          Free membership
        </p>
        <h1 className="mt-3 font-display text-3xl font-semibold">
          Join the almanac.
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-frost-dim">
          A free account unlocks every members-only guide — training,
          week-by-week flowering, curing, pest control. No card, no spam.
        </p>
        <Suspense>
          <AuthForm mode="join" />
        </Suspense>
        <p className="mt-6 text-sm text-frost-dim">
          Already a member?{" "}
          <Link href="/login" className="text-bloom underline underline-offset-2">
            Log in
          </Link>
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
