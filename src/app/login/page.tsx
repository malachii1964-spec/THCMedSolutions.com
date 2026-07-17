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
  title: "Log In",
  description: "Log in to your Lake Erie Cannabis account.",
};

export default async function LoginPage() {
  if (await getSessionUser()) redirect("/account");
  const socials = availableSocialProviders();
  return (
    <div className="os-scope min-h-screen bg-void text-frost">
      <OsHeader />
      <main className="mx-auto w-full max-w-md flex-1 px-4 pb-20 pt-28 sm:px-6 lg:pt-32">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-lime">
          Welcome back
        </p>
        <h1 className="mt-3 font-display text-3xl font-semibold">Log in.</h1>
        <Suspense>
          <AuthForm mode="login" socialProviders={socials} />
        </Suspense>
        <p className="mt-6 text-sm text-frost-dim">
          New here?{" "}
          <Link href="/join" className="text-cyan underline underline-offset-2">
            Join free
          </Link>
        </p>
      </main>
      <OsFooter />
    </div>
  );
}
