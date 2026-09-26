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

-- ---------------------------------------------------------------------------
-- Client audits (admin-generated Growth Audit PDFs)
-- Templates live in code (lib/audits/templates). Each audit stores a snapshot
-- of the template pages so later template edits do not change existing docs.
-- ---------------------------------------------------------------------------

create table if not exists public.client_audits (
  id uuid primary key default gen_random_uuid(),
  template_slug text not null,
  template_version int not null default 1,
  client_name text not null,
  company text not null,
  industry text,
  placeholder_values jsonb not null default '{}'::jsonb,
  sections jsonb not null,            -- AuditPage[] snapshot, {{tokens}} intact
  status text not null default 'draft' check (status in ('draft', 'final')),
  pdf_path text,
  version int not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists client_audits_updated_at_idx
  on public.client_audits (updated_at desc);

alter table public.client_audits enable row level security;

-- Private bucket for generated PDFs. Server routes use the service role key,
-- downloads go through short-lived signed URLs.
insert into storage.buckets (id, name, public)
values ('audits', 'audits', false)
on conflict (id) do nothing;

-- ---------------------------------------------------------------------------
-- Custom audit templates created by admins in the panel.
-- Code templates (lib/audits/templates) stay read-only; custom ones live here
-- and share the same slug namespace.
-- ---------------------------------------------------------------------------

create table if not exists public.audit_templates (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text not null default '',
  doc_title text not null default '{{industry}} Growth Blueprint',
  placeholders jsonb not null default '[]'::jsonb,   -- PlaceholderDef[]
  derived jsonb not null default '[]'::jsonb,        -- DerivedRule[]
  pages jsonb not null default '[]'::jsonb,          -- AuditPage[]
  version int not null default 1,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.audit_templates enable row level security;

-- ---------------------------------------------------------------------------
-- Client share links: /share/<token> shows the audit PDF without login.
-- ---------------------------------------------------------------------------

create table if not exists public.audit_shares (
  id uuid primary key default gen_random_uuid(),
  audit_id uuid not null references public.client_audits (id) on delete cascade,
  token text not null unique,
  expires_at timestamptz,
  passcode_hash text,
  revoked boolean not null default false,
  view_count int not null default 0,
  last_viewed_at timestamptz,
  created_by text,
  created_at timestamptz not null default now()
);

create index if not exists audit_shares_audit_id_idx on public.audit_shares (audit_id);

alter table public.audit_shares enable row level security;
