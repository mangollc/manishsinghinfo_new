"use client"

import { Tabs } from "@/components/ui/tabs"
import { CategoryTabsList } from "./tabs-list"
import type { ProductCategory } from "@/lib/constants/products"

interface ProductCategoriesProps {
  activeCategory: ProductCategory
  onCategoryChange: (category: ProductCategory) => void
}

export function ProductCategories({ 
  activeCategory, 
  onCategoryChange 
}: ProductCategoriesProps) {
  return (
    <Tabs value={activeCategory} onValueChange={onCategoryChange}>
      <CategoryTabsList />
    </Tabs>
  );
}