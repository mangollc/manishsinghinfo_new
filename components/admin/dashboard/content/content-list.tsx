"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"
import { ContentActions } from "./content-actions"

interface ContentItem {
  id: string
  title: string
  type: string
  status: string
  updatedAt: string
  author?: string
}

interface ContentListProps {
  items: ContentItem[]
  onDelete: (id: string) => void
}

export function ContentList({ items, onDelete }: ContentListProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
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
                <Badge 
                  variant={
                    item.status === "published" ? "success" :
                    item.status === "draft" ? "warning" : "secondary"
                  }
                >
                  {item.status}
                </Badge>
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