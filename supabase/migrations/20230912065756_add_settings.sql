create table settings (
  id bigint primary key generated always as identity,
  created_at timestamptz default now(),
  type text,
  value text
);

alter table settings enable row level security;

create policy "Settings are viewable by everyone." on settings
  for select using (true);

create policy "User can insert settings." on settings
  for insert with check (auth.jwt() ->> 'email' = 'admin@utama.app');

create policy "Admin can update settings." on settings
  for update using (auth.jwt() ->> 'email' = 'admin@utama.app');

create policy "Admin can delete settings." on settings
  for delete using (auth.jwt() ->> 'email' = 'admin@utama.app');

insert into
public.settings (type, value)
values
('pendaftaran_buka', 'false'),
('mulai_pendaftaran', '2023-08-15'),
('akhir_pendaftaran', '2023-09-15');