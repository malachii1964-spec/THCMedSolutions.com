# Template: Booking / Appointments
GOAL: client books a slot without back-and-forth.
PAGES: Home (service+trust+Book CTA), Book (service -> date -> time -> details ->
confirm), Confirmation, Manage/[token] (reschedule/cancel), 404
FEATURES: availability from weekly schedule + exceptions, timezone-safe slots
(store UTC, display local — test this), double-booking prevention (DB constraint,
not just UI), confirmation + reminder emails (Resend), cancel/reschedule links.
SERVICES: DB (required), Resend. Payments/deposits if ASK.
DESIGN: calm and clinical-clean; the calendar is the hero; mobile-first.
GATES ADDENDUM: test proves two users cannot book the same slot.
ASK: service type, appointment lengths, weekly hours, deposit required?
