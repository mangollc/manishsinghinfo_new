"use client"

import { usePathname } from "next/navigation"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MAIN_NAV_ITEMS } from "@/lib/constants/navigation"
import { NavItem } from "./nav-item"

interface NavContentProps {
  onSelect: () => void
}

export function NavContent({ onSelect }: NavContentProps) {
  const pathname = usePathname()

  return (
    <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
      <div className="flex flex-col space-y-2">
        {MAIN_NAV_ITEMS.map((item) => (
          <div key={item.name}>
            {item.href ? (
              <NavItem
                {...item}
                isActive={pathname === item.href}
                onSelect={onSelect}
              />
            ) : (
              <>
                <NavItem name={item.name} />
                {item.items?.map((subItem) => (
                  <NavItem
                    key={subItem.href}
                    {...subItem}
                    isActive={pathname === subItem.href}
                    onSelect={onSelect}
                  />
                ))}
              </>
            )}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}