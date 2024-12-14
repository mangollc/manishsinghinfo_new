"use client"

import { ChevronDown } from "lucide-react"
import { NavigationMenuTrigger } from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils/theme"

interface NavTriggerProps {
  name: string
  className?: string
}

export function NavTrigger({ name, className }: NavTriggerProps) {
  return (
    <NavigationMenuTrigger 
      className={cn(
        "flex items-center gap-1 px-4 py-2 text-sm font-medium",
        "transition-colors hover:text-accent-foreground",
        className
      )}
    >
      {name}
      <ChevronDown className="h-4 w-4" aria-hidden="true" />
    </NavigationMenuTrigger>
  )
}