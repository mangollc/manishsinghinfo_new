
"use client"

import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { cn } from "@/lib/utils/theme"

interface DraftItemProps {
  id: string
  title: string
  type: string
  updatedAt: string
  className?: string
}

export function DraftItem({ id, title, type, updatedAt, className }: DraftItemProps) {
  const href = `/admin/${type}/${id}`

  return (
    <div className={cn(
      "flex items-center justify-between border-b pb-4 last:border-0",
      className
    )}>
      <div>
        <Link
          href={href}
          className="font-medium hover:underline"
        >
          {title}
        </Link>
        <p className="text-sm text-muted-foreground capitalize">
          {type}
        </p>
      </div>
      <span className="text-sm text-muted-foreground">
        Last edited {formatDistanceToNow(new Date(updatedAt), { addSuffix: true })}
      </span>
    </div>
  )
}
```