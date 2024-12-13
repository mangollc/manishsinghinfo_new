import { Metadata } from 'next'

export const siteConfig = {
  name: 'ManishSingh.info',
  url: 'https://manishsingh.info',
  description: 'Expert guidance and resources for immigration, tax optimization, technology adoption, AI solutions, and career development.',
  keywords: [
    'immigration guidance',
    'tax optimization',
    'AI solutions',
    'career development',
    'digital products',
    'technology consulting',
    'small business accounting',
    'visa assistance',
    'tax planning',
    'career coaching',
    'digital downloads',
    'website templates',
    'online courses',
    'stock assets',
    'website code',
    'professional development'
  ]
}

export const sharedMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} - Immigration, Tax, Technology, AI & Career Success`,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: 'Manish Singh' }],
  creator: 'Manish Singh',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}