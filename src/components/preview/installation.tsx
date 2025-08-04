import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { Step, Steps } from 'fumadocs-ui/components/steps';
import { BookOpen, Terminal } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ComponentCliInstall } from './installation-cli';
import { ComponentPreviewSource } from './source';

interface ComponentInstallationProps {
  name: string;
}

export async function ComponentInstallation({
  name,
}: ComponentInstallationProps) {
  // Read the source code from components/chatblocks/[name].tsx
  const filePath = join(
    process.cwd(),
    'src',
    'components',
    'chatblocks',
    `${name}.tsx`
  );
  const sourceCode = await readFile(filePath, 'utf-8');

  // Always use npx for shadcn CLI
  const shadcnCommand = `npx shadcn@latest add "https://chatblocks.dev/r/${name}.json"`;

  return (
    <div className="space-y-4">
      <Tabs defaultValue="cli">
        <TabsList>
          <TabsTrigger className="gap-2" value="cli">
            <Terminal className="h-4 w-4" />
            CLI
          </TabsTrigger>
          <TabsTrigger className="gap-2" value="manual">
            <BookOpen className="h-4 w-4" />
            Manual
          </TabsTrigger>
        </TabsList>

        <TabsContent value="cli">
          <ComponentCliInstall command={shadcnCommand} />
        </TabsContent>

        <TabsContent className="space-y-4" value="manual">
          <Steps>
            <Step>
              <h3 className="font-semibold">
                Copy and paste the following code into your project
              </h3>
              <div className="prose prose-sm dark:prose-invert max-w-none">
                Copy the source code below and add it to your project.
              </div>
              <div className="mt-4">
                <ComponentPreviewSource
                  files={[{ name, content: sourceCode }]}
                />
              </div>
            </Step>
            <Step>
              <h3 className="font-semibold">
                Update the import paths to match your project setup
              </h3>
              <div className="prose prose-sm dark:prose-invert max-w-none">
                Make sure the import paths in the copied code match your project
                structure.
              </div>
            </Step>
          </Steps>
        </TabsContent>
      </Tabs>
    </div>
  );
}
