
"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase/client"
import type { BlogPost } from "@/lib/supabase/types"

export function useBlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .rpc('get_blog_posts_with_details')

      if (error) throw error

      setPosts(data || [])
      setError(null)
    } catch (error) {
      console.error("Error fetching posts:", error)
      setError(error as Error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return { posts, loading, error, refetch: fetchPosts }
}
