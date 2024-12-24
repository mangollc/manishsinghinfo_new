"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useStats } from "@/hooks/admin/use-stats"
import { LoadingState } from "../../shared/loading-state"

export function StatsSection() {
  const { stats, loading } = useStats()

  if (loading) return <LoadingState />

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Blog Posts"
        value={stats.totalPosts}
        subValue={`${stats.publishedPosts} published`}
      />
      <StatCard
        title="Products"
        value={stats.totalProducts}
        subValue={`${stats.publishedProducts} published`}
      />
      <StatCard
        title="Featured Cards"
        value={stats.totalFeatured}
        subValue={`${stats.activeFeatured} active`}
      />
      <StatCard
        title="Pages"
        value={stats.totalPages}
        subValue={`${stats.publishedPages} published`}
      />
    </div>
  )
}

function StatCard({ title, value, subValue }: { title: string; value: number; subValue?: string }) {
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