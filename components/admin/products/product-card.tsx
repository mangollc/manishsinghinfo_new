import Link from "next/link"
import Image from "next/image"
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/lib/supabase/types"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card>
      <CardHeader>
        {product.thumbnail_url && (
          <div className="relative h-40 w-full mb-4">
            <Image
              src={product.thumbnail_url}
              alt={product.name}
              fill
              className="object-cover rounded"
            />
          </div>
        )}
        <CardTitle>{product.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{product.short_description}</p>
        <div className="mt-2 flex gap-2">
          {product.tags?.map((tag) => (
            <Badge key={tag.id} variant="secondary">
              {tag.name}
            </Badge>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-2">
          <span className="text-lg font-bold">${product.regular_price}</span>
          {product.discounted_price && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.discounted_price}
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" asChild>
          <Link href={`/admin/products/${product.id}`}>Edit</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}