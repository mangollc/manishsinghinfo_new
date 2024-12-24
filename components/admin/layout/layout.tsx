
"use client"

import { Container } from "@/components/ui/container"
import { AdminHeader } from "./header"
import { AdminSidebar } from "./sidebar"
import { cn } from "@/lib/utils/theme"

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-8">
          <Container>
            {children}
          </Container>
        </main>
      </div>
    </div>
  )
}
