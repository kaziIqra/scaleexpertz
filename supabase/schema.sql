-- Run in Supabase Dashboard > SQL Editor
-- Table used by app/api/diagnosis (insert) and app/api/admin/leads (select/delete)

create extension if not exists pgcrypto;

create table if not exists public.founder_growth_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  work_email text,
  company_name text not null,
  website text,
  monthly_revenue_range text not null,
  team_size text not null,
  biggest_challenge text not null,
  whatsapp_number text not null
);

create index if not exists founder_growth_leads_created_at_idx
  on public.founder_growth_leads (created_at desc);

-- Lock table down. Server routes use the service role key, which bypasses RLS.
-- Anon/public clients get no access.
alter table public.founder_growth_leads enable row level security;
