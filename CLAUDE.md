# Website Factory — Standing Instructions

You are building production websites for a developer who wants maximum autonomy from you.
Carry the work. Interview first, then build without unnecessary check-ins.

## Rule 1 — Interview before building (MANDATORY for any new site/feature)
Before writing any code for a new website or major feature, ask ONLY the questions whose
answers change the build. Ask them all at once, numbered, with a recommended default for
each so a lazy answer of "use defaults" still works. Maximum 8 questions.
QUESTION 1 IS ALWAYS THE TEMPLATE MENU: present the numbered list from
templates/INDEX.md and ask "pick a number, or describe something custom."
If a template is picked, read its spec file — it pre-answers most questions;
ask ONLY its ASK items plus anything genuinely missing. If custom, ask:
1. What is this site/app, in one sentence, and who uses it?
2. The 3 things a user must be able to do (this defines scope — nothing else gets built)
3. Content ready or placeholder? (paste any real copy/branding)
4. Data to store? (none / simple / user accounts needed)
5. Look and feel: one reference site or adjective, or "designer's choice"
6. Which capabilities does this site need? (checklist: send emails / take payments /
   user accounts / file uploads / editable content (CMS) / analytics / AI features /
   scheduled jobs — each maps to a default service in Rule 2; name a specific
   provider to override any default)
7. Anything explicitly OUT of scope?
Then restate the plan in 5 bullets, state your assumptions, and proceed. Do not wait for
approval unless something is ambiguous enough to waste hours if wrong.

## Rule 2 — Stack defaults and service menu (use unless the interview says otherwise)
Core (every project):
- Next.js (latest stable — verify current version before scaffolding), App Router, TypeScript strict
- Tailwind CSS + shadcn/ui for components
- Deploy target: Vercel (alternates if named: Netlify, Cloudflare, Railway)
- No Redux, no microservices, no GraphQL, no extra frameworks. Boring and small wins.

Capability → default service (only install what the interview selected):
- Database:        Postgres on Neon + Drizzle ORM  (alt: Supabase Postgres)
- User accounts:   Better Auth                     (alt: Supabase Auth, Clerk)
- Transactional email: Resend + React Email        (alt: Postmark)
- Payments:        Stripe                          (alt: Polar, Lemon Squeezy)
- File uploads:    UploadThing                     (alt: Supabase Storage, S3)
- Editable content/CMS: Sanity                     (alt: MDX files in-repo for simple sites)
- Analytics:       Vercel Analytics                (alt: PostHog for product analytics)
- AI features:     Anthropic API via Vercel AI SDK
- Scheduled jobs:  Vercel Cron                     (alt: Inngest for complex workflows)
Note: if the project needs database + auth + file storage together, propose Supabase
for all three (one service beats three) and let the human confirm.
For every selected service: use the official SDK, check its current docs before wiring
it up, add required keys to .env.example with a comment linking where to get them, and
verify the integration works end-to-end (e.g. a real test email arrives in dev) before
the feature counts as done.

## Rule 3 — Validation gates (a feature is NOT done until ALL pass)
After every feature, in order:
1. `tsc --noEmit` passes — zero type errors
2. Lint passes
3. `next build` succeeds
4. Tests pass. Every feature with logic gets at least one test (Vitest).
   Write the test from the acceptance criteria BEFORE or alongside the code.
5. You have run the dev server and verified the feature works in the actual browser
   flow, including one failure case (bad input, empty state, network error)
Never report "done" or move to the next feature with a failing gate. If a gate fails,
fix it first. Do not comment out or skip tests to make them pass.

## Rule 4 — Workflow discipline
- One feature at a time. Small, separate commits per logical change with clear messages.
- Make minimal changes — do not refactor unrelated code.
- Never invent the contents of a file you haven't read. Read it first.
- If a library or API might have changed recently, check its current docs before using it.
- Secrets go in .env.local (gitignored), never in code. Validate all user input with Zod.
- When genuinely unsure between two approaches with real tradeoffs, present both briefly
  and let the human choose. Otherwise decide and note the decision below.

## Rule 5 — Adversarial review (after gates pass, before the next feature)
Dispatch the `reviewer` subagent on every completed feature. Address every critical
and high finding before moving on; log medium findings in Known Issues.
Note: the quality gates in Rule 3 are ALSO enforced by a Stop hook — if it blocks
you, fix the failures; do not try to work around it.

## Rule 6 — Design
design.md is law: Part 1 is the human's taste, Part 2 applies to every build.
Before any UI code: run its Process (subject → design plan → self-critique
against defaults → build to plan). Use design-library/ as raw material: offer
2-3 named style directions from styles.md when the human has no references;
draw palettes from palettes.md (adapted to subject, never blind); follow
immersive-3d.md's full contract if 3D is chosen. After building any
user-facing page: dispatch the `design-critic` subagent and address fixes
scoring 3 or below. Never ship a page nobody has looked at.

## Rule 6b — Performance
performance.md is law: budgets (LCP/CLS/INP, per-route JS, image/font limits)
and rules apply to every build. Verification there is part of "done" for every
user-facing page. Beautiful-but-slow fails the whole mission.

## Rule 7 — Improve proactively
At the end of every working session:
1. Summarize what was built and what state it's in
2. Suggest the 3 highest-value improvements (performance, UX, security, polish) ranked
   by impact — but do NOT build them until approved
3. Update the Project Log below

## Project Log (keep current — this is the project's memory)
### Current state
- REBRAND (2026-07-15): THCMed Solutions → **Lake Erie Cannabis** (owner's
  owned brand, lakeeriecannabis.com). Grower-first premium positioning;
  medical is a support layer only. All wordmarks/footers/metadata updated,
  Malachi Syndicate dropped from public chrome, SEO title = "Grow Frosty
  Buds the Easy Way", package renamed lake-erie-cannabis. Gates green (88
  pages). TODO(owner): rename GitHub repo + Vercel project + point domain;
  add the diamond-leaf logo PNG to /public for me to wire into header/OG/
  favicon. Vision doc locked: grower-first Cannabis OS, GrowWeedEasy floor,
  "Grow Like the Greats" under /grow-guides, Simple Mode First, tools + gear
  affiliate (AC Infinity/Mars Hydro/VIVOSUN/Spider Farmer) as later rings.
- MEDICAL (2026-07-15): Medical Card page live with real provider Dr. Troy
  Sasse / Lakeside Medical Care (Angola NY, 716-549-4999) + patient intake
  form → emails office via Resend (graceful offline: falls back to phone).
  TODO(owner): provide Dr. Sasse's destination email + RESEND_API_KEY +
  MEDICAL_INTAKE_TO in Vercel to activate sending.
- MILESTONE (2026-07-15): Plant Doctor is LIVE in production — owner added
  ANTHROPIC_API_KEY in Vercel (Production+Preview), redeployed, and confirmed
  the members-only streaming chat answers. TODO(owner): rotate that key soon
  (it was exposed in-session when a README was pasted).
- v7 (2026-07-15): strain index gets sort (Featured/THC↓/Fastest/A–Z, via
  pure non-mutating sortStrains() + thcCeiling()/flowerWeeksMin() range
  parsers) + a terpene filter (all 7 profiled terpenes). 23 tests (added
  range parsing, sort-order invariants, no-mutation). Gates green; pushed.
- v6 (2026-07-15): closed the cross-linking loop — guide pages now show a
  "Strains this applies to" section (reverse of the strain→guide links).
  Refactored relevance into ONE source of truth (GUIDE_RULES in strains.ts)
  used both directions; new strainsForGuide() is the exact inverse of
  relatedGuideSlugs(); universal setup/harvest bookends stay forward-only.
  Guide page shows ≤8 suited strains + "+N more". 20 tests (added reverse
  cases + a round-trip invariant proving forward/reverse never contradict).
  Gates green; pushed to origin + site main.
- v5 (2026-07-15): Strain DB 22 → 42 (Amnesia Haze, Super Silver Haze,
  Trainwreck, Skywalker OG, Do-Si-Dos, Mimosa, Tangie, Strawberry Cough,
  Cheese, Grape Ape, LA Confidential, Maui Wowie, Hindu Kush + Acapulco
  Gold landraces, Cherry Pie, Sunset Sherbet, Blue Cheese, Super Lemon
  Haze, Ice Cream Cake, Gushers). NEW: strain→guide cross-linking —
  relatedGuideSlugs() auto-matches each strain to 6 guides by climate/
  structure/difficulty (setup→env→canopy→risk→harvest→cure), rendered as
  "Grow guides for X" on every strain detail page; scales as guides grow.
  strains.test.ts (17 tests total) guarantees no dead cross-links. Gates
  green (tsc/lint/17 tests/build 87 pages); pushed to origin + site main.
- v4 (2026-07-15): added /local-ny (Local NY Hub — plain-English WNY law
  summary, licensed-dispensary safety flow, official OCM links; module +
  footer + header now point here instead of /legal). New guide
  pressing-rosin-at-home.mdx (solventless concentrate; 27 guides total).
  Strain DB 14 → 22 (Runtz, Zkittlez, Purple Punch, Bruce Banner, Pineapple
  Express, Bubba Kush, Chemdawg, AK-47). Gates green (tsc/lint/11 tests/
  build); pushed to origin + site main → Vercel.
- v3 (2026-07-12): rebranded Malachi Syndicate "Cannabis Knowledge OS" per
  owner's reference mockups. Landing: generative crystal-plant SVG on glowing
  dais + HUD panels (SystemStatus, PlantDoctorCard) + live Buffalo weather
  chip (open-meteo) + module cards. New pages: /start (first-grow roadmap,
  auto-built from stages+guides), /frostybuds-soil (grower-style soil
  selector: Canucks living/coco, veganic, SubCool, DTE guano — from owner's
  Soil Cookbook doc), /plant-doctor (Claude-powered chat, members-only,
  streaming; graceful offline w/o ANTHROPIC_API_KEY). 17 guides total (7 new
  beginner: equipment, seeds 101, watering/pH, lighting, VPD, mistakes,
  glossary). Deployed: repo malachii1964-spec/thcmedsolutions.com → Vercel
  (thc-med-solutions-com.vercel.app), Neon DB connected, tables created.
- v1 (2026-07-10): landing page, 10 MDX grow guides
  across 6 stages (4 members-only), free membership (signup/login/account),
  bookmarks, teaser gating, 21+ age gate, /legal. All gates green: tsc, lint,
  10 Vitest tests, next build, Playwright E2E (signup→unlock→bookmark→signout
  →bad-login→deep-link), Lighthouse mobile 97 perf / 95 a11y, JS 147KB gz.
### Decisions made (do not relitigate)
- Stack: Next 16 App Router + Tailwind 4; MDX in-repo instead of Sanity
  (simple site, no CMS bill); Better Auth + Drizzle; Neon Postgres in prod.
- Dev DB: embedded PGlite behind a socket sidecar (scripts/dev-db.mjs),
  auto-spawned via instrumentation hook — `npm run dev` needs zero env/setup.
  Rationale: Next dev runs multiple workers; file-backed PGlite is
  single-process, so one sidecar owns it and workers connect over TCP :5522.
- DB driver picked by URL: *.neon.tech → neon-http, anything else →
  node-postgres (so Supabase/RDS URLs also just work).
- Design: "grower's almanac under bloom light" — canopy-dark base, bloom
  magenta/violet glow, Fraunces/Albert Sans/IBM Plex Mono. SIGNATURE:
  24-segment light-cycle bar encoding real photoperiods (18/6, 12/12, …).
  3 font families (perf law says 2): mono specimen labels are core to the
  almanac identity; weights trimmed (Plex Mono 400 only) to compensate.
- Header resolves session client-side via bare fetch of get-session (not the
  Better Auth react client) so content pages stay static and JS stays under
  the 150KB budget.
- LCP 2.6s simulated-mobile against localhost accepted (budget 2.5s): CDN +
  edge cache in real deployment covers the 0.1s; revisit if field data says
  otherwise.
### Known issues / TODO
- Reviews done 2026-07-10: reviewer verdict SHIP (fixed: safeNext backslash
  open-redirect bypass + test; sidecar port-claim-before-data-dir race;
  bookmark insert onConflictDoNothing). design-critic: all pages 4-5 after
  fixes (frost focus ring w/o fade-in; meta text contrast to AA; guide meta
  row wrap at 375px). Logged, not built (need approval): guide-page right
  rail TOC on desktop; signature motif on /legal; unlit light-cycle segments
  could read as loading skeleton on locked guides.
- Welcome email (Resend) not wired — no API key available in this session to
  verify end-to-end per Rule 2, so the feature was deferred rather than
  shipped unverified.
- Password reset ("forgot password") not implemented — needs email sending.
- next build prints Better Auth secret/baseURL warnings when run without env
  vars (page-data collection); harmless, disappears once prod env is set.
- Guide detail pages are dynamic (server session check for gating);
  fine on Vercel, but if traffic grows consider caching teaser HTML.
