
"use client"

import { FormRow } from "./form-row"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils/theme"

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string
  error?: string
  description?: string
  required?: boolean
  multiline?: boolean
  className?: string
}

export function FormField({
  label,
  error,
  description,
  required,
  multiline,
  className,
  ...props
}: FormFieldProps) {
  const Component = multiline ? Textarea : Input
  
  return (
    <FormRow
      label={label}
      error={error}
      description={description}
      required={required}
    >
      <Component
        className={cn(
          error && "border-destructive",
          className
        )}
        {...props}
      />
    </FormRow>
  )
}
