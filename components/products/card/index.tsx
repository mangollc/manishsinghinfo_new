import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils/theme"
import { ProductImage } from "./image"
import { ProductTags } from "./tags"
import { ProductContent } from "./content"
import { ProductFooter } from "./footer"
import type { Product } from "@/lib/constants/products"

interface ProductCardProps extends Product {
  className?: string
}

export function ProductCard({
  title,
  description,
  price,
  tags,
  image,
  className
}: ProductCardProps) {
  return (
    <Card className={cn(
      "flex flex-col transition-transform hover:scale-[1.02]",
      className
    )}>
      <CardHeader className="p-0">
        <ProductImage src={image} alt={title} />
      </CardHeader>
      <CardContent className="p-4">
        <ProductTags tags={tags} />
        <ProductContent title={title} description={description} />
      </CardContent>
      <CardFooter className="mt-auto p-4 pt-0">
        <ProductFooter price={price} />
      </CardFooter>
    </Card>
  );
}