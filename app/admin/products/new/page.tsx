"use client"

import { ProductForm } from "@/components/admin/forms/product-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function NewProduct() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Product</CardTitle>
      </CardHeader>
      <CardContent>
        <ProductForm />
      </CardContent>
    </Card>
  )
}