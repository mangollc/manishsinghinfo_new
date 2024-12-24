
"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MarkdownPreview } from "../shared/markdown-preview"
import type { Product } from "@/lib/supabase/types"

interface ProductPreviewProps {
  product: Product
  open: boolean
  onClose: () => void
}

export function ProductPreview({ product, open, onClose }: ProductPreviewProps) {
  const [selectedImage, setSelectedImage] = useState(product.thumbnail_url)

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Preview: {product.name}</DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            {selectedImage && (
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full aspect-square object-cover rounded-lg mb-4"
              />
            )}
            
            {product.gallery_urls && product.gallery_urls.length > 0 && (
              <div className="grid grid-cols-4 gap-2">
                {[product.thumbnail_url, ...product.gallery_urls].map((url, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(url)}
                    className="relative aspect-square rounded-md overflow-hidden hover:opacity-80 transition-opacity"
                  >
                    <img
                      src={url}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              {product.tags?.map((tag) => (
                <Badge key={tag.id} variant="secondary">
                  {tag.name}
                </Badge>
              ))}
            </div>

            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-bold">
                ${product.regular_price}
              </span>
              {product.discounted_price && (
                <span className="text-lg text-muted-foreground line-through">
                  ${product.discounted_price}
                </span>
              )}
            </div>

            {product.short_description && (
              <p className="text-muted-foreground mb-6">
                {product.short_description}
              </p>
            )}

            <div className="prose dark:prose-invert max-w-none mb-6">
              <MarkdownPreview content={product.detailed_description || ""} />
            </div>

            {product.features && product.features.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Features</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}

            <Button className="w-full">Buy Now</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
```