
"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase/client"
import type { Activity, ActivityFilters } from "@/lib/types/admin/activity"

export function useActivity(filters?: ActivityFilters) {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let mounted = true

    async function fetchActivities() {
      try {
        const { data, error } = await supabase
          .from('activity_log')
          .select(`
            id,
            description,
            type,
            metadata,
            created_at,
            user:user_id (
              id,
              email,
              raw_user_meta_data->full_name,
              raw_user_meta_data->role
            )
          `)
          .order('created_at', { ascending: false })
          .limit(filters?.limit || 10)

        if (error) throw error

        if (mounted) {
          setActivities(data?.map(item => ({
            id: item.id,
            description: item.description,
            type: item.type,
            metadata: item.metadata,
            created_at: item.created_at,
            user: item.user ? {
              id: item.user.id,
              full_name: item.user.full_name || item.user.email,
              role: item.user.role || 'user'
            } : null
          })) || [])
          setError(null)
        }
      } catch (err) {
        console.error("Error fetching activities:", err)
        if (mounted) {
          setError(err instanceof Error ? err : new Error("Failed to fetch activities"))
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    fetchActivities()

    return () => {
      mounted = false
    }
  }, [filters])

  return { activities, loading, error }
}
