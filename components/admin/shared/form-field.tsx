
"use client"

import { FormRow } from "../forms/form-row"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils/theme"

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string
  error?: string
  multiline?: boolean
  className?: string
}

export function FormField({
  label,
  error,
  multiline,
  className,
  ...props
}: FormFieldProps) {
  const Component = multiline ? Textarea : Input
  
  return (
    <FormRow label={label} error={error}>
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
```