
-- Drop existing tables and types
DROP TABLE IF EXISTS public.blog_posts_tags CASCADE;
DROP TABLE IF EXISTS public.products_tags CASCADE;
DROP TABLE IF EXISTS public.blog_posts CASCADE;
DROP TABLE IF EXISTS public.products CASCADE;
DROP TABLE IF EXISTS public.featured_cards CASCADE;
DROP TABLE IF EXISTS public.information_pages CASCADE;
DROP TABLE IF EXISTS public.activity_log CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;
DROP TABLE IF EXISTS public.tags CASCADE;
DROP TYPE IF EXISTS public.content_status CASCADE;
DROP TYPE IF EXISTS public.activity_type CASCADE;

-- Drop existing storage buckets
DELETE FROM storage.buckets WHERE id IN (
  'blog-images',
  'product-images',
  'page-images',
  'featured-images'
);

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create types
CREATE TYPE public.content_status AS ENUM ('draft', 'published', 'archived');
CREATE TYPE public.activity_type AS ENUM ('auth', 'content', 'system');

-- Create tables
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  role TEXT NOT NULL CHECK (role IN ('admin', 'editor', 'author')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT,
  thumbnail_url TEXT,
  feature_image_url TEXT,
  author_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status content_status DEFAULT 'draft',
  published_at TIMESTAMPTZ,
  meta_title TEXT,
  meta_description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.blog_posts_tags (
  blog_post_id UUID REFERENCES public.blog_posts(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES public.tags(id) ON DELETE CASCADE,
  PRIMARY KEY (blog_post_id, tag_id)
);

CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  short_description TEXT,
  detailed_description TEXT,
  thumbnail_url TEXT,
  gallery_urls TEXT[],
  regular_price NUMERIC(10,2) NOT NULL,
  discounted_price NUMERIC(10,2),
  features TEXT[],
  status content_status DEFAULT 'draft',
  meta_title TEXT,
  meta_description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.products_tags (
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES public.tags(id) ON DELETE CASCADE,
  PRIMARY KEY (product_id, tag_id)
);

CREATE TABLE public.featured_cards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  cta_text TEXT,
  cta_link TEXT,
  display_order INTEGER,
  status content_status DEFAULT 'draft',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.information_pages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT,
  banner_image_url TEXT,
  sections JSONB,
  status content_status DEFAULT 'draft',
  meta_title TEXT,
  meta_description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.activity_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  type activity_type NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('blog-images', 'Blog Images', true),
  ('product-images', 'Product Images', true),
  ('page-images', 'Page Images', true),
  ('featured-images', 'Featured Images', true);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.featured_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.information_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can read own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id OR auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id OR auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.uid() = id OR auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Anyone can read published posts"
  ON public.blog_posts FOR SELECT
  USING (status = 'published' OR auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Authors can manage own posts"
  ON public.blog_posts FOR ALL
  USING (author_id = auth.uid() OR auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (author_id = auth.uid() OR auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Anyone can read published products"
  ON public.products FOR SELECT
  USING (status = 'published' OR auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admins can manage products"
  ON public.products FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

-- Storage policies
CREATE POLICY "Authenticated users can upload images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id IN ('blog-images', 'product-images', 'page-images', 'featured-images'));

CREATE POLICY "Anyone can view public images"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id IN ('blog-images', 'product-images', 'page-images', 'featured-images'));

CREATE POLICY "Authenticated users can delete own images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (auth.uid() = owner);

-- Create helper functions
CREATE OR REPLACE FUNCTION public.get_content_overview()
RETURNS TABLE (
  id uuid,
  title text,
  type text,
  status content_status,
  updated_at timestamptz,
  author_details jsonb
)
SECURITY DEFINER
SET search_path = public, auth
LANGUAGE plpgsql
STABLE
AS $$
BEGIN
  RETURN QUERY
  (
    SELECT 
      bp.id,
      bp.title,
      'blog'::text as type,
      bp.status,
      bp.updated_at,
      jsonb_build_object(
        'id', au.id,
        'full_name', COALESCE(au.raw_user_meta_data->>'full_name', au.email)
      ) as author_details
    FROM blog_posts bp
    LEFT JOIN auth.users au ON bp.author_id = au.id
  )
  UNION ALL
  (
    SELECT 
      p.id,
      p.name as title,
      'product'::text as type,
      p.status,
      p.updated_at,
      NULL::jsonb as author_details
    FROM products p
  )
  UNION ALL
  (
    SELECT 
      ip.id,
      ip.title,
      'page'::text as type,
      ip.status,
      ip.updated_at,
      NULL::jsonb as author_details
    FROM information_pages ip
  )
  ORDER BY updated_at DESC;
END;
$$;

-- Grant permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO authenticated;
