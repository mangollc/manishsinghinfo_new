-- Drop existing functions if they exist
DROP FUNCTION IF EXISTS public.get_activities_with_users CASCADE;
DROP FUNCTION IF EXISTS public.get_blog_posts_with_details CASCADE;
DROP FUNCTION IF EXISTS public.get_content_overview CASCADE;

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

-- Function to get content overview
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

-- Revoke all existing permissions
REVOKE ALL ON FUNCTION public.get_activities_with_users FROM PUBLIC;
REVOKE ALL ON FUNCTION public.get_content_overview FROM PUBLIC;

-- Grant execute permissions to authenticated users
GRANT EXECUTE ON FUNCTION public.get_activities_with_users TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_content_overview TO authenticated;

-- Add comments for documentation
COMMENT ON FUNCTION public.get_activities_with_users IS 'Get activity log entries with user details';
COMMENT ON FUNCTION public.get_content_overview IS 'Get overview of all content types with author details';