export interface DashboardStats {
  totalPosts: number
  publishedPosts: number
  totalProducts: number
  publishedProducts: number
  totalFeatured: number
  activeFeatured: number
  totalPages: number
  publishedPages: number
}

export interface StatCardProps {
  title: string
  value: number
  subValue?: string
}