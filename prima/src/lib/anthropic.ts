import Anthropic from "@anthropic-ai/sdk";

// One shared client — Anthropic SDK is thread-safe and does its own pooling.
export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Model pinned in one place. Bump this when a newer Sonnet ships.
export const PROPOSAL_MODEL = "claude-sonnet-5";
