"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";
import { authClient } from "@/lib/auth-client";
import { safeNext } from "@/lib/safe-next";
import type { SocialProvider } from "@/lib/social-providers";

const signUpSchema = z.object({
  name: z.string().trim().min(1, "Tell us what to call you."),
  email: z.email("That email doesn't look right."),
  password: z.string().min(8, "Password needs at least 8 characters."),
});

const signInSchema = z.object({
  email: z.email("That email doesn't look right."),
  password: z.string().min(1, "Enter your password."),
});

const PROVIDER_META: Record<
  SocialProvider,
  { label: string; icon: React.ReactNode }
> = {
  google: {
    label: "Google",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
      </svg>
    ),
  },
  github: {
    label: "GitHub",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  facebook: {
    label: "Facebook",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#1877F2">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
};

export function AuthForm({
  mode,
  socialProviders = [],
}: {
  mode: "join" | "login";
  socialProviders?: SocialProvider[];
}) {
  const router = useRouter();
  const params = useSearchParams();
  const next = safeNext(params.get("next"));
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [socialBusy, setSocialBusy] = useState<SocialProvider | null>(null);

  async function handleSocial(provider: SocialProvider) {
    setError(null);
    setSocialBusy(provider);
    await authClient.signIn.social({
      provider,
      callbackURL: next,
    });
  }

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

  const anyBusy = busy || socialBusy !== null;

  return (
    <div className="mt-8">
      {/* social login buttons */}
      {socialProviders.length > 0 && (
        <>
          <div className="flex flex-col gap-3">
            {socialProviders.map((provider) => {
              const meta = PROVIDER_META[provider];
              return (
                <button
                  key={provider}
                  type="button"
                  disabled={anyBusy}
                  onClick={() => handleSocial(provider)}
                  className="flex w-full items-center justify-center gap-3 rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm font-medium text-frost transition hover:bg-white/10 disabled:opacity-50"
                >
                  {meta.icon}
                  {socialBusy === provider
                    ? "Redirecting..."
                    : `Continue with ${meta.label}`}
                </button>
              );
            })}
          </div>
          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-white/10" />
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-frost-dim">
              or
            </span>
            <div className="h-px flex-1 bg-white/10" />
          </div>
        </>
      )}

      {/* email/password form */}
      <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
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
              disabled={anyBusy}
              className="mt-1.5 w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-frost placeholder:text-frost-dim/50 focus:border-cyan/50 focus:outline-none focus:ring-1 focus:ring-cyan/30 disabled:opacity-50"
              placeholder="What should we call you?"
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
            disabled={anyBusy}
            className="mt-1.5 w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-frost placeholder:text-frost-dim/50 focus:border-cyan/50 focus:outline-none focus:ring-1 focus:ring-cyan/30 disabled:opacity-50"
            placeholder="you@email.com"
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
            disabled={anyBusy}
            className="mt-1.5 w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-frost placeholder:text-frost-dim/50 focus:border-cyan/50 focus:outline-none focus:ring-1 focus:ring-cyan/30 disabled:opacity-50"
            placeholder={mode === "join" ? "8+ characters" : "Your password"}
          />
        </div>
        {error ? (
          <p
            role="alert"
            className="rounded-lg border border-gold/40 bg-gold/10 p-3 text-sm text-gold"
          >
            {error}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={anyBusy}
          className="btn-iris rounded-lg px-6 py-3 font-mono text-[12px] font-semibold uppercase tracking-[0.14em] transition hover:brightness-110 disabled:opacity-50"
        >
          {busy
            ? "One moment..."
            : mode === "join"
              ? "Create free account"
              : "Log in"}
        </button>
      </form>
    </div>
  );
}
