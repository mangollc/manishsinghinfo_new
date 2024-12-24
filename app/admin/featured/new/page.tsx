"use client"

import { FeaturedForm } from "@/components/admin/forms/featured-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function NewFeaturedCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Featured Card</CardTitle>
      </CardHeader>
      <CardContent>
        <FeaturedForm />
      </CardContent>
    </Card>
  )
}