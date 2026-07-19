"use client";

import { useEffect, useState } from "react";

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function update() {
      const el = document.querySelector("article");
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) {
        setProgress(100);
        return;
      }
      const scrolled = -rect.top;
      setProgress(Math.min(100, Math.max(0, (scrolled / total) * 100)));
    }
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  if (progress <= 0) return null;

  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
      className="fixed left-0 top-0 z-50 h-0.5 bg-cyan/80 transition-[width] duration-150"
      style={{ width: `${progress}%` }}
    />
  );
}
