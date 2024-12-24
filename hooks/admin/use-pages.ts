import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase/client"
import type { InformationPage } from "@/lib/supabase/types"

export function usePages() {
  const [pages, setPages] = useState<InformationPage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    fetchPages()
  }, [])

  const fetchPages = async () => {
    try {
      const { data, error } = await supabase
        .from("information_pages")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) throw error

      setPages(data || [])
    } catch (error) {
      console.error("Error fetching pages:", error)
      setError(error as Error)
    } finally {
      setLoading(false)
    }
  }

  return { pages, loading, error, refetch: fetchPages }
}