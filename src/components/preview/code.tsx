'use client';

import { Check, Copy } from 'lucide-react';
import { useState } from 'react';
import {
  CodeBlock,
  CodeBlockContent,
  CodeBlockHeader,
} from '@/components/chatblocks/code-block';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTheme } from '@/lib/use-theme';

interface CodeFile {
  filename: string;
  code: string;
  language?: string;
}

interface ComponentPreviewCodeProps {
  files: CodeFile[] | string;
  filename?: string;
}

export function ComponentPreviewCode({
  files,
  filename = 'demo.tsx',
}: ComponentPreviewCodeProps) {
  const [copiedFile, setCopiedFile] = useState<string | null>(null);
  const theme = useTheme();
  const codeTheme = theme === 'dark' ? 'github-dark' : 'github-light';

  // Convert single code string to files array for backwards compatibility
  const codeFiles: CodeFile[] =
    typeof files === 'string'
      ? [{ filename, code: files, language: 'tsx' }]
      : files;

  const handleCopy = (filename: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedFile(filename);
    setTimeout(() => setCopiedFile(null), 2000);
  };

  if (codeFiles.length === 1) {
    const file = codeFiles[0];
    return (
      <div className="h-full overflow-auto">
        <CodeBlock className="h-full rounded-none border-0">
          <CodeBlockHeader className="py-2 pr-2 pl-4">
            <span className="text-muted-foreground text-xs">
              {file.filename}
            </span>
            <Button
              className="h-8 w-8"
              onClick={() => handleCopy(file.filename, file.code)}
              size="icon"
              variant="ghost"
            >
              {copiedFile === file.filename ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </CodeBlockHeader>
          <CodeBlockContent
            className="min-h-full"
            code={file.code}
            language={file.language || 'tsx'}
            theme={codeTheme}
          />
        </CodeBlock>
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto">
      <Tabs className="h-full" defaultValue={codeFiles[0]?.filename}>
        <TabsList
          className="w-full rounded-none bg-muted/30 px-4"
          variant="compact"
        >
          {codeFiles.map((file) => (
            <TabsTrigger
              key={file.filename}
              value={file.filename}
              variant="compact"
            >
              {file.filename}
            </TabsTrigger>
          ))}
        </TabsList>
        {codeFiles.map((file) => (
          <TabsContent
            className="h-[calc(100%-40px)]"
            key={file.filename}
            value={file.filename}
          >
            <CodeBlock className="h-full rounded-none border-0">
              <CodeBlockHeader className="py-2 pr-2 pl-4">
                <span className="text-muted-foreground text-xs">
                  {file.language?.toUpperCase() || 'TSX'}
                </span>
                <Button
                  className="h-8 w-8"
                  onClick={() => handleCopy(file.filename, file.code)}
                  size="icon"
                  variant="ghost"
                >
                  {copiedFile === file.filename ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </CodeBlockHeader>
              <CodeBlockContent
                className="min-h-full"
                code={file.code}
                language={file.language || 'tsx'}
                theme={codeTheme}
              />
            </CodeBlock>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
