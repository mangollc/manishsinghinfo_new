"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase/client"
import type { ContentStatus } from "@/lib/supabase/types"

interface ContentActionsOptions {
  table: string
  onSuccess?: () => void
  onError?: (error: Error) => void
}

export function useContentActions({
  table,
  onSuccess,
  onError,
}: ContentActionsOptions) {
  const [loading, setLoading] = useState(false)

  const updateStatus = async (id: string, status: ContentStatus) => {
    try {
      setLoading(true)
      const { error } = await supabase
        .from(table)
        .update({ status })
        .eq("id", id)

      if (error) throw error
      onSuccess?.()
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Update failed")
      onError?.(error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const deleteItem = async (id: string) => {
    try {
      setLoading(true)
      const { error } = await supabase
        .from(table)
        .delete()
        .eq("id", id)

      if (error) throw error
      onSuccess?.()
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Deletion failed")
      onError?.(error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const duplicateItem = async (id: string) => {
    try {
      setLoading(true)
      
      // Fetch the original item
      const { data: original, error: fetchError } = await supabase
        .from(table)
        .select("*")
        .eq("id", id)
        .single()

      if (fetchError) throw fetchError
      if (!original) throw new Error("Item not found")

      // Create a copy with modified fields
      const copy = {
        ...original,
        id: undefined,
        title: `${original.title} (Copy)`,
        slug: `${original.slug}-copy`,
        status: "draft" as ContentStatus,
        created_at: undefined,
        updated_at: undefined,
      }

      const { error: insertError } = await supabase
        .from(table)
        .insert([copy])

      if (insertError) throw insertError
      onSuccess?.()
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Duplication failed")
      onError?.(error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return {
    updateStatus,
    deleteItem,
    duplicateItem,
    loading,
  }
}