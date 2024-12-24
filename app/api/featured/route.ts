import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import type { FeaturedCard } from '@/lib/supabase/types'

export async function GET() {
  try {
    const { data: featuredCards, error } = await supabaseAdmin
      .from('featured_cards')
      .select('*')
      .eq('status', 'published')
      .order('display_order', { ascending: true })

    if (error) throw error

    return NextResponse.json(featuredCards)
  } catch (error) {
    console.error('Error fetching featured cards:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}