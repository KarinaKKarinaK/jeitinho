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
