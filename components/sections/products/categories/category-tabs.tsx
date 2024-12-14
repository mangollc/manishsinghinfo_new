"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PRODUCT_CATEGORIES } from "@/lib/constants/products"

interface CategoryTabsProps {
  activeCategory: string
  onCategoryChange: (category: string) => void
}

export function CategoryTabs({ activeCategory, onCategoryChange }: CategoryTabsProps) {
  return (
    <Tabs value={activeCategory} onValueChange={onCategoryChange}>
      <TabsList className="mb-8 grid w-full grid-cols-2 lg:grid-cols-4">
        {PRODUCT_CATEGORIES.map((category) => (
          <TabsTrigger 
            key={category} 
            value={category}
            className="capitalize"
          >
            {category}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}