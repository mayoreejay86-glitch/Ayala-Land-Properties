// Shared domain types for Prima.
// Kept intentionally small — this is the MVP surface, not the full schema.

export type PaymentPlan = {
  name: string;             // "10-90 Spot DP · 90% at Turnover"
  downPct: number;          // 10
  monthsToTurnover: number; // 36
  balloonPct?: number;      // remaining balance on turnover
};

export type Property = {
  id: string;
  developer: string;
  projectName: string;
  tower?: string;
  unitType: string;         // "3BR Corner Suite"
  bedrooms: number;
  floorAreaSqm: number;
  priceInPhp: number;
  location: string;         // "Quezon City · Parklinks Estate"
  turnoverDate: string;     // "Q4 2028"
  heroImageUrl: string;
  galleryUrls: string[];
  amenities: string[];
  sellingPoints: string[];
  paymentPlans: PaymentPlan[];
};

export type ClientBrief = {
  name: string;             // first name is enough
  budgetInPhp: number;
  useCase: "primary" | "investment" | "vacation" | "family";
  locationPref?: string;
  timeline?: string;        // "moving Q2 2026"
  bedroomsWanted?: number;
  notes?: string;           // agent's free-text conversation notes
};

export type GeneratedProposalCopy = {
  coverHeadline: string;         // one short editorial phrase
  personalizedIntro: string;     // ~60 words, addressed to client by name
  propertyBlocks: Array<{
    propertyId: string;
    whyRecommended: string;      // ~50 words, tied to specific brief points
    sellingPoints: string[];     // 3 short bullets
  }>;
  comparisonInsight: string;     // ~40 words, when 2+ properties
  closingLine: string;           // warm, no hard sell
};

export type Proposal = {
  id: string;
  slug: string;                  // used in /r/[slug]
  brief: ClientBrief;
  properties: Property[];
  copy: GeneratedProposalCopy;
  agentName: string;
  agentHeadshotUrl?: string;
  agentContact: { phone: string; email: string };
  createdAt: string;
};
