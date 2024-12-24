
import { useEffect, useState } from 'react'
import { supabase } from '../config'
import type { PostgrestError } from '@supabase/supabase-js'

interface UseQueryOptions<T> {
  table: string
  select?: string
  filter?: Record<string, any>
  orderBy?: { column: string; ascending?: boolean }
  limit?: number
  single?: boolean
}

export function useQuery<T>({
  table,
  select = '*',
  filter,
  orderBy,
  limit,
  single = false,
}: UseQueryOptions<T>) {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<PostgrestError | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        let query = supabase.from(table).select(select)

        if (filter) {
          Object.entries(filter).forEach(([key, value]) => {
            query = query.eq(key, value)
          })
        }

        if (orderBy) {
          query = query.order(orderBy.column, {
            ascending: orderBy.ascending ?? false,
          })
        }

        if (limit) {
          query = query.limit(limit)
        }

        const { data, error } = single
          ? await query.single()
          : await query

        if (error) throw error

        setData(data as T)
        setError(null)
      } catch (err) {
        setError(err as PostgrestError)
        setData(null)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [table, select, filter, orderBy, limit, single])

  return { data, error, loading }
}
```