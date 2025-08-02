import type { MetadataRoute } from 'next';
import { websiteConfig } from '@/website.config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/_next/',
        '/r/*.json', // Registry files don't need to be indexed
      ],
    },
    sitemap: `${websiteConfig.url}/sitemap.xml`,
  };
}
