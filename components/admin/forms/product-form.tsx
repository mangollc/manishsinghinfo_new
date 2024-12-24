
"use client"

import { useFormFields } from "@/hooks/admin/use-form-fields"
import { useFormValidation } from "@/hooks/admin/use-form-validation"
import { useFormDirty } from "@/hooks/admin/use-form-dirty"
import { productSchema } from "@/lib/validations/product"
import { FormSection } from "./form-section"
import { FormRow } from "./form-row"
import { FormActions } from "./form-actions"
import { Input } from "@/components/ui/input"
import { ImageUpload } from "../shared/image-upload"
import { RichTextEditor } from "../shared/rich-text-editor"
import { TagInput } from "../shared/tag-input"
import { StatusSelect } from "../shared/status-select"
import { SEOFields } from "../shared/seo-fields"
import { ProductPricing } from "./product-pricing"
import { ProductFeatures } from "./product-features"
import { ProductGallery } from "./product-gallery"
import type { Product } from "@/lib/supabase/types"

interface ProductFormProps {
  product?: Product
}

export function ProductForm({ product }: ProductFormProps) {
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
    initialData: product,
    schema: productSchema,
    table: "products",
    id: product?.id,
    redirectTo: "/admin/products",
  })

  const { getFieldError } = useFormValidation(productSchema)
  const { isDirty, confirmNavigation } = useFormDirty(product || {})

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <FormSection title="Basic Information">
        <FormRow
          label="Product Name"
          error={getFieldError("name")}
        >
          <Input
            value={formData.name || ""}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Product Name"
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

        <FormRow label="Categories">
          <TagInput
            selectedTags={formData.tags || []}
            onTagsChange={handleTagsChange}
          />
        </FormRow>
      </FormSection>

      <FormSection title="Pricing">
        <ProductPricing
          regularPrice={formData.regular_price}
          discountedPrice={formData.discounted_price}
          onRegularPriceChange={(price) => updateField("regular_price", price)}
          onDiscountedPriceChange={(price) => updateField("discounted_price", price)}
        />
      </FormSection>

      <FormSection title="Description">
        <FormRow
          label="Short Description"
          error={getFieldError("short_description")}
        >
          <Input
            value={formData.short_description || ""}
            onChange={(e) => updateField("short_description", e.target.value)}
            placeholder="Brief description"
          />
        </FormRow>

        <FormRow
          label="Detailed Description"
          error={getFieldError("detailed_description")}
        >
          <RichTextEditor
            value={formData.detailed_description || ""}
            onChange={handleContentChange}
            placeholder="Write your detailed product description here..."
          />
        </FormRow>
      </FormSection>

      <FormSection title="Media">
        <FormRow label="Thumbnail Image">
          <ImageUpload
            bucket="product-images"
            path="thumbnails"
            onUpload={(url) => handleImageUpload("thumbnail_url", url)}
          />
        </FormRow>

        <FormRow label="Gallery Images">
          <ProductGallery
            urls={formData.gallery_urls || []}
            onUrlsChange={(urls) => updateField("gallery_urls", urls)}
          />
        </FormRow>
      </FormSection>

      <FormSection title="Features">
        <ProductFeatures
          features={formData.features || []}
          onFeaturesChange={(features) => updateField("features", features)}
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
          onCancel={() => confirmNavigation("/admin/products")}
        />
      </div>
    </form>
  )
}
