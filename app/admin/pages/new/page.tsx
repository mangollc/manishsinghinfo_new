"use client"

import { PageForm } from "@/components/admin/forms/page-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function NewPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Page</CardTitle>
      </CardHeader>
      <CardContent>
        <PageForm />
      </CardContent>
    </Card>
  )
}