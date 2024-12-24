"use client"

import { formatDistanceToNow } from "date-fns"
import type { Activity } from "@/lib/types/admin/activity"

interface ActivityItemProps {
  activity: Activity
}

export function ActivityItem({ activity }: ActivityItemProps) {
  const userName = activity.user?.full_name || "System"
  const timeAgo = formatDistanceToNow(new Date(activity.created_at), { addSuffix: true })

  return (
    <div className="flex items-center justify-between border-b pb-4 last:border-0">
      <div>
        <p className="font-medium">{activity.description}</p>
        <p className="text-sm text-muted-foreground">by {userName}</p>
      </div>
      <span className="text-sm text-muted-foreground">{timeAgo}</span>
    </div>
  )
}