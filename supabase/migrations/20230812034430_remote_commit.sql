drop policy "Users can update own registration." on "public"."registrations";

create policy "Users can update own registration."
on "public"."registrations"
as permissive
for update
to public
using (true)
with check ((auth.uid() = user_id));



