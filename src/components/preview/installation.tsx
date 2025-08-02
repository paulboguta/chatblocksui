import { BookOpen, Terminal } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { InstallCLI } from './install-cli';
import { InstallManual } from './install-manual';

interface ManualStep {
  title: string;
  content: string;
  showSourceFiles?: boolean;
  showDependencies?: boolean;
}

interface ComponentInstallationProps {
  packageName?: string;
  cliDependencies?: string[];
  manualDependencies?: string[];
  devDependencies?: string[];
  manualSteps?: ManualStep[];
  sourceFiles: { name: string; content: string }[];
}

export function ComponentInstallation({
  packageName,
  cliDependencies = [],
  manualDependencies = [],
  manualSteps = [],
  sourceFiles,
}: ComponentInstallationProps) {
  // If no package name provided, assume it's a manual-only installation
  const showCLI = packageName !== undefined;

  return (
    <div className="space-y-4">
      <h2 className="font-semibold text-2xl">Installation</h2>

      <Tabs defaultValue={showCLI ? 'cli' : 'manual'}>
        <TabsList>
          {showCLI && (
            <TabsTrigger className="gap-2" value="cli">
              <Terminal className="h-4 w-4" />
              CLI
            </TabsTrigger>
          )}
          <TabsTrigger className="gap-2" value="manual">
            <BookOpen className="h-4 w-4" />
            Manual
          </TabsTrigger>
        </TabsList>

        {showCLI && (
          <TabsContent value="cli">
            <InstallCLI
              dependencies={cliDependencies}
              packageName={packageName}
            />
          </TabsContent>
        )}

        <TabsContent className="space-y-4" value="manual">
          <InstallManual
            dependencies={manualDependencies}
            sourceFiles={sourceFiles}
            steps={manualSteps}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
