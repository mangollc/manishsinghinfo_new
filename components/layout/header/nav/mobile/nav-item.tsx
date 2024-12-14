"use client"

import Link from "next/link"
import { cn } from "@/lib/utils/theme"
import type { NavLink } from "@/lib/constants/navigation"

interface NavItemProps extends Partial<NavLink> {
  isActive?: boolean
  onSelect?: () => void
}

export function NavItem({ name, href, description, isActive, onSelect }: NavItemProps) {
  if (!href) {
    return (
      <div className="px-2 py-1 text-lg font-medium text-foreground">
        {name}
      </div>
    );
  }

  return (
    <Link
      href={href}
      className={cn(
        "block px-2 py-1 text-lg font-medium transition-colors hover:text-primary",
        isActive ? "text-primary" : "text-muted-foreground"
      )}
      onClick={onSelect}
    >
      {name}
      {description && (
        <p className="mt-1 text-sm text-muted-foreground">
          {description}
        </p>
      )}
    </Link>
  );
}