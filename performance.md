# Performance Law
# Beauty that loads slow is a shitty product with good makeup. Applies to every build.

## Budgets (verify before calling a page done)
- LCP < 2.5s on simulated mid-range mobile, CLS < 0.1, INP < 200ms
- First-load JS per page < 150KB gzipped (check `next build` output per route)
- Hero image < 200KB; every image sized + modern format
- Fonts: max 2 families / ~4 weights total, self-hosted via next/font

## The rules
1. Server Components by default; "use client" is the exception and must be
   justified. Client bundles are where JS budgets die.
2. Images: next/image ALWAYS — explicit dimensions (CLS), priority on the LCP
   image only, lazy everywhere else.
3. Fonts: next/font (self-host, no layout-shift, no render-block). Never a
   <link> to Google Fonts.
4. Heavy things load late: 3D, charts, editors, maps = dynamic import with a
   designed loading state, below-fold lazy-mounted.
5. Animate cheap: transform + opacity only. Never animate layout properties
   (top/left/width/height). Blur and backdrop-filter are GPU taxes — budget them.
6. Third-party scripts are guilty until proven necessary: load via next/script
   afterInteractive, and question every one (analytics excepted).
7. Data: no client-fetch waterfalls for first paint — fetch on the server;
   paginate lists; index every queried column.

## Verification (part of "done" for user-facing pages)
- Check `next build` route-size output against the JS budget
- Run Lighthouse (or `npx unlighthouse` locally) on key pages: Performance >= 90
  mobile for content sites; >= 80 for logged-in app views and 3D pages
- If a budget is broken, fixing it beats shipping it. Log accepted trade-offs
  in CLAUDE.md Decisions with the reason.
