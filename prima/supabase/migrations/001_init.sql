-- Prima · MVP schema · 001_init
-- Run with `supabase db reset` (local) or via Supabase Studio SQL editor.
--
-- Design principles:
--   * Row-Level Security on every table. Nothing global.
--   * `agent_id = auth.uid()` is the only ownership check.
--   * `proposals.slug` is unguessable + public via the anon key (that's how
--     the /r/[slug] page loads without a session).
--   * Analytics writes are append-only from the anon key; reads are agent-only.

create extension if not exists "uuid-ossp";

-- ---------- AGENTS (mirrors auth.users) ----------
create table agents (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  name text not null,
  phone text,
  headshot_url text,
  primary_color text default '#B8960C',
  plan text default 'trial' check (plan in ('trial','solo','professional','team')),
  subdomain text unique,
  created_at timestamptz default now()
);
alter table agents enable row level security;
create policy "agent reads self" on agents for select using (id = auth.uid());
create policy "agent updates self" on agents for update using (id = auth.uid());

-- ---------- PROPERTIES (agent's own inventory) ----------
create table properties (
  id uuid primary key default uuid_generate_v4(),
  agent_id uuid not null references agents(id) on delete cascade,
  developer text not null,
  project_name text not null,
  tower text,
  unit_type text not null,
  bedrooms int not null,
  floor_area_sqm numeric not null,
  price_php numeric not null,
  location text not null,
  turnover_date text,
  hero_image_url text,
  gallery_urls text[] default '{}',
  amenities text[] default '{}',
  selling_points text[] default '{}',
  payment_plans jsonb not null default '[]'::jsonb,
  created_at timestamptz default now()
);
alter table properties enable row level security;
create policy "agent owns properties" on properties
  for all using (agent_id = auth.uid());

-- ---------- CLIENTS ----------
create table clients (
  id uuid primary key default uuid_generate_v4(),
  agent_id uuid not null references agents(id) on delete cascade,
  name text not null,
  phone text,
  email text,
  budget_php numeric,
  use_case text check (use_case in ('primary','investment','vacation','family')),
  location_pref text,
  bedrooms_wanted int,
  timeline text,
  notes text,
  consent_given_at timestamptz,  -- PH Data Privacy Act (RA 10173)
  created_at timestamptz default now()
);
alter table clients enable row level security;
create policy "agent owns clients" on clients
  for all using (agent_id = auth.uid());

-- ---------- BRIEFS (a client × a moment) ----------
create table briefs (
  id uuid primary key default uuid_generate_v4(),
  agent_id uuid not null references agents(id) on delete cascade,
  client_id uuid not null references clients(id) on delete cascade,
  budget_php numeric,
  use_case text,
  location_pref text,
  bedrooms_wanted int,
  timeline text,
  notes text,
  voice_memo_url text,
  transcript text,
  created_at timestamptz default now()
);
alter table briefs enable row level security;
create policy "agent owns briefs" on briefs
  for all using (agent_id = auth.uid());

-- ---------- PROPOSALS ----------
create table proposals (
  id uuid primary key default uuid_generate_v4(),
  agent_id uuid not null references agents(id) on delete cascade,
  brief_id uuid not null references briefs(id) on delete cascade,
  slug text not null unique,
  property_ids uuid[] not null,
  copy jsonb not null,              -- GeneratedProposalCopy
  is_public boolean default true,
  created_at timestamptz default now()
);
alter table proposals enable row level security;
-- Agents can read/write their own.
create policy "agent owns proposals" on proposals
  for all using (agent_id = auth.uid());
-- Public read via slug — no session needed for the /r/[slug] page.
create policy "public reads by slug" on proposals
  for select using (is_public = true);

-- ---------- PROPOSAL VIEWS (analytics) ----------
create table proposal_views (
  id uuid primary key default uuid_generate_v4(),
  proposal_id uuid not null references proposals(id) on delete cascade,
  opened_at timestamptz default now(),
  session_duration_ms int,
  sections_viewed text[] default '{}',
  viewer_ua text,
  viewer_country text
);
alter table proposal_views enable row level security;
-- Anon-key inserts allowed so the public page can log views.
create policy "public can insert views" on proposal_views
  for insert with check (true);
-- Only the owning agent can read.
create policy "agent reads own view stats" on proposal_views
  for select using (
    exists (
      select 1 from proposals p
      where p.id = proposal_views.proposal_id and p.agent_id = auth.uid()
    )
  );

-- ---------- Helpful indexes ----------
create index on properties (agent_id);
create index on clients (agent_id);
create index on briefs (agent_id, client_id);
create index on proposals (agent_id, created_at desc);
create index on proposals (slug);
create index on proposal_views (proposal_id, opened_at desc);
