"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LucideIcon } from "lucide-react"

interface QuickActionButtonProps {
  href: string
  icon: LucideIcon
  title: string
  description: string
}

export function QuickActionButton({
  href,
  icon: Icon,
  title,
  description
}: QuickActionButtonProps) {
  return (
    <Button 
      variant="outline" 
      className="h-auto flex-col gap-2 p-4"
      asChild
    >
      <Link href={href}>
        <Icon className="h-6 w-6" />
        <span className="text-sm font-medium">{title}</span>
        <span className="text-xs text-muted-foreground">
          {description}
        </span>
      </Link>
    </Button>
  )
}