import Link from "next/link"
import Image from "next/image"
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { BlogPost } from "@/lib/supabase/types"

interface BlogPostCardProps {
  post: BlogPost
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  const authorName = post.author?.user_metadata?.full_name || post.author?.email || "Unknown Author"
  const tags = post.blog_posts_tags?.map(pt => pt.tags) || []

  return (
    <Card>
      <CardHeader>
        {post.thumbnail_url && (
          <div className="relative h-40 w-full mb-4">
            <Image
              src={post.thumbnail_url}
              alt={post.title}
              fill
              className="object-cover rounded"
            />
          </div>
        )}
        <CardTitle>{post.title}</CardTitle>
        <CardDescription>
          By {authorName} • {new Date(post.created_at).toLocaleDateString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{post.excerpt}</p>
        <div className="mt-2 flex gap-2">
          {tags.map((tag) => (
            <Badge key={tag.id} variant="secondary">
              {tag.name}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" asChild>
          <Link href={`/admin/blog/${post.id}`}>Edit</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}