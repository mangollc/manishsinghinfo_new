"use client"

import Link from "next/link"
import { NavigationMenuLink } from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils/theme"
import type { NavLink as NavLinkType } from "@/lib/constants/navigation"

interface NavLinkProps extends NavLinkType {
  className?: string
}

export function NavLink({ name, href, className }: NavLinkProps) {
  return (
    <Link href={href} legacyBehavior passHref>
      <NavigationMenuLink 
        className={cn(
          "inline-flex h-9 w-max items-center justify-center",
          "rounded-md bg-background px-4 py-2 text-sm font-medium",
          "transition-colors hover:bg-accent hover:text-accent-foreground",
          "focus:bg-accent focus:text-accent-foreground focus:outline-none",
          "disabled:pointer-events-none disabled:opacity-50",
          className
        )}
      >
        {name}
      </NavigationMenuLink>
    </Link>
  )
}