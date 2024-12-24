
"use client"

import { useContent } from "@/hooks/admin/use-content"
import { ContentList } from "./content-list"
import { ContentFilters } from "./content-filters"
import { LoadingState } from "../../shared/loading-state"
import { EmptyState } from "./empty-state"

interface ContentOverviewProps {
  onClose?: () => void
}

export function ContentOverview({ onClose }: ContentOverviewProps) {
  const { items, loading, handleDelete } = useContent()

  const handleDeleteSuccess = async (id: string) => {
    await handleDelete(id)
    onClose?.()
  }

  return (
    <div className="space-y-6">
      {loading ? (
        <LoadingState />
      ) : items.length === 0 ? (
        <EmptyState message="No content found" />
      ) : (
        <div className="space-y-4">
          <ContentFilters />
          <ContentList items={items} onDelete={handleDeleteSuccess} />
        </div>
      )}
    </div>
  )
}
