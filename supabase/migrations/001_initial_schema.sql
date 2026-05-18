-- AvalonReach initial public-client schema.
-- Run manually in Supabase SQL Editor when ready.
--
-- Security posture for Week 2 MVP:
-- - The app uses ONLY NEXT_PUBLIC_SUPABASE_URL + NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.
-- - No service role key, secret key, or database password is required for app runtime.
-- - Anonymous inserts are allowed for lead/search capture only.
-- - Anonymous reads are allowed only for active public provider/plan catalog rows.

create extension if not exists pgcrypto;

create table if not exists public.providers (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  website_url text,
  support_notes text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.plans (
  id uuid primary key default gen_random_uuid(),
  provider_id uuid references public.providers(id) on delete set null,
  slug text not null unique,
  name text not null,
  technology text not null,
  transport_type text not null default 'unknown',
  max_download_mbps integer not null default 0,
  max_upload_mbps integer not null default 0,
  estimated_monthly_price numeric(8,2),
  estimated_latency_ms integer,
  contract_required boolean not null default false,
  referral_url text,
  availability_notes text,
  source text not null default 'manual',
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.search_areas (
  id uuid primary key default gen_random_uuid(),
  input text not null,
  normalized_label text,
  zip text,
  city text,
  state text,
  lat numeric,
  lng numeric,
  source text not null default 'unknown',
  created_at timestamptz not null default now()
);

create table if not exists public.recommendations (
  id uuid primary key default gen_random_uuid(),
  search_area_id uuid references public.search_areas(id) on delete set null,
  priority text not null default 'best-value',
  recommended_plan_id text,
  ranked_plan_ids text[],
  explanation text,
  source text not null default 'unknown',
  created_at timestamptz not null default now()
);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  location_hint text,
  intent text not null default 'results',
  consent boolean not null default false,
  source text,
  created_at timestamptz not null default now()
);

-- Legacy/search-event table kept so the existing MVP flow and dashboard notes do not break.
create table if not exists public.searches (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  email text,
  address_label text not null,
  lat numeric,
  lng numeric,
  priority text not null default 'best-value',
  raw_provider_count integer,
  data_source text not null default 'unknown',
  created_at timestamptz not null default now()
);

create table if not exists public.provider_links (
  id uuid primary key default gen_random_uuid(),
  provider_name text not null,
  provider_slug text,
  market text,
  referral_url text not null,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists providers_slug_idx on public.providers (slug);
create index if not exists plans_provider_id_idx on public.plans (provider_id);
create index if not exists plans_slug_idx on public.plans (slug);
create index if not exists plans_active_idx on public.plans (active);
create index if not exists search_areas_created_at_idx on public.search_areas (created_at desc);
create index if not exists recommendations_created_at_idx on public.recommendations (created_at desc);
create index if not exists leads_email_idx on public.leads (email);
create index if not exists searches_created_at_idx on public.searches (created_at desc);
create index if not exists provider_links_slug_idx on public.provider_links (provider_slug);

alter table public.providers enable row level security;
alter table public.plans enable row level security;
alter table public.search_areas enable row level security;
alter table public.recommendations enable row level security;
alter table public.leads enable row level security;
alter table public.searches enable row level security;
alter table public.provider_links enable row level security;

-- Public catalog reads. Users can see active providers/plans and referral links.
drop policy if exists "public read active providers" on public.providers;
create policy "public read active providers"
  on public.providers for select
  to anon, authenticated
  using (active = true);

drop policy if exists "public read active plans" on public.plans;
create policy "public read active plans"
  on public.plans for select
  to anon, authenticated
  using (active = true);

drop policy if exists "public read active provider links" on public.provider_links;
create policy "public read active provider links"
  on public.provider_links for select
  to anon, authenticated
  using (active = true);

-- Public write-only capture. The anon client can submit rows, but cannot read them back.
drop policy if exists "public insert leads" on public.leads;
create policy "public insert leads"
  on public.leads for insert
  to anon, authenticated
  with check (consent = true and email <> '');

drop policy if exists "public insert search areas" on public.search_areas;
create policy "public insert search areas"
  on public.search_areas for insert
  to anon, authenticated
  with check (input <> '');

drop policy if exists "public insert recommendations" on public.recommendations;
create policy "public insert recommendations"
  on public.recommendations for insert
  to anon, authenticated
  with check (priority <> '');

drop policy if exists "public insert searches" on public.searches;
create policy "public insert searches"
  on public.searches for insert
  to anon, authenticated
  with check (address_label <> '');

-- TODO(Alex/manual admin): seed real provider and plan rows after product direction is settled.
-- TODO(Alex/manual admin): add private owner/admin read policies when auth/dashboard scope is approved.
-- TODO(Alex/manual admin): consider moving writes behind server-side validation if abuse/spam appears.
