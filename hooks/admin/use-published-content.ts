"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase/client"

interface PublishedContent {
  id: string
  title: string
  type: string
  updatedAt: string
}

export function usePublishedContent() {
  const [content, setContent] = useState<PublishedContent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchContent = async () => {
    try {
      const { data, error } = await supabase
        .rpc('get_published_content')

      if (error) throw error

      setContent(data.map(item => ({
        id: item.id,
        title: item.title,
        type: item.type,
        updatedAt: item.updated_at
      })))
      setError(null)
    } catch (err) {
      console.error('Error fetching published content:', err)
      setError(err instanceof Error ? err : new Error('Failed to fetch published content'))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchContent()
  }, [])

  return { content, loading, error, refetch: fetchContent }
}