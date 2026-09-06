/**
 * Fast Buds affiliate code vault — the single source of truth.
 *
 * This data was previously defined inline in the /fast-buds-codes page. It now
 * lives here because the splash on the landing page shows the same offers: two
 * copies of a promo code is a bug waiting to happen, and a code that is right
 * on one surface and stale on another is worse than no code at all.
 *
 * Order matters. `CODES` is authored newest-first, so the splash can show "the
 * latest drops" by taking from the front without a second ordering field to
 * keep in sync.
 *
 * Deliberately NOT stored here: the discount percentage. The promo artwork
 * carries it, and duplicating "15% off" into copy means it silently becomes a
 * false claim the day the offer changes.
 */

const FAST_BUDS_BASE = "https://2fast4buds.com/us";

export type CodeCard = {
  code: string;
  strain: string;
  lane: string;
  image: string;
  alt: string;
  href: string;
  note: string;
  highlight: string;
  featured?: boolean;
};

export const CODES: CodeCard[] = [
  {
    code: "DABOMB",
    strain: "Mango Frost Auto",
    lane: "New release",
    image: "/fast-buds/fast-buds-mango-frost-auto-dabomb-card.png",
    alt: "DABOMB Fast Buds code card featuring Mango Frost Auto flower artwork",
    href: `${FAST_BUDS_BASE}/seeds/mango-frost-auto?coupon=DABOMB&utm_source=lakeeriecannabis&utm_medium=affiliate&utm_campaign=new_release_frost_drop`,
    note: "Frozen mango terp energy, resin-first auto structure, and the kind of visual frost that makes a run feel special before harvest even lands.",
    highlight: "Frozen mango terps + frost-heavy auto speed.",
    featured: true,
  },
  {
    code: "LEC42",
    strain: "Mendo Frost Auto",
    lane: "New release",
    image: "/fast-buds/fast-buds-mendo-frost-auto-lec42-card.png",
    alt: "LEC42 Fast Buds code card featuring Mendo Frost Auto flower artwork",
    href: `${FAST_BUDS_BASE}/seeds/mendo-frost-auto?coupon=LEC42&utm_source=lakeeriecannabis&utm_medium=affiliate&utm_campaign=new_release_frost_drop`,
    note: "Mendo-inspired gas, dense flower posture, and a cold-room frost profile built for growers who want the tent to look expensive.",
    highlight: "Mendo gas + dense frost-vault flower.",
    featured: true,
  },
  {
    code: "FROST42",
    strain: "Strawberry Gorilla Auto",
    lane: "Frost Protocol",
    image: "/fast-buds/fast-buds-frost42-strawberry-gorilla-card.png",
    alt: "FROST42 Fast Buds code card featuring Strawberry Gorilla Auto flower artwork",
    href: `${FAST_BUDS_BASE}/seeds/strawberry-gorilla-auto?coupon=FROST42&utm_source=lakeeriecannabis&utm_medium=affiliate&utm_campaign=frost_protocol`,
    note: "The headline Lake Erie Cannabis frost lane: loud strawberry-gas genetics, heavy resin potential, and a code built to be remembered.",
    highlight: "The original Frost Protocol lane.",
  },
  {
    code: "MALACHI",
    strain: "Banana Purple Punch Auto",
    lane: "Partner code",
    image: "/fast-buds/fast-buds-malachi-banana-purple-punch-card.png",
    alt: "MALACHI Fast Buds code card featuring Banana Purple Punch Auto flower artwork",
    href: `${FAST_BUDS_BASE}/seeds/banana-purple-punch-auto?coupon=MALACHI&utm_source=lakeeriecannabis&utm_medium=affiliate&utm_campaign=malachi_code`,
    note: "A color-and-terp lane for growers chasing purple flower appeal, dessert fruit notes, and fast-cycle autoflower momentum.",
    highlight: "Purple dessert-auto energy.",
  },
  {
    code: "MATTYJ",
    strain: "Gorilla Cookies Auto",
    lane: "Partner code",
    image: "/fast-buds/fast-buds-mattyj-gorilla-cookies-card.png",
    alt: "MATTYJ Fast Buds code card featuring Gorilla Cookies Auto flower artwork",
    href: `${FAST_BUDS_BASE}/seeds/gorilla-cookies-auto?coupon=MATTYJ&utm_source=lakeeriecannabis&utm_medium=affiliate&utm_campaign=mattyj_code`,
    note: "Resin pressure, Cookies/Gorilla backbone, and a proven Fast Buds auto lane for growers who want weight and frost in one package.",
    highlight: "Cookies resin + Gorilla weight.",
  },
];

/**
 * Bump when the offers change. The splash keys "already seen" on this value, so
 * raising it re-shows the splash once to everyone — that is the only supported
 * way to re-announce a drop, and it is deliberately manual so a copy tweak
 * cannot spam returning visitors.
 */
export const DROP_VERSION = "2026-09-fastbuds-frost";

/** The newest offers, for the landing-page splash. */
export function latestDrops(limit = 5): CodeCard[] {
  return CODES.slice(0, Math.max(0, limit));
}

/** Plain-language affiliate disclosure. Required wherever these render. */
export const AFFILIATE_DISCLOSURE =
  "Affiliate links — Lake Erie Cannabis may earn a commission at no extra cost to you. 21+ only. Check your local laws before growing.";
