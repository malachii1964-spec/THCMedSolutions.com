/**
 * Age-consent state, shared between the age gate and anything that must wait
 * for it.
 *
 * The gate stores a cookie, but a cookie write fires no event, so a component
 * mounted alongside the gate has no way to learn that consent just happened.
 * The gate therefore announces it, and listeners react. Two entry points cover
 * both cases:
 *
 *   - already consented on arrival  -> hasAgeConsent() is true at mount
 *   - consents during this visit    -> onAgeConsent() fires
 *
 * Kept free of React so it can be imported from anywhere and unit-tested.
 */

export const AGE_COOKIE = "thcms_age_ok";
export const AGE_CONSENT_EVENT = "lec:age-consent";

/** True when this browser has already confirmed 21+. Safe during SSR. */
export function hasAgeConsent(): boolean {
  if (typeof document === "undefined") return false;
  return document.cookie
    .split("; ")
    .some((c) => c.trim() === `${AGE_COOKIE}=1`);
}

/** Persist consent for a year and tell listeners. */
export function grantAgeConsent(): void {
  if (typeof document === "undefined") return;
  document.cookie = `${AGE_COOKIE}=1; path=/; max-age=31536000; samesite=lax`;
  window.dispatchEvent(new Event(AGE_CONSENT_EVENT));
}

/** Subscribe to consent granted during this visit. Returns an unsubscribe. */
export function onAgeConsent(fn: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(AGE_CONSENT_EVENT, fn);
  return () => window.removeEventListener(AGE_CONSENT_EVENT, fn);
}
