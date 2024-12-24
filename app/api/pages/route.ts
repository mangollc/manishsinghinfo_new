import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import type { InformationPage } from '@/lib/supabase/types'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug')

    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 })
    }

    const { data: page, error } = await supabaseAdmin
      .from('information_pages')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single()

    if (error) throw error

    if (!page) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 })
    }

    return NextResponse.json(page)
  } catch (error) {
    console.error('Error fetching page:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}