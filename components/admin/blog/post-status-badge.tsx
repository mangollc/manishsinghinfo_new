"use client"

import { Badge } from "@/components/ui/badge"
import type { ContentStatus } from "@/lib/supabase/types"

const statusConfig: Record<ContentStatus, { label: string; variant: "default" | "success" | "secondary" }> = {
  draft: { label: "Draft", variant: "secondary" },
  published: { label: "Published", variant: "success" },
  archived: { label: "Archived", variant: "default" },
}

interface PostStatusBadgeProps {
  status: ContentStatus
}

export function PostStatusBadge({ status }: PostStatusBadgeProps) {
  const config = statusConfig[status]

  return (
    <Badge variant={config.variant}>
      {config.label}
    </Badge>
  )
}