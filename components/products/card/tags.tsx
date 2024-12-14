import { Badge } from "@/components/ui/badge"
import { getTagVariant } from "@/lib/utils/theme"

interface ProductTagsProps {
  tags: string[]
}

export function ProductTags({ tags }: ProductTagsProps) {
  return (
    <div className="mb-2 flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Badge key={tag} variant={getTagVariant(tag)}>{tag}</Badge>
      ))}
    </div>
  );
}