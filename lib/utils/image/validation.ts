export interface ImageValidationOptions {
  maxSize?: number // in bytes
  allowedTypes?: string[]
}

export function validateImage(
  file: File,
  options: ImageValidationOptions = {}
) {
  const {
    maxSize = 5 * 1024 * 1024, // 5MB default
    allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
  } = options

  if (!file.type.startsWith('image/')) {
    throw new Error('File must be an image')
  }

  if (!allowedTypes.includes(file.type)) {
    throw new Error(`File type must be one of: ${allowedTypes.join(', ')}`)
  }

  if (file.size > maxSize) {
    throw new Error(`File size must be less than ${maxSize / (1024 * 1024)}MB`)
  }
}