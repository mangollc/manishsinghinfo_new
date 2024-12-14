import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn, getTagVariant } from "@/lib/utils/theme"
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
        <div className="relative aspect-video">
          <Image
            src={image}
            alt={title}
            fill
            className="rounded-t-lg object-cover"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="mb-2 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant={getTagVariant(tag)}>{tag}</Badge>
          ))}
        </div>
        <h3 className="line-clamp-2 text-lg font-semibold">{title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter className="mt-auto p-4 pt-0">
        <div className="flex w-full items-center justify-between">
          <span className="text-lg font-bold">{price}</span>
          <Button>Learn More</Button>
        </div>
      </CardFooter>
    </Card>
  );
}