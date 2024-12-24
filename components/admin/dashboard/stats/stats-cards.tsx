"use client"

import { useStats } from "@/hooks/admin/use-stats"
import { StatsGrid } from "./stats-grid"
import { LoadingState } from "../../shared/loading-state"
import { ErrorState } from "../../shared/error-state"

export function StatsCards() {
  const { stats, loading, error } = useStats()

  if (loading) return <LoadingState text="Loading statistics..." />
  if (error) return <ErrorState error={error} />

  return <StatsGrid stats={stats} />
}