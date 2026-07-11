import { defineConfig } from "drizzle-kit";

// Pushes the schema to the production database: npm run db:push
// (local dev uses embedded PGlite and bootstraps itself — no push needed)
export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "",
  },
});
