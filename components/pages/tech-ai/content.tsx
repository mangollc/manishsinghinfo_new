"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function TechAIContent() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight lg:text-5xl">Technology & AI Solutions</h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Leverage cutting-edge technology and AI for business growth
        </p>
      </div>

      <Tabs defaultValue="solutions" className="mx-auto max-w-4xl">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          <TabsTrigger value="solutions">Solutions</TabsTrigger>
          <TabsTrigger value="implementation">Implementation</TabsTrigger>
          <TabsTrigger value="case-studies">Case Studies</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>
        
        <TabsContent value="solutions" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {solutions.map((solution, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{solution.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{solution.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Add other TabsContent components */}
      </Tabs>

      <section className="mt-20">
        <div className="relative aspect-video overflow-hidden rounded-xl">
          <Image
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop"
            alt="Technology & AI Solutions"
            fill
            className="object-cover"
          />
        </div>
      </section>
    </div>
  )
}

const solutions = [
  {
    title: "AI Integration",
    description: "Seamless integration of AI solutions for business automation.",
  },
  {
    title: "Digital Transformation",
    description: "Comprehensive digital transformation strategies and implementation.",
  },
  {
    title: "Process Automation",
    description: "Automated workflows and business process optimization.",
  },
  // Add more solutions
]