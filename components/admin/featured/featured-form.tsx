"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ImageUpload } from "../shared/image-upload"
import { StatusSelect } from "../shared/status-select"
import { FormSection } from "../forms/form-section"
import { FormRow } from "../forms/form-row"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/lib/supabase/client"
import { featuredCardSchema, defaultFeaturedCardValues } from "@/lib/validations/featured"
import type { FeaturedCard } from "@/lib/supabase/types"

interface FeaturedFormProps {
  card?: FeaturedCard
}

export function FeaturedForm({ card }: FeaturedFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    ...defaultFeaturedCardValues,
    ...card
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Validate form data
      const validatedData = await featuredCardSchema.parseAsync(formData)

      // Update or insert data
      const { error } = card
        ? await supabase
            .from("featured_cards")
            .update(validatedData)
            .eq("id", card.id)
        : await supabase
            .from("featured_cards")
            .insert([validatedData])

      if (error) throw error

      toast({
        title: "Success",
        description: `Featured card ${card ? "updated" : "created"} successfully.`,
      })

      router.push("/admin/featured")
      router.refresh()
    } catch (error) {
      console.error("Error saving featured card:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save featured card",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <FormSection title="Basic Information">
        <FormRow label="Title" required>
          <Input
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Card Title"
          />
        </FormRow>

        <FormRow label="Description">
          <Textarea
            value={formData.description || ""}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Card Description"
          />
        </FormRow>
      </FormSection>

      <FormSection title="Media">
        <FormRow label="Card Image">
          <ImageUpload
            bucket="featured-images"
            path="cards"
            value={formData.image_url}
            onUpload={(url) => setFormData({ ...formData, image_url: url })}
            onRemove={() => setFormData({ ...formData, image_url: null })}
          />
        </FormRow>
      </FormSection>

      <FormSection title="Call to Action">
        <FormRow label="CTA Text">
          <Input
            value={formData.cta_text || ""}
            onChange={(e) => setFormData({ ...formData, cta_text: e.target.value })}
            placeholder="Call to Action Text"
          />
        </FormRow>

        <FormRow label="CTA Link">
          <Input
            value={formData.cta_link || ""}
            onChange={(e) => setFormData({ ...formData, cta_link: e.target.value })}
            placeholder="Call to Action Link"
          />
        </FormRow>
      </FormSection>

      <FormSection title="Display">
        <FormRow label="Display Order" required>
          <Input
            type="number"
            min={0}
            value={formData.display_order}
            onChange={(e) => setFormData({ 
              ...formData, 
              display_order: parseInt(e.target.value) || 0 
            })}
            placeholder="Display Order"
          />
        </FormRow>
      </FormSection>

      <div className="flex items-center justify-between">
        <StatusSelect
          value={formData.status}
          onChange={(status) => setFormData({ ...formData, status })}
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Card"}
        </Button>
      </div>
    </form>
  )
}