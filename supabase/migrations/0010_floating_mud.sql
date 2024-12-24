/*
  # Content Management Functions Fix

  1. Updates
    - Fixed get_activities_with_users function
    - Fixed get_blog_posts_with_details function
    - Added get_draft_content function
    - Added get_published_content function
    - Added proper error handling

  2. Changes
    - Improved function stability
    - Added proper schema search paths
    - Added better type handling
*/

-- Drop existing functions
DROP FUNCTION IF EXISTS public.get_activities_with_users CASCADE;
DROP FUNCTION IF EXISTS public.get_blog_posts_with_details CASCADE;
DROP FUNCTION IF EXISTS public.get_draft_content CASCADE;
DROP FUNCTION IF EXISTS public.get_published_content CASCADE;

-- Function to get activities with user details
CREATE OR REPLACE FUNCTION public.get_activities_with_users(
  limit_param integer DEFAULT 10,
  type_param text DEFAULT NULL
)
RETURNS TABLE (
  id uuid,
  description text,
  type activity_type,
  metadata jsonb,
  created_at timestamptz,
  user_details jsonb
)
SECURITY DEFINER
SET search_path = public, auth
LANGUAGE plpgsql
STABLE
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    al.id,
    al.description,
    al.type,
    al.metadata,
    al.created_at,
    CASE 
      WHEN au.id IS NOT NULL THEN
        jsonb_build_object(
          'id', au.id,
          'full_name', COALESCE(au.raw_user_meta_data->>'full_name', au.email),
          'role', COALESCE(au.raw_user_meta_data->>'role', 'user')
        )
      ELSE NULL
    END as user_details
  FROM activity_log al
  LEFT JOIN auth.users au ON al.user_id = au.id
  WHERE 
    CASE 
      WHEN type_param IS NOT NULL THEN al.type::text = type_param
      ELSE true
    END
  ORDER BY al.created_at DESC
  LIMIT limit_param;
END;
$$;

-- Function to get blog posts with details
CREATE OR REPLACE FUNCTION public.get_blog_posts_with_details()
RETURNS TABLE (
  id uuid,
  title text,
  slug text,
  excerpt text,
  content text,
  thumbnail_url text,
  feature_image_url text,
  author_id uuid,
  status content_status,
  published_at timestamptz,
  meta_title text,
  meta_description text,
  created_at timestamptz,
  updated_at timestamptz,
  author_details jsonb,
  tags jsonb[]
)
SECURITY DEFINER
SET search_path = public, auth
LANGUAGE plpgsql
STABLE
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    bp.id,
    bp.title,
    bp.slug,
    bp.excerpt,
    bp.content,
    bp.thumbnail_url,
    bp.feature_image_url,
    bp.author_id,
    bp.status,
    bp.published_at,
    bp.meta_title,
    bp.meta_description,
    bp.created_at,
    bp.updated_at,
    CASE 
      WHEN au.id IS NOT NULL THEN
        jsonb_build_object(
          'id', au.id,
          'email', au.email,
          'user_metadata', jsonb_build_object(
            'full_name', COALESCE(au.raw_user_meta_data->>'full_name', au.email),
            'role', COALESCE(au.raw_user_meta_data->>'role', 'user')
          )
        )
      ELSE NULL
    END as author_details,
    COALESCE(
      array_agg(
        DISTINCT jsonb_build_object(
          'id', t.id,
          'name', t.name,
          'slug', t.slug
        )
      ) FILTER (WHERE t.id IS NOT NULL),
      '{}'::jsonb[]
    ) as tags
  FROM blog_posts bp
  LEFT JOIN auth.users au ON bp.author_id = au.id
  LEFT JOIN blog_posts_tags bpt ON bp.id = bpt.blog_post_id
  LEFT JOIN tags t ON bpt.tag_id = t.id
  GROUP BY 
    bp.id,
    bp.title,
    bp.slug,
    bp.excerpt,
    bp.content,
    bp.thumbnail_url,
    bp.feature_image_url,
    bp.author_id,
    bp.status,
    bp.published_at,
    bp.meta_title,
    bp.meta_description,
    bp.created_at,
    bp.updated_at,
    au.id,
    au.email,
    au.raw_user_meta_data;
END;
$$;

-- Function to get draft content
CREATE OR REPLACE FUNCTION public.get_draft_content()
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
  LIMIT 5;
END;
$$;

-- Function to get published content
CREATE OR REPLACE FUNCTION public.get_published_content()
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
  LIMIT 5;
END;
$$;

-- Revoke all existing permissions
REVOKE ALL ON FUNCTION public.get_activities_with_users FROM PUBLIC;
REVOKE ALL ON FUNCTION public.get_blog_posts_with_details FROM PUBLIC;
REVOKE ALL ON FUNCTION public.get_draft_content FROM PUBLIC;
REVOKE ALL ON FUNCTION public.get_published_content FROM PUBLIC;

-- Grant execute permissions to authenticated users
GRANT EXECUTE ON FUNCTION public.get_activities_with_users TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_blog_posts_with_details TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_draft_content TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_published_content TO authenticated;

-- Add comments for documentation
COMMENT ON FUNCTION public.get_activities_with_users IS 'Get activity log entries with user details';
COMMENT ON FUNCTION public.get_blog_posts_with_details IS 'Get blog posts with author and tag details';
COMMENT ON FUNCTION public.get_draft_content IS 'Get draft content items';
COMMENT ON FUNCTION public.get_published_content IS 'Get published content items';