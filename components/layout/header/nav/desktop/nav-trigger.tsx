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
    <NavigationMenuTrigger className={cn("nav-menu-trigger", className)}>
      <span>{name}</span>
      <ChevronDown className="nav-menu-icon" aria-hidden="true" />
    </NavigationMenuTrigger>
  )
}