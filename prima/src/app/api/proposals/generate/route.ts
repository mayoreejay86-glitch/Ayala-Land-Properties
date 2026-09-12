import { NextResponse } from "next/server";
import { anthropic, PROPOSAL_MODEL } from "@/lib/anthropic";
import {
  PROPOSAL_SYSTEM_PROMPT,
  buildProposalUserPrompt,
  validateProposalCopy,
} from "@/lib/prompts";
import type { ClientBrief, Property } from "@/lib/types";

export const runtime = "nodejs";
export const maxDuration = 60;

type Body = { brief: ClientBrief; properties: Property[] };

/**
 * POST /api/proposals/generate
 * body: { brief, properties }
 * returns: { copy: GeneratedProposalCopy }
 *
 * Uses Anthropic prompt caching on the system prompt — after the first call,
 * subsequent calls only pay for the (small) per-request user message.
 */
export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY not set" },
      { status: 500 }
    );
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "invalid JSON body" }, { status: 400 });
  }

  if (!body?.brief?.name) {
    return NextResponse.json({ error: "brief.name is required" }, { status: 400 });
  }
  if (!Array.isArray(body.properties) || body.properties.length === 0) {
    return NextResponse.json({ error: "properties[] required" }, { status: 400 });
  }
  if (body.properties.length > 5) {
    return NextResponse.json({ error: "at most 5 properties" }, { status: 400 });
  }

  const message = await anthropic.messages.create({
    model: PROPOSAL_MODEL,
    max_tokens: 2000,
    system: [
      {
        type: "text",
        text: PROPOSAL_SYSTEM_PROMPT,
        cache_control: { type: "ephemeral" }, // 5-min cache on the stable part
      },
    ],
    messages: [
      { role: "user", content: buildProposalUserPrompt(body) },
    ],
  });

  const textBlock = message.content.find((c) => c.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    return NextResponse.json({ error: "no text in response" }, { status: 502 });
  }

  // The model may wrap in ```json fences; strip defensively.
  const raw = textBlock.text.trim().replace(/^```json\s*|\s*```$/g, "");

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch (e) {
    return NextResponse.json(
      { error: "model returned non-JSON", raw },
      { status: 502 }
    );
  }

  try {
    const copy = validateProposalCopy(parsed);
    return NextResponse.json({ copy, usage: message.usage });
  } catch (e) {
    return NextResponse.json(
      { error: `schema: ${(e as Error).message}`, raw: parsed },
      { status: 502 }
    );
  }
}
