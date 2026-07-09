# Style Direction: Immersive 3D / WebGL
# The showstopper direction — and where performance goes to die. Both halves
# of this file are mandatory if this direction is chosen.

## The look
360° product renders, parallax depth, particle atmospheres, scroll-driven
camera moves, spatial menus. Reference energy: interactive line graphics,
animated cursors, macro 3D product shots, glowing interior scenes.

## The tools
- Three.js via React Three Fiber (+ drei helpers) — the default
- Scroll choreography: R3F ScrollControls or GSAP ScrollTrigger (pick ONE)
- Spline only for quick hero embeds on low-stakes pages (heavier runtime)
- Compress every model: glTF + Draco/Meshopt; textures as KTX2/WebP

## The performance contract (non-negotiable if 3D is used)
1. 3D loads AFTER first paint: dynamic import, canvas below-fold lazy-mounted;
   LCP element is NEVER inside the canvas
2. Static, designed poster fallback: mobile low-end, prefers-reduced-motion,
   and WebGL-unavailable all get the poster — and it must look intentional
3. Budgets: <=1.5MB total 3D payload (models+textures), <=100k triangles in
   view, 60fps desktop / 30fps mid-range phone — test, don't assume
4. One canvas per page. Pause render loop when tab hidden or canvas off-screen
   (frameloop="demand" where possible)
5. Interaction must not fight scroll: no hijacked scrolling; camera moves map
   to native scroll position

If the subject doesn't EARN 3D (physical product, spatial story, wow-first
brand), don't use it — a fast site with perfect type beats a slow spectacle.
