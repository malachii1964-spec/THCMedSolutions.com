"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";
import { authClient } from "@/lib/auth-client";
import { safeNext } from "@/lib/safe-next";

const signUpSchema = z.object({
  name: z.string().trim().min(1, "Tell us what to call you."),
  email: z.email("That email doesn't look right."),
  password: z.string().min(8, "Password needs at least 8 characters."),
});

const signInSchema = z.object({
  email: z.email("That email doesn't look right."),
  password: z.string().min(1, "Enter your password."),
});

export function AuthForm({ mode }: { mode: "join" | "login" }) {
  const router = useRouter();
  const params = useSearchParams();
  const next = safeNext(params.get("next"));
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = new FormData(e.currentTarget);
    const raw = Object.fromEntries(form.entries());

    if (mode === "join") {
      const parsed = signUpSchema.safeParse(raw);
      if (!parsed.success) {
        setError(parsed.error.issues[0]?.message ?? "Check the form.");
        return;
      }
      setBusy(true);
      const { error } = await authClient.signUp.email(parsed.data);
      setBusy(false);
      if (error) {
        setError(
          error.message ?? "Couldn't create the account. Try again.",
        );
        return;
      }
    } else {
      const parsed = signInSchema.safeParse(raw);
      if (!parsed.success) {
        setError(parsed.error.issues[0]?.message ?? "Check the form.");
        return;
      }
      setBusy(true);
      const { error } = await authClient.signIn.email(parsed.data);
      setBusy(false);
      if (error) {
        setError(
          error.status >= 400 && error.status < 500
            ? "Wrong email or password."
            : (error.message ?? "Couldn't log you in. Try again."),
        );
        return;
      }
    }
    router.push(next);
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-4" noValidate>
      {mode === "join" ? (
        <div>
          <label
            htmlFor="name"
            className="font-mono text-[11px] uppercase tracking-[0.14em] text-frost-dim"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            className="mt-1.5 w-full rounded border border-panel-edge bg-panel px-4 py-2.5 text-sm"
          />
        </div>
      ) : null}
      <div>
        <label
          htmlFor="email"
          className="font-mono text-[11px] uppercase tracking-[0.14em] text-frost-dim"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          className="mt-1.5 w-full rounded border border-panel-edge bg-panel px-4 py-2.5 text-sm"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="font-mono text-[11px] uppercase tracking-[0.14em] text-frost-dim"
        >
          Password {mode === "join" ? "(8+ characters)" : ""}
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete={mode === "join" ? "new-password" : "current-password"}
          className="mt-1.5 w-full rounded border border-panel-edge bg-panel px-4 py-2.5 text-sm"
        />
      </div>
      {error ? (
        <p
          role="alert"
          className="rounded border border-amber/40 bg-amber/10 p-3 text-sm text-amber"
        >
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={busy}
        className="rounded bg-bloom px-6 py-3 text-sm font-semibold text-canopy transition hover:brightness-110 disabled:opacity-60"
      >
        {busy
          ? "One moment…"
          : mode === "join"
            ? "Create free account"
            : "Log in"}
      </button>
    </form>
  );
}
