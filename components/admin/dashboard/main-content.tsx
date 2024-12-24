import { QuickActions } from "./quick-actions"
import { ActivityList } from "../activity/activity-list"

export function MainContent() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="space-y-8">
        <QuickActions />
        <ActivityList />
      </div>
      <div>
        {/* Additional dashboard widgets can go here */}
      </div>
    </div>
  )
}