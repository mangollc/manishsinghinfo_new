import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface BlogCardProps {
  title: string
  excerpt: string
  author: string
  date: string
  tags: string[]
  image: string
}

export function BlogCard({ title, excerpt, author, date, tags, image }: BlogCardProps) {
  const getTagVariant = (tag: string) => {
    const tagLower = tag.toLowerCase()
    if (tagLower.includes('immigration')) return 'immigration'
    if (tagLower.includes('tax')) return 'tax'
    if (tagLower.includes('tech')) return 'tech'
    if (tagLower.includes('ai')) return 'ai'
    if (tagLower.includes('business')) return 'business'
    if (tagLower.includes('guide')) return 'guide'
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
        <Link href="#" className="group-hover:text-primary">
          <h3 className="mb-2 text-xl font-semibold tracking-tight">{title}</h3>
        </Link>
        <p className="text-sm text-muted-foreground">{excerpt}</p>
      </CardContent>
      <CardFooter className="border-t border-muted/10 p-6 text-sm text-muted-foreground">
        <div className="flex items-center space-x-2">
          <span>{author}</span>
          <span>•</span>
          <span>{date}</span>
        </div>
      </CardFooter>
    </Card>
  )
}