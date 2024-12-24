"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { ContentStatus } from "@/lib/supabase/types"

interface StatusSelectProps {
  value: ContentStatus
  onChange: (value: ContentStatus) => void
}

export function StatusSelect({ value, onChange }: StatusSelectProps) {
  return (
    <Select value={value} onValueChange={onChange as (value: string) => void}>
      <SelectTrigger>
        <SelectValue placeholder="Select status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="draft">Draft</SelectItem>
        <SelectItem value="published">Published</SelectItem>
        <SelectItem value="archived">Archived</SelectItem>
      </SelectContent>
    </Select>
  )
}