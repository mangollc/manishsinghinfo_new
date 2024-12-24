
"use client"

import ReactMarkdown from "react-markdown"
import { cn } from "@/lib/utils/theme"

interface MarkdownPreviewProps {
  content: string
  className?: string
}

export function MarkdownPreview({ content, className }: MarkdownPreviewProps) {
  return (
    <div className={cn(
      "prose dark:prose-invert max-w-none",
      "prose-headings:mb-3 prose-headings:mt-6 first:prose-headings:mt-0",
      "prose-p:my-2 prose-p:leading-7",
      "prose-li:my-0",
      className
    )}>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  )
}
```