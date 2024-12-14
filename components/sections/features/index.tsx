import { Container } from "@/components/ui/container"
import { FeatureCard } from "@/components/cards/feature-card"
import { features } from "./feature-list"

export function FeaturesSection() {
  return (
    <section className="border-t bg-muted/40 py-16 md:py-24">
      <Container>
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">Key Offerings</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Comprehensive resources and expert guidance to help you navigate complex challenges and achieve your goals.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.href} {...feature} />
          ))}
        </div>
      </Container>
    </section>
  )
}