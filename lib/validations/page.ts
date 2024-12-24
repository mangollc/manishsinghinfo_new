import { z } from "zod"
import { contentStatusEnum } from "./shared"

const sectionSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("text"),
    content: z.string(),
  }),
  z.object({
    type: z.literal("image"),
    content: z.string().url(),
  }),
  z.object({
    type: z.literal("gallery"),
    content: z.array(z.string().url()),
  }),
  z.object({
    type: z.literal("cta"),
    content: z.object({
      text: z.string(),
      link: z.string().url(),
    }),
  }),
])

export const pageSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, {
    message: "Slug can only contain lowercase letters, numbers, and hyphens",
  }),
  content: z.string().optional(),
  banner_image_url: z.string().url().optional().nullable(),
  sections: z.array(sectionSchema).optional(),
  status: contentStatusEnum,
  meta_title: z.string().max(60).optional(),
  meta_description: z.string().max(160).optional(),
})

export type PageFormData = z.infer<typeof pageSchema>