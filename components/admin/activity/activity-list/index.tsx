"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { useActivity } from "@/hooks/admin/use-activity"
import { LoadingState } from "../../shared/loading-state"
import { ErrorState } from "../../shared/error-state"
import { ActivityItem } from "../activity-item"

export function ActivityList() {
  const { activities, loading, error } = useActivity({ limit: 10 })

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Recent Activity</h3>
          <span className="text-sm text-muted-foreground">Last 10 activities</span>
        </div>
      </CardHeader>
      <CardContent>
        {loading && <LoadingState />}
        {error && <ErrorState error={error} />}
        {!loading && !error && activities.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No recent activity found
          </div>
        )}
        {!loading && !error && activities.length > 0 && (
          <div className="space-y-4">
            {activities.map((activity) => (
              <ActivityItem key={activity.id} activity={activity} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}