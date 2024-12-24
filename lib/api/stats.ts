import { supabase } from "@/lib/supabase/client"
import type { DashboardStats } from "@/lib/types/dashboard"

export async function fetchDashboardStats(): Promise<DashboardStats> {
  try {
    const [
      { count: totalPosts },
      { count: publishedPosts },
      { count: totalProducts },
      { count: publishedProducts },
      { count: totalFeatured },
      { count: activeFeatured },
      { count: totalPages },
      { count: publishedPages },
    ] = await Promise.all([
      supabase.from("blog_posts").select("*", { count: "exact", head: true }),
      supabase.from("blog_posts").select("*", { count: "exact", head: true }).eq("status", "published"),
      supabase.from("products").select("*", { count: "exact", head: true }),
      supabase.from("products").select("*", { count: "exact", head: true }).eq("status", "published"),
      supabase.from("featured_cards").select("*", { count: "exact", head: true }),
      supabase.from("featured_cards").select("*", { count: "exact", head: true }).eq("status", "published"),
      supabase.from("information_pages").select("*", { count: "exact", head: true }),
      supabase.from("information_pages").select("*", { count: "exact", head: true }).eq("status", "published"),
    ])

    return {
      totalPosts: totalPosts || 0,
      publishedPosts: publishedPosts || 0,
      totalProducts: totalProducts || 0,
      publishedProducts: publishedProducts || 0,
      totalFeatured: totalFeatured || 0,
      activeFeatured: activeFeatured || 0,
      totalPages: totalPages || 0,
      publishedPages: publishedPages || 0,
    }
  } catch (error) {
    console.error("Error fetching dashboard stats:", error)
    throw error
  }
}