import { PageList } from "@/components/admin/pages/page-list"
import { PageHeader } from "@/components/admin/pages/header"

export default function PagesAdmin() {
  return (
    <div className="space-y-8">
      <PageHeader />
      <PageList />
    </div>
  )
}