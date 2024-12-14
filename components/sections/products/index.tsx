"use client"

import { useState } from "react"
import { Container } from "@/components/ui/container"
import { ProductsHeader } from "./header"
import { CategoryTabs } from "./categories/category-tabs"
import { ProductGrid } from "./grid"
import type { ProductCategory } from "@/lib/constants/products"

export function ProductsSection() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>("courses")

  return (
    <section className="border-t py-16 md:py-24">
      <Container>
        <ProductsHeader />
        <CategoryTabs
          activeCategory={activeCategory}
          onCategoryChange={(category) => setActiveCategory(category as ProductCategory)}
        />
        <ProductGrid category={activeCategory} />
      </Container>
    </section>
  );
}