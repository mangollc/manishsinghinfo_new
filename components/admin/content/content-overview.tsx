
"use client"

import { useContent } from "@/hooks/admin/use-content"
import { useContentFilters } from "@/hooks/admin/use-content-filters"
import { ContentFilters } from "./content-filters"
import { ContentTable } from "./content-table"
import { ContentPagination } from "./content-pagination"
import { LoadingState } from "../shared/loading-state"
import { EmptyState } from "../shared/empty-state"

export function ContentOverview() {
  const {
    filters,
    setSearch,
    setTypeFilter,
    setStatusFilter,
    setCurrentPage,
    setPageSize,
    resetFilters
  } = useContentFilters()

  const { items, loading, error, handleDelete, totalCount } = useContent({
    search: filters.search,
    type: filters.typeFilter,
    status: filters.statusFilter,
    page: filters.currentPage,
    pageSize: filters.pageSize
  })

  if (loading) return <LoadingState />
  if (error) return <EmptyState message={error.message} />
  if (!items.length) return <EmptyState message="No content found" />

  return (
    <div className="space-y-6">
      <ContentFilters
        search={filters.search}
        typeFilter={filters.typeFilter}
        statusFilter={filters.statusFilter}
        onSearchChange={setSearch}
        onTypeChange={setTypeFilter}
        onStatusChange={setStatusFilter}
        onReset={resetFilters}
      />

      <ContentTable items={items} onDelete={handleDelete} />

      <ContentPagination
        currentPage={filters.currentPage}
        pageSize={filters.pageSize}
        totalCount={totalCount}
        onPageChange={setCurrentPage}
        onPageSizeChange={setPageSize}
      />
    </div>
  )
}
