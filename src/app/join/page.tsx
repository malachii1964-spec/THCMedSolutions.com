import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { OsHeader } from "@/components/os-header";
import { OsFooter } from "@/components/os-footer";
import { AuthForm } from "@/components/auth-form";
import { getSessionUser } from "@/lib/session";
import { availableSocialProviders } from "@/lib/social-providers";

export const metadata: Metadata = {
  title: "Join Free",
  description:
    "Create a free Lake Erie Cannabis account and unlock the full grow-guide library.",
};

export default async function JoinPage() {
  if (await getSessionUser()) redirect("/account");
  const socials = availableSocialProviders();
  return (
    <div className="os-scope min-h-screen bg-void text-frost">
      <OsHeader />
      <main className="mx-auto w-full max-w-md flex-1 px-4 pb-20 pt-28 sm:px-6 lg:pt-32">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-cyan">
          Free membership
        </p>
        <h1 className="mt-3 font-display text-3xl font-semibold">
          Join the <span className="iris-text">sanctuary.</span>
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-frost-dim">
          A free account unlocks every members-only guide — training,
          week-by-week flowering, curing, pest control. No card, no spam.
        </p>
        <Suspense>
          <AuthForm mode="join" socialProviders={socials} />
        </Suspense>
        <p className="mt-6 text-sm text-frost-dim">
          Already a member?{" "}
          <Link href="/login" className="text-cyan underline underline-offset-2">
            Log in
          </Link>
        </p>
      </main>
      <OsFooter />
    </div>
  );
}
