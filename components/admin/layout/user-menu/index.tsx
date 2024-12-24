"use client"

import { UserMenuTrigger } from "./user-menu-trigger"
import { UserMenuContent } from "./user-menu-content"
import { useAuth } from "@/hooks/use-auth"

export function UserMenu() {
  const { user } = useAuth()
  
  if (!user) return null

  return (
    <div className="ml-auto flex items-center gap-4">
      <UserMenuTrigger user={user} />
      <UserMenuContent />
    </div>
  )
}