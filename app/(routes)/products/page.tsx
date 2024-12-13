import type { Metadata } from 'next'
import { sharedMetadata } from '@/app/metadata'
import { ProductsContent } from '@/components/pages/products/content'

export const metadata: Metadata = {
  ...sharedMetadata,
  title: 'Digital Products & Resources',
  description: 'Premium digital products including courses, templates, stock assets, and website themes. Download professional resources for your success.',
  keywords: [
    'digital products',
    'online courses',
    'website templates',
    'stock assets',
    'digital downloads',
    'website themes',
    'professional resources',
    'e-learning materials',
    'digital assets',
    'web resources'
  ],
}

export default function ProductsPage() {
  return <ProductsContent />
}