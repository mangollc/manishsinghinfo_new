"use client"

import { PRODUCTS } from "@/lib/constants/products"
import { ProductCard } from "./product-card"
import type { ProductCategory } from "@/lib/constants/products"

interface ProductGridProps {
  category: ProductCategory
}

export function ProductGrid({ category }: ProductGridProps) {
  const products = PRODUCTS[category]

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product, index) => (
        <ProductCard key={index} {...product} />
      ))}
    </div>
  );
}