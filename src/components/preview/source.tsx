'use client';

import { Check, Copy } from 'lucide-react';
import { useState } from 'react';
import {
  CodeBlock,
  CodeBlockCode,
  CodeBlockGroup,
} from '@/components/chatblocks/code-block';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { useTheme } from '@/lib/use-theme';

interface ComponentPreviewSourceProps {
  files: { name: string; content: string }[];
}

export function ComponentPreviewSource({ files }: ComponentPreviewSourceProps) {
  const [copiedFile, setCopiedFile] = useState<string | null>(null);
  const theme = useTheme();
  const codeTheme = theme === 'dark' ? 'github-dark' : 'github-light';

  const handleCopy = (name: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedFile(name);
    setTimeout(() => setCopiedFile(null), 2000);
  };

  if (files.length === 0) {
    return (
      <div className="flex h-full items-center justify-center text-muted-foreground">
        No source files available
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto">
      <Tabs className="h-full" defaultValue={files[0]?.name}>
        {files.map(({ name, content }) => (
          <TabsContent className="h-[calc(100%-40px)]" key={name} value={name}>
            <CodeBlock className="h-full rounded-none border-0">
              <CodeBlockGroup className="py-2 pr-2 pl-4">
                <span className="text-muted-foreground text-xs">
                  @/components/ui/{name}.tsx
                </span>
                <Button
                  className="h-8 w-8"
                  onClick={() => handleCopy(name, content)}
                  size="icon"
                  variant="ghost"
                >
                  {copiedFile === name ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </CodeBlockGroup>
              <CodeBlockCode
                className="min-h-full"
                code={content}
                language="tsx"
                theme={codeTheme}
              />
            </CodeBlock>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
