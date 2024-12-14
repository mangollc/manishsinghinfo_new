import { Linkedin, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SocialIcons() {
  return (
    <div className="flex items-center justify-center gap-4">
      <Button
        variant="ghost"
        size="icon"
        className="hover:text-primary"
        asChild
      >
        <a 
          href="https://linkedin.com/in/manishsingh" 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="LinkedIn Profile"
        >
          <Linkedin className="h-5 w-5" />
        </a>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="hover:text-primary"
        asChild
      >
        <a 
          href="https://twitter.com/manishsingh" 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="Twitter Profile"
        >
          <Twitter className="h-5 w-5" />
        </a>
      </Button>
    </div>
  )
}