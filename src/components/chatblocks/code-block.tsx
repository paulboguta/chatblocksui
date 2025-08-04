'use client';

import * as React from 'react';
import { codeToHtml } from 'shiki';
import { cn } from '@/lib/utils';

interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {}

function CodeBlock({ className, children, ...props }: CodeBlockProps) {
  return (
    <div
      className={cn(
        'relative w-full rounded-lg border bg-background text-foreground',
        'overflow-hidden shadow-sm',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface CodeBlockHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

function CodeBlockHeader({ className, children, ...props }: CodeBlockHeaderProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-between border-b bg-muted/30 px-4 py-2',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface CodeBlockContentProps extends React.HTMLAttributes<HTMLDivElement> {
  code: string;
  language?: string;
  theme?: 'github-light' | 'github-dark';
}

function CodeBlockContent({
  code,
  language = 'typescript',
  theme = 'github-light',
  className,
  ...props
}: CodeBlockContentProps) {
  const [syntaxHTML, setSyntaxHTML] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    let mounted = true;

    async function generateSyntaxHighlight() {
      if (!code.trim()) {
        setSyntaxHTML('');
        setIsLoading(false);
        return;
      }

      try {
        const highlighted = await codeToHtml(code, {
          lang: language,
          theme: theme,
        });
        
        if (mounted) {
          setSyntaxHTML(highlighted);
          setIsLoading(false);
        }
      } catch (error) {
        if (mounted) {
          setSyntaxHTML(`<pre><code>${code}</code></pre>`);
          setIsLoading(false);
        }
      }
    }

    generateSyntaxHighlight();

    return () => {
      mounted = false;
    };
  }, [code, language, theme]);

  if (isLoading || !syntaxHTML) {
    return (
      <div
        className={cn(
          'overflow-x-auto p-4 text-sm font-mono',
          'bg-muted/20 text-muted-foreground',
          className
        )}
        {...props}
      >
        <pre>
          <code>{code}</code>
        </pre>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'overflow-x-auto text-sm',
        '[&>pre]:m-0 [&>pre]:p-4 [&>pre]:bg-transparent',
        '[&>pre]:border-0',
        className
      )}
      dangerouslySetInnerHTML={{ __html: syntaxHTML }}
      {...props}
    />
  );
}

export { CodeBlock, CodeBlockHeader, CodeBlockContent };
export type { CodeBlockProps, CodeBlockHeaderProps, CodeBlockContentProps };