"use client"

import { NavigationMenuIndicator } from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils/theme"

interface NavIndicatorProps {
  className?: string
}

export function NavIndicator({ className }: NavIndicatorProps) {
  return (
    <NavigationMenuIndicator 
      className={cn("nav-menu-indicator", className)} 
    />
  )
}