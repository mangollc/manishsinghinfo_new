import Link from "next/link"
import { Button } from "@/components/ui/button"

export function FeaturedHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold">Featured Cards</h1>
        <p className="text-muted-foreground">
          Manage featured content cards displayed on your website
        </p>
      </div>
      <Button asChild>
        <Link href="/admin/featured/new">Create New Card</Link>
      </Button>
    </div>
  )
}