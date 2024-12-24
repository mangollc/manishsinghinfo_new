import type { Activity } from "@/lib/types/activity"

interface ActivityItemContentProps {
  activity: Activity
}

export function ActivityItemContent({ activity }: ActivityItemContentProps) {
  return (
    <div>
      <p className="font-medium">{activity.description}</p>
      <p className="text-sm text-muted-foreground">
        by {activity.user?.full_name || activity.user?.email || "Unknown User"}
      </p>
    </div>
  )
}