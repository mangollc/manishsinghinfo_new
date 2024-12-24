"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase/client"

interface ImageUploadOptions {
  bucket: string
  path: string
  maxSize?: number // in bytes
  allowedTypes?: string[]
}

export function useImageUpload({
  bucket,
  path,
  maxSize = 5 * 1024 * 1024, // 5MB default
  allowedTypes = ["image/jpeg", "image/png", "image/webp"],
}: ImageUploadOptions) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const validateFile = (file: File) => {
    if (!allowedTypes.includes(file.type)) {
      throw new Error("Invalid file type")
    }
    if (file.size > maxSize) {
      throw new Error("File size too large")
    }
  }

  const upload = async (file: File) => {
    try {
      setUploading(true)
      setError(null)

      validateFile(file)

      const fileExt = file.name.split(".").pop()
      const filePath = `${path}/${Math.random()}.${fileExt}`

      const { error: uploadError, data } = await supabase.storage
        .from(bucket)
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath)

      return publicUrl
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Upload failed")
      setError(error)
      throw error
    } finally {
      setUploading(false)
    }
  }

  const remove = async (url: string) => {
    try {
      setError(null)
      const path = url.split("/").pop()
      if (!path) throw new Error("Invalid URL")

      const { error: deleteError } = await supabase.storage
        .from(bucket)
        .remove([path])

      if (deleteError) throw deleteError
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Deletion failed")
      setError(error)
      throw error
    }
  }

  return {
    upload,
    remove,
    uploading,
    error,
  }
}