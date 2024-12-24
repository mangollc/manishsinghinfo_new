import { useActivity } from "@/hooks/admin/use-activity"
import { LoadingState } from "../../shared/loading-state"
import { ErrorState } from "../../shared/error-state"
import { ActivityItem } from "../activity-item"

export function ActivityListContent() {
  const { activities, loading, error } = useActivity({ limit: 10 })

  if (loading) return <LoadingState />
  if (error) return <ErrorState error={error} />
  
  if (activities.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No recent activity found
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <ActivityItem key={activity.id} activity={activity} />
      ))}
    </div>
  )
}