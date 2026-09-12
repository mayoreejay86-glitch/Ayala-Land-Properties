import type { Proposal } from "@/lib/types";

/**
 * Demo proposal — used by /r/aXk7q9 so the app runs and looks real
 * before Supabase is wired up. Replace with a DB read once persistence lands.
 */
export const DEMO_PROPOSAL: Proposal = {
  id: "demo-01",
  slug: "aXk7q9",
  agentName: "Ree jay",
  agentContact: { phone: "+63 917 000 0000", email: "reejay@ayalalandpremier.ph" },
  createdAt: new Date().toISOString(),

  brief: {
    name: "Ana",
    budgetInPhp: 40_000_000,
    useCase: "family",
    locationPref: "Quezon City / Ortigas corridor",
    timeline: "moving in for the kids' next school year",
    bedroomsWanted: 3,
    notes:
      "Wants greenery, close to schools, long-term value. Not in a rush to close, but wants to lock in pre-selling price.",
  },

  properties: [
    {
      id: "parklinks-n-3br",
      developer: "Ayala Land Premier",
      projectName: "Parklinks North Tower",
      tower: "North",
      unitType: "3BR Corner Suite",
      bedrooms: 3,
      floorAreaSqm: 148,
      priceInPhp: 38_500_000,
      location: "Quezon City · Parklinks Estate",
      turnoverDate: "Q4 2028",
      heroImageUrl:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=80",
      galleryUrls: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
        "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200&q=80",
      ],
      amenities: [
        "35-hectare masterplanned estate",
        "Continuous parkside spine",
        "Resort-style pool + wellness deck",
        "Estate club + fine dining",
        "Direct C5 + Ortigas access",
      ],
      sellingPoints: [
        "Greenest urban estate in the metro",
        "Ayala Land estate-led stewardship",
        "Corner unit — long sightlines and light on two sides",
      ],
      paymentPlans: [
        { name: "10-90 · 10% DP spread, 90% at turnover", downPct: 10, monthsToTurnover: 36 },
        { name: "20-80 · 20% DP spread, 80% at turnover", downPct: 20, monthsToTurnover: 36 },
      ],
    },
    {
      id: "parklinks-s-3br",
      developer: "Ayala Land Premier",
      projectName: "Parklinks South Tower",
      tower: "South",
      unitType: "3BR Premier",
      bedrooms: 3,
      floorAreaSqm: 132,
      priceInPhp: 34_200_000,
      location: "Pasig · Parklinks Estate",
      turnoverDate: "Q2 2029",
      heroImageUrl:
        "https://images.unsplash.com/photo-1449156001935-d28bc1dd7289?w=1600&q=80",
      galleryUrls: [
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
      ],
      amenities: [
        "Direct parkside frontage",
        "Estate club membership",
        "Rooftop garden + lap pool",
        "Retail & dining at ground level",
      ],
      sellingPoints: [
        "Parkside frontage — the greenest unit line in the estate",
        "Later turnover — softer cashflow over more months",
        "South tower typically holds resale premium",
      ],
      paymentPlans: [
        { name: "10-90 · 10% DP spread, 90% at turnover", downPct: 10, monthsToTurnover: 42 },
        { name: "30-70 · 30% DP, 70% at turnover", downPct: 30, monthsToTurnover: 42 },
      ],
    },
  ],

  copy: {
    coverHeadline: "A residence shaped by parkside quiet",
    personalizedIntro:
      "Ana — based on what you shared about wanting a home your children can grow into, close to schools, and quietly appreciating over time, I put together two options inside the greenest estate the metro currently has. Both are 3-bedroom units well within your range, and both give you room to decide without rushing.",
    propertyBlocks: [
      {
        propertyId: "parklinks-n-3br",
        whyRecommended:
          "You mentioned greenery and long-term value — the North corner suite sits directly above the estate's central park spine, and Ayala Land's estate-led addresses have historically held their value through every cycle. The corner exposure means light and views on two sides.",
        sellingPoints: [
          "148 sqm across a corner cut — rare unit line",
          "Direct sightlines to the 35 ha park spine",
          "Turnover Q4 2028, giving you time before the school year",
        ],
      },
      {
        propertyId: "parklinks-s-3br",
        whyRecommended:
          "South Tower turnovers land in 2029, which spreads your down payment over more months — useful given you said you're not in a rush. The parkside frontage is also historically the first line to appreciate on resale.",
        sellingPoints: [
          "Softer monthly cashflow across a longer DP window",
          "Direct parkside frontage — best resale line",
          "132 sqm, slightly more efficient plan",
        ],
      },
    ],
    comparisonInsight:
      "North gives you the corner light and earlier turnover; South gives you the softer cashflow and the parkside line. Either way, you're staying inside the same estate — the family address doesn't change, only the tower.",
    closingLine:
      "Take your time with these. I'm happy to walk both units in person whenever you'd like.",
  },
};
