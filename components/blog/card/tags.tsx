import { Badge } from "@/components/ui/badge"
import { getTagVariant } from "@/lib/utils/theme"

interface BlogTagsProps {
  tags: string[]
}

export function BlogTags({ tags }: BlogTagsProps) {
  return (
    <div className="mb-2 flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Badge key={tag} variant={getTagVariant(tag)}>{tag}</Badge>
      ))}
    </div>
  );
}