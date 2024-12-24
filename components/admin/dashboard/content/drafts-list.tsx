"use client"

import { useDrafts } from "@/hooks/admin/use-drafts"
import { ContentItem } from "./content-item"
import { LoadingState } from "../../shared/loading-state"
import { EmptyState } from "./empty-state"

const tableMap: Record<string, string> = {
  blog: 'blog_posts',
  product: 'products',
  page: 'information_pages'
}

export function DraftsList() {
  const { drafts, loading, refetch } = useDrafts()

  if (loading) return <LoadingState />
  if (!drafts.length) return <EmptyState message="No draft items found" />

  return (
    <div className="space-y-1">
      {drafts.map((draft) => (
        <ContentItem
          key={draft.id}
          id={draft.id}
          title={draft.title}
          type={draft.type}
          table={tableMap[draft.type]}
          updatedAt={draft.updatedAt}
          onDelete={refetch}
        />
      ))}
    </div>
  )
}