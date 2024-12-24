"use client"

import Link from "next/link"
import { Trash2, FileEdit, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/lib/supabase/client"
import { createActivity } from "@/lib/api/admin/activity"

interface ContentItemProps {
  id: string
  title: string
  type: string
  table: string
  updatedAt: string
  onDelete?: () => void
}

export function ContentItem({ id, title, type, table, updatedAt, onDelete }: ContentItemProps) {
  const { toast } = useToast()
  const href = `/admin/${type}/${id}`

  const handleDelete = async () => {
    try {
      const { error } = await supabase
        .from(table)
        .delete()
        .eq('id', id)

      if (error) throw error

      await createActivity({
        description: `Deleted ${type}: ${title}`,
        type: 'content',
        metadata: { contentType: type, contentId: id }
      })

      toast({
        title: "Success",
        description: "Item deleted successfully",
      })

      onDelete?.()
    } catch (error) {
      console.error("Error deleting item:", error)
      toast({
        title: "Error",
        description: "Failed to delete item",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="group flex items-center justify-between py-3 px-2 -mx-2 rounded-md hover:bg-muted/50">
      <div className="flex-1 min-w-0">
        <Link 
          href={href}
          className="block text-sm font-medium truncate hover:text-primary"
        >
          {title}
        </Link>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs capitalize text-muted-foreground">{type}</span>
          <span className="text-xs text-muted-foreground">•</span>
          <span className="text-xs text-muted-foreground">
            {new Date(updatedAt).toLocaleDateString()}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-primary"
          asChild
        >
          <Link href={href}>
            <FileEdit className="h-4 w-4" />
          </Link>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-primary"
          asChild
        >
          <Link href={`/${type}/${id}`} target="_blank">
            <Eye className="h-4 w-4" />
          </Link>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-destructive"
          onClick={handleDelete}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}