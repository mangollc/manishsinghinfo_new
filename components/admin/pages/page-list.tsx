"use client"

import { usePages } from "@/hooks/admin/use-pages"
import { PageCard } from "./page-card"
import { LoadingState } from "../shared/loading-state"
import { ErrorState } from "../shared/error-state"

export function PageList() {
  const { pages, loading, error } = usePages()

  if (loading) return <LoadingState />
  if (error) return <ErrorState error={error} />

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {pages.map((page) => (
        <PageCard key={page.id} page={page} />
      ))}
    </div>
  )
}