import type { Metadata } from 'next';
import { websiteConfig } from '@/website.config';

interface MetaTagsProps {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: 'website' | 'article';
}

export function generateMetadata({
  title,
  description,
  path = '',
  image,
  type = 'website',
}: MetaTagsProps): Metadata {
  const pageTitle = title
    ? `${title} | ${websiteConfig.name}`
    : websiteConfig.name;
  const pageDescription = description || websiteConfig.description;
  const pageUrl = `${websiteConfig.url}${path}`;
  const pageImage = image || `${websiteConfig.url}/og-image.png`;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: [
      'chatblocks',
      'AI components',
      'UI library',
      'React components',
      'shadcn/ui',
      'chat interface',
      'AI chat',
      'conversational UI',
      'component library',
      'TypeScript',
      'Next.js',
    ],
    authors: [{ name: websiteConfig.name }],
    creator: websiteConfig.name,
    publisher: websiteConfig.name,
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
    openGraph: {
      type,
      title: pageTitle,
      description: pageDescription,
      url: pageUrl,
      siteName: websiteConfig.name,
      images: [
        {
          url: pageImage,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: [pageImage],
      creator: '@pawelboguta',
    },
    alternates: {
      canonical: pageUrl,
    },
    category: 'technology',
  };
}
