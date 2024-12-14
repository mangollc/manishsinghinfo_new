import { Button } from "@/components/ui/button"

export function NewsletterSection() {
  return (
    <div className="space-y-4">
      <h4 className="text-sm font-medium">Newsletter</h4>
      <p className="text-sm text-muted-foreground">
        Subscribe to our newsletter for updates and exclusive content.
      </p>
      <Button className="w-full">Subscribe</Button>
    </div>
  )
}