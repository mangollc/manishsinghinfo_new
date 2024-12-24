
import { useState } from 'react'
import { supabase } from '../config'
import type { PostgrestError } from '@supabase/supabase-js'

interface UseMutationOptions {
  table: string
  onSuccess?: (data: any) => void
  onError?: (error: PostgrestError) => void
}

export function useMutation({
  table,
  onSuccess,
  onError,
}: UseMutationOptions) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<PostgrestError | null>(null)

  const create = async (data: any) => {
    setLoading(true)
    try {
      const { data: result, error } = await supabase
        .from(table)
        .insert([data])
        .select()
        .single()

      if (error) throw error

      onSuccess?.(result)
      return result
    } catch (err) {
      const error = err as PostgrestError
      setError(error)
      onError?.(error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const update = async (id: string, data: any) => {
    setLoading(true)
    try {
      const { data: result, error } = await supabase
        .from(table)
        .update(data)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      onSuccess?.(result)
      return result
    } catch (err) {
      const error = err as PostgrestError
      setError(error)
      onError?.(error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const remove = async (id: string) => {
    setLoading(true)
    try {
      const { error } = await supabase
        .from(table)
        .delete()
        .eq('id', id)

      if (error) throw error

      onSuccess?.(id)
    } catch (err) {
      const error = err as PostgrestError
      setError(error)
      onError?.(error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return {
    create,
    update,
    remove,
    loading,
    error,
  }
}
```