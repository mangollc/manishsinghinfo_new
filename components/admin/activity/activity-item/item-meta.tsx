import { formatDistanceToNow } from "date-fns"
import type { Activity } from "@/lib/types/activity"

interface ActivityItemMetaProps {
  activity: Activity
}

export function ActivityItemMeta({ activity }: ActivityItemMetaProps) {
  return (
    <span className="text-sm text-muted-foreground">
      {formatDistanceToNow(new Date(activity.created_at), { addSuffix: true })}
    </span>
  )
}