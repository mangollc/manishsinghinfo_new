
"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"
import { ContentActions } from "./content-actions"
import type { ContentStatus } from "@/lib/supabase/types"

interface ContentItem {
  id: string
  title: string
  type: string
  status: ContentStatus
  updatedAt: string
  author?: string
  tags?: string[]
}

interface ContentTableProps {
  items: ContentItem[]
  onDelete: (id: string) => Promise<void>
}

export function ContentTable({ items, onDelete }: ContentTableProps) {
  const getStatusVariant = (status: ContentStatus) => {
    switch (status) {
      case "published": return "success"
      case "draft": return "warning"
      case "archived": return "secondary"
      default: return "default"
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead>Author</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.title}</TableCell>
              <TableCell>
                <Badge variant="outline" className="capitalize">
                  {item.type}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant={getStatusVariant(item.status)}>
                  {item.status}
                </Badge>
              </TableCell>
              <TableCell>
                {item.tags?.map((tag) => (
                  <Badge key={tag} variant="secondary" className="mr-1">
                    {tag}
                  </Badge>
                ))}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {formatDistanceToNow(new Date(item.updatedAt), { addSuffix: true })}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {item.author || "System"}
              </TableCell>
              <TableCell>
                <ContentActions
                  id={item.id}
                  type={item.type}
                  onDelete={() => onDelete(item.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
