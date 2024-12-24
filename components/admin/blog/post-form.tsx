
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ImageUpload } from "../shared/image-upload"
import { RichTextEditor } from "../shared/rich-text-editor"
import { SEOFields } from "../shared/seo-fields"
import { StatusSelect } from "../shared/status-select"
import { TagInput } from "../shared/tag-input"
import { supabase } from "@/lib/supabase/client"
import { createActivity } from "@/lib/api/admin/activity"
import type { BlogPost } from "@/lib/supabase/types"

interface BlogPostFormProps {
  post?: BlogPost
}

export function BlogPostForm({ post }: BlogPostFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: post?.title || "",
    slug: post?.slug || "",
    excerpt: post?.excerpt || "",
    content: post?.content || "",
    thumbnail_url: post?.thumbnail_url || "",
    feature_image_url: post?.feature_image_url || "",
    status: post?.status || "draft",
    meta_title: post?.meta_title || "",
    meta_description: post?.meta_description || "",
    tags: post?.blog_posts_tags?.map(pt => pt.tags) || []
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.user) throw new Error("Not authenticated")

      const postData = {
        ...formData,
        author_id: session.user.id
      }

      const { error } = post
        ? await supabase
            .from("blog_posts")
            .update(postData)
            .eq("id", post.id)
        : await supabase
            .from("blog_posts")
            .insert([postData])

      if (error) throw error

      await createActivity({
        description: post ? `Updated blog post: ${formData.title}` : `Created blog post: ${formData.title}`,
        type: "content",
        metadata: { contentType: "blog" }
      })

      router.push("/admin/blog")
      router.refresh()
    } catch (error) {
      console.error("Error saving post:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Input
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        placeholder="Post Title"
      />

      <Input
        value={formData.slug}
        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
        placeholder="URL Slug"
      />

      <TagInput
        selectedTags={formData.tags}
        onTagsChange={(tags) => setFormData({ ...formData, tags })}
      />

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">Thumbnail Image</label>
          <ImageUpload
            bucket="blog-images"
            path="thumbnails"
            value={formData.thumbnail_url}
            onUpload={(url) => setFormData({ ...formData, thumbnail_url: url })}
            onRemove={() => setFormData({ ...formData, thumbnail_url: "" })}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Feature Image</label>
          <ImageUpload
            bucket="blog-images"
            path="features"
            value={formData.feature_image_url}
            onUpload={(url) => setFormData({ ...formData, feature_image_url: url })}
            onRemove={() => setFormData({ ...formData, feature_image_url: "" })}
          />
        </div>
      </div>

      <Input
        value={formData.excerpt}
        onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
        placeholder="Post Excerpt"
      />

      <RichTextEditor
        value={formData.content}
        onChange={(content) => setFormData({ ...formData, content })}
        placeholder="Write your post content here..."
      />

      <SEOFields
        title={formData.meta_title}
        description={formData.meta_description}
        onTitleChange={(title) => setFormData({ ...formData, meta_title: title })}
        onDescriptionChange={(description) => 
          setFormData({ ...formData, meta_description: description })
        }
      />

      <div className="flex items-center gap-4">
        <StatusSelect
          value={formData.status}
          onChange={(status) => setFormData({ ...formData, status })}
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Post"}
        </Button>
      </div>
    </form>
  )
}
