"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils/theme"
import type { QuickAction } from "./types"

interface QuickActionItemProps extends QuickAction {
  className?: string
}

export function QuickActionItem({ 
  href, 
  icon: Icon, 
  title, 
  description,
  className 
}: QuickActionItemProps) {
  return (
    <Button
      variant="outline"
      className={cn(
        "h-auto w-full flex-col gap-2 p-4",
        "text-left hover:bg-accent/5",
        className
      )}
      asChild
    >
      <Link href={href}>
        <div className="flex items-center gap-3 w-full">
          <Icon className="h-5 w-5 flex-shrink-0 text-primary" />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">{title}</p>
            <p className="text-xs text-muted-foreground line-clamp-2">
              {description}
            </p>
          </div>
        </div>
      </Link>
    </Button>
  )
}