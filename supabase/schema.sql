create extension if not exists "pgcrypto";

do $$
begin
  create type public.lead_status as enum (
    'new',
    'contacted',
    'quoted',
    'won',
    'lost'
  );
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type public.lead_priority as enum (
    'low',
    'normal',
    'high'
  );
exception
  when duplicate_object then null;
end $$;

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  business_type text not null,
  website_url text,
  needed_service text not null,
  budget_range text not null,
  timeline text not null,
  message text,
  status public.lead_status not null default 'new',
  source text not null default 'quote_form',
  admin_notes text,
  priority public.lead_priority not null default 'normal',
  follow_up_date date,
  estimated_value numeric(12, 2),
  created_at timestamptz not null default now(),
  updated_at timestamptz
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx on public.leads (status);
create index if not exists leads_priority_idx on public.leads (priority);
create index if not exists leads_source_idx on public.leads (source);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_leads_updated_at on public.leads;

create trigger set_leads_updated_at
before update on public.leads
for each row
execute function public.set_updated_at();

alter table public.leads enable row level security;
