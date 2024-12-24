"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ImageUpload } from "../shared/image-upload"
import { RichTextEditor } from "../shared/rich-text-editor"
import { SEOFields } from "../shared/seo-fields"
import { StatusSelect } from "../shared/status-select"
import { PageSections } from "./page-sections"
import { supabase } from "@/lib/supabase/client"
import type { InformationPage } from "@/lib/supabase/types"

interface PageFormProps {
  page?: InformationPage
}

export function PageForm({ page }: PageFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: page?.title || "",
    slug: page?.slug || "",
    content: page?.content || "",
    banner_image_url: page?.banner_image_url || "",
    status: page?.status || "draft",
    meta_title: page?.meta_title || "",
    meta_description: page?.meta_description || "",
    sections: page?.sections || []
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = page
        ? await supabase
            .from("information_pages")
            .update(formData)
            .eq("id", page.id)
        : await supabase
            .from("information_pages")
            .insert([formData])

      if (error) throw error

      router.push("/admin/pages")
    } catch (error) {
      console.error("Error saving page:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Input
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        placeholder="Page Title"
      />

      <Input
        value={formData.slug}
        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
        placeholder="URL Slug"
      />

      <ImageUpload
        bucket="page-images"
        path="banners"
        onUpload={(url) => setFormData({ ...formData, banner_image_url: url })}
      />

      <PageSections
        sections={formData.sections}
        onSectionsChange={(sections) => setFormData({ ...formData, sections })}
      />

      <RichTextEditor
        value={formData.content}
        onChange={(content) => setFormData({ ...formData, content })}
        placeholder="Write your page content here..."
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
          {loading ? "Saving..." : "Save Page"}
        </Button>
      </div>
    </form>
  )
}