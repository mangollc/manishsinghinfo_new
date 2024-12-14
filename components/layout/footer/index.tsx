import { Container } from "@/components/ui/container"
import { FooterNavSection } from "./nav/section"
import { MobileFooterNav } from "./nav/mobile"
import { Newsletter } from "./newsletter"
import { Copyright } from "./copyright"
import { FOOTER_SECTIONS } from "@/lib/constants/footer"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <Container>
        {/* Desktop Layout */}
        <div className="hidden md:block py-12">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-4 gap-8">
              {/* Resources Column */}
              <FooterNavSection {...FOOTER_SECTIONS.resources} />

              {/* Company Column */}
              <FooterNavSection {...FOOTER_SECTIONS.company} />

              {/* Products Column */}
              <FooterNavSection {...FOOTER_SECTIONS.products} />

              {/* Newsletter Column */}
              <Newsletter />
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden py-8">
          <MobileFooterNav />
          <div className="mt-8 border-t pt-8">
            <Newsletter />
          </div>
        </div>

        {/* Copyright - Centered for both layouts */}
        <div className="border-t py-8">
          <Copyright />
        </div>
      </Container>
    </footer>
  )
}