"use client"

import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"
import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import { signOut } from "@/lib/api/auth"

export function UserMenuContent() {
  const router = useRouter()
  const { toast } = useToast()

  const handleLogout = async () => {
    try {
      await signOut()
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      })
      router.push("/login")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <DropdownMenuContent align="end">
      <DropdownMenuItem onClick={handleLogout} className="text-destructive">
        <LogOut className="mr-2 h-4 w-4" />
        Logout
      </DropdownMenuItem>
    </DropdownMenuContent>
  )
}