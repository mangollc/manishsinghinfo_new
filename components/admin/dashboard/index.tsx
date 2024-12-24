"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { DashboardHeader } from "./header"
import { DashboardContent } from "./content"
import { LoadingState } from "../shared/loading-state"

export function Dashboard() {
  const router = useRouter()
  const { user, loading } = useAuth()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [loading, user, router])

  if (loading) {
    return <LoadingState text="Loading dashboard..." />
  }

  if (!user) {
    return null
  }

  return (
    <div className="space-y-8">
      <DashboardHeader user={user} />
      <DashboardContent />
    </div>
  )
}