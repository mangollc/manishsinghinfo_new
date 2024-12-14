"use client"

import { Container } from "@/components/ui/container"
import { BlogCard } from "@/components/cards/blog-card"
import { featuredBlogs } from "./data"

export function FeaturedBlogs() {
  return (
    <section className="border-t bg-muted/40 py-16 md:py-24">
      <Container>
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold gradient-text">Latest Insights</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Stay informed with our latest articles and guides
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredBlogs.map((blog, index) => (
            <BlogCard key={index} {...blog} />
          ))}
        </div>
      </Container>
    </section>
  )
}