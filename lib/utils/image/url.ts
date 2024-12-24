import { supabase } from "@/lib/supabase/client"

export function transformImageUrl(url: string | null): string | null {
  if (!url) return null
  
  // If it's already a full URL, return it
  if (url.startsWith('http')) return url
  
  // If it's a path from storage, get the public URL
  const { data } = supabase.storage
    .from('featured-images') // Default bucket
    .getPublicUrl(url)
    
  return data.publicUrl
}