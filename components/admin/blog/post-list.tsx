"use client"

import { useState } from "react"
import { ContentFilter } from "../utils/content-filter"
import { ContentSort } from "../utils/content-sort"
import { ContentPagination } from "../utils/content-pagination"
import { LoadingState } from "../shared/loading-state"
import { ErrorState } from "../shared/error-state"
import { BlogPostCard } from "./post-card"
import { useBlogPosts } from "@/hooks/admin/use-blog-posts"
import type { BlogPost, ContentStatus } from "@/lib/supabase/types"

const sortOptions = [
  { value: "created_at", label: "Date Created" },
  { value: "title", label: "Title" },
  { value: "status", label: "Status" },
]

export function BlogPostList() {
  const { posts, loading, error, refetch } = useBlogPosts()
  const [searchTerm, setSearchTerm] = useState("")
  const [status, setStatus] = useState<ContentStatus | "all">("all")
  const [sortBy, setSortBy] = useState("created_at")
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  if (loading) return <LoadingState />
  if (error) return <ErrorState error={error} retry={refetch} />

  const filteredPosts = posts
    .filter((post) => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = status === "all" || post.status === status
      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      if (sortBy === "title") return a.title.localeCompare(b.title)
      if (sortBy === "status") return a.status.localeCompare(b.status)
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    })

  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <ContentFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          status={status}
          onStatusChange={(value) => setStatus(value as ContentStatus | "all")}
        />
        <ContentSort
          value={sortBy}
          onChange={setSortBy}
          options={sortOptions}
        />
      </div>

      <div className="grid gap-6">
        {paginatedPosts.map((post) => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>

      <ContentPagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredPosts.length / pageSize)}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
        onPageSizeChange={setPageSize}
      />
    </div>
  )
}