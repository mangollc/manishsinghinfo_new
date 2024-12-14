"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeSwitch } from "@/components/theme/theme-switch"

export function AuthButtons() {
  return (
    <div className="flex items-center gap-4">
      <ThemeSwitch />
      <Button 
        variant="ghost" 
        className="hidden sm:inline-flex hover:bg-accent/50" 
        asChild
      >
        <Link href="/login">Login / Signup</Link>
      </Button>
    </div>
  )
}