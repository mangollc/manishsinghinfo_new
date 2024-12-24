
"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { MarkdownPreview } from "../shared/markdown-preview"
import type { InformationPage } from "@/lib/supabase/types"

interface PagePreviewProps {
  page: InformationPage
  open: boolean
  onClose: () => void
}

export function PagePreview({ page, open, onClose }: PagePreviewProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Preview: {page.title}</DialogTitle>
        </DialogHeader>

        {page.banner_image_url && (
          <img
            src={page.banner_image_url}
            alt={page.title}
            className="w-full aspect-[21/9] object-cover rounded-lg mb-6"
          />
        )}

        <div className="prose dark:prose-invert max-w-none mb-8">
          <MarkdownPreview content={page.content || ""} />
        </div>

        {page.sections?.map((section, index) => (
          <div key={index} className="mb-8">
            {section.type === 'text' && (
              <div className="prose dark:prose-invert max-w-none">
                <MarkdownPreview content={section.content} />
              </div>
            )}

            {section.type === 'image' && (
              <img
                src={section.content}
                alt={`Section image ${index + 1}`}
                className="w-full rounded-lg"
              />
            )}

            {section.type === 'gallery' && (
              <div className="grid grid-cols-3 gap-4">
                {section.content.map((url: string, i: number) => (
                  <img
                    key={i}
                    src={url}
                    alt={`Gallery image ${i + 1}`}
                    className="w-full aspect-square object-cover rounded-lg"
                  />
                ))}
              </div>
            )}

            {section.type === 'cta' && (
              <div className="flex justify-center">
                <Button size="lg" asChild>
                  <a href={section.content.link} target="_blank" rel="noopener noreferrer">
                    {section.content.text}
                  </a>
                </Button>
              </div>
            )}
          </div>
        ))}
      </DialogContent>
    </Dialog>
  )
}
```