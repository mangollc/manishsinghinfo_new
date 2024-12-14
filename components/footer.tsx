import { Container } from "@/components/ui/container"
import { FooterSection } from "@/components/footer/footer-section"
import { MobileFooterSection } from "@/components/footer/mobile-footer-section"
import { NewsletterSection } from "@/components/footer/newsletter-section"
import { footerNavigation } from "@/config/navigation"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <Container className="py-8 md:py-12">
        {/* Mobile Footer (Collapsible) */}
        <div className="block md:hidden space-y-4">
          <MobileFooterSection title="Resources" links={footerNavigation.resources} />
          <MobileFooterSection title="Company" links={footerNavigation.company} />
          <MobileFooterSection title="Products" links={footerNavigation.products} />
          <div className="border-t pt-4">
            <NewsletterSection />
          </div>
        </div>

        {/* Desktop Footer */}
        <div className="hidden md:grid md:grid-cols-4 md:gap-8">
          <FooterSection title="Resources" links={footerNavigation.resources} />
          <FooterSection title="Company" links={footerNavigation.company} />
          <FooterSection title="Products" links={footerNavigation.products} />
          <NewsletterSection />
        </div>

        <div className="mt-8 border-t pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ManishSingh.info. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  )
}