BEGIN;
  ALTER POLICY "Give admin select access to contents slide" 
    ON "storage"."objects" USING (bucket_id = 'contents' AND ((storage.foldername(name))[1] = 'slide'));
  ALTER POLICY "Give admin select access to contents slide" 
    ON "storage"."objects" RENAME TO "Give public select access to contents slide";
COMMIT;