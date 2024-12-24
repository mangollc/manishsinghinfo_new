export type ActivityType = 'auth' | 'content' | 'system'

export interface Activity {
  id: string
  description: string
  type: ActivityType
  metadata?: Record<string, any>
  created_at: string
  user: {
    full_name: string | null
    email: string
  } | null
}

export interface ActivityFilters {
  type?: ActivityType
  startDate?: Date
  endDate?: Date
  limit?: number
}

export interface CreateActivityInput {
  description: string
  type: ActivityType
  metadata?: Record<string, any>
}