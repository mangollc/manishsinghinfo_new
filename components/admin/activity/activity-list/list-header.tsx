export function ActivityListHeader() {
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-semibold">Recent Activity</h3>
      <span className="text-sm text-muted-foreground">Last 10 activities</span>
    </div>
  )
}