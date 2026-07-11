/**
 * Only allow same-site relative paths for ?next= redirects, so a crafted
 * link can't bounce a fresh login off to another site. Rejects
 * protocol-relative (`//evil`) and backslash (`/\evil` — browsers normalize
 * `\` to `/`) variants.
 */
export function safeNext(raw: string | null, fallback = "/account"): string {
  return raw && /^\/(?!\/)/.test(raw) && !raw.includes("\\")
    ? raw
    : fallback;
}
