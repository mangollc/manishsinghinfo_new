import type { Metadata } from 'next'
import { sharedMetadata } from '@/app/metadata'
import { TaxFinanceContent } from '@/components/pages/tax-finance/content'

export const metadata: Metadata = {
  ...sharedMetadata,
  title: 'Tax & Finance Solutions',
  description: 'Professional tax planning, financial optimization strategies, and accounting solutions for individuals and businesses.',
  keywords: [
    'tax planning',
    'financial optimization',
    'tax strategy',
    'business accounting',
    'tax compliance',
    'financial planning',
    'tax preparation',
    'small business tax',
    'tax consulting',
    'financial advice'
  ],
}

export default function TaxFinancePage() {
  return <TaxFinanceContent />
}