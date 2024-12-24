"use client"

import { useState } from "react"
import type { ValidationError } from "@/lib/utils/error-handler"

export function useFormError() {
  const [error, setError] = useState<ValidationError | null>(null)

  const clearError = () => setError(null)
  
  const getFieldError = (field: string) => {
    if (!error?.errors) return undefined
    return error.errors[field]?.[0]
  }

  return {
    error,
    setError,
    clearError,
    getFieldError,
  }
}