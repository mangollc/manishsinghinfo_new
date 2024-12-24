"use client"

import { useStats } from "@/hooks/admin/use-stats"

export function ContentStats() {
  const { stats } = useStats()
  const totalDrafts = (
    (stats?.totalPosts || 0) - (stats?.publishedPosts || 0) +
    (stats?.totalProducts || 0) - (stats?.publishedProducts || 0) +
    (stats?.totalPages || 0) - (stats?.publishedPages || 0)
  )
  const totalPublished = (
    (stats?.publishedPosts || 0) +
    (stats?.publishedProducts || 0) +
    (stats?.publishedPages || 0)
  )

  return (
    <div className="flex items-center gap-4 text-sm">
      <div className="flex items-center gap-1.5">
        <div className="h-2 w-2 rounded-full bg-yellow-500" />
        <span className="text-muted-foreground">{totalDrafts} Drafts</span>
      </div>
      <div className="flex items-center gap-1.5">
        <div className="h-2 w-2 rounded-full bg-green-500" />
        <span className="text-muted-foreground">{totalPublished} Published</span>
      </div>
    </div>
  )
}