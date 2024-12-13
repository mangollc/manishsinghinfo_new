"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ImmigrationContent() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight lg:text-5xl">Immigration Guidance</h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Expert guidance on visa applications, compliance, and immigration procedures
        </p>
      </div>

      <Tabs defaultValue="services" className="mx-auto max-w-4xl">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="process">Process</TabsTrigger>
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

        {/* Add other TabsContent components for resources, process, and FAQs */}
      </Tabs>

      <section className="mt-20">
        <div className="relative aspect-video overflow-hidden rounded-xl">
          <Image
            src="https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=1200&h=600&fit=crop"
            alt="Immigration Services"
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
    title: "Visa Consultation",
    description: "Expert guidance on visa types, requirements, and application procedures.",
  },
  {
    title: "Document Preparation",
    description: "Professional assistance with preparing and organizing required documentation.",
  },
  {
    title: "Compliance Support",
    description: "Ensuring adherence to immigration laws and regulations.",
  },
  // Add more services
]