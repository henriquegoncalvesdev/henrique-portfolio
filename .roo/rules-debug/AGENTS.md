# Debug Mode Rules (Non-Obvious Only)

This file provides guidance to agents when debugging code in this repository.

## Theme Debug Issues

- Theme flashing on load? Check inline script in `src/app/layout.tsx` line 48-104
- Theme not persisting? Data stored in localStorage with `data-` prefix keys
- Missing theme values? Both `once-ui.config.ts` AND inline script must match
- Effects not showing? Check `effects` object in `once-ui.config.ts` - display flags

## Demo Loading Failures

- Demos fail silently without Suspense wrapper
- Check `demoRegistry` keys match EXACT skill titles from `content.tsx`
- Demos are lazy-loaded - dynamic imports required, not direct imports
- Missing demo? Ensure exported as default AND named export

## MDX Rendering Issues

- MDX requires BOTH `@next/mdx` AND `next-mdx-remote` packages
- `next.config.mjs` must have `transpilePackages: ["next-mdx-remote"]`
- MDX files must be in correct directories: `blog/posts/` or `work/projects/`
- Page extensions must include "mdx" in next.config.mjs

## Once UI Component Errors

- "X is not a function" → likely importing standard HTML instead of Once UI
- Check imports: `import { Column, Row, Text } from "@once-ui-system/core"`
- Required CSS imports in layout.tsx: `styles.css` and `tokens.css` from @once-ui-system/core
- Spacing props use strings not numbers: `gap="8"` not `gap={8}`

## Build Failures

- SASS errors → Check sassOptions in next.config.mjs: compiler must be "modern"
- Type errors → Custom typeRoots in tsconfig.json: `./types` before `node_modules/@types`
- JSX errors → React 19.2.0 requires `"jsx": "react-jsx"` in tsconfig.json
- Image errors → Only Google images allowed in remotePatterns

## Password Protection 404s

- Protected route not working? Check `once-ui.config.ts` protectedRoutes object
- Password set in `.env` as `PAGE_ACCESS_PASSWORD`
- RouteGuard wraps children in layout.tsx - must stay there
