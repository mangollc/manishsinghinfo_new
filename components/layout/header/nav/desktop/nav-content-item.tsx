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
          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
          "hover:bg-muted hover:text-foreground focus:bg-muted focus:text-foreground",
          "dark:hover:bg-muted/50 dark:hover:text-foreground dark:focus:bg-muted/50 dark:focus:text-foreground",
          className
        )}
      >
        <div className="text-sm font-medium leading-none">{name}</div>
        {description && (
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {description}
          </p>
        )}
      </Link>
    </li>
  );
}