import { HeroSection } from "@/components/sections/hero-section"
import { FeaturesSection } from "@/components/sections/features-section"
import { FeaturedProducts } from "@/components/sections/featured-products"
import { FeaturedBlogs } from "@/components/sections/featured-blogs"
import { CTASection } from "@/components/sections/cta-section"

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <FeaturedProducts />
      <FeaturedBlogs />
      <CTASection />
    </>
  )
}