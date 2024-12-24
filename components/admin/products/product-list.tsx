"use client"

import { useProducts } from "@/hooks/admin/use-products"
import { ProductCard } from "./product-card"
import { LoadingState } from "../shared/loading-state"
import { ErrorState } from "../shared/error-state"

export function ProductList() {
  const { products, loading, error } = useProducts()

  if (loading) return <LoadingState />
  if (error) return <ErrorState error={error} />

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}