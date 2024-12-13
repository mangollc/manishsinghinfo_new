"use client"

import { useRef } from "react"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

const featuredProducts = [
  {
    title: "Immigration Starter Kit",
    description: "Essential templates and checklists for your immigration journey",
    price: "$49",
    tags: ["Featured", "Immigration", "Templates"],
    image: "https://images.unsplash.com/photo-1569974498991-d3c12a504f95?w=500&h=300&fit=crop",
  },
  {
    title: "Tax Planning Guide 2024",
    description: "Comprehensive tax strategies for individuals and businesses",
    price: "$79",
    tags: ["New", "Tax", "Guide"],
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&h=300&fit=crop",
  },
  {
    title: "AI for Small Business",
    description: "Practical AI implementation strategies for business growth",
    price: "$129",
    tags: ["Bestseller", "AI", "Business"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop",
  },
]

export function FeaturedProducts() {
  return (
    <section className="border-t py-20">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">Featured Products</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Discover our most popular digital products and resources
          </p>
        </div>
        <Carousel className="mx-auto max-w-5xl">
          <CarouselContent>
            {featuredProducts.map((product, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <Card className="mx-2">
                  <CardHeader className="p-0">
                    <div className="relative aspect-[5/3]">
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-cover rounded-t-lg"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="mb-2 flex flex-wrap gap-2">
                      {product.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                    <h3 className="text-lg font-semibold">{product.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{product.description}</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex items-center justify-between">
                    <span className="text-lg font-bold">{product.price}</span>
                    <Button>Learn More</Button>
                  </CardFooter>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  )
}