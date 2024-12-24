import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { StatCardProps } from "@/lib/types/dashboard"

export function StatCard({ title, value, subValue }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {subValue && (
          <p className="text-xs text-muted-foreground">
            {subValue}
          </p>
        )}
      </CardContent>
    </Card>
  )
}