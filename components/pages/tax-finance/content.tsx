"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function TaxFinanceContent() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight lg:text-5xl">Tax & Finance Solutions</h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Optimize your finances with expert tax planning and financial strategies
        </p>
      </div>

      <Tabs defaultValue="services" className="mx-auto max-w-4xl">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="strategies">Strategies</TabsTrigger>
          <TabsTrigger value="tools">Tools</TabsTrigger>
          <TabsTrigger value="faqs">FAQs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="services" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{service.description}</p>
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
            src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=600&fit=crop"
            alt="Tax & Finance Services"
            fill
            className="object-cover"
          />
        </div>
      </section>
    </div>
  )
}

const services = [
  {
    title: "Tax Planning",
    description: "Strategic tax planning to minimize liability and maximize returns.",
  },
  {
    title: "Financial Advisory",
    description: "Expert financial guidance for personal and business growth.",
  },
  {
    title: "Business Accounting",
    description: "Comprehensive accounting solutions for small businesses.",
  },
  // Add more services
]