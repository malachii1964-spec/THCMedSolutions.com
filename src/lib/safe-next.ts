/**
 * Only allow same-site relative paths for ?next= redirects, so a crafted
 * link can't bounce a fresh login off to another site.
 */
export function safeNext(raw: string | null, fallback = "/account"): string {
  return raw && raw.startsWith("/") && !raw.startsWith("//") ? raw : fallback;
}
