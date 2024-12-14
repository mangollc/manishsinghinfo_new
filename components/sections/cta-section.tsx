import { Container } from "@/components/ui/container"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="border-t py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold">Get Started Today</h2>
          <p className="mb-8 text-muted-foreground">
            Begin your journey with ManishSingh.info. Sign up now for premium content, personalized guidance, and ongoing
            support as you navigate the path to personal and professional growth.
          </p>
          <Button size="lg" asChild>
            <Link href="/register">Start Your Journey</Link>
          </Button>
        </div>
      </Container>
    </section>
  )
}