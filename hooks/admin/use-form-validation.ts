"use client"

import { useState, useCallback } from "react"
import { ZodSchema, ZodError } from "zod"
import { ValidationError } from "@/lib/utils/error-handler"

export function useFormValidation<T>(schema: ZodSchema) {
  const [errors, setErrors] = useState<ValidationError | null>(null)

  const validateField = useCallback(async (field: keyof T, value: any) => {
    try {
      await schema.pick({ [field]: true }).parseAsync({ [field]: value })
      setErrors(prev => {
        if (!prev?.errors) return prev
        const { [field]: _, ...rest } = prev.errors
        return { ...prev, errors: rest }
      })
      return true
    } catch (error) {
      if (error instanceof ZodError) {
        setErrors(prev => ({
          message: "Validation failed",
          errors: {
            ...prev?.errors,
            [field]: error.errors.map(e => e.message)
          }
        }))
      }
      return false
    }
  }, [schema])

  const validateForm = useCallback(async (data: T) => {
    try {
      await schema.parseAsync(data)
      setErrors(null)
      return true
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors: Record<string, string[]> = {}
        error.errors.forEach(err => {
          const field = err.path.join(".")
          if (!formattedErrors[field]) {
            formattedErrors[field] = []
          }
          formattedErrors[field].push(err.message)
        })
        setErrors({
          message: "Please fix the following errors:",
          errors: formattedErrors
        })
      }
      return false
    }
  }, [schema])

  const getFieldError = useCallback((field: keyof T) => {
    return errors?.errors?.[field]?.[0]
  }, [errors])

  const clearErrors = useCallback(() => {
    setErrors(null)
  }, [])

  return {
    errors,
    validateField,
    validateForm,
    getFieldError,
    clearErrors,
  }
}