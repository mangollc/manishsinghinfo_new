"use client"

import { useState } from "react"
import type { ContentStatus } from "@/lib/supabase/types"

interface ContentStateOptions<T> {
  initialData?: T[]
  defaultStatus?: ContentStatus
  defaultSort?: string
  defaultPageSize?: number
}

export function useContentState<T>({
  initialData = [],
  defaultStatus = "all",
  defaultSort = "created_at",
  defaultPageSize = 10,
}: ContentStateOptions<T>) {
  const [data, setData] = useState<T[]>(initialData)
  const [searchTerm, setSearchTerm] = useState("")
  const [status, setStatus] = useState(defaultStatus)
  const [sortBy, setSortBy] = useState(defaultSort)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(defaultPageSize)
  const [loading, setLoading] = useState(false)

  const totalPages = Math.ceil(data.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize

  const paginatedData = data.slice(startIndex, endIndex)

  return {
    data,
    setData,
    searchTerm,
    setSearchTerm,
    status,
    setStatus,
    sortBy,
    setSortBy,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    loading,
    setLoading,
    totalPages,
    paginatedData,
  }
}