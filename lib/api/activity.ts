import { supabase } from "@/lib/supabase/client"
import type { Activity, ActivityFilters, CreateActivityInput } from "@/lib/types/activity"

export async function fetchActivities(filters?: ActivityFilters): Promise<Activity[]> {
  try {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return []

    let query = supabase
      .from("activity_log")
      .select(`
        id,
        description,
        type,
        metadata,
        created_at,
        user:user_id (
          email,
          raw_user_meta_data->full_name
        )
      `)
      .order("created_at", { ascending: false })

    if (filters?.type) {
      query = query.eq("type", filters.type)
    }

    if (filters?.startDate) {
      query = query.gte("created_at", filters.startDate.toISOString())
    }

    if (filters?.endDate) {
      query = query.lte("created_at", filters.endDate.toISOString())
    }

    if (filters?.limit) {
      query = query.limit(filters.limit)
    }

    const { data, error } = await query

    if (error) {
      console.error("Error fetching activities:", error)
      return []
    }

    return data?.map(item => ({
      id: item.id,
      description: item.description,
      type: item.type,
      metadata: item.metadata,
      created_at: item.created_at,
      user: item.user ? {
        email: item.user.email,
        full_name: item.user.raw_user_meta_data?.full_name
      } : null
    })) || []
  } catch (error) {
    console.error("Error fetching activities:", error)
    return []
  }
}

export async function createActivity(input: CreateActivityInput): Promise<boolean> {
  try {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.user) return false

    const { error } = await supabase
      .from("activity_log")
      .insert([{
        user_id: session.user.id,
        description: input.description,
        type: input.type,
        metadata: input.metadata || {}
      }])

    if (error) {
      console.error("Error creating activity:", error)
      return false
    }

    return true
  } catch (error) {
    console.error("Error creating activity:", error)
    return false
  }
}