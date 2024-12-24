"use client"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface SEOFieldsProps {
  title: string
  description: string
  onTitleChange: (value: string) => void
  onDescriptionChange: (value: string) => void
}

export function SEOFields({
  title,
  description,
  onTitleChange,
  onDescriptionChange
}: SEOFieldsProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium">Meta Title</label>
        <Input
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="SEO Title"
          maxLength={60}
        />
        <p className="text-xs text-muted-foreground mt-1">
          {title.length}/60 characters
        </p>
      </div>
      <div>
        <label className="text-sm font-medium">Meta Description</label>
        <Textarea
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          placeholder="SEO Description"
          maxLength={160}
        />
        <p className="text-xs text-muted-foreground mt-1">
          {description.length}/160 characters
        </p>
      </div>
    </div>
  )
}