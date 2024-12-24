
"use client"

import { useState, useRef } from "react"
import { GripVertical } from "lucide-react"
import { cn } from "@/lib/utils/theme"

interface DragDropListProps<T> {
  items: T[]
  onReorder: (items: T[]) => void
  renderItem: (item: T, index: number) => React.ReactNode
  className?: string
}

export function DragDropList<T extends { id: string }>({
  items,
  onReorder,
  renderItem,
  className
}: DragDropListProps<T>) {
  const [draggedItem, setDraggedItem] = useState<T | null>(null)
  const draggedOverItem = useRef<T | null>(null)

  const handleDragStart = (item: T) => {
    setDraggedItem(item)
  }

  const handleDragOver = (e: React.DragEvent, item: T) => {
    e.preventDefault()
    draggedOverItem.current = item
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    
    if (!draggedItem || !draggedOverItem.current) return

    const newItems = [...items]
    const draggedIndex = items.findIndex(item => item.id === draggedItem.id)
    const droppedIndex = items.findIndex(item => item.id === draggedOverItem.current?.id)

    newItems.splice(draggedIndex, 1)
    newItems.splice(droppedIndex, 0, draggedItem)

    onReorder(newItems)
    setDraggedItem(null)
    draggedOverItem.current = null
  }

  return (
    <div className={cn("space-y-2", className)}>
      {items.map((item, index) => (
        <div
          key={item.id}
          draggable
          onDragStart={() => handleDragStart(item)}
          onDragOver={(e) => handleDragOver(e, item)}
          onDrop={handleDrop}
          className={cn(
            "flex items-center gap-2 p-2 rounded-md border",
            "hover:bg-accent/5 cursor-move",
            draggedItem?.id === item.id && "opacity-50"
          )}
        >
          <GripVertical className="h-5 w-5 text-muted-foreground" />
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  )
}
```