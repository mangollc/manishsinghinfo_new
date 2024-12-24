
import { supabase } from "./client"

export const STORAGE_BUCKETS = {
  BLOG: 'blog-images',
  PRODUCT: 'product-images',
  PAGE: 'page-images',
  FEATURED: 'featured-images'
} as const

export async function uploadImage(
  bucket: string,
  path: string,
  file: File
): Promise<string> {
  try {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      throw new Error('Only image files are allowed')
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      throw new Error('File size must be less than 5MB')
    }

    // Generate unique filename
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
    const filePath = `${path}/${fileName}`

    // Upload file
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
    if (urlParts.length !== 2) throw new Error('Invalid storage URL')

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
