
"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase/client"

interface ContentItem {
  id: string
  title: string
  type: string
  status: string
  updatedAt: string
  author?: string
}

export function useContent() {
  const [items, setItems] = useState<ContentItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchContent = async () => {
    try {
      const { data, error } = await supabase
        .rpc('get_content_overview')

      if (error) throw error

      setItems(data.map(item => ({
        id: item.id,
        title: item.title,
        type: item.type,
        status: item.status,
        updatedAt: item.updated_at,
        author: item.author_details?.full_name
      })))
      setError(null)
    } catch (err) {
      console.error('Error fetching content:', err)
      setError(err instanceof Error ? err : new Error('Failed to fetch content'))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchContent()
  }, [])

  const handleDelete = async (id: string) => {
    const item = items.find(i => i.id === id)
    if (!item) return

    const table = {
      blog: 'blog_posts',
      product: 'products',
      page: 'information_pages'
    }[item.type]

    try {
      const { error } = await supabase
        .from(table)
        .delete()
        .eq('id', id)

      if (error) throw error

      await fetchContent()
    } catch (err) {
      console.error('Error deleting content:', err)
      throw err
    }
  }

  return {
    items,
    loading,
    error,
    handleDelete,
    refetch: fetchContent
  }
}
