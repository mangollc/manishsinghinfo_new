import type { Metadata } from 'next'
import { sharedMetadata } from '@/app/metadata'
import { BlogContent } from '@/components/pages/blog/content'

export const metadata: Metadata = {
  ...sharedMetadata,
  title: 'Blog & Insights',
  description: 'Expert insights on immigration, tax planning, technology trends, and career development.',
  keywords: [
    'immigration blog',
    'tax planning tips',
    'technology insights',
    'AI trends',
    'career advice',
    'professional development',
    'business growth',
    'expert guidance',
    'industry news',
    'success stories'
  ],
}

export default function BlogPage() {
  return <BlogContent />
}