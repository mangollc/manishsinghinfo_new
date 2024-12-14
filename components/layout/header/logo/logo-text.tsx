"use client"

import { cn } from "@/lib/utils"

interface LogoTextProps {
  satisfy: any // Next.js font object type
}

export function LogoText({ satisfy }: LogoTextProps) {
  return (
    <span
      className={cn(
        "relative z-10 px-4 py-2 text-2xl font-bold",
        "bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent",
        "dark:from-primary dark:via-secondary dark:to-accent",
        "light:from-primary/90 light:via-accent/90 light:to-secondary/90",
        satisfy.className
      )}
    >
      Manish Singh
    </span>
  )
}