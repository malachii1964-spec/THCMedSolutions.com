"use client";

import { useEffect, useRef } from "react";

/**
 * Phase-2 atmosphere layer (Graphic Token Bible): drifting bioluminescent
 * spores rising like pollen off the falls mist. Built to the project's
 * Resource Efficiency Law — tiered and fallback-safe:
 *   Tier 1 (phones / reduced-motion / no canvas): renders nothing.
 *   Tier 2 (desktop): a capped, DPR-limited canvas, paused when the tab is
 *   hidden. Zero server/LCP cost (client-only, mounts after paint).
 */
const PARTICLE_CAP = 46; // measured ceiling — smooth on integrated GPUs
const COLORS = ["53,240,208", "138,107,255", "226,77,224", "140,240,107"];

export function Atmosphere({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce || window.innerWidth < 640) return; // Tier 1 fallback

    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let w = 0;
    let h = 0;
    let raf = 0;
    let running = true;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    type P = {
      x: number;
      y: number;
      r: number;
      vy: number;
      vx: number;
      a: number;
      c: string;
      tw: number;
    };
    const rand = (a: number, b: number) => a + Math.random() * (b - a);
    const particles: P[] = Array.from({ length: PARTICLE_CAP }, () => ({
      x: rand(0, w),
      y: rand(0, h),
      r: rand(0.6, 2.2),
      vy: rand(-0.25, -0.06),
      vx: rand(-0.12, 0.12),
      a: rand(0.15, 0.7),
      c: COLORS[Math.floor(Math.random() * COLORS.length)],
      tw: rand(0.005, 0.02),
    }));

    let phase = 0;
    const draw = () => {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      phase += 0.02;
      for (const p of particles) {
        p.y += p.vy;
        p.x += p.vx + Math.sin(phase + p.y * 0.01) * 0.15;
        if (p.y < -4) {
          p.y = h + 4;
          p.x = rand(0, w);
        }
        if (p.x < -4) p.x = w + 4;
        if (p.x > w + 4) p.x = -4;
        const alpha = p.a * (0.6 + 0.4 * Math.sin(phase * 20 * p.tw + p.x));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.c},${alpha.toFixed(3)})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `rgba(${p.c},${alpha.toFixed(3)})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    const onVis = () => {
      running = !document.hidden;
      if (running) draw();
      else cancelAnimationFrame(raf);
    };
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("resize", resize);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={`pointer-events-none ${className}`}
    />
  );
}
