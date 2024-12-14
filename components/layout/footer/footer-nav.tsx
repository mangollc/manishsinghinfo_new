import Link from "next/link"
import { footerNavigation } from "@/config/navigation"

export function FooterNav() {
  return (
    <>
      <FooterSection title="Resources" items={footerNavigation.resources} />
      <FooterSection title="Company" items={footerNavigation.company} />
      <FooterSection title="Products" items={footerNavigation.products} />
    </>
  )
}

interface FooterSectionProps {
  title: string
  items: Array<{ name: string; href: string }>
}

function FooterSection({ title, items }: FooterSectionProps) {
  return (
    <div className="space-y-4">
      <h4 className="text-sm font-medium">{title}</h4>
      <ul className="space-y-3 text-sm">
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="text-muted-foreground hover:text-primary">
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}