# Code Mode Rules (Non-Obvious Only)

This file provides guidance to agents when working with code in this repository.

## Component Import Patterns

- Import Once UI components from `@once-ui-system/core`, not standard HTML
- Never import `div`, `span`, `button` - use `Column`, `Row`, `Flex`, `Text`, `Button` from Once UI
- Typography: `Text` component with variants (`heading-strong-l`, `body-default-m`, etc.)
- Icons imported via `Icon` component with name prop matching `src/resources/icons.ts`

## React Keys (Critical)

- NEVER use array indices as keys when content can change order
- Use stable identifiers from data (id, name, combination of fields)
- For static arrays that never reorder, indices are acceptable
- Demo components already follow correct patterns - reference them

## Demo Registry System

- New demos MUST be added to `src/components/interactive/demos/index.ts` registry
- Registry key MUST exactly match skill title from `src/resources/content.tsx`
- Demos are lazy-loaded - always use `lazy(() => import("./ComponentName"))`
- Wrap demo usage in `<Suspense fallback={<DemoLoader />}>`

## CSS/Styling Rules

- Use CSS Modules (`.module.scss`) for component-specific styles
- Global styles only in `src/resources/custom.css`
- Spacing uses Once UI tokens: `gap="8"` not `gap={8}` (string vs number)
- Biome formatter: double quotes, 2-space indent, 100 char line width
- Run `npm run biome-write` before committing

## MDX File Creation

- Blog posts go in `src/app/blog/posts/*.mdx` (auto-routed)
- Work projects go in `src/app/work/projects/*.mdx` (auto-routed)
- Filename becomes the route slug automatically
- Uses both @next/mdx AND next-mdx-remote (both required)

## Theme/Config Changes

- Content changes: edit `src/resources/content.tsx` exports only
- Theme changes: edit `src/resources/once-ui.config.ts` AND inline script in `src/app/layout.tsx`
- Theme script in layout.tsx must stay inline to prevent flash of unstyled content
- Route visibility controlled in `once-ui.config.ts` routes object
