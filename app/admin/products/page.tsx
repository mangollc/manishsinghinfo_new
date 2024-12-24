import { ProductList } from "@/components/admin/products/product-list"
import { ProductHeader } from "@/components/admin/products/header"

export default function ProductsAdmin() {
  return (
    <div className="space-y-8">
      <ProductHeader />
      <ProductList />
    </div>
  )
}