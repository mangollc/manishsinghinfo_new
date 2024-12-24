import { StatCard } from "./stat-card"
import type { DashboardStats } from "@/lib/types/dashboard"

interface StatsGridProps {
  stats: DashboardStats
}

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Blog Posts"
        value={stats.totalPosts}
        subValue={`${stats.publishedPosts} published`}
      />
      <StatCard
        title="Total Products"
        value={stats.totalProducts}
        subValue={`${stats.publishedProducts} published`}
      />
      <StatCard
        title="Featured Cards"
        value={stats.totalFeatured}
        subValue={`${stats.activeFeatured} active`}
      />
      <StatCard
        title="Information Pages"
        value={stats.totalPages}
        subValue={`${stats.publishedPages} published`}
      />
    </div>
  )
}