"use client"

import { BlogForm } from "@/components/admin/forms/blog-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function NewBlogPost() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Blog Post</CardTitle>
      </CardHeader>
      <CardContent>
        <BlogForm />
      </CardContent>
    </Card>
  )
}