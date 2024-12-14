import Link from "next/link"
import { cn } from "@/lib/utils/theme"
import type { FooterSection } from "@/lib/constants/footer"

interface FooterNavSectionProps extends FooterSection {
  className?: string
}

export function FooterNavSection({ title, links, className }: FooterNavSectionProps) {
  return (
    <div className={cn("space-y-6", className)}>
      <h4 className="text-base font-semibold tracking-wide text-foreground">{title}</h4>
      <ul className="space-y-4">
        {links.map((link) => (
          <li key={link.href}>
            <Link 
              href={link.href} 
              className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}