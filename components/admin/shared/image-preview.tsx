
"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils/theme"

interface ImagePreviewProps {
  url: string
  onRemove: () => void
  className?: string
}

export function ImagePreview({ url, onRemove, className }: ImagePreviewProps) {
  return (
    <div className={cn("relative", className)}>
      <img
        src={url}
        alt="Preview"
        className="w-full h-32 object-cover rounded-md"
      />
      <Button
        type="button"
        variant="destructive"
        size="icon"
        className="absolute top-2 right-2"
        onClick={onRemove}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  )
}
```