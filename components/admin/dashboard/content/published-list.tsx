"use client"

import { usePublishedContent } from "@/hooks/admin/use-published-content"
import { ContentItem } from "./content-item"
import { LoadingState } from "../../shared/loading-state"
import { EmptyState } from "./empty-state"

const tableMap: Record<string, string> = {
  blog: 'blog_posts',
  product: 'products',
  page: 'information_pages'
}

export function PublishedList() {
  const { content, loading, refetch } = usePublishedContent()

  if (loading) return <LoadingState />
  if (!content.length) return <EmptyState message="No published items found" />

  return (
    <div className="space-y-1">
      {content.map((item) => (
        <ContentItem
          key={item.id}
          id={item.id}
          title={item.title}
          type={item.type}
          table={tableMap[item.type]}
          updatedAt={item.updatedAt}
          onDelete={refetch}
        />
      ))}
    </div>
  )
}