create table contents (
  id bigint primary key generated always as identity,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  deleted_at timestamptz default null,
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

insert into storage.buckets (id, name) values ('contents', 'contents');

CREATE POLICY "Give admin select access to contents slide" 
ON storage.objects 
FOR SELECT 
TO public 
USING (bucket_id = 'contents' 
  AND ((storage.foldername(name))[1] = 'slide') 
  AND auth.jwt() ->> 'email' = 'admin@utama.app');

CREATE POLICY "Give admin insert access to contents slide" 
ON storage.objects 
FOR INSERT 
TO public 
WITH CHECK (bucket_id = 'contents' 
  AND ((storage.foldername(name))[1] = 'slide') 
  AND auth.jwt() ->> 'email' = 'admin@utama.app');

CREATE POLICY "Give admin update access to contents slide" 
ON storage.objects 
FOR UPDATE 
TO public 
USING (bucket_id = 'contents' 
  AND ((storage.foldername(name))[1] = 'slide') 
  AND auth.jwt() ->> 'email' = 'admin@utama.app');

CREATE POLICY "Give admin delete access to contents slide" 
ON storage.objects 
FOR DELETE 
TO public 
USING (bucket_id = 'contents' 
  AND ((storage.foldername(name))[1] = 'slide') 
  AND auth.jwt() ->> 'email' = 'admin@utama.app');