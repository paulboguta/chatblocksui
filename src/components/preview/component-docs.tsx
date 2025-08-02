import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ComponentPreview } from '@/components/preview';
import { ComponentInstallation } from '@/components/preview/installation';

export interface ManualStep {
  title: string;
  content: string;
  showSourceFiles?: boolean;
  showDependencies?: boolean;
}

export interface ComponentExampleProps {
  name: string;
  title?: string;
  description?: string;
  display?: 'default' | 'fullscreen';
}

export interface ComponentDocsProps {
  name: string;
  // Preview props
  display?: 'default' | 'fullscreen';
  className?: string;

  // CLI Installation props
  packageName?: string;
  cliDependencies?: string[];

  // Manual Installation props
  manualDependencies?: string[];
  devDependencies?: string[];
  manualSteps?: ManualStep[];

  // Examples (optional)
  examples?: ComponentExampleProps[];
}

export async function ComponentDocs({
  name,
  display = 'default',
  className,
  packageName,
  cliDependencies = [],
  manualDependencies = [],
  devDependencies = [],
  manualSteps = [],
  examples = [],
}: ComponentDocsProps) {
  // Load source files for manual installation
  const sourceFiles = await loadComponentSources([name]);

  return (
    <div className="space-y-12">
      {/* Main Preview */}
      <ComponentPreview className={className} display={display} name={name} />

      {/* Installation Section */}
      <ComponentInstallation
        cliDependencies={cliDependencies}
        devDependencies={devDependencies}
        manualDependencies={manualDependencies}
        manualSteps={manualSteps}
        packageName={packageName}
        sourceFiles={sourceFiles}
      />

      {/* Examples Section (Optional) */}
      {examples.length > 0 && (
        <div className="space-y-6">
          <h2 className="font-semibold text-2xl">Examples</h2>
          <div className="space-y-8">
            {examples.map((example) => (
              <div className="space-y-4" key={example.name}>
                {example.title && (
                  <h3 className="font-medium text-lg">{example.title}</h3>
                )}
                {example.description && (
                  <p className="text-muted-foreground">{example.description}</p>
                )}
                <ComponentPreview
                  display={example.display || 'default'}
                  name={example.name}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

async function loadComponentSources(
  components: string[]
): Promise<{ name: string; content: string }[]> {
  const files: { name: string; content: string }[] = [];

  for (const component of components) {
    try {
      // biome-ignore lint/nursery/noAwaitInLoop: <node-read-file>
      const content = await readFile(
        join(process.cwd(), 'src', 'components', 'ui', `${component}.tsx`),
        'utf-8'
      );
      files.push({ name: component, content });
    } catch {
      // Component file doesn't exist, skip
    }
  }

  return files;
}
