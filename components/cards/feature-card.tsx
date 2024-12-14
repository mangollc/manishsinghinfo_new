import { LucideIcon } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  href: string
  category?: string
}

export function FeatureCard({ icon: Icon, title, description, href, category }: FeatureCardProps) {
  const getCategoryColor = (category?: string) => {
    if (!category) return 'text-primary'
    const catLower = category.toLowerCase()
    if (catLower.includes('immigration')) return 'text-[hsl(var(--immigration))]'
    if (catLower.includes('tax')) return 'text-[hsl(var(--tax))]'
    if (catLower.includes('tech')) return 'text-[hsl(var(--tech))]'
    if (catLower.includes('ai')) return 'text-[hsl(var(--ai))]'
    if (catLower.includes('business')) return 'text-[hsl(var(--business))]'
    if (catLower.includes('career')) return 'text-[hsl(var(--career))]'
    return 'text-primary'
  }

  return (
    <Card className={cn(
      "group relative overflow-hidden card-border card-shadow card-hover",
      "bg-card/50 dark:bg-card/30"
    )}>
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary/10 to-secondary/10">
          <Icon className={cn("h-8 w-8", getCategoryColor(category))} />
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <Link 
          href={href} 
          className="text-primary hover:text-primary/80 hover:underline inline-flex items-center space-x-1"
        >
          <span>Learn more</span>
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </CardContent>
    </Card>
  )
}