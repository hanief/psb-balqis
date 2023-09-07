create table contents (
  id bigint primary key generated always as identity,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  slug text,
  content text,
  type text,
  title text
);

alter table contents enable row level security;

create policy "Contents are viewable by everyone." on contents
  for select using (true);

create policy "Admin can insert contents." on contents
  for insert with check (auth.jwt() ->> 'email' = 'admin@utama.app');

create policy "Admin can update contents." on contents
  for update using (auth.jwt() ->> 'email' = 'admin@utama.app');