import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { ComponentPreview } from '@/components/preview';
import { InstallManual } from './components/preview/install-manual';

// use this function to get MDX components, you will need it for rendering MDX
export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ComponentPreview,
    InstallManual,
    ...components,
  };
}
