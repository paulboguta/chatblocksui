'use client';

import { Markdown } from '@/components/chatblocks/markdown';

const advancedMarkdown = `# Advanced Markdown Features

This demo showcases advanced markdown capabilities including syntax highlighting and tables.

## Code Highlighting

### TypeScript Example
\`\`\`tsx
function greet(name: string) {
  return \`Hello, \${name}!\`;
}

const message = greet('chatblocks');
console.log(message);
\`\`\`

## Data Tables

### Feature Comparison
| Feature | Basic | Advanced | Enterprise |
|---------|-------|----------|------------|
| Syntax Highlighting | ❌ | ✅ | ✅ |
| Tables | ❌ | ✅ | ✅ |
| Custom Themes | ❌ | ❌ | ✅ |
| API Access | Limited | Full | Full |
| Support | Community | Email | Priority |
`;

export default function MarkdownAdvanced() {
  return (
    <div className="w-full space-y-6">
      <Markdown content={advancedMarkdown} />
    </div>
  );
}