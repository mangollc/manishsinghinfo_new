
"use client"

import { useFormFields } from "@/hooks/admin/use-form-fields"
import { useFormValidation } from "@/hooks/admin/use-form-validation"
import { useFormDirty } from "@/hooks/admin/use-form-dirty"
import { featuredCardSchema } from "@/lib/validations/featured"
import { FormSection } from "./form-section"
import { FormRow } from "./form-row"
import { FormActions } from "./form-actions"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ImageUpload } from "../shared/image-upload"
import { StatusSelect } from "../shared/status-select"
import type { FeaturedCard } from "@/lib/supabase/types"

interface FeaturedFormProps {
  card?: FeaturedCard
}

export function FeaturedForm({ card }: FeaturedFormProps) {
  const {
    formData,
    loading,
    handleSubmit,
    handleTitleChange,
    handleImageUpload,
    handleStatusChange,
    updateField,
  } = useFormFields({
    initialData: card,
    schema: featuredCardSchema,
    table: "featured_cards",
    id: card?.id,
    redirectTo: "/admin/featured",
  })

  const { getFieldError } = useFormValidation(featuredCardSchema)
  const { isDirty, confirmNavigation } = useFormDirty(card || {})

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
            placeholder="Card Title"
          />
        </FormRow>

        <FormRow
          label="Description"
          error={getFieldError("description")}
        >
          <Textarea
            value={formData.description || ""}
            onChange={(e) => updateField("description", e.target.value)}
            placeholder="Card Description"
          />
        </FormRow>
      </FormSection>

      <FormSection title="Media">
        <FormRow label="Card Image">
          <ImageUpload
            bucket="featured-images"
            path="cards"
            onUpload={(url) => handleImageUpload("image_url", url)}
          />
        </FormRow>
      </FormSection>

      <FormSection title="Call to Action">
        <FormRow
          label="CTA Text"
          error={getFieldError("cta_text")}
        >
          <Input
            value={formData.cta_text || ""}
            onChange={(e) => updateField("cta_text", e.target.value)}
            placeholder="Call to Action Text"
          />
        </FormRow>

        <FormRow
          label="CTA Link"
          error={getFieldError("cta_link")}
        >
          <Input
            value={formData.cta_link || ""}
            onChange={(e) => updateField("cta_link", e.target.value)}
            placeholder="Call to Action Link"
          />
        </FormRow>
      </FormSection>

      <FormSection title="Display">
        <FormRow
          label="Display Order"
          error={getFieldError("display_order")}
        >
          <Input
            type="number"
            value={formData.display_order || 0}
            onChange={(e) => updateField("display_order", parseInt(e.target.value))}
            placeholder="Display Order"
          />
        </FormRow>
      </FormSection>

      <div className="flex items-center justify-between">
        <StatusSelect
          value={formData.status || "draft"}
          onChange={handleStatusChange}
        />
        <FormActions
          loading={loading}
          isDirty={isDirty}
          onCancel={() => confirmNavigation("/admin/featured")}
        />
      </div>
    </form>
  )
}
