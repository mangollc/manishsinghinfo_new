import { z } from "zod"

export const contentStatusEnum = z.enum(["draft", "published", "archived"])

export const slugify = (str: string) => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export const generateMetaTitle = (title: string) => {
  return title.length > 60 ? `${title.substring(0, 57)}...` : title
}

export const generateMetaDescription = (content: string) => {
  const stripped = content.replace(/[#*`]/g, "").trim()
  return stripped.length > 160
    ? `${stripped.substring(0, 157)}...`
    : stripped
}