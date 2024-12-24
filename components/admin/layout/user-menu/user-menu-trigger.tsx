"use client"

import { User } from "@supabase/supabase-js"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UserCircle } from "lucide-react"

interface UserMenuTriggerProps {
  user: User
}

export function UserMenuTrigger({ user }: UserMenuTriggerProps) {
  const fullName = user.user_metadata?.full_name || user.email

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2">
          <UserCircle className="h-5 w-5" />
          <span className="hidden md:inline-block">{fullName}</span>
        </Button>
      </DropdownMenuTrigger>
    </DropdownMenu>
  )
}