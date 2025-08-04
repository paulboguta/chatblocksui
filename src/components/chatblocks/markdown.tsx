'use client';

import { marked } from 'marked';
import * as React from 'react';
import { cn } from '@/lib/utils';
import { CodeBlock, CodeBlockCode } from './code-block';

interface MarkdownProps extends React.HTMLAttributes<HTMLDivElement> {
  content: string;
  /** Custom renderer for code blocks */
  renderCodeBlock?: (
    code: string,
    language?: string,
    index?: number
  ) => React.ReactNode;
  /** Additional prose class names */
  proseClassName?: string;
}

const Markdown = React.memo(
  ({
    className,
    content,
    renderCodeBlock,
    proseClassName,
    ...props
  }: MarkdownProps) => {
    const processedContent = React.useMemo(() => {
      if (!content) { return null; }

      try {
        const tokens = marked.lexer(content);

        return tokens
          .map((token, index) => {
            // Handle code blocks with custom renderer
            if (token.type === 'code') {
              if (renderCodeBlock) {
                return (
                  <React.Fragment key={`code-${index}`}>
                    {renderCodeBlock(token.text, token.lang, index)}
                  </React.Fragment>
                );
              }

              return (
                <CodeBlock className="my-4" key={`code-${index}`}>
                  <CodeBlockCode code={token.text} language={token.lang} />
                </CodeBlock>
              );
            }

            // Parse other tokens
            const html = marked.parser([token]);

            // Skip empty paragraphs
            if (token.type === 'paragraph' && !token.text?.trim()) {
              return null;
            }

            return (
              <div
                className="markdown-block"
                dangerouslySetInnerHTML={{ __html: html }}
                key={`block-${index}`}
              />
            );
          })
          .filter(Boolean);
      } catch {
        // Fallback to basic HTML rendering
        return (
          <div
            dangerouslySetInnerHTML={{
              __html: marked.parse(content),
            }}
          />
        );
      }
    }, [content, renderCodeBlock]);

    return (
      <div
        className={cn(
          'prose prose-sm max-w-none',
          // Base text colors
          'prose-headings:text-foreground',
          'prose-p:text-foreground',
          'prose-li:text-foreground',
          'prose-td:text-foreground',
          'prose-th:text-foreground',
          // Emphasis and strong
          'prose-em:text-foreground',
          'prose-strong:text-foreground',
          // Code styling
          'prose-code:text-foreground',
          'prose-code:bg-muted',
          'prose-code:px-1',
          'prose-code:py-0.5',
          'prose-code:rounded',
          'prose-pre:bg-transparent',
          'prose-pre:p-0',
          // Links
          'prose-a:text-primary',
          'prose-a:no-underline',
          'prose-a:font-medium',
          'hover:prose-a:text-primary/80',
          'hover:prose-a:underline',
          // Blockquotes
          'prose-blockquote:border-l-primary/30',
          'prose-blockquote:text-muted-foreground',
          // Lists
          'prose-ul:list-disc',
          'prose-ol:list-decimal',
          // Tables
          'prose-table:border-collapse',
          'prose-table:overflow-hidden',
          'prose-table:rounded-lg',
          'prose-table:border',
          'prose-table:border-border',
          'prose-th:bg-muted/10 dark:prose-th:bg-muted/80',
          'prose-th:font-semibold',
          'prose-th:px-3',
          'prose-th:py-2',
          'prose-th:border-b',
          'prose-th:border-border',
          'prose-td:bg-white dark:prose-td:bg-muted/10',
          'prose-td:px-3',
          'prose-td:py-2',
          'prose-td:border-t',
          'prose-td:border-border',
          'prose-tbody:prose-tr:border-b',
          'prose-tbody:prose-tr:border-border/50',
          // Spacing adjustments
          '[&>*:first-child]:mt-0',
          '[&>*:last-child]:mb-0',
          '[&_.markdown-block:empty]:hidden',
          // Image handling
          'prose-img:rounded-lg',
          'prose-img:shadow-md',
          // Horizontal rules
          'prose-hr:border-border',
          proseClassName,
          className
        )}
        {...props}
      >
        {processedContent}
      </div>
    );
  }
);

Markdown.displayName = 'Markdown';

export { Markdown };
export type { MarkdownProps };
