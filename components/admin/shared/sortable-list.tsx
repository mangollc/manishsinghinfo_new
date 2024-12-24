
"use client"

import { DragDropList } from "./drag-drop-list"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface SortableListProps<T> {
  items: T[]
  onReorder: (items: T[]) => void
  onRemove: (id: string) => void
  renderItem: (item: T) => React.ReactNode
}

export function SortableList<T extends { id: string }>({
  items,
  onReorder,
  onRemove,
  renderItem
}: SortableListProps<T>) {
  return (
    <DragDropList
      items={items}
      onReorder={onReorder}
      renderItem={(item) => (
        <div className="flex items-center justify-between w-full">
          {renderItem(item)}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => onRemove(item.id)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    />
  )
}
```