"use client"

import { useCallback } from "react"
import { useFormState } from "./use-form-state"
import { slugify } from "@/lib/validations/shared"
import type { ZodSchema } from "zod"

interface FormFieldsOptions<T> {
  initialData?: Partial<T>
  schema: ZodSchema
  table: string
  id?: string
  onSuccess?: (data: T) => void
  redirectTo?: string
}

export function useFormFields<T extends Record<string, any>>({
  initialData,
  schema,
  table,
  id,
  onSuccess,
  redirectTo,
}: FormFieldsOptions<T>) {
  const {
    formData,
    updateField,
    handleSubmit,
    loading,
  } = useFormState<T>({
    initialData,
    schema,
    table,
    id,
    onSuccess,
    redirectTo,
  })

  const handleTitleChange = useCallback((title: string) => {
    updateField('title', title)
    if (!id) { // Only auto-generate slug for new items
      updateField('slug', slugify(title))
    }
  }, [updateField, id])

  const handleContentChange = useCallback((content: string) => {
    updateField('content', content)
    // Auto-generate meta description if not set
    if (!formData.meta_description) {
      const stripped = content.replace(/[#*`]/g, '').trim()
      const description = stripped.length > 160
        ? `${stripped.substring(0, 157)}...`
        : stripped
      updateField('meta_description', description)
    }
  }, [updateField, formData.meta_description])

  const handleTagsChange = useCallback((tags: string[]) => {
    updateField('tags', tags)
  }, [updateField])

  const handleImageUpload = useCallback((field: keyof T, url: string) => {
    updateField(field, url)
  }, [updateField])

  const handleStatusChange = useCallback((status: string) => {
    updateField('status', status)
    if (status === 'published' && !formData.published_at) {
      updateField('published_at', new Date().toISOString())
    }
  }, [updateField, formData.published_at])

  return {
    formData,
    loading,
    handleSubmit,
    handleTitleChange,
    handleContentChange,
    handleTagsChange,
    handleImageUpload,
    handleStatusChange,
    updateField,
  }
}