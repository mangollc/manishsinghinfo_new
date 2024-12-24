import { ActivityItemContent } from "./item-content"
import { ActivityItemMeta } from "./item-meta"
import type { Activity } from "@/lib/types/activity"

interface ActivityItemProps {
  activity: Activity
}

export function ActivityItem({ activity }: ActivityItemProps) {
  return (
    <div className="flex items-center justify-between border-b pb-4 last:border-0">
      <ActivityItemContent activity={activity} />
      <ActivityItemMeta activity={activity} />
    </div>
  )
}