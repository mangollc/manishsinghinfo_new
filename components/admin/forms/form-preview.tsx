
"use client"

import { useState } from "react"
import { Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BlogPreview } from "../preview/blog-preview"
import { ProductPreview } from "../preview/product-preview"
import { PagePreview } from "../preview/page-preview"

interface FormPreviewProps {
  type: 'blog' | 'product' | 'page'
  data: any
}

export function FormPreview({ type, data }: FormPreviewProps) {
  const [open, setOpen] = useState(false)

  const PreviewComponent = {
    blog: BlogPreview,
    product: ProductPreview,
    page: PagePreview,
  }[type]

  return (
    <>
      <Button
        type="button"
        variant="outline"
        onClick={() => setOpen(true)}
      >
        <Eye className="h-4 w-4 mr-2" />
        Preview
      </Button>

      <PreviewComponent
        {...data}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  )
}
