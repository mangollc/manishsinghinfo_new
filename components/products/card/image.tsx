"use client"

import Image from "next/image"
import { cn } from "@/lib/utils/theme"

interface ProductImageProps {
  src: string
  alt: string
  className?: string
}

export function ProductImage({ src, alt, className }: ProductImageProps) {
  return (
    <div className={cn("relative aspect-video", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        className="rounded-t-lg object-cover"
      />
    </div>
  );
}