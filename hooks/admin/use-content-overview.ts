```typescript
"use client"

import { useState } from "react"
import { useContent } from "./use-content"
import type { ContentStatus } from "@/lib/supabase/types"

interface ContentFilters {
  type: string | null
  status: ContentStatus | null
  search: string | null
}

interface UseContentOverviewReturn {
  items: any[]
  loading: boolean
  error: Error | null
  filters: ContentFilters
  setTypeFilter: (type: string | null) => void
  setStatusFilter: (status: ContentStatus | null) => void
  setSearchTerm: (search: string | null) => void
  handleDelete: (id: string) => Promise<void>
  totalCount: number
  currentPage: number
  setCurrentPage: (page: number) => void
  pageSize: number
  setPageSize: (size: number) => void
}

export function useContentOverview(): UseContentOverviewReturn {
  const [filters, setFilters] = useState<ContentFilters>({
    type: null,
    status: null,
    search: null
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const { items, loading, error, handleDelete, totalCount } = useContent({
    ...filters,
    page: currentPage,
    pageSize
  })

  const setTypeFilter = (type: string | null) => {
    setFilters(prev => ({ ...prev, type }))
    setCurrentPage(1)
  }

  const setStatusFilter = (status: ContentStatus | null) => {
    setFilters(prev => ({ ...prev, status }))
    setCurrentPage(1)
  }

  const setSearchTerm = (search: string | null) => {
    setFilters(prev => ({ ...prev, search }))
    setCurrentPage(1)
  }

  return {
    items,
    loading,
    error,
    filters,
    setTypeFilter,
    setStatusFilter,
    setSearchTerm,
    handleDelete,
    totalCount,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize
  }
}
```