"use client"

import { Container } from "@/components/ui/container"
import { MobileNav } from "@/components/navigation/mobile-nav"
import { DesktopNav } from "@/components/navigation/desktop-nav"
import { AuthButtons } from "@/components/navigation/auth-buttons"
import { Logo } from "@/components/navigation/logo"

interface NavbarProps {
  satisfy: any // Next.js font object type
}

export function Navbar({ satisfy }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <MobileNav />
            <Logo satisfy={satisfy} />
          </div>
          <DesktopNav />
          <AuthButtons />
        </div>
      </Container>
    </header>
  )
}