import { supabase } from "@/lib/supabase/client"
import { validateImage } from "./validation"
import { generateUniqueFilename } from "./filename"

export interface UploadOptions {
  maxSize?: number
  allowedTypes?: string[]
}

export async function uploadImage(
  bucket: string,
  path: string,
  file: File,
  options?: UploadOptions
): Promise<string> {
  try {
    // Validate the image
    validateImage(file, options)

    // Generate unique filename
    const filename = generateUniqueFilename(file.name)
    const filePath = `${path}/${filename}`

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (uploadError) throw uploadError

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath)

    return publicUrl
  } catch (error) {
    console.error('Error uploading image:', error)
    throw error
  }
}

export async function deleteImage(url: string): Promise<void> {
  try {
    // Extract bucket and path from URL
    const urlParts = url.split('/storage/v1/object/public/')
    if (urlParts.length !== 2) {
      throw new Error('Invalid storage URL')
    }

    const [bucket, path] = urlParts[1].split('/', 1)

    const { error } = await supabase.storage
      .from(bucket)
      .remove([path])

    if (error) throw error
  } catch (error) {
    console.error('Error deleting image:', error)
    throw error
  }
}