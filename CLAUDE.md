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
├── content/          # Documentation content (MDX)
├── src/
│   ├── app/         # Next.js app router
│   │   ├── (home)/  # Home page
│   │   ├── docs/    # Documentation pages
│   │   └── api/     # API routes
│   ├── lib/         # Utility functions
│   └── components/  # UI components (to be created)
├── biome.jsonc      # Biome configuration
└── source.config.ts # Fumadocs configuration
```

## Development Commands
```bash
# Development
pnpm dev         # Start dev server with Turbo

# Build
pnpm build       # Build for production

# Start
pnpm start       # Start production server

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

## Shadcn/UI Integration
The project is set up to use shadcn/ui components. Components should be added to:
- `src/components/ui/` - Base shadcn components
- `src/components/chat/` - AI chat-specific components

## Biome Configuration
- Extends `ultracite` preset for consistent code style
- Excludes shadcn/ui directories from linting to preserve original formatting

## Documentation
Documentation is built with Fumadocs and lives in the `content/docs/` directory. Each component should have corresponding documentation.

## Notes for AI Assistants
- Always check existing shadcn/ui patterns before creating new components
- Follow the established code style (Biome with ultracite preset)
- Create components in appropriate directories
- Add documentation for new components in `content/docs/`
- Test components in the documentation site
- Use Tailwind CSS v4 syntax