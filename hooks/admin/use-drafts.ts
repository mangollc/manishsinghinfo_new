"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase/client"

interface Draft {
  id: string
  title: string
  type: string
  updatedAt: string
}

export function useDrafts() {
  const [drafts, setDrafts] = useState<Draft[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchDrafts = async () => {
    try {
      const { data, error } = await supabase
        .rpc('get_draft_content')

      if (error) throw error

      setDrafts(data.map(item => ({
        id: item.id,
        title: item.title,
        type: item.type,
        updatedAt: item.updated_at
      })))
      setError(null)
    } catch (err) {
      console.error('Error fetching drafts:', err)
      setError(err instanceof Error ? err : new Error('Failed to fetch drafts'))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDrafts()
  }, [])

  return { drafts, loading, error, refetch: fetchDrafts }
}