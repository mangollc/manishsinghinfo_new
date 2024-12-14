"use client"

import Link from "next/link"
import { cn } from "@/lib/utils/theme"
import type { NavLink } from "@/lib/constants/navigation"

interface NavSectionItemsProps {
  items: NavLink[]
  pathname: string
  onSelect?: () => void
}

export function NavSectionItems({ items, pathname, onSelect }: NavSectionItemsProps) {
  return (
    <div className="space-y-1">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "mobile-nav-item",
            pathname === item.href && "text-primary"
          )}
          onClick={onSelect}
        >
          {item.name}
        </Link>
      ))}
    </div>
  )
}