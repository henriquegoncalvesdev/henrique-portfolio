# Architect Mode Rules (Non-Obvious Only)

This file provides guidance to agents when planning architecture in this repository.

## Content-Driven Architecture

- Portfolio content separated from implementation in `src/resources/content.tsx`
- Single source of truth: content changes DON'T require code changes
- Type system enforces content structure via `src/types/content.types.ts`
- Pages are presentational only - they read from content exports

## Component Auto-Registration Pattern

- Interactive demos use registry pattern in `src/components/interactive/demos/index.ts`
- Skills automatically connect to demos via exact title matching
- Lazy loading built into registry - no manual code splitting needed
- Adding new demo: export in registry with key matching skill title

## Theme System Architecture

- Theme state managed via localStorage + data attributes (no React state)
- Inline script in layout.tsx runs BEFORE React hydration (prevents flash)
- Once UI tokens bridge design system with runtime theme
- Effects config in once-ui.config.ts drives Background component props

## MDX Dual-System Design

- Uses @next/mdx for BUILD-time MDX compilation
- Uses next-mdx-remote for RUNTIME MDX rendering
- Both required - one doesn't replace the other
- Filename-based routing: file in `posts/` becomes `/blog/[filename]`

## Once UI Design System Integration

- Never mix standard HTML with Once UI components
- Once UI provides BOTH layout primitives AND themed components
- Spacing system uses string tokens, not pixel values
- CSS imports order matters: styles.css → tokens.css → custom.css

## Password Protection Layer

- Cookie-based auth via API routes in `src/app/api/`
- RouteGuard component checks auth in layout.tsx (top-level)
- Routes protected via config object, not component-level logic
- Single password for all protected routes (not per-route)

## Type System Strategy

- Custom typeRoots prioritizes local types over node_modules
- Content types define contract between `content.tsx` and components
- Path alias `@/*` maps to `src/*` for clean imports
- React 19.2.0 requires specific JSX transform setting

## Build System Constraints

- SASS compiler must be "modern" (not default "dart-sass")
- Biome replaces Prettier AND ESLint (don't add both)
- next-mdx-remote must be in transpilePackages (or build fails)
- Image remotePatterns restrictive (only Google by default)

## Performance Architecture

- Demos lazy-loaded automatically via registry
- Suspense boundaries isolate loading states per feature
- Theme script inline prevents render blocking
- CSS Modules scoped per component (no global pollution)
