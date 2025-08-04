import type { MetadataRoute } from 'next';
import { source } from '@/lib/source';
import { websiteConfig } from '@/website.config';

export default function sitemap(): MetadataRoute.Sitemap {
  // Get all documentation pages
  const docPages = source.getPages().map((page) => ({
    url: page.url === '' ? websiteConfig.url : `${websiteConfig.url}/${page.url}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: page.url === '' ? 0.9 : 0.7,
  }));

  // Static pages
  const staticPages = [
    {
      url: websiteConfig.url,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${websiteConfig.url}/llms.tsx`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }
  ];

  return [...staticPages, ...docPages];
}
