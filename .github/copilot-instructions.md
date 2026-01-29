# Copilot Instructions — Henrique Portfolio

## Project Overview
Next.js 16 portfolio built on **Once UI** design system with MDX content. TypeScript + SCSS modules.

## Architecture

```
src/
├── app/           # Next.js App Router pages
├── components/    # React components + SCSS modules
├── resources/     # Configuration hub (content, icons, theme)
└── types/         # TypeScript definitions
```

### Key Files
- **`src/resources/content.tsx`** — All site content (person, about, work, social)
- **`src/resources/icons.ts`** — Icon registry using react-icons
- **`src/resources/once-ui.config.ts`** — Theme, fonts, routes, protected pages
- **`src/app/*/page.tsx`** — Route pages (about, work, blog, gallery)

### Content Pattern
Content is defined in `content.tsx` as typed objects, not fetched:
```tsx
const about: About = {
  technical: {
    skills: [{ title: "React", tags: [{ name: "Hooks", icon: "sparkle" }] }]
  }
}
```

## Once UI System
Use `@once-ui-system/core` components exclusively:
```tsx
import { Column, Row, Text, Heading, Button, Tag, Icon } from "@once-ui-system/core";
```

**Do NOT** use raw HTML (`div`, `span`) — use `Column`, `Row`, `Text` instead.

### Layout Pattern
```tsx
<Column maxWidth="m" gap="l">
  <Row horizontal="between" vertical="center">
    <Heading variant="display-strong-s">{title}</Heading>
  </Row>
</Column>
```

## Icons
Icons must be registered in `src/resources/icons.ts`:
```tsx
import { SiReact } from "react-icons/si";
export const iconLibrary = { react: SiReact };
```
Then use: `<Icon name="react" />` or `<Tag prefixIcon="react">`.

## Styling
- Use SCSS modules: `Component.module.scss`
- Import breakpoints: `@use "../breakpoints.scss" as breakpoints;`
- Avoid inline styles except for dynamic values

## MDX Content
Blog/work pages use MDX in `app/blog/posts/` and `app/work/projects/`.
Frontmatter defines metadata; content renders via `next-mdx-remote`.

## API Routes

### OG Image Generation
Dynamic Open Graph images generated at `/api/og/generate`:
```tsx
// Usage in metadata
image: `/api/og/generate?title=${encodeURIComponent(title)}`
```
Located in `src/app/api/og/generate/route.tsx`. Uses `next/og` ImageResponse with Google Fonts.

### Other APIs
- `/api/og/fetch` — Fetches external OG metadata
- `/api/og/proxy` — Proxies OG images
- `/api/rss` — RSS feed generation
- `/api/authenticate` + `/api/check-auth` — Protected route auth

## Commands
```bash
npm run dev      # Development server (localhost:3000)
npm run build    # Production build
npm run lint     # ESLint check
```

## Protected Routes
Password-protected pages configured in `once-ui.config.ts`:
```tsx
const protectedRoutes = { "/work/project-slug": true };
```
Set `ROUTE_SECRET` in `.env`.

## Type Safety
All content objects have matching types in `src/types/`:
- `Person`, `About`, `Work`, `Blog`, `Gallery` for content
- `RoutesConfig`, `DisplayConfig` for configuration

## Code Style
- Biome for formatting (`npm run biome-write`)
- Prefer composition over prop drilling
- Keep components colocated with their styles
