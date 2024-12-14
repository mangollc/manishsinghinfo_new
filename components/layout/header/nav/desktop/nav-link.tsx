"use client"

import Link from "next/link"
import { NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import type { NavLink } from "@/lib/constants/navigation"

interface NavLinkProps extends NavLink {
  className?: string
}

export function DesktopNavLink({ name, href, className }: NavLinkProps) {
  return (
    <Link href={href} legacyBehavior passHref>
      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
        {name}
      </NavigationMenuLink>
    </Link>
  );
}