import { ZodError } from "zod"
import { PostgrestError } from "@supabase/supabase-js"

export class ValidationError extends Error {
  constructor(
    message: string,
    public errors?: Record<string, string[]>
  ) {
    super(message)
    this.name = "ValidationError"
  }
}

export class DatabaseError extends Error {
  constructor(
    message: string,
    public code?: string
  ) {
    super(message)
    this.name = "DatabaseError"
  }
}

export function handleZodError(error: ZodError) {
  const errors: Record<string, string[]> = {}
  const errorMessages: string[] = []
  
  error.errors.forEach((err) => {
    const path = err.path.join(".")
    if (!errors[path]) {
      errors[path] = []
    }
    errors[path].push(err.message)
    errorMessages.push(`${path}: ${err.message}`)
  })

  return new ValidationError(
    `Validation failed: ${errorMessages.join(", ")}`,
    errors
  )
}

export function handlePostgrestError(error: PostgrestError) {
  switch (error.code) {
    case "23505":
      return new DatabaseError("A record with this value already exists", error.code)
    case "23503":
      return new DatabaseError("Referenced record does not exist", error.code)
    case "42P01":
      return new DatabaseError("Table does not exist", error.code)
    case "42501":
      return new DatabaseError("Insufficient permissions", error.code)
    default:
      return new DatabaseError(error.message || "An unexpected database error occurred", error.code)
  }
}

export function handleError(error: unknown): Error {
  if (error instanceof ZodError) {
    return handleZodError(error)
  }
  
  if (error instanceof PostgrestError) {
    return handlePostgrestError(error)
  }
  
  if (error instanceof Error) {
    return error
  }
  
  return new Error("An unexpected error occurred")
}