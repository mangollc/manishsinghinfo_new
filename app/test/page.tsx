"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LoadingState } from "@/components/admin/shared/loading-state"
import { ErrorState } from "@/components/admin/shared/error-state"

export default function TestPage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    async function testConnection() {
      try {
        const { count, error } = await supabase
          .from("blog_posts")
          .select("*", { count: "exact", head: true })

        if (error) throw error

        setCount(count)
      } catch (error) {
        console.error("Error testing connection:", error)
        setError(error instanceof Error ? error : new Error("Failed to connect to Supabase"))
      } finally {
        setLoading(false)
      }
    }

    testConnection()
  }, [])

  if (loading) return <LoadingState />
  if (error) return <ErrorState error={error} />

  return (
    <div className="container mx-auto p-8">
      <Card>
        <CardHeader>
          <CardTitle>Supabase Connection Test</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-green-600">
            Connected successfully! Found {count} blog posts.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}