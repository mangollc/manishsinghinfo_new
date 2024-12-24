import { z } from "zod"
import { contentStatusEnum } from "./shared"

export const featuredCardSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  description: z.string().max(500).optional().nullable(),
  image_url: z.string().url().optional().nullable(),
  cta_text: z.string().max(50).optional().nullable(),
  cta_link: z.string().url().optional().nullable(),
  display_order: z.number().min(0, "Display order is required"),
  status: contentStatusEnum
})

export type FeaturedCardFormData = z.infer<typeof featuredCardSchema>

export const defaultFeaturedCardValues: Partial<FeaturedCardFormData> = {
  title: "",
  description: "",
  image_url: null,
  cta_text: "",
  cta_link: "",
  display_order: 0,
  status: "draft"
}