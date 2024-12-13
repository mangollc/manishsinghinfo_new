"use client"

import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function AboutContent() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight lg:text-5xl">About Us</h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Dedicated to empowering professionals with expert guidance and resources
          for sustainable success.
        </p>
      </div>

      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <h2 className="mb-4 text-2xl font-bold">Our Mission</h2>
          <p className="mb-6 text-muted-foreground">
            We strive to provide comprehensive guidance and innovative solutions
            across immigration, tax planning, technology adoption, and career
            development, helping professionals and businesses thrive in an
            ever-evolving global landscape.
          </p>
          
          <h2 className="mb-4 text-2xl font-bold">Our Expertise</h2>
          <div className="grid gap-4">
            {expertise.map((item, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{item.area}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="relative aspect-square overflow-hidden rounded-xl">
          <Image
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=800&fit=crop"
            alt="Our Team"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  )
}

const expertise = [
  {
    area: "Immigration Services",
    description: "Expert guidance on visa applications and immigration procedures.",
  },
  {
    area: "Tax & Financial Planning",
    description: "Strategic tax optimization and financial advisory services.",
  },
  {
    area: "Technology & AI Solutions",
    description: "Cutting-edge technology implementation and AI integration.",
  },
]