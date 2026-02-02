# AGENTS.md

This file provides guidance to agents when working with code in this repository.

## Content Architecture (Non-Standard)

- **All portfolio content** lives in `src/resources/content.tsx` - NOT in individual page files
- Content is typed via interfaces in `src/types/content.types.ts`
- To modify ANY text/data on the site, edit `content.tsx` exports (person, home, about, blog, work, gallery)
- Once UI configuration in `src/resources/once-ui.config.ts` controls theme, fonts, effects, routes

## Interactive Demos System

- Demos auto-connect to skills via `demoRegistry` in `src/components/interactive/demos/index.ts`
- Registry keys MUST match exact skill titles from `content.tsx` technical.skills[].title
- Demos are lazy-loaded - wrap in `<Suspense>` when used
- Example: skill titled "React" will automatically render `ReactDemo` component

## Once UI Components

- Import from `@once-ui-system/core` not standard React/HTML elements
- Use `Column`, `Row`, `Flex`, `Text` instead of divs/spans for layout
- Spacing uses Once UI tokens: `gap="8"`, `padding="16"`, etc.
- Required CSS imports in layout.tsx: `@once-ui-system/core/css/styles.css` and `tokens.css`

## MDX Content

- Blog posts: create `.mdx` files in `src/app/blog/posts/`
- Work projects: create `.mdx` files in `src/app/work/projects/`
- Pages auto-generate routes from filenames
- MDX uses both `@next/mdx` AND `next-mdx-remote` (transpilePackages required)

## Theme System

- Theme initialized via **inline script** in `src/app/layout.tsx` (prevents flash)
- Modifying theme defaults requires editing both `once-ui.config.ts` AND inline script
- All theme data stored in localStorage with `data-` prefixes
- Effects config (gradient, grid, lines, dots) applied through Background component

## Styling

- **Biome** used for formatting, NOT Prettier (`npm run biome-write`)
- Indentation: 2 spaces, quotes: double, lineWidth: 100
- SASS compiler set to "modern" mode
- CSS Modules for component styles (`.module.scss`)
- Never use inline styles - use Once UI tokens or CSS Modules

## Password Protection

- Protected routes configured in `once-ui.config.ts` protectedRoutes object
- Set password via `PAGE_ACCESS_PASSWORD` in `.env`
- RouteGuard component handles protection logic

## Type Configuration

- Custom typeRoots points to `./types` directory first
- Project types in `src/types/` are auto-imported
- Path alias: `@/*` maps to `src/*`

## Key Gotchas

- React 19.2.0 requires JSX transform: `"jsx": "react-jsx"` in tsconfig
- Image remotePatterns configured for Google images only
- Node.js v18.17+ required
- Gallery route disabled by default in routes config
