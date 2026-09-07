/**
 * Support / donations.
 *
 * Deliberately an OUTBOUND link to Ko-fi rather than payments on this site.
 * Stripe, PayPal, Venmo and Cash App all prohibit cannabis-related
 * transactions in their terms, and a frozen processor account can take
 * unrelated funds with it. Ko-fi carries the processing and the policy risk;
 * this site carries no card data and no payment code.
 *
 * TODO(owner): replace KOFI_USERNAME with the real handle. Until it is set,
 * the banner and the support page render nothing rather than shipping a dead
 * link — a broken donate button costs more trust than no button at all.
 */

/** Your ko-fi.com handle, e.g. "lakeeriecannabis" — no slashes, no URL. */
export const KOFI_USERNAME = "";

export const KOFI_URL = KOFI_USERNAME
  ? `https://ko-fi.com/${KOFI_USERNAME}`
  : "";

export function supportEnabled(): boolean {
  return KOFI_URL.length > 0;
}

/** One line, shown in the site-wide banner. Short enough to read at a glance. */
export const BANNER_LINE =
  "One dad, building the grow platform he wished existed. Help keep it free.";

export const BANNER_CTA = "Read why";

/**
 * The support page. Written to be true rather than to tug — the honest version
 * converts better on a site whose whole value is not overstating things.
 */
export const SUPPORT_HEADLINE = "Help build this into the best grow platform on earth";

export const SUPPORT_INTRO = [
  "Lake Erie Cannabis is one person. I'm a single father in Western New York, and I started this because the growing information online was either thin, wrong, or written to sell you something.",
  "So I built the opposite: 153 guides, 268 strain profiles, calculators that do the math for you, and tools that tell you what's actually wrong with your plant. No paywall on the thing that matters. No fluff written for search engines.",
];

export const SUPPORT_WHERE_IT_GOES = [
  {
    t: "Keeping it free",
    d: "Hosting, the database, and the AI plant doctor all cost money every month. Donations keep the guides open instead of behind a paywall.",
  },
  {
    t: "Real testing, not guesses",
    d: "Genetics, soil, amendments and gear so recommendations come from actually growing it — not from repeating what another site said.",
  },
  {
    t: "Original photography",
    d: "Real plants at real stages. Stock photos are how you end up with a deficiency chart that teaches people the wrong thing.",
  },
  {
    t: "More time on it",
    d: "Every hour here is an hour not spent elsewhere. Support buys more of them.",
  },
];

/** Legal clarity. A donation is not a purchase and not a write-off. */
export const SUPPORT_DISCLOSURE =
  "Support is a voluntary donation to an independent creator — not a purchase, not a subscription, and not tax-deductible. Nothing on this site is for sale, and support never unlocks content: the guides stay free either way. 21+ only.";
