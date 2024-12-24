"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useActivity } from "@/hooks/admin/use-activity"
import { ActivityItem } from "../../activity/activity-item"
import { LoadingState } from "../../shared/loading-state"
import { EmptyState } from "../content/empty-state"

export function ActivitySection() {
  const { activities, loading } = useActivity({ limit: 5 })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        {loading && <LoadingState />}
        {!loading && !activities.length && (
          <EmptyState message="No recent activity" />
        )}
        {!loading && activities.length > 0 && (
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