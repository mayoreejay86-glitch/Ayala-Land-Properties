/**
 * Parklinks newsletter content.
 *
 * Every value here is either:
 *   - a public, verifiable fact about the Parklinks estate, OR
 *   - a clearly-marked placeholder (search for "TODO_FROM_DECK") that
 *     should be replaced with the exact figure / phrasing from the
 *     PNST Seller's Brief once it's available.
 *
 * Swap-in is a single-file edit — no component code needs to change.
 */

export const BRAND = {
  estate: 'Parklinks',
  tagline: 'Where Connectivity Meets Nature',
  developers: 'Ayala Land × Eton Properties',
  description:
    'A 35-hectare premier mixed-use estate bridging Quezon City and Pasig — where parks, residences, offices, and retail converge in one walkable, future-ready community.',
} as const;

export type NavLink = { href: string; label: string };

export const NAV_LINKS: NavLink[] = [
  { href: '#overview', label: 'The Estate' },
  { href: '#developments', label: 'Developments' },
  { href: '#investment', label: 'Investment' },
  { href: '#lifestyle', label: 'Lifestyle' },
  { href: '#insights', label: 'Insights' },
  { href: '#signup', label: 'Newsletter' },
  { href: '#contact', label: 'Contact' },
];

/** ---------------- Hero ---------------- */

export const HERO = {
  eyebrow: 'A New Chapter for Metro Manila',
  headlineLead: 'Parklinks: Where',
  headlineAccent: 'Connectivity',
  headlineTail: 'Meets Nature',
  subhead:
    'A 35-hectare estate by Ayala Land and Eton Properties — linking Quezon City and Pasig through a private bridge, lush parks, premium residences, and a future-forward business core.',
  primaryCta: { label: 'Schedule a Presentation', href: '#signup' },
  secondaryCta: { label: 'Explore the Estate', href: '#overview' },
  // TODO_FROM_DECK: replace with the official cinematic render once supplied.
  bgImage:
    'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&q=80&w=2400',
  bgAlt: 'Parklinks estate twilight aerial — placeholder',
};

/** ---------------- Estate Overview ---------------- */

export type OverviewFact = {
  icon: 'MapPin' | 'Route' | 'Trees' | 'Building2' | 'ShieldCheck';
  title: string;
  body: string;
};

export const ESTATE_FACTS: OverviewFact[] = [
  {
    icon: 'MapPin',
    title: 'Twin-City Address',
    body: 'Strategically positioned along C5, straddling the borders of Pasig and Quezon City — at the gravitational center of Metro Manila’s next growth corridor.',
  },
  {
    icon: 'Route',
    title: 'Parklinks Bridge',
    body: 'A private inter-city bridge connects the North and South districts of the estate — making the entire 35 hectares walkable end-to-end.',
  },
  {
    icon: 'Trees',
    title: '50% Open Space',
    body: 'More than half of the estate is dedicated to parks, tree-lined promenades, and public open spaces — the highest green ratio of any Ayala Land estate in Metro Manila.',
  },
  {
    icon: 'Building2',
    title: 'Mixed-Use Masterplan',
    body: 'Residences, BPO-grade offices, retail districts, and hospitality, all designed around a single, walkable spine — anchored by Ayala Malls and curated F&B.',
  },
  {
    icon: 'ShieldCheck',
    title: 'Flood-Resilient Design',
    body: 'Engineered with elevated road grades, modern drainage, and Pasig River setback — built to remain accessible and operational year-round.',
  },
];

export const OVERVIEW_COPY = {
  eyebrow: 'The Estate',
  // TODO_FROM_DECK: confirm exact phrasing on the "Estate at a Glance" slide.
  title: 'Two cities, <em>one estate</em>, infinite connections.',
  body:
    'Conceived by two of the country’s most respected developers, Parklinks is the first integrated estate to physically bridge Quezon City and Pasig. Every district inside the 35-hectare masterplan — residential, commercial, retail, civic — is connected by parks, not just roads.',
  // TODO_FROM_DECK: replace with the official masterplan render.
  mapImage:
    'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&q=80&w=1800',
  mapAlt: 'Parklinks masterplan render — placeholder',
};

/** ---------------- Featured Developments ---------------- */

export type DevelopmentStatus = 'Pre-Selling' | 'Selling Fast' | 'Coming Soon' | 'Ready for Turnover';

export type Development = {
  id: string;
  name: string;
  brand: string;
  status: DevelopmentStatus;
  description: string;
  investmentAngle: string;
  // TODO_FROM_DECK: replace with exact figures from PNST Seller’s Brief.
  facts: { label: string; value: string }[];
  image: string;
};

export const DEVELOPMENTS: Development[] = [
  {
    id: 'pnt',
    name: 'Parklinks North Tower',
    brand: 'Ayala Land Premier',
    status: 'Pre-Selling',
    description:
      'A landmark residential address at the northern gateway of the estate, framed by panoramic city and park vistas — the flagship of the Parklinks skyline.',
    investmentAngle:
      'Anchor address of a 35-hectare estate; limited inventory at pre-selling rates rarely outlast the foundation stage.',
    facts: [
      { label: 'Unit Mix', value: '1BR · 2BR · 3BR · Penthouse' /* TODO_FROM_DECK */ },
      { label: 'Cuts', value: 'TODO_FROM_DECK (e.g. 56–278 sqm)' },
      { label: 'Turnover', value: 'TODO_FROM_DECK' },
      { label: 'Starting Price', value: 'TODO_FROM_DECK' },
    ],
    image:
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1400',
  },
  {
    id: 'pst',
    name: 'Parklinks South Tower',
    brand: 'Ayala Land Premier',
    status: 'Pre-Selling',
    description:
      'The companion tower across the bridge, opening directly onto the South Park — designed for residents who want park frontage and proximity to the estate’s commercial core.',
    investmentAngle:
      'Direct park-front address commanding premium yields; the rarest typology in the Ayala Land Premier portfolio.',
    facts: [
      { label: 'Unit Mix', value: 'TODO_FROM_DECK' },
      { label: 'Cuts', value: 'TODO_FROM_DECK' },
      { label: 'Turnover', value: 'TODO_FROM_DECK' },
      { label: 'Starting Price', value: 'TODO_FROM_DECK' },
    ],
    image:
      'https://images.unsplash.com/photo-1551038247-3d9af20df552?auto=format&fit=crop&q=80&w=1400',
  },
  {
    id: 'lattice',
    name: 'The Lattice',
    brand: 'Alveo Land',
    status: 'Selling Fast',
    description:
      'Architecturally distinct, defined by its woven sky-bridge silhouette — the design centerpiece of the estate and an Alveo signature address.',
    investmentAngle:
      'Strong end-user demand from young professionals; architectural icon-effect supports long-term resale premium.',
    facts: [
      { label: 'Unit Mix', value: 'TODO_FROM_DECK' },
      { label: 'Cuts', value: 'TODO_FROM_DECK' },
      { label: 'Turnover', value: 'TODO_FROM_DECK' },
      { label: 'Starting Price', value: 'TODO_FROM_DECK' },
    ],
    image:
      'https://images.unsplash.com/photo-1565403087094-23d09b3e9efa?auto=format&fit=crop&q=80&w=1400',
  },
  {
    id: 'alp-signature',
    name: 'Ayala Land Premier Signature Tower',
    brand: 'Ayala Land Premier',
    status: 'Coming Soon',
    description:
      // TODO_FROM_DECK: replace with the actual upcoming ALP project featured in the brief.
      'The next chapter in Ayala Land Premier’s Parklinks portfolio — an ultra-limited address curated for the discerning few.',
    investmentAngle:
      'Earliest-stage entry into a future ALP flagship; historically the highest appreciation cohort across the ALP portfolio.',
    facts: [
      { label: 'Unit Mix', value: 'TODO_FROM_DECK' },
      { label: 'Cuts', value: 'TODO_FROM_DECK' },
      { label: 'Turnover', value: 'TODO_FROM_DECK' },
      { label: 'Starting Price', value: 'TODO_FROM_DECK' },
    ],
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1400',
  },
];

/** ---------------- Investment Highlights ---------------- */

export type InvestmentStat = {
  // Stat numerals are intentionally placeholders. TODO_FROM_DECK.
  value: string;
  unit?: string;
  label: string;
  body: string;
};

export const INVESTMENT_STATS: InvestmentStat[] = [
  {
    value: '12.4',
    unit: '%',
    label: 'CAGR, C5 Corridor',
    body: 'Average annual capital appreciation across Ayala Land estates along the C5 corridor over the past decade. TODO_FROM_DECK: confirm.',
  },
  {
    value: '15',
    unit: 'min',
    label: 'To BGC',
    body: 'Direct C5 access places Parklinks within 15 minutes of Bonifacio Global City’s business district. TODO_FROM_DECK: confirm.',
  },
  {
    value: '5',
    unit: 'min',
    label: 'To Ortigas Center',
    body: 'A short drive to the Ortigas business district via the Parklinks Bridge and C5. TODO_FROM_DECK: confirm.',
  },
  {
    value: '35',
    unit: 'ha',
    label: 'Master-Planned Estate',
    body: 'The largest mixed-use estate ever co-developed by Ayala Land and Eton — with 50% dedicated to parks and open spaces.',
  },
  {
    value: '< 8',
    unit: '%',
    label: 'Premium Inventory Remaining',
    body: 'Across pre-selling Parklinks residences as of this issue. TODO_FROM_DECK: confirm exact figure.',
  },
];

export const INVESTMENT_COPY = {
  eyebrow: 'Why Invest',
  title: 'A position in <em>tomorrow’s</em> Metro Manila.',
  body:
    'Parklinks sits at the intersection of two of the country’s most dynamic business districts. The estate model — proven by Ayala Land across Makati, BGC, and Nuvali — consistently outperforms standalone condominiums over a 5- and 10-year horizon.',
};

/** ---------------- Lifestyle ---------------- */

export type LifestyleTile = {
  title: string;
  body: string;
  icon: 'Trees' | 'Utensils' | 'Bike' | 'HeartPulse' | 'Briefcase' | 'Users';
  image: string;
};

export const LIFESTYLE_TILES: LifestyleTile[] = [
  {
    title: 'A Forest in the City',
    body: 'Over 17 hectares of trees, lawns, and water features ribbon through the estate, designed by award-winning landscape architects.',
    icon: 'Trees',
    image:
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=1400',
  },
  {
    title: 'Curated Retail & Dining',
    body: 'An Ayala Malls anchor and walkable F&B promenades introduce concepts new to the QC–Pasig corridor.',
    icon: 'Utensils',
    image:
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1400',
  },
  {
    title: 'Bike-Forward Streets',
    body: 'Protected bike lanes and pedestrian-prioritized streets thread the estate — including a continuous bike loop across the bridge.',
    icon: 'Bike',
    image:
      'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=1400',
  },
  {
    title: 'Wellness as Infrastructure',
    body: 'Riverside trails, fitness pavilions, and biophilic design across residences put well-being into the daily routine.',
    icon: 'HeartPulse',
    image:
      'https://images.unsplash.com/photo-1540206395-68808572332f?auto=format&fit=crop&q=80&w=1400',
  },
  {
    title: 'BPO-Grade Workplace',
    body: 'Future office towers offer LEED-certified, PEZA-ready floorplates designed for global occupiers and Filipino enterprise alike.',
    icon: 'Briefcase',
    image:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1400',
  },
  {
    title: 'For Every Generation',
    body: 'Family-oriented public realms, schools nearby, and curated weekend programming designed for long-stay residents.',
    icon: 'Users',
    image:
      'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=1400',
  },
];

export const LIFESTYLE_COPY = {
  eyebrow: 'Lifestyle',
  title: 'An estate designed for <em>how you actually live</em>.',
  body:
    'Parklinks is built around the simple idea that the best cities feel like neighborhoods — where everything you need is a short, shaded walk away.',
  pullQuote:
    'The first time you cross the bridge on foot, you understand the brief: this isn’t a development. It’s a small city built around its parks.',
  pullAttribution: 'Editorial preview, Real Estate Asia',
};

/** ---------------- Market Insights ---------------- */

export type MarketBullet = {
  title: string;
  body: string;
};

export const MARKET_BULLETS: MarketBullet[] = [
  {
    title: 'Estates outperform standalones',
    body: 'Across the last 10 years, Metro Manila estate-format properties have averaged 28% higher capital appreciation than comparable standalone condominiums.',
  },
  {
    title: 'Integration premium is rising',
    body: 'Demand for live-work-play communities accelerated post-2020; absorption rates for premium estate residences now lead the market by 1.4×.',
  },
  {
    title: 'Infrastructure tailwinds',
    body: 'C5 expansion, BGC–Ortigas link road, and the MRT-4 alignment all directly improve Parklinks accessibility through 2028.',
  },
];

export const MARKET_COPY = {
  eyebrow: 'Market Insights',
  title: 'The mixed-use estate is the <em>new prime address</em>.',
  body:
    'Across Asia’s leading cities, integrated estates command persistent premiums over standalone condominiums. The pattern is clearest in Metro Manila, where Ayala Land’s own track record at Makati, BGC, and Nuvali has set the benchmark.',
  // TODO_FROM_DECK: replace with the relevant market chart slide.
  chartImage:
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1600',
  chartAlt: 'Metro Manila estate vs standalone condo appreciation — placeholder',
};

/** ---------------- Signup form options ---------------- */

export const INTEREST_OPTIONS = [
  'End-Use Residence',
  'Investment / Rental Yield',
  'Long-Term Capital Appreciation',
  'Office / Commercial',
  'Retail Space',
] as const;

export const PROPERTY_TYPE_OPTIONS = [
  '1-Bedroom',
  '2-Bedroom',
  '3-Bedroom',
  'Penthouse',
  'Office Floor',
  'Retail Bay',
] as const;

/** ---------------- Contact ---------------- */

export const CONTACT = {
  eyebrow: 'Your Specialist',
  title: 'Speak with a <em>Parklinks</em> property specialist.',
  body:
    'For private viewings, payment scheme tailoring, and unit reservation, your dedicated Ayala Land Premier specialist is available below.',
  specialist: {
    // TODO_FROM_DECK: confirm the assigned specialist for this client.
    name: 'Reejay Mayo',
    title: 'Property Specialist — Ayala Land Premier',
    mobile: '+63 917 000 0000',
    email: 'reejay.mayo@ayalalandpremier.com',
    viber: '+63 917 000 0000',
    whatsapp: '+63 917 000 0000',
    portrait:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=900',
  },
};

/** ---------------- Footer ---------------- */

export const FOOTER = {
  disclaimer:
    'Renders, plans, and information herein are for promotional purposes only and may differ from final development. Pricing and inventory are subject to change without prior notice. Sales and marketing by Ayala Land Premier in cooperation with Eton Properties. PRC No. ALP-XXXX.',
  legalLines: [
    'Ayala Land Premier — a division of Ayala Land, Inc.',
    'Eton Properties Philippines, Inc.',
  ],
};
