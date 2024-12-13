"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const featuredBlogs = [
  {
    title: "Ultimate Guide to US Immigration in 2024",
    excerpt: "Everything you need to know about the latest immigration policies and procedures",
    author: "Manish Singh",
    date: "Mar 15, 2024",
    tags: ["Immigration", "Guide"],
    image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=500&h=300&fit=crop",
  },
  {
    title: "10 AI Tools Every Small Business Needs",
    excerpt: "Transform your business operations with these essential AI solutions",
    author: "Manish Singh",
    date: "Mar 12, 2024",
    tags: ["AI", "Business"],
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=500&h=300&fit=crop",
  },
  {
    title: "Tax Saving Strategies for Entrepreneurs",
    excerpt: "Smart tax planning tips to maximize your business deductions",
    author: "Manish Singh",
    date: "Mar 10, 2024",
    tags: ["Tax", "Business"],
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&h=300&fit=crop",
  },
]

export function FeaturedBlogs() {
  return (
    <section className="border-t bg-muted/40 py-20">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">Latest Insights</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Stay informed with our latest articles and guides
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredBlogs.map((blog, index) => (
            <Card key={index} className="overflow-hidden transition-transform hover:scale-[1.02]">
              <CardHeader className="p-0">
                <div className="relative aspect-[5/3]">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="mb-2 flex flex-wrap gap-2">
                  {blog.tags.map((tag) => (
                    <Badge key={tag} variant="outline">{tag}</Badge>
                  ))}
                </div>
                <h3 className="text-lg font-semibold hover:text-primary">
                  <Link href="#">{blog.title}</Link>
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{blog.excerpt}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <span>{blog.author}</span>
                  <span>•</span>
                  <span>{blog.date}</span>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}