/**
 * Next.js instrumentation hook — runs once per server process before any
 * request. In dev without a DATABASE_URL it makes sure the embedded dev
 * database sidecar (scripts/dev-db.mjs) is up, so `npm run dev` needs zero
 * database setup. No-ops entirely in production or when DATABASE_URL is set.
 * Node-only APIs live in instrumentation-node.ts behind this conditional
 * dynamic import so the Edge compile pass never sees them.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;
  if (process.env.DATABASE_URL) return;
  if (process.env.NODE_ENV === "production") return;

  const { startDevDb } = await import("./instrumentation-node");
  await startDevDb();
}
