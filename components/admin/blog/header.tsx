import Link from "next/link"
import { Button } from "@/components/ui/button"

export function BlogHeader() {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">Blog Posts</h1>
      <Button asChild>
        <Link href="/admin/blog/new">Create New Post</Link>
      </Button>
    </div>
  )
}