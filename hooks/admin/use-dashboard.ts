
"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase/client"

interface DashboardStats {
  totalPosts: number
  publishedPosts: number
  totalProducts: number
  publishedProducts: number
  totalFeatured: number
  activeFeatured: number
  totalPages: number
  publishedPages: number
}

interface DashboardActivity {
  id: string
  description: string
  user: string
  timestamp: string
}

interface DashboardDraft {
  id: string
  title: string
  type: string
  updatedAt: string
}

export function useDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [activity, setActivity] = useState<DashboardActivity[]>([])
  const [drafts, setDrafts] = useState<DashboardDraft[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        // Fetch stats
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
          supabase.from("blog_posts").select("*", { count: "exact" }),
          supabase.from("blog_posts").select("*", { count: "exact" }).eq("status", "published"),
          supabase.from("products").select("*", { count: "exact" }),
          supabase.from("products").select("*", { count: "exact" }).eq("status", "published"),
          supabase.from("featured_cards").select("*", { count: "exact" }),
          supabase.from("featured_cards").select("*", { count: "exact" }).eq("status", "published"),
          supabase.from("information_pages").select("*", { count: "exact" }),
          supabase.from("information_pages").select("*", { count: "exact" }).eq("status", "published"),
        ])

        setStats({
          totalPosts: totalPosts || 0,
          publishedPosts: publishedPosts || 0,
          totalProducts: totalProducts || 0,
          publishedProducts: publishedProducts || 0,
          totalFeatured: totalFeatured || 0,
          activeFeatured: activeFeatured || 0,
          totalPages: totalPages || 0,
          publishedPages: publishedPages || 0,
        })

        // Fetch recent activity
        const { data: activityData } = await supabase
          .from("activity_log")
          .select(`
            id,
            description,
            users (full_name),
            created_at
          `)
          .order("created_at", { ascending: false })
          .limit(5)

        if (activityData) {
          setActivity(activityData.map(item => ({
            id: item.id,
            description: item.description,
            user: item.users.full_name,
            timestamp: item.created_at,
          })))
        }

        // Fetch draft items
        const { data: draftsData } = await supabase
          .from("blog_posts")
          .select("id, title, updated_at")
          .eq("status", "draft")
          .order("updated_at", { ascending: false })
          .limit(5)

        if (draftsData) {
          setDrafts(draftsData.map(item => ({
            id: item.id,
            title: item.title,
            type: "blog",
            updatedAt: item.updated_at,
          })))
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err)
        setError(err instanceof Error ? err : new Error("Failed to fetch dashboard data"))
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  return {
    stats,
    activity,
    drafts,
    loading,
    error,
  }
}
```