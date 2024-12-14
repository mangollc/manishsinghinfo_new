"use client"

import { Container } from "@/components/ui/container"
import { HeroBackground } from "./background"
import { HeroContent } from "./content"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background py-20 md:py-32">
      <HeroBackground />
      <Container>
        <HeroContent />
      </Container>
    </section>
  );
}