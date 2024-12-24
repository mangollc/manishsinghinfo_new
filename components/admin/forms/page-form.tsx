
"use client"

import { useFormFields } from "@/hooks/admin/use-form-fields"
import { useFormValidation } from "@/hooks/admin/use-form-validation"
import { useFormDirty } from "@/hooks/admin/use-form-dirty"
import { pageSchema } from "@/lib/validations/page"
import { FormSection } from "./form-section"
import { FormRow } from "./form-row"
import { FormActions } from "./form-actions"
import { Input } from "@/components/ui/input"
import { ImageUpload } from "../shared/image-upload"
import { RichTextEditor } from "../shared/rich-text-editor"
import { StatusSelect } from "../shared/status-select"
import { SEOFields } from "../shared/seo-fields"
import { PageSections } from "./page-sections"
import type { InformationPage } from "@/lib/supabase/types"

interface PageFormProps {
  page?: InformationPage
}

export function PageForm({ page }: PageFormProps) {
  const {
    formData,
    loading,
    handleSubmit,
    handleTitleChange,
    handleContentChange,
    handleImageUpload,
    handleStatusChange,
    updateField,
  } = useFormFields({
    initialData: page,
    schema: pageSchema,
    table: "information_pages",
    id: page?.id,
    redirectTo: "/admin/pages",
  })

  const { getFieldError } = useFormValidation(pageSchema)
  const { isDirty, confirmNavigation } = useFormDirty(page || {})

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
            placeholder="Page Title"
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
      </FormSection>

      <FormSection title="Media">
        <FormRow label="Banner Image">
          <ImageUpload
            bucket="page-images"
            path="banners"
            onUpload={(url) => handleImageUpload("banner_image_url", url)}
          />
        </FormRow>
      </FormSection>

      <FormSection title="Content">
        <FormRow
          label="Main Content"
          error={getFieldError("content")}
        >
          <RichTextEditor
            value={formData.content || ""}
            onChange={handleContentChange}
            placeholder="Write your page content here..."
          />
        </FormRow>
      </FormSection>

      <FormSection title="Page Sections">
        <PageSections
          sections={formData.sections || []}
          onSectionsChange={(sections) => updateField("sections", sections)}
        />
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
        <FormActions
          loading={loading}
          isDirty={isDirty}
          onCancel={() => confirmNavigation("/admin/pages")}
        />
      </div>
    </form>
  )
}
