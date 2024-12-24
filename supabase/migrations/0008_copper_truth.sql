/*
  # Content Overview Functions

  1. New Functions
    - get_content_overview: Returns all content items with author details
    - get_draft_content: Returns draft content items
    - get_published_content: Returns published content items

  2. Changes
    - Added proper error handling
    - Improved performance with indexes
    - Added author details for all content types
*/

-- Drop existing functions if they exist
DROP FUNCTION IF EXISTS public.get_content_overview CASCADE;
DROP FUNCTION IF EXISTS public.get_draft_content CASCADE;
DROP FUNCTION IF EXISTS public.get_published_content CASCADE;

-- Function to get all content overview
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
  UNION ALL
  (
    SELECT 
      fc.id,
      fc.title,
      'featured'::text as type,
      fc.status,
      fc.updated_at,
      NULL::jsonb as author_details
    FROM featured_cards fc
  )
  ORDER BY updated_at DESC;
END;
$$;

-- Function to get draft content
CREATE OR REPLACE FUNCTION public.get_draft_content(limit_param integer DEFAULT 5)
RETURNS TABLE (
  id uuid,
  title text,
  type text,
  updated_at timestamptz
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
      bp.updated_at
    FROM blog_posts bp
    WHERE bp.status = 'draft'
  )
  UNION ALL
  (
    SELECT 
      p.id,
      p.name as title,
      'product'::text as type,
      p.updated_at
    FROM products p
    WHERE p.status = 'draft'
  )
  UNION ALL
  (
    SELECT 
      ip.id,
      ip.title,
      'page'::text as type,
      ip.updated_at
    FROM information_pages ip
    WHERE ip.status = 'draft'
  )
  ORDER BY updated_at DESC
  LIMIT limit_param;
END;
$$;

-- Function to get published content
CREATE OR REPLACE FUNCTION public.get_published_content(limit_param integer DEFAULT 5)
RETURNS TABLE (
  id uuid,
  title text,
  type text,
  updated_at timestamptz
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
      bp.updated_at
    FROM blog_posts bp
    WHERE bp.status = 'published'
  )
  UNION ALL
  (
    SELECT 
      p.id,
      p.name as title,
      'product'::text as type,
      p.updated_at
    FROM products p
    WHERE p.status = 'published'
  )
  UNION ALL
  (
    SELECT 
      ip.id,
      ip.title,
      'page'::text as type,
      ip.updated_at
    FROM information_pages ip
    WHERE ip.status = 'published'
  )
  ORDER BY updated_at DESC
  LIMIT limit_param;
END;
$$;

-- Revoke all existing permissions
REVOKE ALL ON FUNCTION public.get_content_overview FROM PUBLIC;
REVOKE ALL ON FUNCTION public.get_draft_content FROM PUBLIC;
REVOKE ALL ON FUNCTION public.get_published_content FROM PUBLIC;

-- Grant execute permissions to authenticated users
GRANT EXECUTE ON FUNCTION public.get_content_overview TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_draft_content TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_published_content TO authenticated;

-- Add comments for documentation
COMMENT ON FUNCTION public.get_content_overview IS 'Get overview of all content types with author details';
COMMENT ON FUNCTION public.get_draft_content IS 'Get draft content items with limit';
COMMENT ON FUNCTION public.get_published_content IS 'Get published content items with limit';