create table
admins (
id bigint primary key generated always as identity,
name text,
email text,
phone text,
created_at timestamptz default now(),
updated_at timestamptz default now()
);
