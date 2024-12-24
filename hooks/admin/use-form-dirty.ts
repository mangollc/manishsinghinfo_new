"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export function useFormDirty<T extends Record<string, any>>(initialData: T) {
  const router = useRouter()
  const { toast } = useToast()
  const [isDirty, setIsDirty] = useState(false)
  const [currentData, setCurrentData] = useState<T>(initialData)

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault()
        e.returnValue = ''
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [isDirty])

  const checkDirty = useCallback((newData: T) => {
    const isEqual = (a: any, b: any): boolean => {
      if (a === b) return true
      if (typeof a !== typeof b) return false
      if (typeof a !== 'object') return false
      if (Array.isArray(a) !== Array.isArray(b)) return false
      
      if (Array.isArray(a)) {
        if (a.length !== b.length) return false
        return a.every((item, index) => isEqual(item, b[index]))
      }

      const keysA = Object.keys(a)
      const keysB = Object.keys(b)
      if (keysA.length !== keysB.length) return false

      return keysA.every(key => isEqual(a[key], b[key]))
    }

    const isDifferent = !isEqual(newData, initialData)
    setIsDirty(isDifferent)
    setCurrentData(newData)
  }, [initialData])

  const confirmNavigation = useCallback((path: string) => {
    if (isDirty) {
      const confirmed = window.confirm(
        'You have unsaved changes. Are you sure you want to leave?'
      )
      if (!confirmed) return

      toast({
        title: "Changes discarded",
        description: "Your unsaved changes have been discarded.",
        variant: "default",
      })
    }
    router.push(path)
  }, [isDirty, router, toast])

  return {
    isDirty,
    currentData,
    checkDirty,
    confirmNavigation,
  }
}