'use client';

import {
  CodeBlock,
  CodeBlockCode,
} from '@/components/chatblocks/code-block';

const exampleCode = `function greet(name: string) {
  return \`Hello, \${name}!\`;
}

const message = greet("World");
console.log(message);`;

export default function CodeBlockDemo() {
  return (
    <div className="w-full">
      <CodeBlock>
        <CodeBlockCode code={exampleCode} language="typescript" />
      </CodeBlock>
    </div>
  );
}
