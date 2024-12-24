
"use client"

import { Container } from "@/components/ui/container"
import { StatsSection } from "./stats/stats-section"
import { ContentSection } from "./content/content-section"
import { ActivitySection } from "./activity/activity-section"

export function DashboardContent() {
  return (
    <Container>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to your content management dashboard.
          </p>
        </div>

        <StatsSection />
        <div className="grid gap-8 md:grid-cols-2">
          <ContentSection />
          <ActivitySection />
        </div>
      </div>
    </Container>
  )
}
