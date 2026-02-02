# Ask Mode Rules (Non-Obvious Only)

This file provides guidance to agents when answering questions about this repository.

## Content vs Code Separation

- "How to change homepage text?" → Edit `src/resources/content.tsx`, NOT page files
- "How to add skills?" → Edit `about.technical.skills` array in `content.tsx`
- "How to add blog post?" → Create `.mdx` file in `src/app/blog/posts/`, auto-routed
- "How to add project?" → Create `.mdx` file in `src/app/work/projects/`, auto-routed

## Component Library Context

- This project uses Once UI, NOT standard React components
- "How to add a div?" → Use `<Column>` or `<Row>` from Once UI instead
- "How to style text?" → Use `<Text>` component with variant prop
- "How to add spacing?" → Use Once UI props: `gap="8"`, `padding="16"` (strings)

## Interactive Demos Architecture

- Demos live in `src/components/interactive/demos/`
- Auto-connect to skills via registry in `index.ts`
- Registry key must match skill title from `content.tsx` exactly
- All demos are lazy-loaded for performance

## Theme System Clarification

- Theme switching done at runtime via localStorage
- Inline script in layout.tsx prevents flash (must stay inline)
- Effects (gradient, grid, lines, dots) configured in `once-ui.config.ts`
- Modifying defaults requires editing BOTH config file AND inline script

## File Organization (Counterintuitive)

- `src/resources/` contains content data AND configuration (unusual mix)
- `src/types/` contains TypeScript types for content structure
- `src/components/` organized by feature, not by component type
- `src/app/` follows Next.js App Router conventions with special `.mdx` handling

## Password Protection System

- Protected routes defined in `once-ui.config.ts`
- Password stored in `.env` file
- RouteGuard component in layout.tsx handles logic
- Cookie-based authentication via API routes

## Build/Deploy Context

- Uses Biome for formatting, not Prettier
- SASS compiler set to "modern" mode (non-default)
- MDX requires TWO packages: @next/mdx AND next-mdx-remote
- Node.js v18.17+ required (specified in README)
