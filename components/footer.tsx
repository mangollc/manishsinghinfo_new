import Link from "next/link"
import { Button } from "@/components/ui/button"
import { footerNavigation } from "@/config/navigation"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Resources</h4>
            <ul className="space-y-3 text-sm">
              {footerNavigation.resources.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-muted-foreground hover:text-primary">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Company</h4>
            <ul className="space-y-3 text-sm">
              {footerNavigation.company.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-muted-foreground hover:text-primary">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Products</h4>
            <ul className="space-y-3 text-sm">
              {footerNavigation.products.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-muted-foreground hover:text-primary">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Newsletter</h4>
            <p className="text-sm text-muted-foreground">
              Subscribe to our newsletter for updates and exclusive content.
            </p>
            <Button className="w-full">Subscribe</Button>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ManishSingh.info. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}