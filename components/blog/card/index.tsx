import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils/theme"
import { BlogImage } from "./image"
import { BlogTags } from "./tags"
import { BlogContent } from "./content"
import { BlogMeta } from "./meta"
import type { BlogPost } from "@/lib/constants/blog"

interface BlogCardProps extends BlogPost {
  className?: string
}

export function BlogCard({
  title,
  excerpt,
  author,
  date,
  tags,
  image,
  className
}: BlogCardProps) {
  return (
    <Card className={cn(
      "flex flex-col overflow-hidden transition-transform hover:scale-[1.02]",
      className
    )}>
      <CardHeader className="p-0">
        <BlogImage src={image} alt={title} />
      </CardHeader>
      <CardContent className="p-4">
        <BlogTags tags={tags} />
        <BlogContent title={title} excerpt={excerpt} />
      </CardContent>
      <CardFooter className="mt-auto p-4 pt-0 text-sm text-muted-foreground">
        <BlogMeta author={author} date={date} />
      </CardFooter>
    </Card>
  );
}