drop policy "Registrations are viewable by user." on "public"."registrations";

drop policy "Users can insert their own registration." on "public"."registrations";

create policy "Authenticated users can insert their own registration."
on "public"."registrations"
as permissive
for insert
to authenticated
with check ((auth.uid() = user_id));


create policy "Registrations are viewable by authenticated user"
on "public"."registrations"
as permissive
for select
to authenticated
using (true);



