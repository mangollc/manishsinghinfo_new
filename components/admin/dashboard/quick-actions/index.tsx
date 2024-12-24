"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { QuickActionGrid } from "./quick-action-grid"

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <QuickActionGrid />
      </CardContent>
    </Card>
  )
}