"use client"

import { useState, useEffect } from "react"
import { fetchDashboardStats } from "@/lib/api/stats"
import type { DashboardStats } from "@/lib/types/dashboard"

export function useStats() {
  const [stats, setStats] = useState<DashboardStats>({
    totalPosts: 0,
    publishedPosts: 0,
    totalProducts: 0,
    publishedProducts: 0,
    totalFeatured: 0,
    activeFeatured: 0,
    totalPages: 0,
    publishedPages: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await fetchDashboardStats()
        setStats(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch stats"))
      } finally {
        setLoading(false)
      }
    }

    loadStats()
  }, [])

  return { stats, loading, error }
}