import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils/theme"
import type { BlogPost } from "@/lib/constants/blog"

interface PostCardProps extends BlogPost {
  className?: string
}

export function PostCard({ 
  title, 
  excerpt, 
  author, 
  date, 
  tags, 
  image,
  className 
}: PostCardProps) {
  return (
    <Card className={cn(
      "flex flex-col overflow-hidden transition-transform hover:scale-[1.02]",
      className
    )}>
      <CardHeader className="p-0">
        <div className="relative aspect-video">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="mb-2 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="outline">{tag}</Badge>
          ))}
        </div>
        <Link href="#" className="block group">
          <h3 className="text-lg font-semibold group-hover:text-primary">
            {title}
          </h3>
        </Link>
        <p className="mt-2 text-sm text-muted-foreground">{excerpt}</p>
      </CardContent>
      <CardFooter className="mt-auto p-4 pt-0 text-sm text-muted-foreground">
        <div className="flex items-center space-x-2">
          <span>{author}</span>
          <span>•</span>
          <span>{date}</span>
        </div>
      </CardFooter>
    </Card>
  );
}