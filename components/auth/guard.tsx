"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/use-auth"
import { LoadingState } from "@/components/admin/shared/loading-state"

interface AuthGuardProps {
  children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter()
  const { toast } = useToast()
  const { user, loading } = useAuth()

  useEffect(() => {
    if (!loading && !user) {
      toast({
        title: "Access Denied",
        description: "Please log in to access the admin area",
        variant: "destructive",
      })
      router.push("/login")
    }
  }, [loading, user, router, toast])

  if (loading) {
    return <LoadingState text="Checking authentication..." />
  }

  if (!user) {
    return null
  }

  return <>{children}</>
}