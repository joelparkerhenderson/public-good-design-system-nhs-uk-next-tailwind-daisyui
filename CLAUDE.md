# CLAUDE.md

Project guide for AI assistants working on this codebase.

## Project Overview

Public Good Design System - a React component library adapted from the NHS UK Design System. Built with Next.js 15, TypeScript (strict mode), styled-components 6, and next-intl 4.

## Quick Commands

```bash
npm run dev          # Dev server on localhost:3000
npm run build        # Production build
npm run test         # Unit tests (Vitest)
npm run test:watch   # Tests in watch mode
npm run test:coverage # Tests with coverage (80% threshold)
npm run test:e2e     # E2E tests (Playwright, needs dev server)
npm run typecheck    # TypeScript check (tsc --noEmit)
npm run lint         # ESLint
```

## Project Structure

```
src/
  app/                  # Next.js App Router
    page.tsx            # Root homepage
    layout.tsx          # Root layout with styled-components registry
    [locale]/           # i18n locale routing (en, cy, ar, zh, es)
    lib/registry.tsx    # styled-components SSR registry
  components/           # 35 UI components
    [name]/             # Each has: Component.tsx, Component.test.tsx, index.ts
    index.ts            # Barrel exports
    ThemeProvider.tsx    # styled-components ThemeProvider wrapper
  styles/
    tokens.ts           # Design tokens (colors, typography, spacing, breakpoints)
    GlobalStyles.tsx     # Global CSS-in-JS styles
    styled.d.ts         # Theme type augmentation for styled-components
  types/index.ts        # Shared TypeScript types
  utils/index.ts        # Utility functions (cn, generateId, keyboard helpers, etc.)
  i18n/request.ts       # next-intl configuration and locale list
  middleware.ts          # next-intl routing middleware
messages/               # Translation JSON files (en.json, cy.json, ar.json, zh.json, es.json)
tests/
  setup.ts              # Vitest setup (DOM mocks, cleanup)
  utils/test-utils.tsx  # Custom render with ThemeProvider
  e2e/                  # Playwright specs
```

## Key Conventions

### Components

- Each component lives in `src/components/[kebab-case-name]/`
- Export the component and its types from `index.ts`
- All components are re-exported from `src/components/index.ts`
- Use styled-components for styling, referencing `theme` tokens
- Props interfaces should extend `BaseComponentProps` from `@/types`
- Support `text` and `html` props where the NHS UK original did (html uses dangerouslySetInnerHTML)
- Spread `...rest` props to the root element for extensibility

### Styling

- All styling uses styled-components (not Tailwind CSS classes)
- Use theme tokens from `@/styles/tokens` - never hardcode colors, spacing, or fonts
- Use transient props (prefixed with `$`) for styled-component styling props
- Global styles are in `GlobalStyles.tsx` using `createGlobalStyle`
- Theme type is automatically available in styled-components via `styled.d.ts`

### Testing

- Unit tests use Vitest + React Testing Library
- Import `render` from `tests/utils/test-utils` (wraps components in ThemeProvider)
- Test file goes alongside component: `Component.test.tsx`
- E2E tests go in `tests/e2e/`
- Coverage thresholds: 80% for branches, functions, lines, statements

### TypeScript

- Strict mode is enabled
- Path aliases: `@/*` maps to `src/*`, plus specific `@/components/*`, `@/styles/*`, etc.
- Shared types live in `src/types/index.ts`
- Each component exports its own prop types from its `index.ts`

### Internationalization

- 5 locales: en (default), cy (Welsh), ar (Arabic/RTL), zh (Chinese), es (Spanish)
- Translation files in `messages/[locale].json`
- Locale routing via `src/app/[locale]/` with next-intl middleware
- RTL support: Arabic locale gets `dir="rtl"` on `<html>`
- Use `useTranslations()` hook in client components

### Accessibility

- WCAG AA compliance required for all components
- Use semantic HTML elements
- Include ARIA attributes where needed
- Support keyboard navigation
- Visible focus indicators (3px solid yellow outline)
- Respect `prefers-reduced-motion` and `prefers-contrast: high`
- Support RTL layouts

## Design Tokens Reference

Colors: `primary` (#005eb8), `green` (#007f3b), `red` (#d5281b), `yellow` (#ffeb3b), `black` (#212b32), `grey1-5`

Typography: Base font "Frutiger W01", fallback to system sans-serif. Sizes from `xs` (12px) to `6xl` (60px).

Spacing: 4px grid system. Keys: 0-64 mapping to 0-16rem.

Breakpoints: `sm` (480px), `md` (768px), `lg` (1024px), `xl` (1280px), `2xl` (1536px).

## Common Patterns

### Adding a new component

1. Create `src/components/my-component/MyComponent.tsx`
2. Create `src/components/my-component/MyComponent.test.tsx`
3. Create `src/components/my-component/index.ts` with named exports
4. Add exports to `src/components/index.ts`
5. Add translations to `messages/*.json` if needed

### Running tests for a single component

```bash
npx vitest src/components/button/Button.test.tsx
```

## Known Issues

- The project name references "tailwind-daisyui" but styling uses styled-components exclusively. Tailwind/DaisyUI are not installed.
- Components using `dangerouslySetInnerHTML` (via `html` props) should be used with trusted content only.
- The Hero component has pending optimization for event handlers.
