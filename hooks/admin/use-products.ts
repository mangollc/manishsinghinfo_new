import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase/client"
import type { Product } from "@/lib/supabase/types"

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select(`
          *,
          tags:products_tags(tags(*))
        `)
        .order("created_at", { ascending: false })

      if (error) throw error

      setProducts(data || [])
    } catch (error) {
      console.error("Error fetching products:", error)
      setError(error as Error)
    } finally {
      setLoading(false)
    }
  }

  return { products, loading, error, refetch: fetchProducts }
}