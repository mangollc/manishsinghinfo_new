
"use client"

import { useState } from "react"
import type { ContentStatus } from "@/lib/supabase/types"

export function useContentFilters() {
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<ContentStatus | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const resetFilters = () => {
    setSearch("")
    setTypeFilter(null)
    setStatusFilter(null)
    setCurrentPage(1)
  }

  return {
    filters: {
      search,
      typeFilter,
      statusFilter,
      currentPage,
      pageSize
    },
    setSearch,
    setTypeFilter,
    setStatusFilter,
    setCurrentPage,
    setPageSize,
    resetFilters
  }
}
