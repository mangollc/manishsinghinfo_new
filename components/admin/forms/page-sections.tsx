
"use client"

import { Plus, X, GripVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RichTextEditor } from "../shared/rich-text-editor"
import { ImageUpload } from "../shared/image-upload"

interface Section {
  id: string
  type: 'text' | 'image' | 'gallery' | 'cta'
  content: any
}

interface PageSectionsProps {
  sections: Section[]
  onSectionsChange: (sections: Section[]) => void
}

export function PageSections({ sections, onSectionsChange }: PageSectionsProps) {
  const addSection = (type: Section['type']) => {
    const newSection: Section = {
      id: crypto.randomUUID(),
      type,
      content: type === 'text' ? '' : type === 'gallery' ? [] : null
    }
    onSectionsChange([...sections, newSection])
  }

  const removeSection = (id: string) => {
    onSectionsChange(sections.filter(section => section.id !== id))
  }

  const updateSection = (id: string, content: any) => {
    onSectionsChange(
      sections.map(section => 
        section.id === id ? { ...section, content } : section
      )
    )
  }

  const moveSection = (fromIndex: number, toIndex: number) => {
    const newSections = [...sections]
    const [removed] = newSections.splice(fromIndex, 1)
    newSections.splice(toIndex, 0, removed)
    onSectionsChange(newSections)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Page Sections</h3>
        <div className="flex gap-2">
          <Button type="button" size="sm" onClick={() => addSection('text')}>
            Add Text
          </Button>
          <Button type="button" size="sm" onClick={() => addSection('image')}>
            Add Image
          </Button>
          <Button type="button" size="sm" onClick={() => addSection('gallery')}>
            Add Gallery
          </Button>
          <Button type="button" size="sm" onClick={() => addSection('cta')}>
            Add CTA
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {sections.map((section, index) => (
          <div
            key={section.id}
            className="flex items-start gap-4 p-4 border rounded-lg"
          >
            <button
              type="button"
              className="mt-2 cursor-move"
              onMouseDown={(e) => {
                // Implement drag and drop functionality
              }}
            >
              <GripVertical className="h-5 w-5 text-muted-foreground" />
            </button>

            <div className="flex-1">
              {section.type === 'text' && (
                <RichTextEditor
                  value={section.content}
                  onChange={(content) => updateSection(section.id, content)}
                  placeholder="Enter text content..."
                />
              )}

              {section.type === 'image' && (
                <ImageUpload
                  bucket="page-images"
                  path="sections"
                  onUpload={(url) => updateSection(section.id, url)}
                />
              )}

              {section.type === 'gallery' && (
                <div className="grid gap-4 md:grid-cols-3">
                  {section.content.map((url: string, i: number) => (
                    <div key={i} className="relative">
                      <img
                        src={url}
                        alt={`Gallery image ${i + 1}`}
                        className="w-full h-32 object-cover rounded"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={() => {
                          const newGallery = [...section.content]
                          newGallery.splice(i, 1)
                          updateSection(section.id, newGallery)
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <ImageUpload
                    bucket="page-images"
                    path="gallery"
                    onUpload={(url) => {
                      const newGallery = [...(section.content || [])]
                      newGallery.push(url)
                      updateSection(section.id, newGallery)
                    }}
                  />
                </div>
              )}

              {section.type === 'cta' && (
                <div className="grid gap-4">
                  <Input
                    value={section.content?.text || ''}
                    onChange={(e) => updateSection(section.id, {
                      ...section.content,
                      text: e.target.value
                    })}
                    placeholder="CTA Text"
                  />
                  <Input
                    value={section.content?.link || ''}
                    onChange={(e) => updateSection(section.id, {
                      ...section.content,
                      link: e.target.value
                    })}
                    placeholder="CTA Link"
                  />
                </div>
              )}
            </div>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removeSection(section.id)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
