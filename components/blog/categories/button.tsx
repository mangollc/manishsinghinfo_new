import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils/theme"
import type { BlogCategory } from "@/lib/constants/blog"

interface CategoryButtonProps {
  category: BlogCategory | "All"
  isActive: boolean
  onClick: () => void
}

export function CategoryButton({ category, isActive, onClick }: CategoryButtonProps) {
  return (
    <Button
      variant={isActive ? "default" : "outline"}
      size="sm"
      onClick={onClick}
      className={cn(
        "min-w-[100px]",
        isActive && "bg-primary text-primary-foreground"
      )}
    >
      {category}
    </Button>
  );
}