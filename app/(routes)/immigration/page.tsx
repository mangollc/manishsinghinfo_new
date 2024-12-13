import type { Metadata } from 'next'
import { sharedMetadata } from '@/app/metadata'
import { ImmigrationContent } from '@/components/pages/immigration/content'

export const metadata: Metadata = {
  ...sharedMetadata,
  title: 'Immigration Guidance & Visa Assistance',
  description: 'Expert immigration guidance, visa assistance, and compliance tips. Stay updated with latest immigration policies and procedures.',
  keywords: [
    'immigration guidance',
    'visa assistance',
    'immigration compliance',
    'visa application',
    'immigration consulting',
    'global migration',
    'work permits',
    'citizenship',
    'permanent residency',
    'immigration law'
  ],
}

export default function ImmigrationPage() {
  return <ImmigrationContent />
}