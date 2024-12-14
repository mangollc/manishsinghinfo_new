import Link from "next/link"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import { mainNavigation } from "@/config/navigation"
import { ListItem } from "./list-item"

export function DesktopNav() {
  return (
    <NavigationMenu className="hidden lg:flex">
      <NavigationMenuList>
        {mainNavigation.map((item) => (
          <NavigationMenuItem key={item.name}>
            {'href' in item ? (
              <Link href={item.href} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {item.name}
                </NavigationMenuLink>
              </Link>
            ) : (
              <>
                <NavigationMenuTrigger>{item.name}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {item.items.map((subItem) => (
                      <ListItem
                        key={subItem.href}
                        title={subItem.name}
                        href={subItem.href}
                      >
                        {subItem.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}