"use client"

import { Container } from "@/components/ui/container"
import { ProductCard } from "@/components/cards/product-card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { featuredProducts } from "./data"

export function FeaturedProducts() {
  return (
    <section className="border-t py-16 md:py-24">
      <Container>
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold gradient-text">Featured Products</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Discover our most popular digital products and resources
          </p>
        </div>
        <Carousel className="mx-auto max-w-5xl">
          <CarouselContent>
            {featuredProducts.map((product, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="px-2">
                  <ProductCard {...product} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </Container>
    </section>
  )
}