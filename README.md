# chatblocks

<div>
  <img src="https://img.shields.io/npm/dy/chatblocks" alt="" />
  <img src="https://img.shields.io/npm/v/chatblocks" alt="" />
  <img src="https://img.shields.io/github/license/paulboguta/chatblocks" alt="" />
</div>

UI components for AI chat interfaces. Built on [shadcn/ui](https://ui.shadcn.com).

## Overview

**chatblocks** provides specialized components that AI applications need - AI inputs, model selectors, streaming messages, reasoning displays, and more. Everything follows shadcn/ui patterns, so if you know shadcn, you already know chatblocks.

## Features

- 🤖 **AI-First Components** - Purpose-built for chat interfaces and AI interactions
- 🎨 **shadcn/ui Foundation** - Extends the popular component library with AI-specific features
- 📦 **Copy & Paste** - Install only what you need using the shadcn CLI
- 🎯 **TypeScript** - Full type safety out of the box
- 🌐 **Accessible** - Built with accessibility in mind
- 🎨 **Customizable** - Tailwind CSS v4 for easy styling

## Installation

### Prerequisites

- Node.js 18+
- React 19+
- A Next.js, Vite, or Remix project
- shadcn/ui installed and configured

### Quick Start

```bash
# Install a component
npx shadcn@latest add https://chatblocks.dev/r/ai-input.json

# Or with other package managers
pnpm dlx shadcn@latest add https://chatblocks.dev/r/ai-input.json
yarn dlx shadcn@latest add https://chatblocks.dev/r/ai-input.json
bunx shadcn@latest add https://chatblocks.dev/r/ai-input.json
```

### Usage

```tsx
import { AiInput } from "@/components/ui/ai-input";

export default function Chat() {
  return <AiInput placeholder="Ask me anything..." />;
}
```

## Documentation

Visit [chatblocks.dev](https://chatblocks.dev) for full documentation, component examples, and guides.

## Contributing

We welcome contributions! Here's how you can help:

### Development Setup

```bash
# Clone the repository
git clone https://github.com/paulboguta/chatblocks.git
cd chatblocks

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Project Structure

```
chatblocks/
├── src/
│   ├── registry/          # Component library source
│   ├── content/docs/      # Documentation
│   └── app/               # Documentation site
├── biome.jsonc            # Code formatting config
└── registry.json          # Component registry
```

### Development Workflow

1. **Create Components** - Add new components in `src/registry/[component-name]/`
2. **Write Documentation** - Add MDX docs in `src/content/docs/`
3. **Build Registry** - Run `pnpm registry:build` to update registry files
4. **Test Locally** - Components are served at `http://localhost:3000/r/[component].json`

### Code Style

We use [Biome](https://biomejs.dev/) with the ultracite preset for consistent code formatting. Your editor should automatically format on save.

### Submitting Changes

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-component`)
3. Commit your changes (`git commit -m 'Add amazing component'`)
4. Push to your fork (`git push origin feature/amazing-component`)
5. Open a Pull Request

### Component Guidelines

- Follow shadcn/ui patterns and conventions
- Include TypeScript types
- Add a demo file showing basic usage
- Write documentation for new components
- Ensure accessibility standards are met

## Roadmap

- ✅ v0.1 - Core chat components (AI inputs, messages, model selectors)
- 🚧 v0.2 - Voice input/output components
- 📋 v0.3 - Video components and agent builders
- 📋 v0.4 - Workflow and automation components

## Support

- 📖 [Documentation](https://chatblocks.dev)
- 💬 [GitHub Discussions](https://github.com/paulboguta/chatblocks/discussions)
- 🐛 [Issue Tracker](https://github.com/paulboguta/chatblocks/issues)

## License

MIT License - see [LICENSE](LICENSE) for details.

## Acknowledgments

Built on top of [shadcn/ui](https://ui.shadcn.com) by [@shadcn](https://twitter.com/shadcn).