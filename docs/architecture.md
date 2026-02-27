# Architecture

## Overview

The Public Good Design System is a React component library adapted from the NHS UK Design System. It provides 35 accessible, production-ready UI components for building public service applications.

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Framework | Next.js 15 | Server-side rendering, routing, App Router |
| Language | TypeScript 5.9 | Type safety with strict mode |
| Styling | styled-components 6 | CSS-in-JS with theme support |
| i18n | next-intl 4 | Multi-language support with locale routing |
| Unit Testing | Vitest 3 + React Testing Library | Component testing |
| E2E Testing | Playwright | Cross-browser integration testing |
| Deployment | Vercel | Hosting with edge functions |

## Directory Structure

```
project-root/
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── page.tsx                # Root homepage (default locale)
│   │   ├── layout.tsx              # Root layout (HTML shell, providers)
│   │   ├── globals.css             # Base CSS reset and skip-link styles
│   │   ├── lib/
│   │   │   └── registry.tsx        # styled-components SSR registry
│   │   └── [locale]/               # Dynamic locale segment
│   │       ├── layout.tsx          # Locale layout (NextIntlClientProvider)
│   │       └── page.tsx            # Localized homepage
│   ├── components/                 # Component library
│   │   ├── action-link/            # Example component directory
│   │   │   ├── ActionLink.tsx      # Component implementation
│   │   │   ├── ActionLink.test.tsx # Unit tests
│   │   │   └── index.ts           # Named exports
│   │   ├── ... (35 component directories)
│   │   ├── index.ts                # Barrel exports for all components
│   │   └── ThemeProvider.tsx       # Theme context wrapper
│   ├── styles/
│   │   ├── tokens.ts               # Design tokens as TypeScript constants
│   │   ├── GlobalStyles.tsx        # Global CSS via createGlobalStyle
│   │   └── styled.d.ts            # Theme type augmentation
│   ├── types/
│   │   └── index.ts                # Shared type definitions
│   ├── utils/
│   │   ├── index.ts                # Utility functions
│   │   └── index.test.ts          # Utility tests
│   ├── hooks/                      # Custom React hooks (extensible)
│   ├── i18n/
│   │   └── request.ts             # next-intl config and locale list
│   └── middleware.ts               # Locale detection middleware
├── messages/                       # Translation JSON files
│   ├── en.json                     # English (default)
│   ├── cy.json                     # Welsh
│   ├── ar.json                     # Arabic (RTL)
│   ├── zh.json                     # Chinese
│   └── es.json                     # Spanish
├── tests/
│   ├── setup.ts                    # Vitest global setup and mocks
│   ├── utils/
│   │   └── test-utils.tsx          # Custom render with ThemeProvider
│   └── e2e/                        # Playwright test specs
├── public/                         # Static assets
│   └── manifest.json              # PWA manifest
└── Configuration files
    ├── next.config.mjs             # Next.js + next-intl plugin
    ├── tsconfig.json               # TypeScript with path aliases
    ├── vitest.config.ts            # Test runner configuration
    ├── playwright.config.ts        # E2E test configuration
    ├── vercel.json                 # Deployment configuration
    └── .eslintrc.json              # Linting rules
```

## Data Flow

### Server-Side Rendering

```
Request → middleware.ts (locale detection)
       → [locale]/layout.tsx (load messages, set lang/dir)
       → NextIntlClientProvider (provide translations)
       → StyledComponentsRegistry (collect CSS)
       → ThemeProvider (provide design tokens)
       → Page component (render)
       → HTML response (with inlined styles)
```

### styled-components SSR

The `StyledComponentsRegistry` in `src/app/lib/registry.tsx` uses `useServerInsertedHTML` to collect styles during server rendering and inject them into the `<head>`. On the client, it renders children directly.

### Theme System

```
tokens.ts (design token values)
    ↓
ThemeProvider (styled-components ThemeProvider)
    ↓
styled.d.ts (TypeScript augmentation)
    ↓
Components (access via ${({ theme }) => theme.colors.primary})
```

## Component Architecture

### Props Pattern

Components support three content modes (matching the NHS UK pattern):

1. **`children`** - Standard React children
2. **`text`** - Plain text string
3. **`html`** - HTML string (rendered via `dangerouslySetInnerHTML`)

Priority: `children` > `html` > `text`

### Styling Pattern

Components use styled-components with transient props (prefixed with `$`) to avoid passing styling props to the DOM:

```tsx
const StyledButton = styled.button<{ $variant: string }>`
  background-color: ${({ theme, $variant }) =>
    $variant === 'primary' ? theme.colors.primary : theme.colors.white};
`;
```

### Export Pattern

Each component directory has an `index.ts` that exports the component and its types:

```typescript
export { Button } from './Button';
export type { ButtonProps, ButtonVariant } from './Button';
```

All components are re-exported from `src/components/index.ts`.

## Testing Strategy

### Unit Tests (Vitest)

- Every component has a co-located `.test.tsx` file
- Uses custom `render` from `tests/utils/test-utils.tsx` that wraps in ThemeProvider
- Tests cover: rendering, props, accessibility attributes, user interactions, edge cases
- Coverage threshold: 80% for branches, functions, lines, statements

### E2E Tests (Playwright)

- Located in `tests/e2e/`
- Tests against dev server on `localhost:3000`
- Cross-browser: Chromium, Firefox, WebKit
- Mobile viewports: Pixel 5, iPhone 12
- Tests cover: page loading, accessibility, keyboard navigation, responsiveness

### Test Mocks (tests/setup.ts)

- IntersectionObserver
- ResizeObserver
- matchMedia
- localStorage / sessionStorage
- window.scrollTo
- HTMLElement.prototype.focus

## Security

### Headers (configured in next.config.mjs and vercel.json)

- `X-Frame-Options: DENY` - Prevents clickjacking
- `X-Content-Type-Options: nosniff` - Prevents MIME sniffing
- `Referrer-Policy: strict-origin-when-cross-origin` - Limits referrer information
- `Content-Security-Policy` - Restricts resource loading (Vercel config)

### Considerations

- Components with `html` props use `dangerouslySetInnerHTML` - only use with trusted content
- No user-generated content should be passed to `html` props without sanitization

## Deployment

Deployed to Vercel with:

- Regions: London (lhr1), Northern Virginia (iad1)
- Function timeout: 30 seconds
- Security headers applied to all routes
- Automatic builds on push to main
