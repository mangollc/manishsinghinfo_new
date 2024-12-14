"use client"

import { useState } from "react"
import { Container } from "@/components/ui/container"
import { ProductHeader } from "./header"
import { ProductCategories } from "./categories"
import { ProductGrid } from "./grid"
import type { ProductCategory } from "@/lib/constants/products"

export function ProductsSection() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>("courses")

  return (
    <section className="border-t py-16 md:py-24">
      <Container>
        <ProductHeader />
        <ProductCategories
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
        <ProductGrid category={activeCategory} />
      </Container>
    </section>
  );
}