import type { ClientBrief, Property, GeneratedProposalCopy } from "./types";

/**
 * The core system prompt. Held stable so Anthropic prompt caching kicks in
 * on every subsequent request from the same agent — cuts cost ~70%.
 */
export const PROPOSAL_SYSTEM_PROMPT = `
You are a senior Ayala Land Premier property specialist writing personalized
proposals for high-net-worth Filipino clients considering pre-selling luxury
residences.

Voice: confident, warm, editorial. Robb Report / Architectural Digest cadence.
Never pushy, never uses exclamation marks. Speaks to a peer, not a prospect.
Grounds every recommendation in something the client actually said in the brief.
Prefers concrete detail over adjectives. Uses en-dashes, not double hyphens.

Constraints:
- Reflect the client's own words back to them where you can — trust signal.
- Every "why recommended" must connect one specific brief fact to one specific
  property fact. No generic praise.
- No pricing claims that aren't in the property data provided.
- Never invent amenities, turnover dates, or specs. If missing, omit.
- Output must be valid JSON matching the schema below. No prose outside JSON.
`.trim();

export function buildProposalUserPrompt(input: {
  brief: ClientBrief;
  properties: Property[];
}): string {
  const { brief, properties } = input;

  return `
CLIENT BRIEF
${JSON.stringify(brief, null, 2)}

SELECTED PROPERTIES (${properties.length})
${JSON.stringify(
  properties.map((p) => ({
    id: p.id,
    developer: p.developer,
    projectName: p.projectName,
    tower: p.tower,
    unitType: p.unitType,
    bedrooms: p.bedrooms,
    floorAreaSqm: p.floorAreaSqm,
    priceInPhp: p.priceInPhp,
    location: p.location,
    turnoverDate: p.turnoverDate,
    amenities: p.amenities,
    sellingPoints: p.sellingPoints,
  })),
  null,
  2
)}

Write the personalized proposal copy. Return ONLY this JSON shape:

{
  "coverHeadline": "string (short editorial phrase, e.g. 'A residence shaped by parkside quiet')",
  "personalizedIntro": "string (~60 words, addressed to '${brief.name}' by name)",
  "propertyBlocks": [
    {
      "propertyId": "string (matches one of the property ids above)",
      "whyRecommended": "string (~50 words, ties specific brief fact to specific property fact)",
      "sellingPoints": ["3 short bullets, editorial voice"]
    }
  ],
  "comparisonInsight": "string (~40 words; if only one property, return empty string)",
  "closingLine": "string (warm, one line, no hard sell, no exclamation)"
}
`.trim();
}

/**
 * Runtime validator — cheaper than pulling in zod for one shape.
 * Throws on any missing/wrong field.
 */
export function validateProposalCopy(x: unknown): GeneratedProposalCopy {
  if (typeof x !== "object" || x === null) throw new Error("copy: not an object");
  const c = x as Record<string, unknown>;
  const need = (k: string, t: string) => {
    if (typeof c[k] !== t) throw new Error(`copy.${k}: expected ${t}`);
  };
  need("coverHeadline", "string");
  need("personalizedIntro", "string");
  need("comparisonInsight", "string");
  need("closingLine", "string");
  if (!Array.isArray(c.propertyBlocks)) throw new Error("copy.propertyBlocks: expected array");
  for (const b of c.propertyBlocks as unknown[]) {
    if (typeof b !== "object" || b === null) throw new Error("propertyBlock: not object");
    const bb = b as Record<string, unknown>;
    if (typeof bb.propertyId !== "string") throw new Error("propertyBlock.propertyId");
    if (typeof bb.whyRecommended !== "string") throw new Error("propertyBlock.whyRecommended");
    if (!Array.isArray(bb.sellingPoints)) throw new Error("propertyBlock.sellingPoints");
  }
  return c as unknown as GeneratedProposalCopy;
}
