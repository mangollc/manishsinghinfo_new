"use client"

import { useState, useEffect } from "react"
import { BLOG_POSTS } from "@/lib/constants/blog"
import { PostCard } from "./post-card"

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

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {filteredPosts.map((post, index) => (
        <PostCard key={index} {...post} />
      ))}
    </div>
  );
}