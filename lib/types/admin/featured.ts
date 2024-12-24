export interface FeaturedCard {
  id: string
  title: string
  description: string | null
  image_url: string | null
  cta_text: string | null
  cta_link: string | null
  display_order: number | null
  status: 'draft' | 'published' | 'archived'
  created_at: string
  updated_at: string
}

export interface FeaturedCardInput {
  title: string
  description?: string | null
  image_url?: string | null
  cta_text?: string | null
  cta_link?: string | null
  display_order?: number | null
  status?: 'draft' | 'published' | 'archived'
}