
"use client"

import { formatDistanceToNow } from "date-fns"
import { cn } from "@/lib/utils/theme"

interface ActivityItemProps {
  description: string
  user: string
  timestamp: string
  className?: string
}

export function ActivityItem({ description, user, timestamp, className }: ActivityItemProps) {
  return (
    <div className={cn(
      "flex items-center justify-between border-b pb-4 last:border-0",
      className
    )}>
      <div>
        <p className="font-medium">{description}</p>
        <p className="text-sm text-muted-foreground">by {user}</p>
      </div>
      <span className="text-sm text-muted-foreground">
        {formatDistanceToNow(new Date(timestamp), { addSuffix: true })}
      </span>
    </div>
  )
}
```