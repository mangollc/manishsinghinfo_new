import { z } from "zod"
import { contentStatusEnum } from "./shared"

export const productSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, {
    message: "Slug can only contain lowercase letters, numbers, and hyphens",
  }),
  short_description: z.string().max(500).optional(),
  detailed_description: z.string().min(1, "Description is required"),
  regular_price: z.number().min(0, "Price must be positive"),
  discounted_price: z.number().min(0).optional().nullable(),
  thumbnail_url: z.string().url().optional().nullable(),
  gallery_urls: z.array(z.string().url()).optional(),
  features: z.array(z.string()).optional(),
  status: contentStatusEnum,
  meta_title: z.string().max(60).optional(),
  meta_description: z.string().max(160).optional(),
  tags: z.array(z.string()).optional(),
})

export type ProductFormData = z.infer<typeof productSchema>