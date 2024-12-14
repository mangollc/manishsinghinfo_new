"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface ListItemProps extends React.ComponentPropsWithoutRef<"a"> {
  title: string
  href: string
  children?: React.ReactNode
}

export function ListItem({ title, href, children, className, ...props }: ListItemProps) {
  return (
    <li>
      <Link
        href={href}
        className={cn(
          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
          "hover:bg-muted hover:text-foreground",
          "focus:bg-muted focus:text-foreground",
          "dark:hover:bg-muted/50 dark:hover:text-foreground",
          "dark:focus:bg-muted/50 dark:focus:text-foreground",
          className
        )}
        {...props}
      >
        <div className="text-sm font-medium leading-none">{title}</div>
        {children && (
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        )}
      </Link>
    </li>
  )
}