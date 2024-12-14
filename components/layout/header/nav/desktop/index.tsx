"use client"

import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu"
import { MAIN_NAV_ITEMS } from "@/lib/constants/navigation"
import { NavLink } from "./nav-link"
import { NavTrigger } from "./nav-trigger"
import { NavContent } from "./nav-content"

export function DesktopNav() {
  return (
    <NavigationMenu className="hidden lg:flex">
      <NavigationMenuList className="flex items-center gap-2">
        {MAIN_NAV_ITEMS.map((item) => (
          <NavigationMenuItem key={item.name}>
            {item.href ? (
              <NavLink {...item} />
            ) : (
              <>
                <NavTrigger name={item.name} />
                <NavContent items={item.items || []} />
              </>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}