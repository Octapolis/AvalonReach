-- Week 5 saved-results dashboard support.
-- Run manually in Supabase SQL Editor after 001_initial_schema.sql.

create table if not exists public.saved_users (
  id uuid primary key default gen_random_uuid(),
  username text,
  primary_email text,
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.searches
  add column if not exists user_id uuid references public.saved_users(id) on delete set null;

create unique index if not exists saved_users_primary_email_idx on public.saved_users (lower(primary_email)) where primary_email is not null;
create unique index if not exists saved_users_username_idx on public.saved_users (lower(username)) where username is not null;
create index if not exists searches_email_idx on public.searches (email);

alter table public.saved_users enable row level security;

drop policy if exists "public insert saved users" on public.saved_users;
create policy "public insert saved users"
  on public.saved_users for insert
  to anon, authenticated
  with check (primary_email is not null and primary_email <> '');

-- Dashboard lookup intentionally does not add a public select policy.
-- Private reads should go through the server route with SUPABASE_SERVICE_ROLE_KEY.
