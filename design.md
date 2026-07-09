# Design System — Taste Layer
# Part 1 is YOUR taste (fill once). Part 2 is LAW regardless of Part 1.

## PART 1 — My taste (fill in once; delete lines you want the agent to decide)
- Site I love the look of: [url]
- Second reference: [url]
- Never make it look like: [url or vibe]
- Base mood: [light / dark / toggle]
- Density: [airy and editorial / compact and app-like]
- Corners: [sharp / slight / round]

## PART 2 — Design law (applies to EVERY build, non-negotiable)

### Process (before writing any UI code)
1. Ground it in the subject: name the site's ONE subject, audience, and the
   page's single job. Distinctive choices come from the subject's own world —
   its materials, artifacts, vernacular — not from generic "modern web" taste.
2. Write a compact design plan: 4-6 named hex colors, 2+ typefaces with roles
   (characterful display used with restraint + complementary body), a layout
   concept, and THE SIGNATURE — the single element this site is remembered by.
3. Self-critique the plan: would you produce this same plan for any similar
   brief? If yes, it's a default, not a choice. Revise before building.
4. Build exactly to the revised plan. Every color and type decision derives
   from it — no drive-by additions.

### Banned defaults (the AI tells — never ship these uninstructed)
- Cream/#F4F1EA background + high-contrast serif + terracotta accent
- Near-black background + single acid-green or vermilion accent
- Broadsheet look: hairline rules, zero radius, dense newspaper columns
- Numbered section markers (01/02/03) unless content is truly a sequence
- Hero = big number + small label + gradient accent (the template answer)
- Same fonts you'd reach for on any project; purple-to-blue gradients on white
- Lorem ipsum, stock illustration packs, emoji as design elements

### The rules
- Typography carries the personality. If the type were swapped for defaults
  and nobody would notice, the design has no personality yet.
- Spend boldness in ONE place (the signature); keep everything around it
  quiet and disciplined. Before shipping: look in the mirror, remove one
  accessory.
- Structure is information: dividers, labels, eyebrows must encode something
  true about the content, not decorate it.
- Motion: one orchestrated moment beats scattered effects. Subtle hovers fine.
  Respect prefers-reduced-motion.
- Copy is design material: active voice, plain verbs, buttons say exactly
  what they do ("Save changes" not "Submit"), errors say what went wrong and
  how to fix it, empty states invite action. Write real copy, never filler.
- Quality floor, unannounced: flawless at 375px width FIRST, visible keyboard
  focus states, honest contrast ratios, designed loading/empty/error states.

### Verification
After building any user-facing page, screenshot it (or render it) and look at
it before calling it done. Then dispatch the design-critic agent. A page no
one has LOOKED at is not finished.
