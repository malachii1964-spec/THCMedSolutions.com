/**
 * The site signature: a 24-segment strip encoding a real photoperiod.
 * hoursOn=18 → veg (18/6), 12 → flower (12/12), 24 → germination (24/0).
 */
export function LightCycle({
  hoursOn,
  label,
  className = "",
}: {
  hoursOn: number;
  label?: string;
  className?: string;
}) {
  const on = Math.max(0, Math.min(24, hoursOn));
  return (
    <div className={className}>
      <div
        className="light-cycle"
        role="img"
        aria-label={`Light cycle: ${on} hours on, ${24 - on} hours off`}
      >
        {Array.from({ length: 24 }, (_, i) => (
          <i key={i} className={i < on ? "on" : undefined} />
        ))}
      </div>
      {label ? (
        <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-frost-dim">
          {label}
        </p>
      ) : null}
    </div>
  );
}
