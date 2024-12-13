"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

const categories = [
  "All",
  "Immigration",
  "Tax & Finance",
  "Technology",
  "AI",
  "Career",
  "Success Stories"
]

export function BlogCategories({ onCategoryChange }: { onCategoryChange: (category: string) => void }) {
  const [activeCategory, setActiveCategory] = useState("All")

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category)
    onCategoryChange(category)
  }

  return (
    <div className="mb-8 flex flex-wrap justify-center gap-2">
      {categories.map((category) => (
        <Button
          key={category}
          variant={category === activeCategory ? "default" : "outline"}
          size="sm"
          onClick={() => handleCategoryClick(category)}
          className="min-w-[100px]"
        >
          {category}
        </Button>
      ))}
    </div>
  )
}