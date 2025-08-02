import { websiteConfig } from '@/website.config';

interface StructuredDataProps {
  type?: 'website' | 'documentation' | 'software';
  title?: string;
  description?: string;
  url?: string;
}

export function StructuredData({
  type = 'website',
  title,
  description,
  url,
}: StructuredDataProps) {
  const baseUrl = websiteConfig.url;
  const pageUrl = url ? `${baseUrl}${url}` : baseUrl;

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: websiteConfig.name,
    description: websiteConfig.description,
    url: baseUrl,
    publisher: {
      '@type': 'Organization',
      name: websiteConfig.name,
      url: baseUrl,
    },
  };

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareLibrary',
    name: title || websiteConfig.name,
    description: description || websiteConfig.description,
    url: pageUrl,
    applicationCategory: 'UI Component Library',
    operatingSystem: 'Web',
    programmingLanguage: ['TypeScript', 'React'],
    codeRepository: websiteConfig.github,
    license: 'MIT',
    creator: {
      '@type': 'Organization',
      name: websiteConfig.name,
    },
  };

  const documentationSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: title,
    description: description,
    url: pageUrl,
    author: {
      '@type': 'Organization',
      name: websiteConfig.name,
    },
    publisher: {
      '@type': 'Organization',
      name: websiteConfig.name,
    },
    dateModified: new Date().toISOString(),
  };

  let schema;
  switch (type) {
    case 'software':
      schema = softwareSchema;
      break;
    case 'documentation':
      schema = documentationSchema;
      break;
    default:
      schema = websiteSchema;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
