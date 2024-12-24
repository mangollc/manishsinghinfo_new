export type UserRole = 'admin' | 'editor' | 'author'
export type ContentStatus = 'draft' | 'published' | 'archived'

export interface User {
  id: string
  email: string
  raw_user_meta_data?: {
    full_name?: string
    role?: UserRole
  }
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string | null
  thumbnail_url: string | null
  feature_image_url: string | null
  author_id: string
  status: ContentStatus
  published_at: string | null
  meta_title: string | null
  meta_description: string | null
  created_at: string
  updated_at: string
  author?: User
  blog_posts_tags?: {
    tags: {
      id: string
      name: string
      slug: string
    }
  }[]
}

// ... rest of the types remain the same