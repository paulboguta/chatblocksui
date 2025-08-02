'use client';

import { Step, Steps } from 'fumadocs-ui/components/steps';
import { Check, Copy, Terminal } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ComponentPreviewSource } from './source';

interface ManualStep {
  title: string;
  content: string;
  showSourceFiles?: boolean;
  showDependencies?: boolean;
}

interface InstallManualProps {
  dependencies?: string[];
  devDependencies?: string[];
  steps?: ManualStep[];
  sourceFiles: { name: string; content: string }[];
}

const packageManagers = [
  { name: 'pnpm', command: 'pnpm add' },
  { name: 'npm', command: 'npm install' },
  { name: 'yarn', command: 'yarn add' },
  { name: 'bun', command: 'bun add' },
] as const;

export function InstallManual({
  dependencies = [],
  steps = [],
  sourceFiles,
}: InstallManualProps) {
  const [copied, setCopied] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('pnpm');

  const handleCopy = (command: string) => {
    navigator.clipboard.writeText(command);
    setCopied(command);
    setTimeout(() => setCopied(null), 2000);
  };

  const getInstallCommand = (pmCommand: string) => {
    return `${pmCommand} ${dependencies.join(' ')}`;
  };

  const currentCommand = getInstallCommand(
    packageManagers.find((pm) => pm.name === activeTab)?.command || 'pnpm add'
  );

  const defaultSteps: ManualStep[] = [
    // Only include dependencies step if there are dependencies
    ...(dependencies.length > 0
      ? [
          {
            title: 'Install dependencies',
            content: 'Install the following dependencies:',
            showDependencies: true,
          },
        ]
      : []),
    {
      title: 'Copy and paste the following code into your project',
      content: 'Copy the source code below and add it to your project.',
      showSourceFiles: true,
    },
    {
      title: 'Update the import paths to match your project setup',
      content:
        'Make sure the import paths in the copied code match your project structure.',
    },
  ];

  const allSteps = steps.length > 0 ? steps : defaultSteps;

  return (
    <div className="space-y-6">
      <Steps>
        {allSteps.map((step) => (
          <Step key={step.title}>
            <h3 className="font-semibold">{step.title}</h3>
            {step.content && (
              <div className="prose prose-sm dark:prose-invert max-w-none">
                {step.content}
              </div>
            )}

            {/* Show dependencies terminal like CLI */}
            {step.showDependencies && dependencies.length > 0 && (
              <div className="mt-4">
                <div className="relative overflow-x-auto rounded-lg border">
                  <Tabs
                    className="gap-0"
                    onValueChange={setActiveTab}
                    value={activeTab}
                  >
                    <div className="flex items-center gap-2 border-border/50 border-b px-3 py-1">
                      <div className="flex size-4 items-center justify-center rounded-[1px] bg-foreground opacity-70">
                        <Terminal className="size-3 text-background" />
                      </div>
                      <TabsList className="rounded-none bg-transparent p-0">
                        {packageManagers.map(({ name }) => (
                          <TabsTrigger
                            className="h-7 border border-transparent pt-0.5 data-[state=active]:border-input data-[state=active]:bg-accent data-[state=active]:shadow-none"
                            key={name}
                            value={name}
                          >
                            {name}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                    </div>
                    <div className="no-scrollbar overflow-x-auto">
                      {packageManagers.map(({ name, command }) => {
                        const installCommand = getInstallCommand(command);
                        return (
                          <TabsContent
                            className="mt-0 px-4 py-3.5"
                            key={name}
                            value={name}
                          >
                            <pre>
                              <code
                                className="relative font-mono text-sm leading-none"
                                data-language="bash"
                              >
                                {installCommand}
                              </code>
                            </pre>
                          </TabsContent>
                        );
                      })}
                    </div>
                  </Tabs>
                  <Button
                    className="absolute top-2 right-2 z-10 size-7 opacity-70 hover:opacity-100 focus-visible:opacity-100"
                    onClick={() => handleCopy(currentCommand)}
                    size="icon"
                    title={
                      copied === currentCommand
                        ? 'Copied!'
                        : 'Copy to clipboard'
                    }
                    variant="ghost"
                  >
                    <span className="sr-only">Copy</span>
                    {copied === currentCommand ? (
                      <Check className="size-4" />
                    ) : (
                      <Copy className="size-4" />
                    )}
                  </Button>
                </div>
              </div>
            )}

            {/* Show source files when showSourceFiles is true */}
            {step.showSourceFiles && sourceFiles.length > 0 && (
              <div className="mt-4">
                <ComponentPreviewSource files={sourceFiles} />
              </div>
            )}
          </Step>
        ))}
      </Steps>
    </div>
  );
}
