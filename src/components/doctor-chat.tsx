"use client";

import { useRef, useState } from "react";
import { DOCTOR_STARTERS } from "@/lib/plant-doctor";

type Msg = { role: "user" | "assistant"; content: string };

export function DoctorChat() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  async function send(text: string) {
    const content = text.trim();
    if (!content || busy) return;
    setError(null);
    setInput("");
    const next: Msg[] = [...messages, { role: "user", content }];
    setMessages(next);
    setBusy(true);

    try {
      const res = await fetch("/api/plant-doctor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.slice(-20) }),
      });

      if (!res.ok) {
        const j = await res.json().catch(() => null);
        setError(j?.error ?? "Something went wrong — try again.");
        setBusy(false);
        return;
      }

      setMessages((m) => [...m, { role: "assistant", content: "" }]);
      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      if (reader) {
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          setMessages((m) => {
            const copy = [...m];
            const last = copy[copy.length - 1];
            copy[copy.length - 1] = {
              ...last,
              content: last.content + chunk,
            };
            return copy;
          });
          scrollRef.current?.scrollTo({ top: 1e9 });
        }
      }
    } catch {
      setError("Connection dropped — try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="glass iris-border flex h-[34rem] flex-col rounded-3xl sm:h-[36rem]">
      {/* transcript */}
      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-6">
        {messages.length === 0 ? (
          <div>
            <p className="text-sm leading-relaxed text-frost-dim">
              Tell the Doctor what you&apos;re seeing — stage, medium, symptoms
              — or start from a common case:
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {DOCTOR_STARTERS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-full border border-cyan/30 px-3.5 py-2 text-left text-[12px] text-frost-dim transition hover:border-cyan/60 hover:text-frost"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((m, i) => (
            <div
              key={i}
              className={m.role === "user" ? "flex justify-end" : "flex justify-start"}
            >
              <div
                className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-[13.5px] leading-relaxed ${
                  m.role === "user"
                    ? "bg-gradient-to-r from-cyan/20 to-violet/20 text-frost"
                    : "border border-white/10 text-frost-dim"
                }`}
              >
                {m.role === "assistant" && m.content === "" ? (
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-cyan">
                    Doctor is thinking…
                  </span>
                ) : (
                  m.content
                )}
              </div>
            </div>
          ))
        )}
        {error ? (
          <p role="alert" className="rounded-xl border border-gold/40 bg-gold/10 p-3 text-sm text-gold">
            {error}
          </p>
        ) : null}
      </div>

      {/* composer */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="flex gap-2 border-t border-white/10 p-3 sm:p-4"
      >
        <label htmlFor="doctor-input" className="sr-only">
          Describe your plant problem
        </label>
        <input
          id="doctor-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Describe your plant: stage, medium, what you're seeing…"
          maxLength={4000}
          className="w-full rounded-full border border-white/10 bg-transparent px-4 py-3 text-sm text-frost placeholder:text-frost-dim/60"
        />
        <button
          type="submit"
          disabled={busy || !input.trim()}
          className="btn-iris shrink-0 rounded-full px-5 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] transition hover:brightness-110 disabled:opacity-50"
        >
          {busy ? "…" : "Ask"}
        </button>
      </form>
    </div>
  );
}
