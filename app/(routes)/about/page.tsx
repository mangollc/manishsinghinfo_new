import type { Metadata } from 'next'
import { sharedMetadata } from '@/app/metadata'
import { AboutContent } from '@/components/pages/about/content'

export const metadata: Metadata = {
  ...sharedMetadata,
  title: 'About Us',
  description: 'Learn about our mission to provide expert guidance in immigration, tax planning, technology, and career development.',
  keywords: [
    'about us',
    'our mission',
    'expert team',
    'professional services',
    'company values',
    'industry expertise',
    'client success',
    'trusted advisor',
    'professional background',
    'service commitment'
  ],
}

export default function AboutPage() {
  return <AboutContent />
}