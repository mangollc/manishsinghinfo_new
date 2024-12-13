"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import { Menu } from "lucide-react"
import { mainNavigation } from "@/config/navigation"

interface NavbarProps {
  satisfy: any // Next.js font object type
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

export function Navbar({ satisfy }: NavbarProps) {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10">
              <div className="flex flex-col space-y-2">
                {mainNavigation.map((item) => (
                  <React.Fragment key={item.name}>
                    {'href' in item ? (
                      <Link
                        href={item.href}
                        className={cn(
                          "block px-2 py-1 text-lg font-medium transition-colors hover:text-primary",
                          pathname === item.href ? "text-primary" : "text-muted-foreground"
                        )}
                        onClick={() => setOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ) : (
                      <>
                        <div className="px-2 py-1 text-lg font-medium">{item.name}</div>
                        {item.items.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className={cn(
                              "block px-4 py-1 text-base transition-colors hover:text-primary",
                              pathname === subItem.href ? "text-primary" : "text-muted-foreground"
                            )}
                            onClick={() => setOpen(false)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </ScrollArea>
          </SheetContent>
        </Sheet>
        <Link href="/" className={cn("mr-6 flex items-center space-x-2", satisfy.className)}>
          <span className="text-2xl">Manish Singh</span>
        </Link>
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
        <div className="flex-1" />
        <div className="flex items-center space-x-4">
          <Button variant="ghost" asChild>
            <Link href="/login">Sign In</Link>
          </Button>
          <Button asChild>
            <Link href="/register">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}