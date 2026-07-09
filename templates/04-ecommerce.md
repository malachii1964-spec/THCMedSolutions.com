# Template: E-commerce
GOAL: browse -> cart -> paid, with zero confusion.
PAGES: Home, Shop (grid+filters), Product/[slug], Cart, Checkout (Stripe),
Success, /legal (returns+privacy), 404
FEATURES: product catalog (start: products in code/DB per scale ASK), cart
(server-backed or local per auth ASK), Stripe Checkout, order confirmation email
(Resend), inventory flag, image gallery w/ zoom.
SERVICES: Stripe (required), Resend, DB if >20 products or inventory tracking.
DESIGN: product photography is the hero — big images, minimal chrome, obvious
prices, trust signals near buy button (shipping, returns, secure).
GATES ADDENDUM: test-mode Stripe purchase must complete end-to-end incl. email
before this counts as done.
ASK: what's sold, ~how many products, shipping vs digital, accounts needed?
