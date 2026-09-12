# Prima

**AI proposal pages for Philippine luxury real estate specialists.**
60-second brief → hosted, mobile-first proposal your client actually opens.

Living MVP scope: one input (client brief), one output (a `/r/[slug]` page
that previews beautifully on Viber). The strategy doc that shaped this scope
lives at the root of the repo — read that before adding features.

---

## What's shipped in this starter

| Piece | Status |
|---|---|
| Landing page (`/`) | ✅ |
| Public proposal page (`/r/[slug]`) using demo data | ✅ — the whole reason this exists |
| Interactive payment calculator (the killer feature) | ✅ |
| Native share sheet + Viber / WhatsApp / email fallbacks | ✅ |
| Rich Open Graph metadata for Viber link previews | ✅ |
| Anthropic API endpoint (`POST /api/proposals/generate`) with prompt caching | ✅ |
| Supabase schema (`supabase/migrations/001_init.sql`) with RLS on every table | ✅ |
| Agent dashboard (`/dashboard`) | 🟡 placeholder |
| Supabase auth + inventory CRUD + proposal history | ⏭️ next sprint |
| Analytics ping to agent when client opens proposal | ⏭️ next sprint |
| Voice-memo → structured brief (Whisper) | ⏭️ next sprint |

---

## Run it

```bash
cd prima
npm install
cp .env.example .env.local     # add ANTHROPIC_API_KEY at minimum
npm run dev
```

Open:
- `http://localhost:3001` — landing
- `http://localhost:3001/r/aXk7q9` — **the proposal experience** (works with demo data, no DB needed)
- `http://localhost:3001/dashboard` — agent studio placeholder

---

## Try the AI endpoint

```bash
curl -X POST http://localhost:3001/api/proposals/generate \
  -H 'Content-Type: application/json' \
  -d '{
    "brief": {
      "name": "Ana",
      "budgetInPhp": 40000000,
      "useCase": "family",
      "locationPref": "Quezon City",
      "bedroomsWanted": 3,
      "notes": "Wants greenery and long-term value, not in a rush."
    },
    "properties": [ /* see src/data/demo.ts for the full shape */ ]
  }'
```

Returns `{ copy: GeneratedProposalCopy, usage }` — the same shape used by
`/r/[slug]`. The system prompt is cached with `cache_control: ephemeral`,
so subsequent calls in the same 5-minute window pay ~30% of the tokens.

---

## Wire up Supabase (next step)

1. Create a project at supabase.com — free tier is enough for MVP.
2. Copy the URL + anon key + service-role key into `.env.local`.
3. In Supabase Studio → SQL Editor, run `supabase/migrations/001_init.sql`.
4. Add a `lib/supabase.ts` client (server + browser variants using `@supabase/ssr`).
5. Replace the `loadProposal` stub in `src/app/r/[slug]/page.tsx` with a real query.

RLS policies are already correct — the public proposal page reads via the
anon key using the `slug` predicate, and every agent-owned table is scoped
to `agent_id = auth.uid()`.

---

## Model

Pinned in `src/lib/anthropic.ts` — `claude-sonnet-5`. Bump this file when a
newer Sonnet ships; nothing else references the model name.

---

## Deploy

Vercel + Supabase, both free tiers. `NEXT_PUBLIC_APP_URL` needs to be the
production URL so Open Graph absolute URLs render correctly in Viber previews.

---

## What deliberately isn't here

Cut from the MVP per the strategy doc:

- Developer Google Drive ingestion
- Automatic version detection on price lists
- AI property matching / ranking (agent picks manually)
- Automated Viber / Messenger follow-up (regulatory + ToS blocked)
- Team / brokerage tier
- CRM beyond a client + brief list

Each of these is on the roadmap — none of them belong in v1.
