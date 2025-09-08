import { Metadata } from 'next';

export const dynamic = 'force-dynamic'; // Force dynamic rendering for this layout
export const revalidate = 60; // Revalidate every 60 seconds
export const runtime = 'edge'; // Use Edge runtime for better performance
export const preferredRegion = 'brazil'; // Preferred region for Edge functions

export const metadata: Metadata = {
  title: 'Rafa Mori - Full Cycle Developer',
  description: 'Portfolio de Rafael Mori, desenvolvedor full cycle especializado em React, Node.js, e tecnologias modernas.',
  keywords: 'developer, react, nodejs, typescript, portfolio, full stack, rafael mori, devops, software engineer, web development',
  authors: [
    { 
      name: 'Rafael Mori', 
      url: 'https://rafamori.pro' 
    }
  ],
  creator: 'Rafael Mori',
  metadataBase: new URL('https://rafa-mori.dev'),
  openGraph: {
    title: 'Rafa Mori - Full Cycle Developer',
    description: 'Portfolio profissional de Rafael Mori',
    url: 'https://rafa-mori.dev',
    siteName: 'Rafa Mori Portfolio',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Rafa Mori - Full Cycle Developer',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rafa Mori - Full Cycle Developer',
    description: 'Portfolio profissional de Rafael Mori',
    creator: '@faelOmori',
    images: ['/images/og-image.jpg'],
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
};
