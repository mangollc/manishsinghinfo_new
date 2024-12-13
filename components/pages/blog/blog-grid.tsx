"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const allPosts = [
  {
    title: "2024 Immigration Policy Updates",
    excerpt: "Stay informed about the latest changes in immigration policies and procedures.",
    author: "Manish Singh",
    date: "Mar 15, 2024",
    category: "Immigration",
    image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=500&h=300&fit=crop"
  },
  {
    title: "Tax Planning Strategies for Digital Nomads",
    excerpt: "Essential tax optimization tips for location-independent professionals.",
    author: "Manish Singh",
    date: "Mar 12, 2024",
    category: "Tax & Finance",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&h=300&fit=crop"
  },
  {
    title: "AI Tools for Small Business Growth",
    excerpt: "Leverage AI to streamline operations and boost productivity.",
    author: "Manish Singh",
    date: "Mar 10, 2024",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop"
  }
]

export function BlogGrid({ category }: { category: string }) {
  const [filteredPosts, setFilteredPosts] = useState(allPosts)

  useEffect(() => {
    if (category === "All") {
      setFilteredPosts(allPosts)
    } else {
      setFilteredPosts(allPosts.filter(post => post.category === category))
    }
  }, [category])

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {filteredPosts.map((post, index) => (
        <Card key={index} className="flex flex-col overflow-hidden transition-transform hover:scale-[1.02]">
          <div className="relative aspect-video">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
          <CardHeader className="space-y-2">
            <Badge className="w-fit">{post.category}</Badge>
            <Link href="#" className="block">
              <h2 className="text-xl font-semibold hover:text-primary">
                {post.title}
              </h2>
            </Link>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{post.excerpt}</p>
          </CardContent>
          <CardFooter className="mt-auto text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <span>{post.author}</span>
              <span>•</span>
              <span>{post.date}</span>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}