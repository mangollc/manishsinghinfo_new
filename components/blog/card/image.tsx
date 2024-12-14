"use client"

import Image from "next/image"
import { cn } from "@/lib/utils/theme"

interface BlogImageProps {
  src: string
  alt: string
  className?: string
}

export function BlogImage({ src, alt, className }: BlogImageProps) {
  return (
    <div className={cn("relative aspect-video", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
      />
    </div>
  );
}