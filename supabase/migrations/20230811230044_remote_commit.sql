drop policy "Authenticated users can insert their own registration." on "public"."registrations";

drop policy "Registrations are viewable by authenticated user" on "public"."registrations";

alter table "public"."proofs" enable row level security;

create policy "Enable read access for all users"
on "public"."proofs"
as permissive
for select
to public
using (true);


create policy "Registrations are viewable by all user"
on "public"."registrations"
as permissive
for select
to public
using (true);


create policy "Users can insert registration."
on "public"."registrations"
as permissive
for insert
to public
with check (true);



