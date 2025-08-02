'use client';

import { Check, Copy, Terminal } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface InstallCLIProps {
  packageName: string;
  dependencies?: string[];
}

const packageManagers = [
  { name: 'pnpm', command: 'pnpm add' },
  { name: 'npm', command: 'npm install' },
  { name: 'yarn', command: 'yarn add' },
  { name: 'bun', command: 'bun add' },
] as const;

export function InstallCLI({
  packageName,
  dependencies = [],
}: InstallCLIProps) {
  const [copied, setCopied] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('pnpm');

  const handleCopy = (command: string) => {
    navigator.clipboard.writeText(command);
    setCopied(command);
    setTimeout(() => setCopied(null), 2000);
  };

  const getInstallCommand = (pmCommand: string) => {
    const packages = [packageName, ...dependencies].join(' ');
    return `${pmCommand} ${packages}`;
  };

  const currentCommand = getInstallCommand(
    packageManagers.find((pm) => pm.name === activeTab)?.command || 'pnpm add'
  );

  return (
    <div className="relative overflow-x-auto rounded-lg border">
      <Tabs className="gap-0" onValueChange={setActiveTab} value={activeTab}>
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
              <TabsContent className="mt-0 px-4 py-3.5" key={name} value={name}>
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
        title={copied === currentCommand ? 'Copied!' : 'Copy to clipboard'}
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
  );
}
