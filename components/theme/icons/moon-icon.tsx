"use client"

import { Moon } from "lucide-react"
import { cn } from "@/lib/utils/theme"

interface MoonIconProps {
  className?: string
}

export function MoonIcon({ className }: MoonIconProps) {
  return (
    <Moon 
      className={cn(
        "h-4 w-4 text-muted-foreground transition-colors",
        className
      )} 
      aria-hidden="true"
    />
  )
}