create table profiles (
  id uuid references auth.users not null primary key,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  is_admin boolean default false
);

-- Set up Row Level Security (RLS)
alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);

-- This trigger automatically creates a profile entry when a new user signs up via Supabase Auth.
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id)
  values (new.id);
  return new;
end;
$$ language plpgsql security definer;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create table registrations (
  id bigint primary key generated always as identity,
  user_id uuid references auth.users ON DELETE CASCADE,
  jalur_pendaftaran text,
  jalur_beasiswa text,
  jalur_beasiswa_prestasi text,
  jalur_beasiswa_khusus text,
  nama_lengkap text,
  tempat_lahir text,
  tanggal_lahir text,
  jenis_kelamin text,
  asal_sekolah text,
  nama_ayah text,
  nomor_hp_ayah text,
  nama_ibu text,
  nomor_hp_ibu text,
  alamat text,
  provinsi text,
  kabupaten text,
  kecamatan text,
  desa text,
  kodepos text,
  pembayaran_diterima boolean default false,
  status_pendaftaran text default 'pending',
  nilai_tahsin text,
  nilai_akademik text,
  nilai_pesantren text,
  syarat_penerimaan text,
  catatan_internal text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Set up Row Level Security (RLS)
alter table registrations enable row level security;

create policy "Registrations are viewable by user." on registrations
  for select using (auth.uid() = user_id);

create policy "Users can insert their own registration." on registrations
  for insert with check (auth.uid() = user_id);

create policy "Users can update own registration." on registrations
  for update using (auth.uid() = user_id);

create table proofs (
  id bigint primary key generated always as identity,
  user_id uuid references auth.users on delete cascade,
  registration_id bigint references registrations on delete cascade,
  fileName text
);

insert into storage.buckets (id, name) values ('proofs', 'proofs');
insert into storage.buckets (id, name) values ('cards', 'cards');