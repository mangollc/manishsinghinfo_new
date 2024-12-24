
"use client"

import { useState, useCallback } from "react"
import { useFormSubmit } from "./use-form-submit"
import type { ZodSchema } from "zod"

interface FormStateOptions<T> {
  initialData?: Partial<T>
  schema: ZodSchema
  table: string
  id?: string
  onSuccess?: (data: T) => void
  redirectTo?: string
}

export function useFormState<T extends Record<string, any>>({
  initialData = {},
  schema,
  table,
  id,
  onSuccess,
  redirectTo,
}: FormStateOptions<T>) {
  const [formData, setFormData] = useState<Partial<T>>(initialData)
  const { submit, loading } = useFormSubmit<T>({
    schema,
    table,
    id,
    onSuccess,
    redirectTo,
  })

  const updateField = useCallback((field: keyof T, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await submit(formData as T)
  }

  return {
    formData,
    updateField,
    handleSubmit,
    loading,
  }
}
