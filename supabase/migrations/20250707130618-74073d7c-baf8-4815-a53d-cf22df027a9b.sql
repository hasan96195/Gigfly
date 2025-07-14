-- Create storage bucket for gig images
INSERT INTO storage.buckets (id, name, public) VALUES ('gig-images', 'gig-images', true);

-- Create policies for gig image uploads
CREATE POLICY "Users can upload gig images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'gig-images' AND auth.uid() IS NOT NULL);

CREATE POLICY "Anyone can view gig images" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'gig-images');

CREATE POLICY "Users can update their own gig images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'gig-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own gig images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'gig-images' AND auth.uid()::text = (storage.foldername(name))[1]);