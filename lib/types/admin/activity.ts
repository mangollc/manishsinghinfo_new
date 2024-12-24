export type ActivityType = 'auth' | 'content' | 'system'

export interface ActivityUser {
  id: string
  full_name: string | null
  role: string
}

export interface Activity {
  id: string
  description: string
  type: ActivityType
  metadata?: Record<string, any>
  created_at: string
  user: ActivityUser | null
}

export interface ActivityFilters {
  type?: ActivityType
  limit?: number
}

export interface CreateActivityInput {
  description: string
  type: ActivityType
  metadata?: Record<string, any>
}