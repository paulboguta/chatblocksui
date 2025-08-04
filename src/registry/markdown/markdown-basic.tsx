'use client';

import { Markdown } from '@/components/chatblocks/markdown';

const basicMarkdown = `# Welcome to chatblocks

This is a **markdown** demo showcasing basic formatting capabilities with *italic* and **bold** text.

## Basic Features

Here are some basic markdown elements:

- Simple bullet points
- **Bold text** for emphasis
- *Italic text* for style
- Regular paragraphs with proper spacing

### Quotes and Links

> This is a blockquote example.
> It can span multiple lines and provides emphasis.

You can also include [links to external sites](https://chatblocks.dev) or inline code like \`const example = true\`.

## Why Use Markdown?

Markdown provides a clean, readable way to format text that's perfect for AI chat applications. It's simple yet powerful enough for most content needs.
`;

export default function MarkdownBasic() {
  return (
    <div className="w-full space-y-6">
      <Markdown content={basicMarkdown} />
    </div>
  );
}