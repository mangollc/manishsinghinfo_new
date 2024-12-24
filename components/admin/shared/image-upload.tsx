"use client"

import { useState } from "react"
import { Upload, X } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { uploadImage } from "@/lib/utils/image"
import { useToast } from "@/hooks/use-toast"

interface ImageUploadProps {
  bucket: string
  path: string
  value?: string | null
  onUpload: (url: string) => void
  onRemove?: () => void
  className?: string
  maxSize?: number
  allowedTypes?: string[]
}

export function ImageUpload({ 
  bucket, 
  path, 
  value,
  onUpload,
  onRemove,
  className,
  maxSize,
  allowedTypes
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const { toast } = useToast()

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('Please select an image to upload.')
      }

      const file = event.target.files[0]
      const url = await uploadImage(bucket, path, file, { maxSize, allowedTypes })
      onUpload(url)

      toast({
        title: "Success",
        description: "Image uploaded successfully",
      })
    } catch (error) {
      console.error('Error uploading image:', error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to upload image",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  if (value) {
    return (
      <div className="relative">
        <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
          <Image
            src={value}
            alt="Uploaded image"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        {onRemove && (
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute -right-2 -top-2"
            onClick={onRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    )
  }

  return (
    <Button
      variant="outline"
      disabled={uploading}
      className="relative h-32 w-full"
      onClick={() => document.getElementById('imageInput')?.click()}
    >
      <input
        id="imageInput"
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="hidden"
      />
      <div className="flex flex-col items-center gap-2">
        <Upload className="h-6 w-6" />
        <span>{uploading ? 'Uploading...' : 'Upload Image'}</span>
      </div>
    </Button>
  )
}