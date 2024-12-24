import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import type { Product } from '@/lib/supabase/types'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const sort = searchParams.get('sort') || 'created_at'
    const order = searchParams.get('order') || 'desc'

    const offset = (page - 1) * limit

    let query = supabaseAdmin
      .from('products')
      .select(`
        *,
        tags:products_tags(tags(*))
      `)
      .eq('status', 'published')
      .order(sort, { ascending: order === 'asc' })
      .range(offset, offset + limit - 1)

    if (category) {
      query = query.contains('tags.name', [category])
    }

    if (search) {
      query = query.or(`name.ilike.%${search}%,short_description.ilike.%${search}%`)
    }

    const { data: products, error, count } = await query

    if (error) throw error

    return NextResponse.json({
      products,
      total: count || 0,
      page,
      totalPages: Math.ceil((count || 0) / limit)
    })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}