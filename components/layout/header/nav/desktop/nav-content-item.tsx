"use client"

import Link from "next/link"
import { cn } from "@/lib/utils/theme"
import type { NavLink } from "@/lib/constants/navigation"

interface NavContentItemProps extends NavLink {
  className?: string
}

export function NavContentItem({ name, href, description, className }: NavContentItemProps) {
  return (
    <li>
      <Link
        href={href}
        className={cn(
          "nav-menu-link",
          className
        )}
      >
        <div className="text-sm font-medium">{name}</div>
        {description && (
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </Link>
    </li>
  )
}