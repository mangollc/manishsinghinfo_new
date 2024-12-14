"use client"

import type { NavItem } from "@/lib/constants/navigation"
import { NavSectionHeader } from "./nav-section-header"
import { NavSectionItems } from "./nav-section-items"

interface NavSectionProps {
  item: NavItem
  pathname: string
  onSelect?: () => void
}

export function NavSection({ item, pathname, onSelect }: NavSectionProps) {
  return (
    <div className="mobile-nav-section">
      <NavSectionHeader name={item.name} />
      {item.items && (
        <NavSectionItems
          items={item.items}
          pathname={pathname}
          onSelect={onSelect}
        />
      )}
    </div>
  )
}