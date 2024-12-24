import { ActivityItem } from "./activity-item"
import { useActivity } from "@/hooks/admin/use-activity"
import { LoadingState } from "../shared/loading-state"
import { ErrorState } from "../shared/error-state"

export function ActivityList() {
  const { activities, loading, error } = useActivity({ limit: 10 })

  if (loading) return <LoadingState />
  if (error) return <ErrorState error={error} />
  
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <ActivityItem key={activity.id} activity={activity} />
      ))}
    </div>
  )
}