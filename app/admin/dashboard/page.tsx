
import { Container } from "@/components/ui/container"
import { StatsCards } from "@/components/admin/dashboard/stats-cards"
import { RecentActivity } from "@/components/admin/dashboard/recent-activity"
import { DraftItems } from "@/components/admin/dashboard/draft-items"
import { QuickActions } from "@/components/admin/dashboard/quick-actions"

export default function AdminDashboard() {
  return (
    <Container>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to your content management dashboard.
          </p>
        </div>

        <StatsCards />

        <QuickActions />

        <div className="grid gap-8 md:grid-cols-2">
          <RecentActivity />
          <DraftItems />
        </div>
      </div>
    </Container>
  )
}
```