-- One row per user holding their whole app state. Run once in the Supabase SQL editor.
create table if not exists public.progress (
	user_id uuid primary key default auth.uid() references auth.users (id) on delete cascade,
	data jsonb not null check (octet_length(data::text) < 3000000),
	rev bigint not null default 0,
	updated_at timestamptz not null default now()
);

alter table public.progress enable row level security;

-- A signed-in user can read and write only their own row. Nobody else can see anything.
drop policy if exists "own row" on public.progress;
create policy "own row" on public.progress
	for all to authenticated
	using ((select auth.uid()) = user_id)
	with check ((select auth.uid()) = user_id);
