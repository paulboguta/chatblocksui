'use client';

import { useTheme } from 'next-themes';
import * as React from 'react';
import { codeToHtml } from 'shiki';
import { cn } from '@/lib/utils';

// Main container component for code blocks
export interface CodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function CodeBlock({
  className,
  children,
  ...restProps
}: CodeBlockProps) {
  return (
    <article
      aria-label="Code block"
      className={cn(
        'not-prose relative flex w-full flex-col overflow-hidden',
        'rounded-xl border border-border',
        'bg-card text-card-foreground shadow-xs',
        className
      )}
      {...restProps}
    >
      {children}
    </article>
  );
}

// Syntax highlighted code renderer
export interface CodeBlockCodeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  code: string;
  language?: string;
}

export function CodeBlockCode({
  code,
  language = 'typescript',
  className,
  ...restProps
}: CodeBlockCodeProps) {
  const [renderedCode, setRenderedCode] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState(true);
  const { resolvedTheme } = useTheme();

  const syntaxTheme = React.useMemo(
    () => (resolvedTheme === 'dark' ? 'vesper' : 'github-light'),
    [resolvedTheme]
  );

  React.useEffect(() => {
    let isCancelled = false;

    // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: acceptable here
    const renderSyntaxHighlight = async () => {
      setIsLoading(true);

      try {
        if (!code?.trim()) {
          setRenderedCode('<pre class="empty-code"><code></code></pre>');
          return;
        }

        const highlighted = await codeToHtml(code, {
          lang: language || 'text',
          theme: syntaxTheme,
        });

        if (!isCancelled) {
          setRenderedCode(highlighted);
        }
      } catch {
        if (!isCancelled) {
          setRenderedCode(
            `<pre><code class="language-${language}">${escapeHtml(code)}</code></pre>`
          );
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    renderSyntaxHighlight();

    return () => {
      isCancelled = true;
    };
  }, [code, language, syntaxTheme]);

  const containerStyles = cn(
    'w-full overflow-x-auto',
    'text-[13px] leading-relaxed',
    '[&>pre]:px-4 [&>pre]:py-3.5 [&>pre]:pb-6',
    '[&>pre]:m-0',
    '[&_code]:font-mono',
    className
  );

  if (isLoading && code) {
    return (
      <div className={containerStyles} {...restProps}>
        <pre className="animate-pulse">
          <code className="opacity-60">{code}</code>
        </pre>
      </div>
    );
  }

  return (
    <div
      className={containerStyles}
      dangerouslySetInnerHTML={{ __html: renderedCode }}
      data-language={language}
      {...restProps}
    />
  );
}

// Toolbar
export interface CodeBlockGroupProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function CodeBlockGroup({
  children,
  className,
  ...restProps
}: CodeBlockGroupProps) {
  return (
    <header
      className={cn(
        'flex items-center justify-between',
        'border-border/50 border-b',
        'px-4 py-2',
        className
      )}
      {...restProps}
    >
      {children}
    </header>
  );
}

// Helper function to escape HTML
function escapeHtml(text: string): string {
  const htmlEntities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };

  return text.replace(/[&<>"']/g, (match) => htmlEntities[match]);
}
