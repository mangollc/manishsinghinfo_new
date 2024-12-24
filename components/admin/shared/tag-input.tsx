"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { supabase } from "@/lib/supabase/client"
import type { Tag } from "@/lib/supabase/types"

interface TagInputProps {
  selectedTags: Tag[]
  onTagsChange: (tags: Tag[]) => void
}

export function TagInput({ selectedTags, onTagsChange }: TagInputProps) {
  const [input, setInput] = useState("")
  const [suggestions, setSuggestions] = useState<Tag[]>([])

  useEffect(() => {
    const fetchTags = async () => {
      if (input.length < 2) {
        setSuggestions([])
        return
      }

      const { data } = await supabase
        .from("tags")
        .select("*")
        .ilike("name", `%${input}%`)
        .limit(5)

      setSuggestions(data || [])
    }

    fetchTags()
  }, [input])

  const addTag = (tag: Tag) => {
    if (!selectedTags.find(t => t.id === tag.id)) {
      onTagsChange([...selectedTags, tag])
    }
    setInput("")
    setSuggestions([])
  }

  const removeTag = (tagId: string) => {
    onTagsChange(selectedTags.filter(tag => tag.id !== tagId))
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {selectedTags.map(tag => (
          <Badge key={tag.id} variant="secondary">
            {tag.name}
            <button
              onClick={() => removeTag(tag.id)}
              className="ml-1 hover:text-destructive"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
      <div className="relative">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add tags..."
        />
        {suggestions.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-popover border rounded-md shadow-lg">
            {suggestions.map(tag => (
              <button
                key={tag.id}
                className="w-full px-4 py-2 text-left hover:bg-accent"
                onClick={() => addTag(tag)}
              >
                {tag.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}