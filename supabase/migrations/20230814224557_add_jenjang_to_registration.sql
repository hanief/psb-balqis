alter table if exists public.registrations add jenjang text;

create or replace function public.handle_new_user()
returns trigger as $$
begin

  insert into public.profiles (id) values (new.id);

  insert into public.registrations (user_id) values (new.id);

  return new;
end;
$$ language plpgsql security definer;