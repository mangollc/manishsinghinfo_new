
"use client"

import { Container } from "@/components/ui/container"
import { UserMenu } from "./user-menu"
import { ContentMenu } from "./content-menu"
import { SearchBar } from "./search-bar"

export function AdminHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div className="font-semibold">Admin Dashboard</div>
            <ContentMenu />
          </div>
          <div className="flex items-center gap-4">
            <SearchBar />
            <UserMenu />
          </div>
        </div>
      </Container>
    </header>
  )
}
