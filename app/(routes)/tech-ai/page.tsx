import type { Metadata } from 'next'
import { sharedMetadata } from '@/app/metadata'
import { TechAIContent } from '@/components/pages/tech-ai/content'

export const metadata: Metadata = {
  ...sharedMetadata,
  title: 'Technology & AI Solutions',
  description: 'Cutting-edge technology and AI solutions for business growth. Learn about automation, machine learning, and digital transformation.',
  keywords: [
    'AI solutions',
    'technology consulting',
    'machine learning',
    'automation tools',
    'digital transformation',
    'artificial intelligence',
    'business technology',
    'AI implementation',
    'tech innovation',
    'business automation'
  ],
}

export default function TechAIPage() {
  return <TechAIContent />
}