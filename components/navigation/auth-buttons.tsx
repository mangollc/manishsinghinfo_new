import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./theme-toggle"

export function AuthButtons() {
  return (
    <div className="flex items-center gap-2 sm:gap-4">
      <ThemeToggle />
      <Button 
        variant="ghost" 
        className="hidden sm:inline-flex hover:bg-primary/10" 
        asChild
      >
        <Link href="/login">Login / Signup</Link>
      </Button>
    </div>
  )
}