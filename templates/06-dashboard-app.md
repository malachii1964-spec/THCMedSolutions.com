# Template: Dashboard App
GOAL: logged-in users manage their stuff without a manual.
PAGES: Landing (minimal), /login+/signup, /app (dashboard), /app/[resource]
(list+detail+create/edit), /app/settings, 404
FEATURES: auth (Better Auth; Supabase if storage too), one core resource full
CRUD with optimistic UI, empty states that teach, search+filter on lists,
settings (profile, email, delete account), role field ready for admin.
SERVICES: DB (required), auth (required), Resend for auth emails.
DESIGN: app-like density, sidebar nav, shadcn components consistently, every
list has designed empty/loading/error states.
GATES ADDENDUM: tests must cover the core resource's create/read/update/delete
and one authz case (user A cannot see user B's data).
ASK: the ONE core resource and its fields; who are the users?
