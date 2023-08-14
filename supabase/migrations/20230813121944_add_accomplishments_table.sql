alter table if exists public.registrations add nama_prestasi text;
alter table if exists public.registrations add tahun_prestasi text;
alter table if exists public.registrations add tingkat_prestasi text;

-- create table accomplishments (
--   id bigint primary key generated always as identity,
--   user_id uuid references auth.users not null,
--   registration_id bigint references public.registrations not null,
--   nama text,
--   tingkat text,
--   tahun text,
--   created_at timestamptz default now(),
--   updated_at timestamptz default now()
-- );

-- alter table accomplishments enable row level security;

-- create policy "Accomplishments are viewable." on accomplishments
--   for select using (true);

-- create policy "Accomplishments can be inserted." on accomplishments
--   for insert with check (true);

-- create policy "Accomplishments can be updated." on accomplishments
--   for update using (true);

-- alter table if exists public.proofs 
-- add accomplishment_id bigint references public.accomplishments;

-- create or replace function public.handle_new_user_again()
-- returns trigger as $$
-- begin

--   insert into public.registrations (user_id)
--   values (new.id);

--   return new;
-- end;
-- $$ language plpgsql security definer;

-- create trigger on_auth_user_created_again
--   after insert on auth.users
--   for each row execute procedure public.handle_new_user_again();

-- create function public.handle_new_registrations()
-- returns trigger as $$
-- begin
--   with accomp AS (
--     insert into public.accomplishments (registration_id, user_id)
--     values (new.id, new.user_id)
--     returning id
--   )
--   insert into public.proofs (registration_id, user_id, accomplishment_id)
--     select registration_id, user_id, id from accomp;

--   return new;
-- end;
-- $$ language plpgsql security definer;

-- create trigger on_registration_created
--   after insert on public.registrations
--   for each row execute procedure public.handle_new_registrations();

