
-- Create storage buckets for different content types
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('blog-images', 'Blog Images', true),
  ('product-images', 'Product Images', true),
  ('page-images', 'Page Images', true),
  ('featured-images', 'Featured Images', true);

-- Set up storage policies for authenticated users
CREATE POLICY "Authenticated users can upload images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id IN ('blog-images', 'product-images', 'page-images', 'featured-images'));

CREATE POLICY "Anyone can view public images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id IN ('blog-images', 'product-images', 'page-images', 'featured-images'));

CREATE POLICY "Authenticated users can delete own images"
ON storage.objects
FOR DELETE
TO authenticated
USING (auth.uid() = owner);
