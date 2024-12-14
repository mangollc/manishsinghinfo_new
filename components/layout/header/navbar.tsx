"use client"

import { useState } from "react"
import { MobileNav } from "./mobile-nav"
import { DesktopNav } from "./desktop-nav"
import { Logo } from "./logo"
import { AuthButtons } from "./auth-buttons"

interface NavbarProps {
  satisfy: any // Next.js font object type
}

export function Navbar({ satisfy }: NavbarProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex h-16 items-center justify-between gap-4 px-4 md:px-6">
      <div className="flex items-center gap-4">
        <MobileNav open={open} onOpenChange={setOpen} />
        <Logo satisfy={satisfy} />
      </div>
      <DesktopNav />
      <AuthButtons />
    </div>
  )
}