import { Container } from "@/components/ui/container"
import { DesktopFooterNav } from "./desktop-nav"
import { MobileFooterNav } from "./mobile-nav"
import { Newsletter } from "./newsletter"
import { Copyright } from "./copyright"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <Container className="py-12 md:py-16">
        <div className="grid gap-8">
          <div className="grid gap-8">
            <DesktopFooterNav />
            <MobileFooterNav />
          </div>
          <div className="mx-auto w-full max-w-md">
            <Newsletter />
          </div>
        </div>
        <Copyright />
      </Container>
    </footer>
  )
}