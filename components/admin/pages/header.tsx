import Link from "next/link"
import { Button } from "@/components/ui/button"

export function PageHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold">Information Pages</h1>
        <p className="text-muted-foreground">
          Manage your website's static pages and content
        </p>
      </div>
      <Button asChild>
        <Link href="/admin/pages/new">Create New Page</Link>
      </Button>
    </div>
  )
}