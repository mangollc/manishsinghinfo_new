"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ContentFiltersProps {
  onSearchChange?: (value: string) => void
  onTypeChange?: (value: string) => void
  onStatusChange?: (value: string) => void
}

export function ContentFilters({ 
  onSearchChange, 
  onTypeChange, 
  onStatusChange 
}: ContentFiltersProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <Input
        placeholder="Search content..."
        className="max-w-xs"
        onChange={(e) => onSearchChange?.(e.target.value)}
      />
      <div className="flex gap-2">
        <Select onValueChange={onTypeChange}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Content Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="blog">Blog Posts</SelectItem>
            <SelectItem value="product">Products</SelectItem>
            <SelectItem value="page">Pages</SelectItem>
            <SelectItem value="featured">Featured</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={onStatusChange}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}