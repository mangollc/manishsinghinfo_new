import { BlogPostList } from "@/components/admin/blog/post-list"
import { BlogHeader } from "@/components/admin/blog/header"

export default function BlogPostsAdmin() {
  return (
    <div className="space-y-8">
      <BlogHeader />
      <BlogPostList />
    </div>
  )
}