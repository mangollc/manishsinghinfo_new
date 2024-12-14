import { TabsList } from "@/components/ui/tabs"
import { PRODUCT_CATEGORIES } from "@/lib/constants/products"
import { CategoryTab } from "./tab"

export function CategoryTabsList() {
  return (
    <TabsList className="mb-8 grid w-full grid-cols-2 lg:grid-cols-4">
      {PRODUCT_CATEGORIES.map((category) => (
        <CategoryTab key={category} category={category} />
      ))}
    </TabsList>
  );
}