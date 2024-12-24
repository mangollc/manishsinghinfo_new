/*
  # Content Overview Updates

  1. New Functions
    - get_content_overview: Returns all content items with filtering and pagination
    - get_content_stats: Returns content statistics

  2. Changes
    - Added filtering by type and status
    - Added pagination support
    - Added content statistics
*/

-- Function to get content overview with filtering and pagination
CREATE OR REPLACE FUNCTION public.get_content_overview(
  type_filter text DEFAULT NULL,
  status_filter text DEFAULT NULL,
  search_term text DEFAULT NULL,
  page_size integer DEFAULT 10,
  page_number integer DEFAULT 1
)
RETURNS TABLE (
  id uuid,
  title text,
  type text,
  status content_status,
  updated_at timestamptz,
  author_details jsonb,
  total_count bigint
)
SECURITY DEFINER
SET search_path = public, auth
LANGUAGE plpgsql
STABLE
AS $$
DECLARE
  offset_val integer;
BEGIN
  offset_val := (page_number - 1) * page_size;
  
  RETURN QUERY
  WITH filtered_content AS (
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
    WHERE 
      (type_filter IS NULL OR 'blog' = type_filter) AND
      (status_filter IS NULL OR bp.status::text = status_filter) AND
      (search_term IS NULL OR bp.title ILIKE '%' || search_term || '%')
    
    UNION ALL
    
    SELECT 
      p.id,
      p.name as title,
      'product'::text as type,
      p.status,
      p.updated_at,
      NULL::jsonb as author_details
    FROM products p
    WHERE 
      (type_filter IS NULL OR 'product' = type_filter) AND
      (status_filter IS NULL OR p.status::text = status_filter) AND
      (search_term IS NULL OR p.name ILIKE '%' || search_term || '%')
    
    UNION ALL
    
    SELECT 
      ip.id,
      ip.title,
      'page'::text as type,
      ip.status,
      ip.updated_at,
      NULL::jsonb as author_details
    FROM information_pages ip
    WHERE 
      (type_filter IS NULL OR 'page' = type_filter) AND
      (status_filter IS NULL OR ip.status::text = status_filter) AND
      (search_term IS NULL OR ip.title ILIKE '%' || search_term || '%')
    
    UNION ALL
    
    SELECT 
      fc.id,
      fc.title,
      'featured'::text as type,
      fc.status,
      fc.updated_at,
      NULL::jsonb as author_details
    FROM featured_cards fc
    WHERE 
      (type_filter IS NULL OR 'featured' = type_filter) AND
      (status_filter IS NULL OR fc.status::text = status_filter) AND
      (search_term IS NULL OR fc.title ILIKE '%' || search_term || '%')
  )
  SELECT 
    *,
    COUNT(*) OVER() as total_count
  FROM filtered_content
  ORDER BY updated_at DESC
  LIMIT page_size
  OFFSET offset_val;
END;
$$;

-- Function to get content statistics
CREATE OR REPLACE FUNCTION public.get_content_stats()
RETURNS TABLE (
  type text,
  total_count bigint,
  draft_count bigint,
  published_count bigint,
  archived_count bigint
)
SECURITY DEFINER
SET search_path = public, auth
LANGUAGE plpgsql
STABLE
AS $$
BEGIN
  RETURN QUERY
  SELECT
    content_type as type,
    SUM(total)::bigint as total_count,
    SUM(CASE WHEN status = 'draft' THEN total ELSE 0 END)::bigint as draft_count,
    SUM(CASE WHEN status = 'published' THEN total ELSE 0 END)::bigint as published_count,
    SUM(CASE WHEN status = 'archived' THEN total ELSE 0 END)::bigint as archived_count
  FROM (
    SELECT 
      'blog'::text as content_type,
      status,
      COUNT(*) as total
    FROM blog_posts
    GROUP BY status
    
    UNION ALL
    
    SELECT 
      'product'::text as content_type,
      status,
      COUNT(*) as total
    FROM products
    GROUP BY status
    
    UNION ALL
    
    SELECT 
      'page'::text as content_type,
      status,
      COUNT(*) as total
    FROM information_pages
    GROUP BY status
    
    UNION ALL
    
    SELECT 
      'featured'::text as content_type,
      status,
      COUNT(*) as total
    FROM featured_cards
    GROUP BY status
  ) stats
  GROUP BY content_type;
END;
$$;

-- Revoke all existing permissions
REVOKE ALL ON FUNCTION public.get_content_overview FROM PUBLIC;
REVOKE ALL ON FUNCTION public.get_content_stats FROM PUBLIC;

-- Grant execute permissions to authenticated users
GRANT EXECUTE ON FUNCTION public.get_content_overview TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_content_stats TO authenticated;

-- Add comments for documentation
COMMENT ON FUNCTION public.get_content_overview IS 'Get filtered and paginated content overview';
COMMENT ON FUNCTION public.get_content_stats IS 'Get content statistics by type and status';