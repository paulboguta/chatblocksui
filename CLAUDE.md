# ChatBlocks UI Library

## Project Overview
ChatBlocks is a UI component library specifically designed for AI chat applications. It extends shadcn/ui components with specialized components for AI interactions like AI inputs, chat interfaces, and related UI elements.

## Tech Stack
- **Framework**: Next.js 15 (with Turbo)
- **Documentation**: Fumadocs
- **UI Components**: shadcn/ui (extended)
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **Package Manager**: pnpm
- **Code Quality**: Biome (linting/formatting with ultracite preset)

## Project Structure
```
chatblocksui/
├── src/
│   ├── content/               # Documentation content (MDX)
│   ├── registry/              # Registry components for publishing
│   │   ├── ai-input/
│   │   │   ├── ai-input.tsx               # Primitive component
│   │   │   └── ai-input-demo.tsx          # Basic demo
│   │   └── [component-name]/
│   │       ├── [component-name].tsx       # Primitive
│   │       └── [component-name]-demo.tsx  # Demo
│   ├── app/                   # Next.js app router
│   │   ├── (home)/            # Home page
│   │   ├── docs/              # Documentation pages
│   │   └── api/               # API routes
│   ├── lib/                   # Utility functions
│   └── components/
│       ├── ui/                # Shadcn components (installed via CLI)
│       └── preview/           # Existing preview components (keep as-is)
├── biome.jsonc                # Biome configuration
├── registry.json              # Shadcn registry configuration
└── source.config.ts           # Fumadocs configuration
```

## Development Commands
```bash
# Development
pnpm dev              # Start dev server with Turbo

# Build
pnpm build            # Build for production

# Start
pnpm start            # Start production server

# Registry
pnpm registry:build   # Build registry JSON files (shadcn build)

# Code Quality
# Note: No explicit lint/format commands - Biome runs via editor integration
```

## Component Library Goals
- Create specialized AI chat components extending shadcn/ui
- Components to include:
  - AI-friendly input components
  - Chat message displays
  - Streaming response indicators
  - Token counters
  - Model selectors
  - Chat history components
  - And other AI chat-specific UI elements

## Registry Architecture

### Component Structure
- **Registry Components**: `src/registry/[component]/`
  - `[component].tsx` - Primitive component with multiple exports + types (shadcn style)
  - `[component]-demo.tsx` - Basic demo showing component usage

### Installation Flow
When users run: `npx shadcn@latest add chatblocksui/ai-input`
- Primitive goes to: `components/ui/ai-input.tsx`
- Demo goes to: `components/ai-input-demo.tsx`

### Internal Development
- `src/components/ui/` - Shadcn components we install for building our library
- `src/components/preview/` - Existing preview components (navigation, preview tabs, etc.)

### Documentation Examples
- Basic usage: Import from registry demos
- Advanced usage: Create `src/content/docs/components/[component]-with-[feature].tsx`
  - Examples: `ai-input-with-voice.tsx`, `ai-input-with-model-selector.tsx`

## Biome Configuration
- Extends `ultracite` preset for consistent code style
- Excludes shadcn/ui directories from linting to preserve original formatting

## Documentation
Documentation is built with Fumadocs and lives in the `src/content/docs/` directory. Each component should have corresponding documentation.

## Registry Configuration

### Registry JSON Structure
Based on shadcn CLI requirements:
- Registry items live in `src/registry/[component]/`
- Each component needs entry in `registry.json`
- Files are built to `public/r/` via `pnpm registry:build`
- Served at `http://localhost:3000/r/[component].json`

### Component Requirements
- Use `@/registry` imports in registry components
- List shadcn dependencies in `registryDependencies`
- List npm packages in `dependencies`
- Follow `src/registry/[component]` directory structure

## Notes for AI Assistants
- Always check existing shadcn/ui patterns before creating new components
- Follow the established code style (Biome with ultracite preset)
- Registry components go in `src/registry/[component]/`
- Internal app components go in `src/components/preview/`
- Advanced examples go in `src/content/docs/components/`
- Use Tailwind CSS v4 syntax
- Install shadcn@canary for registry build functionality