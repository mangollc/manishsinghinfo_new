import Link from "next/link"
import { Button } from "@/components/ui/button"

export function ProductHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold">Products</h1>
        <p className="text-muted-foreground">
          Manage your digital products and resources
        </p>
      </div>
      <Button asChild>
        <Link href="/admin/products/new">Create New Product</Link>
      </Button>
    </div>
  )
}