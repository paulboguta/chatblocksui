import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { CodeIcon, EyeIcon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { ComponentPreviewCode } from './code';
import { ComponentPreviewDisplay } from './display';

interface ComponentPreviewProps {
  primitive: string;
  example: string;
  className?: string;
  display?: 'default' | 'fullscreen';
}

export async function ComponentPreview({
  primitive,
  example,
  className,
  display = 'default',
}: ComponentPreviewProps) {
  const fileName = `${example}.tsx`;
  const filePath = join(process.cwd(), 'src', 'registry', primitive, fileName);

  const exampleCode = await readFile(filePath, 'utf-8');

  const Component = await import(
    `../../registry/${primitive}/${fileName}`
  ).then((mod) => mod.default);

  const transformedCode = exampleCode.replace(
    /@\/components\/chatblocks\//g,
    '@/components/ui/'
  );

  return (
    <div className={cn('space-y-4', className)}>
      <Tabs defaultValue="preview">
        <TabsList className="w-fit">
          <TabsTrigger className="gap-2" value="preview">
            <EyeIcon className="h-4 w-4" />
            Preview
          </TabsTrigger>
          <TabsTrigger className="gap-2" value="code">
            <CodeIcon className="h-4 w-4" />
            Code
          </TabsTrigger>
        </TabsList>
        <TabsContent  className="mt-4 size-full" value="preview">
        <div
            className={cn(
              'overflow-hidden rounded-lg border',
              display === 'fullscreen' ? 'h-[48rem]' : 'h-[32rem]'
            )}
          >
            <ComponentPreviewDisplay display={display}>
              <Component />
            </ComponentPreviewDisplay>
          </div>
        </TabsContent>
        <TabsContent className="mt-4" value="code">
          <div
            className={cn(
              'overflow-hidden rounded-lg border',
              display === 'fullscreen' ? 'h-[48rem]' : 'h-[32rem]'
            )}
          >
            <ComponentPreviewCode
              filename={`${example}.tsx`}
              files={transformedCode}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
