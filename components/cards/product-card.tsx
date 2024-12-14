import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  title: string
  description: string
  price: string
  tags: string[]
  image: string
}

export function ProductCard({ title, description, price, tags, image }: ProductCardProps) {
  const getTagVariant = (tag: string) => {
    const tagLower = tag.toLowerCase()
    if (tagLower.includes('featured')) return 'featured'
    if (tagLower.includes('new')) return 'new'
    if (tagLower.includes('immigration')) return 'immigration'
    if (tagLower.includes('tax')) return 'tax'
    if (tagLower.includes('tech')) return 'tech'
    if (tagLower.includes('ai')) return 'ai'
    if (tagLower.includes('business')) return 'business'
    return 'default'
  }

  return (
    <Card className={cn(
      "group overflow-hidden card-border card-shadow card-hover",
      "bg-card/50 dark:bg-card/30"
    )}>
      <CardHeader className="p-0">
        <div className="relative aspect-[5/3] overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="mb-3 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant={getTagVariant(tag)}>{tag}</Badge>
          ))}
        </div>
        <h3 className="mb-2 text-xl font-semibold tracking-tight">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter className="border-t border-muted/10 p-6">
        <div className="flex w-full items-center justify-between">
          <span className="text-lg font-bold">{price}</span>
          <Button>Learn More</Button>
        </div>
      </CardFooter>
    </Card>
  )
}