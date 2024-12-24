
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { handleError } from "@/lib/utils/error-handler"
import { supabase } from "@/lib/supabase/client"
import type { ZodSchema } from "zod"

interface FormSubmitOptions<T> {
  schema: ZodSchema
  table: string
  id?: string
  onSuccess?: (data: T) => void
  redirectTo?: string
  transformData?: (data: T) => any
}

export function useFormSubmit<T>({
  schema,
  table,
  id,
  onSuccess,
  redirectTo,
  transformData,
}: FormSubmitOptions<T>) {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const submit = async (data: T) => {
    try {
      setLoading(true)

      // Validate data
      const validatedData = await schema.parseAsync(data)

      // Transform data if needed
      const finalData = transformData ? transformData(validatedData) : validatedData

      // Update or insert data
      const { error } = id
        ? await supabase
            .from(table)
            .update(finalData)
            .eq('id', id)
        : await supabase
            .from(table)
            .insert([finalData])

      if (error) throw error

      toast({
        title: "Success",
        description: `${id ? "Updated" : "Created"} successfully.`,
        variant: "success",
      })

      onSuccess?.(validatedData)
      
      if (redirectTo) {
        router.push(redirectTo)
      }
    } catch (error) {
      const handledError = handleError(error)
      
      toast({
        title: "Error",
        description: handledError.message,
        variant: "destructive",
      })

      throw handledError
    } finally {
      setLoading(false)
    }
  }

  return {
    submit,
    loading,
  }
}
