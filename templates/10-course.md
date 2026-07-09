# Template: Course
GOAL: sell the course; deliver it to buyers.
PAGES: Landing (long-form sales: promise, curriculum, instructor, testimonials,
pricing, guarantee, FAQ), Checkout (Stripe), /course (auth-gated player:
modules/lessons, video embed, progress), 404
FEATURES: Stripe purchase -> account creation -> access grant, lesson progress
tracking, video embeds (Mux/YouTube-unlisted per ASK), completion states.
SERVICES: Stripe, DB, auth, Resend (receipt + welcome).
DESIGN: sales page = long-form persuasive w/ rhythm (alternating sections);
player = calm, distraction-free.
GATES ADDENDUM: test-mode purchase -> access flow must work end-to-end.
ASK: course topic, module/lesson outline, price, video hosting preference?
