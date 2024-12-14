"use client"

import { usePathname } from "next/navigation"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MAIN_NAV_ITEMS } from "@/lib/constants/navigation"
import { NavSection } from "./nav-section"

interface NavContentProps {
  onSelect?: () => void
}

export function NavContent({ onSelect }: NavContentProps) {
  const pathname = usePathname()

  return (
    <ScrollArea className="mobile-nav-content">
      {MAIN_NAV_ITEMS.map((item) => (
        <NavSection
          key={item.name}
          item={item}
          pathname={pathname}
          onSelect={onSelect}
        />
      ))}
    </ScrollArea>
  )
}