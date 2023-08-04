create table
registrations (
  id bigint primary key generated always as identity,
  registree_id bigint,
  jalur_pendaftaran text,
  jalur_beasiswa text,
  jalur_beasiswa_prestasi text,
  jalur_beasiswa_khusus text,
  nama_lengkap text,
  nomor_handphone text,
  tempat_lahir text,
  tanggal_lahir text,
  jenis_elamin text,
  asal_sekolah text,
  nama_ayah text,
  nomor_hp_ayah text,
  nama_ibu text,
  nomor_hp_ibu text,
  nama_wali text,
  nomor_hp_wali text,
  alamat text,
  provinsi text,
  kabupaten text,
  kecamatan text,
  desa text,
  kodepos text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table 
proofs (
  id bigint primary key generated always as identity,
  registree_id bigint,
  registration_id bigint,
  fileName text
)