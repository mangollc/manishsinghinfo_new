-- Complete Database Schema

-- Drop existing tables if they exist
DROP TABLE IF EXISTS public.blog_posts_tags CASCADE;
DROP TABLE IF EXISTS public.products_tags CASCADE;
DROP TABLE IF EXISTS public.blog_posts CASCADE;
DROP TABLE IF EXISTS public.products CASCADE;
DROP TABLE IF EXISTS public.featured_cards CASCADE;
DROP TABLE IF EXISTS public.information_pages CASCADE;
DROP TABLE IF EXISTS public.activity_log CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;
DROP TABLE IF EXISTS public.tags CASCADE;

-- Drop existing types if they exist
DROP TYPE IF EXISTS public.content_status CASCADE;
DROP TYPE IF EXISTS public.activity_type CASCADE;

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create content status enum
CREATE TYPE public.content_status AS ENUM ('draft', 'published', 'archived');

-- Create activity type enum
CREATE TYPE public.activity_type AS ENUM ('auth', 'content', 'system');

-- Create user profiles table that extends auth.users
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  role TEXT NOT NULL CHECK (role IN ('admin', 'editor', 'author')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Tags Table
CREATE TABLE public.tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;

-- Blog Posts Table
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

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Blog Posts Tags Table (Many-to-Many Relationship)
CREATE TABLE public.blog_posts_tags (
  blog_post_id UUID REFERENCES public.blog_posts(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES public.tags(id) ON DELETE CASCADE,
  PRIMARY KEY (blog_post_id, tag_id)
);

ALTER TABLE public.blog_posts_tags ENABLE ROW LEVEL SECURITY;

-- Products Table
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

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Products Tags Table (Many-to-Many Relationship)
CREATE TABLE public.products_tags (
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES public.tags(id) ON DELETE CASCADE,
  PRIMARY KEY (product_id, tag_id)
);

ALTER TABLE public.products_tags ENABLE ROW LEVEL SECURITY;

-- Featured Cards Table
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

ALTER TABLE public.featured_cards ENABLE ROW LEVEL SECURITY;

-- Information Pages Table
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

ALTER TABLE public.information_pages ENABLE ROW LEVEL SECURITY;

-- Activity Log Table
CREATE TABLE public.activity_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  type activity_type NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;

-- Add Composite Indexes for Performance
CREATE INDEX idx_profiles_role ON public.profiles(role);
CREATE INDEX idx_blog_posts_author ON public.blog_posts(author_id);
CREATE INDEX idx_blog_posts_status ON public.blog_posts(status);
CREATE INDEX idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX idx_products_status ON public.products(status);
CREATE INDEX idx_products_slug ON public.products(slug);
CREATE INDEX idx_featured_cards_status ON public.featured_cards(status);
CREATE INDEX idx_featured_cards_order ON public.featured_cards(display_order);
CREATE INDEX idx_information_pages_status ON public.information_pages(status);
CREATE INDEX idx_information_pages_slug ON public.information_pages(slug);
CREATE INDEX idx_activity_log_user ON public.activity_log(user_id);
CREATE INDEX idx_activity_log_type ON public.activity_log(type);
CREATE INDEX idx_tags_slug ON public.tags(slug);

-- RLS Policies

-- Profiles Policies
CREATE POLICY "Users can read own profile"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id OR auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id OR auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.uid() = id OR auth.jwt() ->> 'role' = 'admin');

-- Blog Posts Policies
CREATE POLICY "Anyone can read published posts"
  ON public.blog_posts
  FOR SELECT
  USING (status = 'published' OR auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Authors can manage own posts"
  ON public.blog_posts
  FOR ALL
  TO authenticated
  USING (author_id = auth.uid() OR auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (author_id = auth.uid() OR auth.jwt() ->> 'role' = 'admin');

-- Products Policies
CREATE POLICY "Anyone can read published products"
  ON public.products
  FOR SELECT
  USING (status = 'published' OR auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admins can manage products"
  ON public.products
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

-- Featured Cards Policies
CREATE POLICY "Anyone can read published cards"
  ON public.featured_cards
  FOR SELECT
  USING (status = 'published' OR auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admins can manage cards"
  ON public.featured_cards
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

-- Information Pages Policies
CREATE POLICY "Anyone can read published pages"
  ON public.information_pages
  FOR SELECT
  USING (status = 'published' OR auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admins can manage pages"
  ON public.information_pages
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

-- Tags Policies
CREATE POLICY "Anyone can read tags"
  ON public.tags
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage tags"
  ON public.tags
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

-- Junction Tables Policies
CREATE POLICY "Anyone can read post tags"
  ON public.blog_posts_tags
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can read product tags"
  ON public.products_tags
  FOR SELECT
  TO authenticated
  USING (true);

-- Activity Log Policies
CREATE POLICY "Admins can read all activities"
  ON public.activity_log
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Users can create own activities"
  ON public.activity_log
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create function to handle updated_at
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.featured_cards
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.information_pages
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();
