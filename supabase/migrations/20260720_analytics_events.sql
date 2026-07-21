-- Melo first-party analytics: insert-only event-tabel.
-- Klienter (anon + authenticated) kan KUN indsætte — aldrig læse.
-- Læsning sker via Supabase Dashboard / service role.
-- Ingen PII gemmes: kun eventnavn, små strukturelle props og pseudonyme id'er.

create table if not exists public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  event text not null,
  props jsonb not null default '{}'::jsonb,
  device_id text,
  session_id text,
  user_id uuid references auth.users (id) on delete set null,
  platform text,
  created_at timestamptz not null default now()
);

alter table public.analytics_events enable row level security;

-- Insert-only for alle klienter (onboarding-events sker FØR konto-oprettelse,
-- derfor skal anon også kunne indsætte).
drop policy if exists "analytics insert" on public.analytics_events;
create policy "analytics insert"
  on public.analytics_events
  for insert
  to anon, authenticated
  with check (true);

-- Ingen select/update/delete-policies: klienter kan ikke læse events.

create index if not exists analytics_events_event_created_idx
  on public.analytics_events (event, created_at desc);
create index if not exists analytics_events_created_idx
  on public.analytics_events (created_at desc);
create index if not exists analytics_events_session_idx
  on public.analytics_events (session_id, created_at);
