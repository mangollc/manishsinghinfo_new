
"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"
import { MarkdownPreview } from "../shared/markdown-preview"
import type { BlogPost } from "@/lib/supabase/types"

interface BlogPreviewProps {
  post: BlogPost
  open: boolean
  onClose: () => void
}

export function BlogPreview({ post, open, onClose }: BlogPreviewProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Preview: {post.title}</DialogTitle>
        </DialogHeader>
        
        {post.feature_image_url && (
          <img
            src={post.feature_image_url}
            alt={post.title}
            className="w-full aspect-video object-cover rounded-lg mb-6"
          />
        )}

        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags?.map((tag) => (
            <Badge key={tag.id} variant="secondary">
              {tag.name}
            </Badge>
          ))}
        </div>

        {post.excerpt && (
          <p className="text-lg text-muted-foreground mb-6">
            {post.excerpt}
          </p>
        )}

        <div className="prose dark:prose-invert max-w-none">
          <MarkdownPreview content={post.content || ""} />
        </div>

        <div className="mt-6 flex items-center justify-between text-sm text-muted-foreground">
          <div>
            By {post.author?.full_name}
          </div>
          <div>
            {post.published_at ? (
              <>Published {formatDistanceToNow(new Date(post.published_at))} ago</>
            ) : (
              "Draft"
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
```