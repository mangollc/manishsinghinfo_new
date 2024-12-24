import { z } from "zod"
import { contentStatusEnum } from "./shared"

export const blogPostSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, {
    message: "Slug can only contain lowercase letters, numbers, and hyphens",
  }),
  excerpt: z.string().max(500).optional(),
  content: z.string().min(1, "Content is required"),
  thumbnail_url: z.string().url().optional().nullable(),
  feature_image_url: z.string().url().optional().nullable(),
  status: contentStatusEnum,
  published_at: z.string().datetime().optional().nullable(),
  reading_time: z.number().min(1).optional(),
  meta_title: z.string().max(60).optional(),
  meta_description: z.string().max(160).optional(),
  tags: z.array(z.string()).optional(),
})

export type BlogPostFormData = z.infer<typeof blogPostSchema>