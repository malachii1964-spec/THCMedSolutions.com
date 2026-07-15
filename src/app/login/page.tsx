import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AuthForm } from "@/components/auth-form";
import { getSessionUser } from "@/lib/session";

export const metadata: Metadata = {
  title: "Log In",
  description: "Log in to your Lake Erie Cannabis account.",
};

export default async function LoginPage() {
  if (await getSessionUser()) redirect("/account");
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-md flex-1 px-4 py-16 sm:px-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-leaf">
          Welcome back
        </p>
        <h1 className="mt-3 font-display text-3xl font-semibold">Log in.</h1>
        <Suspense>
          <AuthForm mode="login" />
        </Suspense>
        <p className="mt-6 text-sm text-frost-dim">
          New here?{" "}
          <Link href="/join" className="text-bloom underline underline-offset-2">
            Join free
          </Link>
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
