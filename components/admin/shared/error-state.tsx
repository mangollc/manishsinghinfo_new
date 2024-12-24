"use client"

import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

interface ErrorStateProps {
  error: Error
  retry?: () => void
}

export function ErrorState({ error, retry }: ErrorStateProps) {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription className="mt-2">
        <p>{error.message}</p>
        {retry && (
          <Button
            variant="outline"
            size="sm"
            onClick={retry}
            className="mt-4"
          >
            Try again
          </Button>
        )}
      </AlertDescription>
    </Alert>
  )
}