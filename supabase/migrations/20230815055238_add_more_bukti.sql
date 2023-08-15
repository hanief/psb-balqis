alter table if exists public.registrations add bukti_dhuafa text;
alter table if exists public.registrations add bukti_yatim text;
alter table if exists public.registrations add bukti_pembayaran text;

CREATE POLICY "Give users authenticated select access to folder prestasi, dhuafa, yatim, pembayaran" 
ON storage.objects 
FOR SELECT 
TO public 
USING (bucket_id = 'proofs' 
  AND ((storage.foldername(name))[1] = 'prestasi' 
    OR (storage.foldername(name))[1] = 'dhuafa'
    OR (storage.foldername(name))[1] = 'yatim' 
    OR (storage.foldername(name))[1] = 'pembayaran') 
  AND auth.role() = 'authenticated');

CREATE POLICY "Give users authenticated insert access to folder prestasi, dhuafa, yatim, pembayaran" 
ON storage.objects 
FOR INSERT 
TO public 
WITH CHECK (bucket_id = 'proofs' 
  AND ((storage.foldername(name))[1] = 'prestasi' 
    OR (storage.foldername(name))[1] = 'dhuafa' 
    OR (storage.foldername(name))[1] = 'yatim' 
    OR (storage.foldername(name))[1] = 'pembayaran') 
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Give users authenticated update access to folder prestasi, dhuafa, yatim, pembayaran" 
ON storage.objects 
FOR UPDATE 
TO public 
USING (bucket_id = 'proofs' 
  AND ((storage.foldername(name))[1] = 'prestasi' 
    OR (storage.foldername(name))[1] = 'dhuafa' 
    OR (storage.foldername(name))[1] = 'yatim' 
    OR (storage.foldername(name))[1] = 'pembayaran') 
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Give users authenticated delete access to folder prestasi, dhuafa, yatim, pembayaran" 
ON storage.objects 
FOR DELETE 
TO public 
USING (bucket_id = 'proofs' 
  AND ((storage.foldername(name))[1] = 'prestasi' 
    OR (storage.foldername(name))[1] = 'dhuafa' 
    OR (storage.foldername(name))[1] = 'yatim' 
    OR (storage.foldername(name))[1] = 'pembayaran') 
  AND auth.role() = 'authenticated'
);



