"use client"

import { useState, useEffect } from "react"
import { BLOG_POSTS } from "@/lib/constants/blog"
import { BlogCard } from "../card"
import { EmptyState } from "./empty-state"

interface BlogGridProps {
  category: string
}

export function BlogGrid({ category }: BlogGridProps) {
  const [filteredPosts, setFilteredPosts] = useState(BLOG_POSTS)

  useEffect(() => {
    if (category === "All") {
      setFilteredPosts(BLOG_POSTS)
    } else {
      setFilteredPosts(BLOG_POSTS.filter(post => post.category === category))
    }
  }, [category])

  if (filteredPosts.length === 0) {
    return <EmptyState />
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {filteredPosts.map((post, index) => (
        <BlogCard key={index} {...post} />
      ))}
    </div>
  );
}