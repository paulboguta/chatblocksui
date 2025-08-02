import { findNeighbour } from 'fumadocs-core/server';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/page';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { source } from '@/lib/source';
import { getMDXComponents } from '@/mdx-components';

export const revalidate = false;
export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return source.generateParams();
}

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) {
    notFound();
  }

  const MDXContent = page.data.body;
  const neighbours = await findNeighbour(source.pageTree, page.url);

  return (
    <DocsPage
      footer={{
        enabled: false,
      }}
      full={page.data.full}
      tableOfContent={{ style: 'clerk' }}
      toc={page.data.toc}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDXContent
          components={getMDXComponents({
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(source, page),
          })}
        />

        {/* Navigation */}
        <div className="mt-12 flex items-center justify-between border-t pt-8">
          {neighbours.previous ? (
            <Button asChild className="h-auto px-4 py-2" variant="secondary">
              <Link
                className="flex items-center gap-2 no-underline"
                href={neighbours.previous.url}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="font-medium text-sm">
                  {neighbours.previous.name}
                </span>
              </Link>
            </Button>
          ) : (
            <div />
          )}

          {neighbours.next ? (
            <Button asChild className="h-auto px-4 py-2" variant="secondary">
              <Link
                className="flex items-center gap-2 no-underline"
                href={neighbours.next.url}
              >
                <span className="font-medium text-sm">
                  {neighbours.next.name}
                </span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          ) : (
            <div />
          )}
        </div>
      </DocsBody>
    </DocsPage>
  );
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) {
    notFound();
  }

  const doc = page.data;

  if (!(doc.title && doc.description)) {
    notFound();
  }

  const url = `https://chatblocks.dev${page.url}`;

  return {
    title: doc.title,
    description: doc.description,
    openGraph: {
      title: doc.title,
      description: doc.description,
      type: 'article',
      url,
      images: [
        {
          url: `/og?title=${encodeURIComponent(
            doc.title
          )}&description=${encodeURIComponent(doc.description)}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: doc.title,
      description: doc.description,
      images: [
        {
          url: `/og?title=${encodeURIComponent(
            doc.title
          )}&description=${encodeURIComponent(doc.description)}`,
        },
      ],
    },
  };
}
