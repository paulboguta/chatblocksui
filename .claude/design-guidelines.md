# chatblocks Design Guidelines

## Core Philosophy
**Follow shadcn/ui patterns exactly** - chatblocks extends shadcn/ui for AI chat applications while maintaining complete consistency with shadcn's design system, code patterns, and philosophy.

## Visual Design

### Style Direction
- **Aesthetic**: Black/white minimalistic design system (shadcn style)
- **Colors**: Neutral gray palette matching shadcn defaults
- **Animations**: Minimalistic micro-interactions only (v1)
- **Density**: Compact design inspired by Attio, while maintaining shadcn consistency
- **Responsive**: Truly responsive micro-components
- **Theme**: Equal priority for light/dark modes (as shadcn does)

### Component States
- **Loading States**: TODO - Define skeleton screens and loading indicators
- **Error Handling**: TODO - Define error state patterns and messaging

## Component Architecture

### Code Principles
- **Single File Components**: Each primitive in one file (following shadcn)
- **Primitives**: Built on shadcn components first, then Radix UI primitives
- **TypeScript**: Strict typing throughout
- **Props**: Follow shadcn patterns for prop spreading and HTML attributes
- **Exports**: Match shadcn export patterns
- **File Organization**: Match shadcn type and code organization

### Composition Pattern
- **Compound Components**: Use multi-part components where appropriate
  - Example: `<Tooltip>`, `<TooltipTrigger>`, `<TooltipContent>`
- **Stateless Primitives**: Components are "stupid" - receive handlers as props
  - Example: `ai-input.tsx` receives `onChange` and `onSubmit` as props
- **Stateful Demos**: Demo files contain state management and usage examples

### Registry Structure
```
src/registry/[component]/
├── [component].tsx       # Stateless primitive component
└── [component]-demo.tsx  # Stateful demo with usage example
```

## Accessibility
- **WCAG Compliance**: Prioritize accessible components
- **Keyboard Navigation**: Full keyboard support
- **Screen Readers**: Proper ARIA labels and descriptions
- **Focus Management**: Clear focus indicators and logical tab order

## Development Standards

### Browser Support
- Follow shadcn browser support matrix

### Bundle Size
- Follow shadcn approach to bundle optimization

### Documentation
- **Props Documentation**: No JSDoc comments initially
- **Demo Complexity**: Start with basic usage examples
- **Advanced Examples**: Add to `src/content/docs/components/` as needed

## Component Guidelines

### General Requirements
1. Always check existing shadcn patterns before creating new components
2. Use existing shadcn components as building blocks
3. Maintain consistency with shadcn's API design
4. Keep primitives pure and stateless
5. Put interactive logic in demo files

### Naming Conventions
- Use lowercase "chatblocks" for all branding
- Component names follow shadcn conventions
- File names use kebab-case
- Component exports use PascalCase

## Future Considerations
- **AI-Specific Elements**: To be defined as library evolves
- **Advanced Variants**: To be added based on usage patterns
- **Animation Library**: May expand beyond minimal animations in future versions