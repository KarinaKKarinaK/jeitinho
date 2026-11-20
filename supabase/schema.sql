-- One row per user and language, holding that language's whole app state. Run once in the Supabase SQL editor.
create table if not exists public.progress (
	user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
	lang text not null default 'pt' check (lang ~ '^[a-z]{2}$'),
	data jsonb not null check (octet_length(data::text) < 3000000),
	rev bigint not null default 0,
	updated_at timestamptz not null default now(),
	primary key (user_id, lang)
);

alter table public.progress enable row level security;

-- A signed-in user can read and write only their own rows. Nobody else can see anything.
drop policy if exists "own row" on public.progress;
create policy "own row" on public.progress
	for all to authenticated
	using ((select auth.uid()) = user_id)
	with check ((select auth.uid()) = user_id);

-- Photos of lesson notes: a private bucket, one folder per user (notes/<user id>/<file>.jpg).
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('notes', 'notes', false, 2097152, array['image/jpeg'])
on conflict (id) do nothing;

drop policy if exists "own notes" on storage.objects;
create policy "own notes" on storage.objects
	for all to authenticated
	using (bucket_id = 'notes' and (storage.foldername(name))[1] = (select auth.uid())::text)
	with check (bucket_id = 'notes' and (storage.foldername(name))[1] = (select auth.uid())::text);

-- Daily reminders: one row per browser that asked for them. No policies, so only the server
-- (service role) can read or write it. hour is in UTC.
create table if not exists public.push_subs (
	endpoint text primary key check (length(endpoint) < 1100),
	hour smallint not null check (hour between 0 and 23),
	created_at timestamptz not null default now()
);
alter table public.push_subs enable row level security;

-- To send them, schedule an hourly call to the app (run once, with your own URL and CRON_SECRET):
--   create extension if not exists pg_cron; create extension if not exists pg_net;
--   select cron.schedule('jeitinho-reminders', '0 * * * *',
--     $$ select net.http_post(url := 'https://YOUR-URL/api/push', headers := '{"x-cron":"YOUR_CRON_SECRET"}'::jsonb) $$);

-- Questions that learners flagged as wrong. No user id, no personal data. No policies: only the server writes,
-- and you read them in the Supabase table view.
create table if not exists public.reports (
	id bigint generated always as identity primary key,
	lang text not null,
	source text not null default '',
	prompt text not null,
	answer text not null default '',
	given text not null default '',
	note text not null default '',
	created_at timestamptz not null default now()
);
alter table public.reports enable row level security;
