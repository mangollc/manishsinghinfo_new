
"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ImageUpload } from "../shared/image-upload"

interface ProductGalleryProps {
  urls: string[]
  onUrlsChange: (urls: string[]) => void
}

export function ProductGallery({ urls, onUrlsChange }: ProductGalleryProps) {
  const addImage = (url: string) => {
    onUrlsChange([...urls, url])
  }

  const removeImage = (index: number) => {
    onUrlsChange(urls.filter((_, i) => i !== index))
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {urls.map((url, index) => (
        <div key={index} className="relative">
          <img
            src={url}
            alt={`Gallery image ${index + 1}`}
            className="w-full h-32 object-cover rounded"
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2"
            onClick={() => removeImage(index)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
      
      <ImageUpload
        bucket="product-images"
        path="gallery"
        onUpload={addImage}
      />
    </div>
  )
}
```