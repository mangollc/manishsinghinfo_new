import { Metadata } from "next"
import { Dashboard } from "@/components/admin/dashboard"

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Manage your website content and monitor activity",
}

export default function AdminPage() {
  return <Dashboard />
}