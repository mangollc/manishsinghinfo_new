/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { 
    unoptimized: true,
    domains: ['images.unsplash.com', 'vtktgosujzgienmlobmi.supabase.co']
  }
};

module.exports = nextConfig;