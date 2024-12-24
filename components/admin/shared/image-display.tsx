"use client"

import Image from "next/image"
import { transformImageUrl } from "@/lib/utils/image/url"

interface ImageDisplayProps {
  src: string | null
  alt: string
  className?: string
  fill?: boolean
}

export function ImageDisplay({ 
  src, 
  alt,
  className = "",
  fill = true
}: ImageDisplayProps) {
  const imageUrl = transformImageUrl(src)
  
  if (!imageUrl) {
    return null
  }

  return (
    <div className={`relative ${className}`}>
      <Image
        src={imageUrl}
        alt={alt}
        fill={fill}
        className="object-cover"
      />
    </div>
  )
}