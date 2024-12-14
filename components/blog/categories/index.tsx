"use client"

import { useState } from "react"
import { BLOG_CATEGORIES } from "@/lib/constants/blog"
import { CategoryButton } from "./button"

interface BlogCategoriesProps {
  onCategoryChange: (category: string) => void
}

export function BlogCategories({ onCategoryChange }: BlogCategoriesProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All")
  const categories = ["All", ...BLOG_CATEGORIES]

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category)
    onCategoryChange(category)
  }

  return (
    <div className="mb-8 flex flex-wrap justify-center gap-2">
      {categories.map((category) => (
        <CategoryButton
          key={category}
          category={category}
          isActive={category === activeCategory}
          onClick={() => handleCategoryClick(category)}
        />
      ))}
    </div>
  );
}