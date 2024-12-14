import { HeroSection } from "@/components/sections/hero"
import { FeaturesSection } from "@/components/sections/features"
import { ProductsSection } from "@/components/products"
import { BlogSection } from "@/components/blog"

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <ProductsSection />
      <BlogSection />
    </main>
  )
}