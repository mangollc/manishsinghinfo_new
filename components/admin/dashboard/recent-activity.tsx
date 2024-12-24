"use client"

import { useActivity } from "@/hooks/admin/use-activity"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDistanceToNow } from "date-fns"

export function RecentActivity() {
  const { activities, loading } = useActivity()

  if (loading) {
    return <div>Loading activity...</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between border-b pb-4 last:border-0"
            >
              <div>
                <p className="font-medium">{activity.description}</p>
                <p className="text-sm text-muted-foreground">
                  by {activity.user}
                </p>
              </div>
              <span className="text-sm text-muted-foreground">
                {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}