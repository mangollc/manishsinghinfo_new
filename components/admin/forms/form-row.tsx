"use client"

interface FormRowProps {
  label: string
  error?: string
  description?: string
  required?: boolean
  children: React.ReactNode
}

export function FormRow({
  label,
  error,
  description,
  required,
  children
}: FormRowProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      </div>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      {children}
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  )
}