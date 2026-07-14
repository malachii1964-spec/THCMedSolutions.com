"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * HUD widgets that float around the hero, matching the reference mockups:
 * a live Buffalo weather chip (open-meteo, keyless; hides itself on failure),
 * a System Status panel, and the AI Plant Doctor card (honest: in training).
 */

const WMO: Record<number, string> = {
  0: "Clear",
  1: "Mostly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Fog",
  51: "Drizzle",
  53: "Drizzle",
  55: "Drizzle",
  61: "Rain",
  63: "Rain",
  65: "Heavy rain",
  71: "Snow",
  73: "Snow",
  75: "Heavy snow",
  80: "Showers",
  81: "Showers",
  82: "Showers",
  95: "Thunderstorm",
};

export function WeatherChip({ className = "" }: { className?: string }) {
  const [wx, setWx] = useState<{ t: number; label: string } | null>(null);

  useEffect(() => {
    const ctrl = new AbortController();
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=42.8864&longitude=-78.8784&current=temperature_2m,weather_code&temperature_unit=fahrenheit",
      { signal: ctrl.signal },
    )
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => {
        const t = j?.current?.temperature_2m;
        const code = j?.current?.weather_code;
        if (typeof t === "number") {
          setWx({ t: Math.round(t), label: WMO[code] ?? "—" });
        }
      })
      .catch(() => {});
    return () => ctrl.abort();
  }, []);

  if (!wx) return null;
  return (
    <div
      className={`glass flex items-center gap-3 rounded-2xl px-4 py-2.5 ${className}`}
    >
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-frost">
          Buffalo · New York
        </p>
        <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-frost-dim">
          Western NY
        </p>
      </div>
      <div className="h-7 w-px bg-white/10" />
      <div className="text-right">
        <p className="font-display text-lg font-semibold leading-none text-frost">
          {wx.t}°
        </p>
        <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-cyan">
          {wx.label}
        </p>
      </div>
    </div>
  );
}

export function SystemStatus({
  className = "",
  doctorOnline = false,
}: {
  className?: string;
  doctorOnline?: boolean;
}) {
  const STATUS_ROWS = [
    { name: "Knowledge Network", state: "Online", color: "var(--lime)" },
    { name: "Grow Intelligence", state: "Online", color: "var(--cyan)" },
    { name: "Wellness Systems", state: "Optimal", color: "var(--violet)" },
    doctorOnline
      ? { name: "AI Plant Doctor", state: "Online", color: "var(--lime)" }
      : { name: "AI Plant Doctor", state: "Training", color: "var(--gold)" },
  ];
  return (
    <div className={`glass rounded-2xl p-4 ${className}`}>
      <div className="flex items-center justify-between gap-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-frost">
          System status
        </p>
        <span className="flex items-center gap-1.5 rounded-full border border-lime/40 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-lime">
          <i className="h-1.5 w-1.5 rounded-full bg-lime shadow-[0_0_6px_var(--lime)]" />
          Optimal
        </span>
      </div>
      <ul className="mt-3 space-y-2">
        {STATUS_ROWS.map((r) => (
          <li
            key={r.name}
            className="flex items-center justify-between gap-6 text-[12px]"
          >
            <span className="flex items-center gap-2 text-frost-dim">
              <i
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: r.color, boxShadow: `0 0 6px ${r.color}` }}
              />
              {r.name}
            </span>
            <span
              className="font-mono text-[10px] uppercase tracking-[0.12em]"
              style={{ color: r.color }}
            >
              {r.state}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function PlantDoctorCard({
  className = "",
  online = false,
}: {
  className?: string;
  online?: boolean;
}) {
  return (
    <div className={`glass iris-border rounded-2xl p-4 ${className}`}>
      <div className="flex items-center justify-between gap-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-frost">
          AI Plant Doctor
        </p>
        {online ? (
          <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-lime">
            <i className="h-1.5 w-1.5 rounded-full bg-lime shadow-[0_0_6px_var(--lime)]" />
            Online
          </span>
        ) : (
          <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-gold">
            <i className="h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_6px_var(--gold)]" />
            In training
          </span>
        )}
      </div>
      <p className="mt-2 text-[12px] leading-relaxed text-frost-dim">
        {online
          ? "Ready to work your case — deficiencies, pests, watering, light stress. Free for members."
          : "Point, describe, diagnose — AI-guided help for deficiencies, pests, and stress is coming to the Sanctuary."}
      </p>
      <Link
        href="/plant-doctor"
        className="mt-3 inline-block rounded-full border border-cyan/40 px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-cyan transition hover:bg-cyan/10"
      >
        {online ? "Ask the Doctor →" : "Meet the Doctor →"}
      </Link>
    </div>
  );
}
