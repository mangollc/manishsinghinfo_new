"use client"

import { HeroBackground } from "./hero/hero-background"
import { HeroContent } from "./hero/hero-content"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background py-20 md:py-32">
      <HeroBackground />
      <div className="container relative">
        <HeroContent />
      </div>
    </section>
  )
}