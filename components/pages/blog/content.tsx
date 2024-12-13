"use client"

import { useState } from "react"
import { BlogGrid } from "./blog-grid"
import { BlogHeader } from "./blog-header"
import { BlogCategories } from "./blog-categories"

export function BlogContent() {
  const [selectedCategory, setSelectedCategory] = useState("All")

  return (
    <div className="container mx-auto px-4 py-16">
      <BlogHeader />
      <BlogCategories onCategoryChange={setSelectedCategory} />
      <BlogGrid category={selectedCategory} />
    </div>
  )
}