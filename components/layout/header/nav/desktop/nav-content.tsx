"use client"

import { NavigationMenuContent } from "@/components/ui/navigation-menu"
import { NavContentItem } from "./nav-content-item"
import type { NavLink } from "@/lib/constants/navigation"

interface NavContentProps {
  items: NavLink[]
}

export function NavContent({ items }: NavContentProps) {
  return (
    <NavigationMenuContent className="nav-menu-content">
      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
        {items.map((item) => (
          <NavContentItem key={item.href} {...item} />
        ))}
      </ul>
    </NavigationMenuContent>
  )
}