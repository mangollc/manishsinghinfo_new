"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase/client"
import type { FeaturedCard } from "@/lib/types/admin/featured"

export function useFeaturedCards() {
  const [cards, setCards] = useState<FeaturedCard[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    fetchCards()
  }, [])

  const fetchCards = async () => {
    try {
      const { data, error } = await supabase
        .from("featured_cards")
        .select("*")
        .order("display_order", { ascending: true })

      if (error) throw error

      setCards(data || [])
      setError(null)
    } catch (err) {
      console.error("Error fetching featured cards:", err)
      setError(err instanceof Error ? err : new Error("Failed to fetch featured cards"))
    } finally {
      setLoading(false)
    }
  }

  const reorderCard = async (id: string, newOrder: number) => {
    try {
      const { error } = await supabase
        .from("featured_cards")
        .update({ display_order: newOrder })
        .eq("id", id)

      if (error) throw error

      await fetchCards()
    } catch (err) {
      console.error("Error reordering card:", err)
      setError(err instanceof Error ? err : new Error("Failed to reorder card"))
    }
  }

  return { cards, loading, error, refetch: fetchCards, reorderCard }
}