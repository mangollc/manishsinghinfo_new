"use client"

import { MoreHorizontal, Edit, Trash, Eye, Archive } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface ContentActionsProps {
  onEdit?: () => void
  onDelete?: () => void
  onPreview?: () => void
  onArchive?: () => void
}

export function ContentActions({
  onEdit,
  onDelete,
  onPreview,
  onArchive
}: ContentActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {onEdit && (
          <DropdownMenuItem onClick={onEdit}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
        )}
        {onPreview && (
          <DropdownMenuItem onClick={onPreview}>
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </DropdownMenuItem>
        )}
        {onArchive && (
          <DropdownMenuItem onClick={onArchive}>
            <Archive className="mr-2 h-4 w-4" />
            Archive
          </DropdownMenuItem>
        )}
        {onDelete && (
          <DropdownMenuItem
            onClick={onDelete}
            className="text-destructive focus:text-destructive"
          >
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}