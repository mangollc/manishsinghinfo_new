import { Container } from "@/components/ui/container"
import { FeaturesHeader } from "./header"
import { FeaturesGrid } from "./grid"

export function FeaturesSection() {
  return (
    <section className="border-t bg-muted/40 py-16 md:py-24">
      <Container>
        <FeaturesHeader />
        <FeaturesGrid />
      </Container>
    </section>
  );
}