/** FAQ content for the Sanctuary — grower questions + platform/legal. */

export type FaqItem = { q: string; a: string };
export type FaqGroup = { id: string; name: string; items: FaqItem[] };

export const FAQ: FaqGroup[] = [
  {
    id: "getting-started",
    name: "Getting Started",
    items: [
      {
        q: "I've never grown before. Where do I actually begin?",
        a: "Start at the First-Grow Roadmap — it lays out every stage in order and tells you exactly which guide to read at each step. Then read three things before you buy anything: the equipment budget guide, the seeds guide (autoflower vs. photoperiod), and the watering & pH guide. Those three prevent most first-grow disasters.",
      },
      {
        q: "How much does a first grow really cost?",
        a: "A complete one-plant setup starts around $300 and grows genuinely good flower. The $600 tier (2 plants, better light and fan control) is the sweet spot most people should buy first. The Gear Index breaks down every item by budget tier. The one place never to cut corners is the light.",
      },
      {
        q: "Indoor or outdoor for my first grow?",
        a: "Indoor gives you control (and a harvest any time of year); outdoor is cheaper and uses free sunlight but ties you to the season. In Western New York, outdoor means planting after the last frost (late May) and racing an early-fall finish — doable, but indoor is more forgiving for grow #1.",
      },
    ],
  },
  {
    id: "growing",
    name: "Growing Questions",
    items: [
      {
        q: "How long from seed to harvest?",
        a: "Autoflowers: about 10–12 weeks start to finish. Photoperiods: 16–20+ weeks, because you control how long they stay in veg before you flip to flower. Then add ~2–4 weeks for drying and curing — which you should never skip.",
      },
      {
        q: "Why are my leaves turning yellow?",
        a: "It depends where. Yellowing that starts at the bottom in late flower is the normal 'fade.' Yellowing between the veins is usually magnesium; rusty spots under LED are usually calcium (Cal-Mag). But most 'deficiencies' are actually pH lockout or overwatering — check those first. The nutrient-deficiency guide has a full symptom chart, and the Plant Doctor can work your specific case.",
      },
      {
        q: "How do I know when to harvest?",
        a: "Trichomes, not the calendar. Get a cheap 60x loupe and look at the resin glands on the buds: mostly cloudy with some amber is the classic window. The breeder's '8 weeks' is usually more like 9–10. Full detail in the harvest-timing guide.",
      },
      {
        q: "What's the #1 mistake beginners make?",
        a: "Overwatering — by a mile. Roots need oxygen between drinks. Water by pot weight, not on a schedule, use fabric pots, and let the top of the medium dry out. If leaves droop and the soil is wet, that's overwatering, not thirst.",
      },
    ],
  },
  {
    id: "platform",
    name: "The Platform",
    items: [
      {
        q: "Is it really free?",
        a: "Yes. A free account unlocks the full library — including the members-only deep-dives — plus the Plant Doctor and bookmarks. No card, no spam. We may add optional premium tools later, but the core knowledge stays free.",
      },
      {
        q: "What is the AI Plant Doctor?",
        a: "A master-grower AI you can describe your plant to — stage, medium, symptoms — and it works the case like a pro: ranks the likely causes, checks the usual suspects, and gives you one clear action plan. It's free for members and trained on the same guidance as our guides, so its advice stays consistent.",
      },
      {
        q: "Do you sell seeds, products, or cannabis?",
        a: "No. Lake Erie Cannabis is an education and resource platform. The Gear Index points to the equipment growers rely on, but we don't sell cannabis, seeds, or products, and nothing here is a solicitation to buy them.",
      },
      {
        q: "Who's behind this?",
        a: "Lake Erie Cannabis is built for Western New York's growing community — Buffalo down to Niagara — and anyone who wants straight, source-grounded cultivation knowledge without the forum noise.",
      },
    ],
  },
  {
    id: "legal",
    name: "Legal & Safety",
    items: [
      {
        q: "Is growing cannabis legal where I am?",
        a: "It varies enormously — from legal home cultivation with plant limits, to medical-only programs, to full prohibition. New York allows adult home cultivation with per-household plant limits, but rules change and differ by locality. It is your responsibility to know and follow your local laws. Nothing here is legal advice.",
      },
      {
        q: "Is any of this medical advice?",
        a: "No. Our content is educational only and not a substitute for professional medical advice, diagnosis, or treatment. If you use cannabis medically, work with a qualified healthcare provider.",
      },
      {
        q: "Do I have to be 21?",
        a: "Yes. This site is intended for adults 21 and over (or the legal age in your jurisdiction, whichever is higher). That's what the age gate on your first visit is for.",
      },
    ],
  },
];
