"use client"

import { Sun } from "lucide-react"
import { cn } from "@/lib/utils/theme"

interface SunIconProps {
  className?: string
}

export function SunIcon({ className }: SunIconProps) {
  return (
    <Sun 
      className={cn(
        "h-4 w-4 text-muted-foreground transition-colors",
        className
      )} 
      aria-hidden="true"
    />
  )
}