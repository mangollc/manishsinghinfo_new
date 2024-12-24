
"use client"

import { useFormFields } from "@/hooks/admin/use-form-fields"
import { useFormValidation } from "@/hooks/admin/use-form-validation"
import { useFormDirty } from "@/hooks/admin/use-form-dirty"
import { blogPostSchema } from "@/lib/validations/blog"
import { FormSection } from "./form-section"
import { FormRow } from "./form-row"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ImageUpload } from "../shared/image-upload"
import { RichTextEditor } from "../shared/rich-text-editor"
import { TagInput } from "../shared/tag-input"
import { StatusSelect } from "../shared/status-select"
import { SEOFields } from "../shared/seo-fields"
import type { BlogPost } from "@/lib/supabase/types"

interface BlogFormProps {
  post?: BlogPost
}

export function BlogForm({ post }: BlogFormProps) {
  const {
    formData,
    loading,
    handleSubmit,
    handleTitleChange,
    handleContentChange,
    handleTagsChange,
    handleImageUpload,
    handleStatusChange,
    updateField,
  } = useFormFields({
    initialData: post,
    schema: blogPostSchema,
    table: "blog_posts",
    id: post?.id,
    redirectTo: "/admin/blog",
  })

  const { getFieldError } = useFormValidation(blogPostSchema)
  const { isDirty, confirmNavigation } = useFormDirty(post || {})

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <FormSection title="Basic Information">
        <FormRow
          label="Title"
          error={getFieldError("title")}
        >
          <Input
            value={formData.title || ""}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Post Title"
          />
        </FormRow>

        <FormRow
          label="Slug"
          error={getFieldError("slug")}
        >
          <Input
            value={formData.slug || ""}
            onChange={(e) => updateField("slug", e.target.value)}
            placeholder="URL Slug"
          />
        </FormRow>

        <FormRow label="Tags">
          <TagInput
            selectedTags={formData.tags || []}
            onTagsChange={handleTagsChange}
          />
        </FormRow>
      </FormSection>

      <FormSection title="Content">
        <FormRow
          label="Excerpt"
          error={getFieldError("excerpt")}
        >
          <Input
            value={formData.excerpt || ""}
            onChange={(e) => updateField("excerpt", e.target.value)}
            placeholder="Brief excerpt"
          />
        </FormRow>

        <FormRow
          label="Content"
          error={getFieldError("content")}
        >
          <RichTextEditor
            value={formData.content || ""}
            onChange={handleContentChange}
            placeholder="Write your post content here..."
          />
        </FormRow>
      </FormSection>

      <FormSection title="Media">
        <FormRow label="Thumbnail Image">
          <ImageUpload
            bucket="blog-images"
            path="thumbnails"
            onUpload={(url) => handleImageUpload("thumbnail_url", url)}
          />
        </FormRow>

        <FormRow label="Feature Image">
          <ImageUpload
            bucket="blog-images"
            path="features"
            onUpload={(url) => handleImageUpload("feature_image_url", url)}
          />
        </FormRow>
      </FormSection>

      <FormSection title="SEO">
        <SEOFields
          title={formData.meta_title || ""}
          description={formData.meta_description || ""}
          onTitleChange={(title) => updateField("meta_title", title)}
          onDescriptionChange={(description) => 
            updateField("meta_description", description)
          }
        />
      </FormSection>

      <div className="flex items-center justify-between">
        <StatusSelect
          value={formData.status || "draft"}
          onChange={handleStatusChange}
        />
        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => confirmNavigation("/admin/blog")}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={loading || !isDirty}>
            {loading ? "Saving..." : "Save Post"}
          </Button>
        </div>
      </div>
    </form>
  )
}
