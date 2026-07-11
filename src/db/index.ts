import { drizzle as drizzleNeon } from "drizzle-orm/neon-http";
import { drizzle as drizzlePg } from "drizzle-orm/node-postgres";
import { neon } from "@neondatabase/serverless";
import { Pool } from "pg";
import * as schema from "./schema";

/**
 * Production: Postgres over HTTP via DATABASE_URL (Neon).
 * Local dev without DATABASE_URL: an embedded Postgres (PGlite) served on
 * 127.0.0.1:5522 by scripts/dev-db.mjs — auto-started via instrumentation.ts
 * — so the whole site, auth included, runs with zero setup.
 *
 * Construction is lazy (first query, not import) so `next build` can collect
 * pages without a DATABASE_URL; a missing URL only errors at request time,
 * with a message that says exactly how to fix it.
 */
const DEV_DB_URL = "postgresql://postgres:postgres@127.0.0.1:5522/postgres";

type Db =
  | ReturnType<typeof drizzleNeon<typeof schema>>
  | ReturnType<typeof drizzlePg<typeof schema>>;

const globalForDb = globalThis as unknown as { __thcmsDb?: Db };

function createDb(): Db {
  const url = process.env.DATABASE_URL;
  if (url) {
    // Neon speaks HTTP through its serverless driver; any other Postgres
    // (Supabase, RDS, local) gets the standard wire-protocol driver.
    if (url.includes(".neon.tech")) {
      return drizzleNeon(neon(url), { schema });
    }
    const pool = new Pool({ connectionString: url, max: 5 });
    return drizzlePg(pool, { schema });
  }
  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "DATABASE_URL is required in production. Create a free Postgres at neon.tech, set it in your Vercel project env, and run `npm run db:push` once.",
    );
  }
  // PGlite behind the socket sidecar is single-connection: max 1, released
  // quickly, so several Next dev workers can share it politely.
  const pool = new Pool({
    connectionString: DEV_DB_URL,
    max: 1,
    idleTimeoutMillis: 300,
  });
  return drizzlePg(pool, { schema });
}

function getDb(): Db {
  globalForDb.__thcmsDb ??= createDb();
  return globalForDb.__thcmsDb;
}

export const db: Db = new Proxy({} as Db, {
  get(_target, prop) {
    const real = getDb();
    const value = Reflect.get(real, prop, real);
    return typeof value === "function" ? value.bind(real) : value;
  },
});
