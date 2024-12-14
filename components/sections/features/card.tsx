import { cn } from "@/lib/utils/theme"
import Link from "next/link"
import type { Feature } from "@/lib/constants/features"

interface FeatureCardProps extends Feature {
  className?: string
}

export function FeatureCard({ 
  icon: Icon, 
  title, 
  description, 
  href, 
  category,
  className 
}: FeatureCardProps) {
  return (
    <div className={cn(
      "group relative overflow-hidden rounded-lg border p-6 transition-all",
      "bg-card/50 dark:bg-card/30",
      "hover:shadow-lg dark:hover:bg-muted/5",
      className
    )}>
      <div className={cn(
        "mb-4 flex h-12 w-12 items-center justify-center rounded-full",
        "bg-gradient-to-br from-primary/10 to-secondary/10"
      )}>
        <Icon className={cn(
          "h-6 w-6",
          `text-[hsl(var(--${category}))]`
        )} />
      </div>
      
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <p className="mb-4 text-sm text-muted-foreground">{description}</p>
      
      <Link 
        href={href} 
        className={cn(
          "inline-flex items-center text-sm font-medium",
          "text-primary hover:text-primary/80",
          "transition-colors hover:underline"
        )}
      >
        <span>Learn more</span>
        <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
      </Link>
    </div>
  );
}