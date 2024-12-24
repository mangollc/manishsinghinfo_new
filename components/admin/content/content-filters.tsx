
"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { RotateCcw } from "lucide-react"
import type { ContentStatus } from "@/lib/supabase/types"

interface ContentFiltersProps {
  search: string
  typeFilter: string | null
  statusFilter: ContentStatus | null
  onSearchChange: (value: string) => void
  onTypeChange: (value: string | null) => void
  onStatusChange: (value: ContentStatus | null) => void
  onReset: () => void
}

export function ContentFilters({
  search,
  typeFilter,
  statusFilter,
  onSearchChange,
  onTypeChange,
  onStatusChange,
  onReset
}: ContentFiltersProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-1 items-center gap-4">
        <Input
          placeholder="Search content..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="max-w-xs"
        />
        <Button 
          variant="ghost" 
          size="icon"
          onClick={onReset}
          title="Reset filters"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex gap-2">
        <Select 
          value={typeFilter || ""} 
          onValueChange={(v) => onTypeChange(v || null)}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Content Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Types</SelectItem>
            <SelectItem value="blog">Blog Posts</SelectItem>
            <SelectItem value="product">Products</SelectItem>
            <SelectItem value="page">Pages</SelectItem>
          </SelectContent>
        </Select>

        <Select 
          value={statusFilter || ""} 
          onValueChange={(v) => onStatusChange((v || null) as ContentStatus)}
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Status</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
