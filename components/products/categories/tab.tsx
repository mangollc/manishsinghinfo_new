import { TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils/theme"

interface CategoryTabProps {
  category: string
  className?: string
}

export function CategoryTab({ category, className }: CategoryTabProps) {
  return (
    <TabsTrigger 
      value={category}
      className={cn("capitalize", className)}
    >
      {category}
    </TabsTrigger>
  );
}