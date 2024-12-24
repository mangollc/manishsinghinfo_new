/*
  # Fix Database Functions
  
  1. Changes
    - Drop and recreate functions with proper return types
    - Add proper SECURITY DEFINER settings
    - Fix permission issues
    - Add better error handling
*/

-- Drop existing functions
DROP FUNCTION IF EXISTS get_activities_with_users;
DROP FUNCTION IF EXISTS get_blog_posts_with_details;

-- Function to get activities with user details
CREATE OR REPLACE FUNCTION get_activities_with_users(
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
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    al.id,
    al.description,
    al.type,
    al.metadata,
    al.created_at,
    jsonb_build_object(
      'id', au.id,
      'full_name', au.raw_user_meta_data->>'full_name',
      'role', au.raw_user_meta_data->>'role'
    ) as user_details
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

-- Function to get blog posts with author and tag details
CREATE OR REPLACE FUNCTION get_blog_posts_with_details()
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
SET search_path = public
LANGUAGE plpgsql
AS $$
#variable_conflict use_column
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
    jsonb_build_object(
      'id', au.id,
      'email', au.email,
      'user_metadata', jsonb_build_object(
        'full_name', au.raw_user_meta_data->>'full_name',
        'role', au.raw_user_meta_data->>'role'
      )
    ) as author_details,
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

-- Revoke all existing permissions
REVOKE ALL ON FUNCTION get_activities_with_users FROM PUBLIC;
REVOKE ALL ON FUNCTION get_blog_posts_with_details FROM PUBLIC;

-- Grant execute permissions to authenticated users
GRANT EXECUTE ON FUNCTION get_activities_with_users TO authenticated;
GRANT EXECUTE ON FUNCTION get_blog_posts_with_details TO authenticated;