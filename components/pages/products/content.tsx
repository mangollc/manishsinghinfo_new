"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export function ProductsContent() {
  const [activeTab, setActiveTab] = useState("courses")

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight lg:text-5xl">Digital Products</h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Premium digital resources to accelerate your success
        </p>
      </div>

      <Tabs defaultValue="courses" className="mx-auto max-w-6xl" onValueChange={setActiveTab}>
        <TabsList className="mb-8 grid w-full grid-cols-2 lg:grid-cols-4">
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="assets">Assets</TabsTrigger>
          <TabsTrigger value="tools">Tools</TabsTrigger>
        </TabsList>
        
        <TabsContent value="courses" className="mt-8">
          <ProductGrid items={courses} />
        </TabsContent>

        <TabsContent value="templates" className="mt-8">
          <ProductGrid items={templates} />
        </TabsContent>

        <TabsContent value="assets" className="mt-8">
          <ProductGrid items={assets} />
        </TabsContent>

        <TabsContent value="tools" className="mt-8">
          <ProductGrid items={tools} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ProductGrid({ items }: { items: any[] }) {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => (
        <Card key={index} className="flex flex-col transition-transform hover:scale-[1.02]">
          <div className="relative aspect-video">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="rounded-t-lg object-cover"
            />
          </div>
          <CardHeader>
            <div className="mb-2 flex flex-wrap gap-2">
              {item.tags.map((tag: string) => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>
            <CardTitle className="line-clamp-2">{item.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{item.description}</p>
          </CardContent>
          <CardFooter className="mt-auto">
            <div className="flex w-full items-center justify-between">
              <span className="text-lg font-bold">{item.price}</span>
              <Button>Learn More</Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

// Product data arrays
const courses = [/* ... existing courses data ... */]
const templates = [
  {
    title: "Immigration Document Templates",
    description: "Professional templates for visa applications and documentation.",
    price: "$49",
    image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=500&h=300&fit=crop",
    tags: ["Immigration", "Templates"],
  },
  // Add more templates
]
const assets = [
  {
    title: "Business Presentation Kit",
    description: "Professional presentation templates and graphics.",
    price: "$39",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=500&h=300&fit=crop",
    tags: ["Business", "Graphics"],
  },
  // Add more assets
]
const tools = [
  {
    title: "Tax Calculator Pro",
    description: "Advanced tax calculation and planning tool.",
    price: "$79",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&h=300&fit=crop",
    tags: ["Tax", "Tool"],
  },
  // Add more tools
]