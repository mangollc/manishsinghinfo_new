import Link from "next/link"

interface FooterSectionProps {
  title: string
  links: {
    name: string
    href: string
  }[]
}

export function FooterSection({ title, links }: FooterSectionProps) {
  return (
    <div className="space-y-4">
      <h4 className="text-sm font-medium">{title}</h4>
      <ul className="space-y-3 text-sm">
        {links.map((link) => (
          <li key={link.href}>
            <Link 
              href={link.href} 
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}