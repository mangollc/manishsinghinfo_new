import { AdminSidebar } from "@/components/admin/layout/sidebar"
import { AdminHeader } from "@/components/admin/layout/header"
import { AuthGuard } from "@/components/auth/guard"
import { Container } from "@/components/ui/container"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthGuard>
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
    </AuthGuard>
  )
}