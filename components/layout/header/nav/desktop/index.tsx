import { ChevronDown } from "lucide-react"
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu"
import { MAIN_NAV_ITEMS } from "@/lib/constants/navigation"
import { DesktopNavLink } from "./nav-link"
import { NavContent } from "./nav-content"

export function DesktopNav() {
  return (
    <NavigationMenu className="hidden lg:flex">
      <NavigationMenuList>
        {MAIN_NAV_ITEMS.map((item) => (
          <NavigationMenuItem key={item.name}>
            {item.href ? (
              <DesktopNavLink {...item} />
            ) : (
              <>
                <NavigationMenuTrigger className="flex items-center gap-1">
                  {item.name}
                  <ChevronDown className="h-4 w-4" aria-hidden="true" />
                </NavigationMenuTrigger>
                <NavContent items={item.items || []} />
              </>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}