import { supabase } from "@/lib/supabase/client"
import type { CreateActivityInput } from "@/lib/types/admin/activity"

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

    if (error) throw error
    return true
  } catch (error) {
    console.error("Error creating activity:", error)
    return false
  }
}