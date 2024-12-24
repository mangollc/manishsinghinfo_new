```sql
-- Function to get content overview with filtering
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

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION public.get_content_overview TO authenticated;
```