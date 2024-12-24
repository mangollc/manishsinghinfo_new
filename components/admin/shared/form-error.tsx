
"use client"

import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import type { ValidationError } from "@/lib/utils/error-handler"

interface FormErrorProps {
  error: ValidationError
}

export function FormError({ error }: FormErrorProps) {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        <p className="mt-2">{error.message}</p>
        {error.errors && Object.entries(error.errors).length > 0 && (
          <ul className="mt-2 list-disc pl-4">
            {Object.entries(error.errors).map(([field, messages]) => (
              <li key={field}>
                <strong>{field}:</strong> {messages.join(", ")}
              </li>
            ))}
          </ul>
        )}
      </AlertDescription>
    </Alert>
  )
}
```